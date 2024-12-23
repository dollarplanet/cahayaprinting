import { Media, Profile } from "@/payload-types";
import Image from "next/image";
import Link from "next/link";

type Props = {
  profile: Profile
}

export const HeaderComponent = (props: Props) => {
  return (
    <header className="backdrop-blur inset-x-0 top-0 z-10 w-full bg-orange-300/50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex-shrink-0">
            <Link href="/" title="" className="flex gap-2">
              {Boolean(props.profile.detail.logo) && <Image width={0} height={0} className="w-auto h-8" src={(props.profile.detail.logo as Media).thumbnailURL!} alt="" />}
              <p className="text-2xl font-bold">{props.profile.detail.name}</p>
            </Link>
          </div>
          <div className="ml-auto lg:flex lg:items-center lg:justify-center lg:space-x-10">
            <Link prefetch={false} href="/produk" title="" className="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"> Katalog </Link>
          </div>
        </div>
      </div>
    </header>
  );
}