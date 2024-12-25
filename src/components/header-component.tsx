"use client";

import { Media, Profile } from "@/payload-types";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent } from "react";

type Props = {
  profile: Profile
}

export const HeaderComponent = (props: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const q = formData.get("q");
    router.push(`/produk?query=${q}`);
  }

  return (
    <header className="sticky backdrop-blur inset-x-0 top-0 z-10 w-full bg-white shadow-lg">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 lg:h-16 gap-4">
          <div className="flex-shrink-0">
            <Link href="/" title="" className="flex gap-2">
              {Boolean(props.profile.detail.logo) && <Image width={0} height={0} className="w-auto h-6" src={(props.profile.detail.logo as Media).thumbnailURL!} alt="" />}
              <p className="text-xl font-bold hidden md:block">{props.profile.detail.name}</p>
            </Link>
          </div>

          {(pathname !== "/produk") && <form onSubmit={handleSearch} className="sm:flex py-4 sm:items-center sm:justify-center sm:w-1/2 lg:flex lg:items-center lg:justify-center lg:w-1/3" action="/produk" method="get">
            <input
              className="w-full px-4 py-2 rounded-md bg-white border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="search"
              id="search"
              name="q"
              placeholder="Cari produk"
            />
          </form>}

          <div className="ml-auto lg:flex lg:items-center lg:justify-center lg:space-x-10 text-base font-bold text-black ">
            <Link prefetch={false} href="/produk" title="" className="transition-all duration-200 hover:text-opacity-80"> KATALOG </Link>
          </div>
          <Link prefetch={false} href="/keranjang" title="Keranjang" className="transition-all duration-200 hover:text-opacity-80">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}