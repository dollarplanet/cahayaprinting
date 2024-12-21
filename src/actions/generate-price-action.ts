"use server";

import { Subvariation, Variation } from "@/payload-types";
import payloadConfig from "@/payload.config"
import { combos } from "@/utils/combos";
import { getPayload } from "payload"

export const generatePriceAction = async (productId: number) => {
  const payload = await getPayload({ config: payloadConfig })

  const document = await payload.findByID({
    collection: "products",
    id: productId,
    depth: 2,
    select: {
      variant: {
        subvariation: true
      }
    }
  })

  const subs = document?.variant?.subvariation as Subvariation[];

  await payload.delete({
    collection: "prices",
    where: {
      product: {
        equals: productId
      }
    }
  })

  if (subs.length === 0) return;

  const tempHolder: Map<number, number[]> = new Map();

  for (const sub of subs) {
    const key = (sub.variation as Variation).id;
    tempHolder.set((sub.variation as Variation).id, [...(tempHolder.get(key) ?? []), sub.id]);
  }

  const holder = Array.from(tempHolder.values()).filter((v) => (v.length > 0));

  const combo: number[][] = combos(holder);

  const prices: { combinations: number[], price: number, name: string, product: number }[] = combo.map((c) => {
    return {
      combinations: c,
      price: 99999999,
      product: productId,
      name: c.map((c: any) => {
        const sub = subs.find((sub) => sub.id === c);
        return `${(sub!.variation as Variation).name} ${sub!.name}`;
      }).join(", ")
    }
  })

  for (const price of prices) {
    await payload.create({
      collection: "prices",
      data: price,
    })
  }
}