import { HomeComponent } from "@/app/(frontend)/component";
import payloadConfig from "@/payload.config";
import { getPayload } from "payload";

export const revalidate = 0;

const Page: NextServerPage = async () => {
  const payload = await getPayload({ config: payloadConfig });
  const data = await payload.findGlobal({
    slug: "home",
  })
  
  const profile = await payload.findGlobal({
    slug: "profile",
    select: {
      detail: {
        whatsapp: true
      }
    },
  })

  return (
    <HomeComponent data={data} whatsapp={profile?.detail?.whatsapp} />
  );
}

export default Page;