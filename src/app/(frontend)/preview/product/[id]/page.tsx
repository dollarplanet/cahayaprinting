import { getProductData } from "@/app/(frontend)/product/get-product-data";
import { LivePreviewTrigger } from "@/components/live-preview-trigger";
import { ProductCard } from "@/components/product-card";
import { Subvariation, Variation } from "@/payload-types";
import payloadConfig from "@/payload.config";
import { currentSession } from "@/utils/current-session";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { getPayload } from "payload";

const Page: NextServerPage = async ({ params }) => {
  const payload = await getPayload({ config: payloadConfig })
  const session = await currentSession({
    payload,
    headers: await headers(),
  });
  const id = (await params).id

  if ((session.user === null) || (id === undefined)) {
    notFound()
  }

  const data = await getProductData(payload, id, true);

  return (
    <>
      <LivePreviewTrigger />

      <ProductCard {...data} />
    </>
  );
}

export default Page;