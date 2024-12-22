import { Home, Media, Product } from "@/payload-types"
import { RichText } from "@payloadcms/richtext-lexical/react";
import Image from "next/image";
import Link from "next/link";
import { FiveStars } from "./five-stars";
import { Testimonial } from "./testimonial";

type Props = {
  data: Home;
}

export const HomeComponent = (props: Props) => {
  return (
    <>
      <section className="bg-yellow-50 overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-stretch lg:min-h-[800px]">
          <div className="relative flex items-center justify-center w-full lg:order-2 lg:w-7/12">
            <div className="absolute bottom-0 right-0 hidden lg:block">
              <Image width={0} height={0} className="object-contain w-auto h-48" src="/images/curved-lines.png" alt="" />
            </div>
            <div className="relative px-4 pt-24 pb-16 text-center sm:px-6 md:px-24 2xl:px-32 lg:py-24 lg:text-left">
              <RichText className="prose prose-lg" data={props.data.hero.description} />
              {Boolean(props.data.hero.buttonTitle) && <a href="#" title="" className="inline-flex items-center justify-center px-5 py-2.5 text-base font-semibold transition-all duration-200 rounded-full bg-orange-500 text-white hover:bg-orange-600 focus:bg-orange-600 mt-16 cursor-pointer" role="button">{props.data.hero.buttonTitle}</a>}
            </div>
          </div>
          {Boolean(props.data.hero.image) && <div className="relative w-full overflow-hidden lg:order-1 h-96 lg:h-auto lg:w-5/12">
            <div className="absolute inset-0">
              <Image width={0} height={0} className="object-cover w-full h-full scale-150" src={(props.data.hero.image as Media).url!} alt="" />
            </div>
          </div>}
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="w-full flex justify-center mx-auto text-center">
            {Boolean(props.data.featured?.description) && <RichText className="prose prose-lg w-full" data={props.data.featured?.description!} />}
          </div>

          <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-3 md:mt-16 lg:gap-x-12">
            {
              props.data.featured.featuredProduct.map((product, index) => (
                <Link href={`/product/${(product as Product).slug}`} key={index}>
                  <Image width={0} height={0} className="w-full" src={((product as Product).images as Media[])[0].url!} alt="" />
                  <p className="mt-4 text-lg font-bold">{(product as Product).name}</p>
                  <FiveStars />
                  <p className="text-md font-semibold">{(product as Product).sku}</p>
                </Link>
              ))
            }
          </div>

          {Boolean(props.data.featured?.buttonTitle) && <div className="text-center">
            <a href="#" title="" className="inline-flex items-center justify-center px-5 py-2.5 text-base font-semibold transition-all duration-200 rounded-full bg-orange-500 text-white hover:bg-orange-600 focus:bg-orange-600 mt-16 cursor-pointer" role="button">{props.data.featured?.buttonTitle}</a>
          </div>}
        </div>
      </section>

      {Boolean(props.data.testimonials?.testimonials) && ((props.data.testimonials!.testimonials ?? []).length > 0) && <section className="bg-orange-500 w-full py-16">

        <div className="w-full flex justify-center text-center text-white">
          <h2 className="font-bold text-3xl">{props.data.testimonials?.title}</h2>
        </div>

        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 mt-8">
          <div className="grid grid-cols-1 gap-6 lg:gap-10 sm:grid-cols-2 md:grid-cols-3">
            {props.data.testimonials?.testimonials!.map((testimonial, index) => (
              <Testimonial key={index} description={testimonial.description} name={testimonial.name} company={testimonial.company} />
            ))}
          </div>
        </div>
      </section>}

      {Boolean(props.data.questions?.questions) && (props.data.questions!.questions!.length > 0) && <section className="py-16 bg-gray-50">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          {Boolean(props.data.questions?.description) && <div className="w-full flex justify-center mx-auto text-center mb-8">
            <RichText className="prose prose-lg w-full" data={props.data.questions?.description!} />
          </div>}

          <div className="max-w-3xl mx-auto space-y-4">
            {props.data.questions?.questions!.map((question, index) => (
              <div key={index} className="transition-all duration-200 bg-white border border-gray-200 shadow-lg cursor-pointer hover:bg-gray-50">
                <input className="accordion-input" type="radio" name="accordion-1" id={`tab-${index + 1}`} />
                <label htmlFor={`tab-${index + 1}`} className="flex items-center justify-between w-full px-4 py-5 sm:p-6">
                  <span className="flex text-lg font-semibold text-black">{question.question}</span>

                  <svg className="w-6 h-6 text-gray-400 rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </label>

                <div className="accordion-panel">
                  <p>{question.answer}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-600 textbase mt-9">{props.data.questions?.altText}</p>
        </div>
      </section>}</>
  )
}