import { HomeComponent } from "@/components/home-component";
import { LivePreviewTrigger } from "@/components/live-preview-trigger";
import payloadConfig from "@/payload.config";
import { currentSession } from "@/utilities/current-session";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { getPayload } from "payload";

export const revalidate = 0;

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
    slug: "home",
    draft: true,
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
    <>
      <LivePreviewTrigger />

      <HomeComponent data={data} whatsapp={profile?.detail?.whatsapp} />
    </>
  );
}

export default Page;