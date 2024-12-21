import { getProductData } from "@/app/(frontend)/product/get-product-data";
import { LivePreviewTrigger } from "@/components/live-preview-trigger";
import { ProductCard } from "@/components/product-card";
import { Subvariation, Variation } from "@/payload-types";
import payloadConfig from "@/payload.config";
import { currentSession } from "@/utilities/current-session";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { getPayload } from "payload";

const Page: NextServerPage = async ({ params }) => {
  const payload = await getPayload({ config: payloadConfig })
  const session = await currentSession({
    payload,
    headers: await headers(),
  });
  const slug = (await params).slug

  if ((session.user === null) || (slug === undefined)) {
    notFound()
  }

  const data = await getProductData({
    draft: true,
    slug: slug,
    payload: payload,
  });

  return (
    <>
      <LivePreviewTrigger />

      <ProductCard {...data} />
    </>
  );
}

export default Page;