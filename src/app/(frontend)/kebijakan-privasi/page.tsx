import payloadConfig from "@/payload.config";
import { getPayload } from "payload";
import { PrivacyPolicyComponent } from "@/app/(frontend)/kebijakan-privasi/component";

const Page: NextServerPage = async () => {
  const payload = await getPayload({ config: payloadConfig });

  const data = await payload.findGlobal({
    slug: "privacy-policy",
  })

  return (
    <PrivacyPolicyComponent data={data} />
  );
}

export default Page;