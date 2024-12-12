import { getPayload } from "payload";
import { userSeed } from "./scripts/user-seed"
import { Seed } from "./seed-type";
import payloadConfig from "@/payload.config";

const main = async () => {
  const payload = await getPayload({ config: payloadConfig })

  const seeds: Seed[] = [
    userSeed
  ];

  for (const seed of seeds) {
    await seed({ payload });
  }

  throw new Error("Seed completed")
}

main()