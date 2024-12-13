import { LivePreviewTrigger } from "@/components/live-preview-trigger";
import { Media } from "@/payload-types";
import payloadConfig from "@/payload.config";
import { currentSession } from "@/utils/current-session";
import { isPreview } from "@/utils/is-preview";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { headers } from "next/headers";
import Image from "next/image";
import { getPayload } from "payload";

export const revalidate = 0;

const Page: NextServerPage = async ({ searchParams }) => {
  const payload = await getPayload({ config: payloadConfig });
  const heads = await headers();
  const draftEnabled = await isPreview({
    auth: {
      payload,
      headers: heads,
    },
    searchParams,
  });

  const data = await payload.findGlobal({
    slug: "home",
    draft: draftEnabled,
  })

  return (
    <>
      <LivePreviewTrigger />

      <div className="relative">
        <header className="fixed backdrop-blur inset-x-0 top-0 z-10 w-full bg-white/30">
          <div className="px-4 mx-auto sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 lg:h-20">
              <div className="flex-shrink-0">
                <a href="#" title="" className="flex gap-2">
                  {Boolean(data.company?.logo) && <Image width={0} height={0} className="w-auto h-8" src={(data.company?.logo as Media).url!} alt="" />}
                  <p className="text-2xl font-bold">{data.company?.name}</p>
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
        <section className="bg-yellow-50 overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-stretch lg:min-h-[800px]">
            <div className="relative flex items-center justify-center w-full lg:order-2 lg:w-7/12">
              <div className="absolute bottom-0 right-0 hidden lg:block">
                <Image width={0} height={0} className="object-contain w-auto h-48" src="/images/curved-lines.png" alt="" />
              </div>
              <div className="relative px-4 pt-24 pb-16 text-center sm:px-6 md:px-24 2xl:px-32 lg:py-24 lg:text-left">
                <RichText className="prose prose-lg" data={data.heroContent?.description} />
                {Boolean(data.heroContent.buttonTitle) && <a href="#" title="" className="inline-flex items-center justify-center px-5 py-2.5 text-base font-semibold transition-all duration-200 rounded-full bg-orange-500 text-white hover:bg-orange-600 focus:bg-orange-600 mt-16 cursor-pointer" role="button">{data.heroContent.buttonTitle}</a>}
              </div>
            </div>
            {Boolean(data.heroContent?.heroImage) && <div className="relative w-full overflow-hidden lg:order-1 h-96 lg:h-auto lg:w-5/12">
              <div className="absolute inset-0">
                <Image width={0} height={0} className="object-cover w-full h-full scale-150" src={(data.heroContent?.heroImage as Media).url!} alt="" />
              </div>
            </div>}
          </div>
        </section>
      </div>

      <section className="py-10 bg-white sm:py-16 lg:py-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-3xl mx-auto text-center">
            {Boolean(data.featuredDescription) && <RichText className="prose prose-lg" data={data.featuredDescription!} />}
          </div>

          <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-3 md:mt-16 lg:gap-x-12">
            <div>
              <img className="w-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/team/6/team-member-1.jpg" alt="" />
            </div>

            <div>
              <img className="w-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/team/6/team-member-2.jpg" alt="" />
            </div>

            <div>
              <img className="w-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/team/6/team-member-3.jpg" alt="" />
            </div>
          </div>

          {Boolean(data.featuredButtonTittle) && <div className="text-center">
            <a href="#" title="" className="inline-flex items-center justify-center px-5 py-2.5 text-base font-semibold transition-all duration-200 rounded-full bg-orange-500 text-white hover:bg-orange-600 focus:bg-orange-600 mt-16 cursor-pointer" role="button">{data.featuredButtonTittle}</a>
          </div>}
        </div>
      </section>

    </>
  );
}

export default Page;