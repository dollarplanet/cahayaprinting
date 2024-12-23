import { getProductData } from "@/app/(frontend)/produk/[slug]/get-product-data";
import { LivePreviewTrigger } from "@/components/live-preview-trigger";
import { ProductComponent } from "@/app/(frontend)/produk/[slug]/component";
import payloadConfig from "@/payload.config";
import { notFound } from "next/navigation";
import { getPayload } from "payload";

export const revalidate = 0;

const Page: NextServerPage = async ({ params }) => {
  const payload = await getPayload({ config: payloadConfig })
  const slug = (await params).slug

  if (slug === undefined) {
    notFound()
  }

  const data = await getProductData({
    draft: false,
    slug: slug,
    payload: payload,
  });

  return (
    <>
      <LivePreviewTrigger />

      <ProductComponent {...data} />
    </>
  );
}

export default Page;