import { Category, Media } from "@/payload-types"
import Image from "next/image"

type Props = {
  category: Category;
}

export const CategoryChip = (props: Props) => {
  return (
    <div className="rounded-md bg-gray-300 flex items-center gap-1 py-0.5 px-1 border border-transparent text-gray-700 transition-all shadow-sm">
      {Boolean(props.category.thumbnail) && <Image alt={props.category.name} width={0} height={0} src={(props.category.thumbnail as Media).sizes?.thumbnail?.url!} className="rounded-full w-3 h-3 object-cover" />}
      <div className="text-xs font-bold">{props.category.name}</div>
    </div>
  )
}