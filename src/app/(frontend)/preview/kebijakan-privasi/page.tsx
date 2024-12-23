import payloadConfig from "@/payload.config";
import { getPayload } from "payload";
import { PrivacyPolicyComponent } from "@/app/(frontend)/kebijakan-privasi/component";
import { currentSession } from "@/utilities/current-session";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { LivePreviewTrigger } from "@/components/live-preview-trigger";

const Page: NextServerPage = async () => {
  const payload = await getPayload({ config: payloadConfig });
  const session = await currentSession({
    payload,
    headers: await headers(),
  });

  if (session.user === null) {
    notFound()
  }

  const data = await payload.findGlobal({
    slug: "privacy-policy",
    draft: true,
  })

  return (
    <>
      <LivePreviewTrigger />

      <PrivacyPolicyComponent data={data} />
    </>
  );
}

export default Page;