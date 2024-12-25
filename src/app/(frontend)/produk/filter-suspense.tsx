import payloadConfig from "@/payload.config"
import { getPayload } from "payload"
import { FilterComponent } from "./filter-component";

export const FilterSuspense = async () => {
  const payload = await getPayload({ config: payloadConfig })

  const categories = await payload.find({
    collection: "categories",
    select: {
      name: true,
      thumbnail: true,
      depth: 2,
    }
  })

  return (
    <FilterComponent categories={categories.docs} />
  )
}