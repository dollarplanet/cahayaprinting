import { HomeComponent } from "@/components/home-component";
import payloadConfig from "@/payload.config";
import { getPayload } from "payload";

export const revalidate = 0;

const Page: NextServerPage = async () => {
  const payload = await getPayload({ config: payloadConfig });
  const data = await payload.findGlobal({
    slug: "home",
  })

  return (
    <HomeComponent data={data} />
  );
}

export default Page;