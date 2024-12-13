import { LivePreviewTrigger } from "@/components/live-preview-trigger";
import { ProductCard } from "@/components/product-card";
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

  const product = await payload.findByID({
    collection: "products",
    depth: 2,
    draft: true,
    id: id,
    disableErrors: true,
  })

  if (!product) {
    notFound()
  }

  return (
    <>
      <LivePreviewTrigger />

      <ProductCard product={product} />
    </>
  );
}

export default Page;