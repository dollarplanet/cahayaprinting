import { Media, Profile } from "@/payload-types";
import Image from "next/image";

type Props = {
  profile: Profile
}

export const HeaderComponent = (props: Props) => {
  return (
    <header className="sticky backdrop-blur inset-x-0 top-0 z-10 w-full bg-orange-300/50">
      <div className="px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex-shrink-0">
            <a href="#" title="" className="flex gap-2">
              {Boolean(props.profile.detail.logo) && <Image width={0} height={0} className="w-auto h-8" src={(props.profile.detail.logo as Media).thumbnailURL!} alt="" />}
              <p className="text-2xl font-bold">{props.profile.detail.name}</p>
            </a>
          </div>
          <button type="button" className="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100">
            <svg className="block w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
            <svg className="hidden w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <div className="hidden ml-auto lg:flex lg:items-center lg:justify-center lg:space-x-10">
            <a href="#" title="" className="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"> Kontak </a>
            <a href="#" title="" className="inline-flex items-center justify-center px-5 py-2.5 text-base font-semibold transition-all duration-200 rounded-full bg-orange-500 text-white hover:bg-orange-600 focus:bg-orange-600" role="button">Lihat Produk</a>
          </div>
        </div>
      </div>
    </header>
  );
}