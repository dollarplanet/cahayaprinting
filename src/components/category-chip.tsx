import { Category, Media } from "@/payload-types"
import Image from "next/image"

type Props = {
  category: Category;
  scale?: number;
}

export const CategoryChip = (props: Props) => {
  return (
    <div style={{scale: props.scale, transformOrigin: "left"}} className="rounded-md bg-gray-300 flex items-center gap-1 py-1 px-2.5 border border-transparent text-sm text-gray-700 font-semibold transition-all shadow-sm mb-2">
      {Boolean(props.category.thumbnail) && <Image alt={props.category.name} width={0} height={0} src={(props.category.thumbnail as Media).sizes?.thumbnail?.url!} className="rounded-full w-5 h-5 object-cover" />}
      {props.category.name}
    </div>
  )
}