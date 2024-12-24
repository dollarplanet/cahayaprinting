import { Media, Profile } from "@/payload-types";
import Image from "next/image";
import Link from "next/link";

type Props = {
  profile: Profile
}

export const HeaderComponent = (props: Props) => {
  return (
    <header className="sticky backdrop-blur inset-x-0 top-0 z-10 w-full bg-white shadow-lg">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 lg:h-16">
          <div className="flex-shrink-0">
            <Link href="/" title="" className="flex gap-2">
              {Boolean(props.profile.detail.logo) && <Image width={0} height={0} className="w-auto h-6" src={(props.profile.detail.logo as Media).thumbnailURL!} alt="" />}
              <p className="text-xl font-bold hidden md:block">{props.profile.detail.name}</p>
            </Link>
          </div>
          <div className="ml-auto lg:flex lg:items-center lg:justify-center lg:space-x-10 text-base font-bold text-black ">
            <Link prefetch={false} href="/produk" title="" className="transition-all duration-200 hover:text-opacity-80"> KATALOG </Link>
          </div>
        </div>
      </div>
    </header>
  );
}