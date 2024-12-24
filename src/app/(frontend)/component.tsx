import { Home, Media, Product } from "@/payload-types"
import { RichText } from "@payloadcms/richtext-lexical/react";
import Image from "next/image";
import Link from "next/link";
import { FiveStars } from "../../components/five-stars";
import { Testimonial } from "../../components/testimonial";

type Props = {
  data: Home;
  whatsapp: string;
}

export const HomeComponent = (props: Props) => {
  return (
    <>
      <section className="bg-yellow-50 overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-stretch lg:min-h-view">
          <div className="relative flex items-center justify-center w-full lg:order-2 lg:w-7/12">
            <div className="absolute bottom-0 right-0 hidden lg:block">
              <Image width={0} height={0} className="object-contain w-auto h-48" src="/images/curved-lines.png" alt="" />
            </div>
            <div className="relative px-4 pt-24 pb-16 text-center sm:px-6 md:px-24 2xl:px-32 lg:py-24 lg:text-left">
              <RichText className="prose prose-lg" data={props.data.hero.description} />
              {Boolean(props.data.hero.buttonTitle) && <Link href="/produk" title="" className="inline-flex items-center justify-center px-5 py-2.5 text-base font-semibold transition-all duration-200 rounded-full bg-orange-500 text-white hover:bg-orange-600 focus:bg-orange-600 mt-16 cursor-pointer" role="button">{props.data.hero.buttonTitle}</Link>}
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

          <div className="grid grid-cols-2 gap-6 mt-8 sm:grid-cols-5 md:mt-16 lg:gap-x-12">
            {
              props.data.featured.featuredProduct.map((product, index) => (
                <Link href={`/produk/${(  product as Product).slug}`} key={index}>
                  <Image width={0} height={0} className="w-full" src={((product as Product).images as Media[])[0].url!} alt="" />
                  <p className="mt-4 font-bold">{(product as Product).name}</p>
                  <FiveStars scale={0.7} />
                  <p className="text-xs font-semibold">{(product as Product).sku}</p>
                </Link>
              ))
            }
          </div>

          {Boolean(props.data.featured?.buttonTitle) && <div className="text-center">
            <Link prefetch={false} href="/produk" title="" className="inline-flex items-center justify-center px-5 py-2.5 text-base font-semibold transition-all duration-200 rounded-full bg-orange-500 text-white hover:bg-orange-600 focus:bg-orange-600 mt-16 cursor-pointer" role="button">{props.data.featured?.buttonTitle}</Link>
          </div>}
        </div>
      </section>

      <section className="py-10 bg-white sm:py-16 lg:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 text-center sm:grid-cols-2 md:grid-cols-3 lg:gap-y-16">
            <div>
              <div className="relative flex items-center justify-center mx-auto">
                <svg className="text-blue-100" width="72" height="75" viewBox="0 0 72 75" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M63.6911 28.8569C68.0911 48.8121 74.6037 61.2674 53.2349 65.9792C31.8661 70.6909 11.6224 61.2632 7.22232 41.308C2.82229 21.3528 3.6607 12.3967 25.0295 7.68503C46.3982 2.97331 59.2911 8.90171 63.6911 28.8569Z" />
                </svg>
                <svg className="absolute text-blue-600 w-9 h-9" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                  />
                </svg>
              </div>
              <h3 className="mt-8 text-lg font-semibold text-black">Secured Payments</h3>
              <p className="mt-4 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
            </div>

            <div>
              <div className="relative flex items-center justify-center mx-auto">
                <svg className="text-orange-100" width="62" height="64" viewBox="0 0 62 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M62 13.001C62 33.4355 53.9345 64.001 33.5 64.001C13.0655 64.001 0 50.435 0 30.0005C0 9.56596 2.56546 4.00021 23 4.00021C43.4345 4.00021 62 -7.43358 62 13.001Z" />
                </svg>
                <svg className="absolute text-orange-600 w-9 h-9" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mt-8 text-lg font-semibold text-black">Fast & Easy to Load</h3>
              <p className="mt-4 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
            </div>

            <div>
              <div className="relative flex items-center justify-center mx-auto">
                <svg className="text-green-100" width="66" height="68" viewBox="0 0 66 68" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M65.5 30C65.5 50.4345 46.4345 68 26 68C5.56546 68 0 50.4345 0 30C0 9.56546 12.5655 0 33 0C53.4345 0 65.5 9.56546 65.5 30Z" />
                </svg>
                <svg className="absolute text-green-600 w-9 h-9" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </div>
              <h3 className="mt-8 text-lg font-semibold text-black">Light & Dark Version</h3>
              <p className="mt-4 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
            </div>

            <div>
              <div className="relative flex items-center justify-center mx-auto">
                <svg className="text-purple-100" width="66" height="68" viewBox="0 0 66 68" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M65.5 30C65.5 50.4345 46.4345 68 26 68C5.56546 68 0 50.4345 0 30C0 9.56546 12.5655 0 33 0C53.4345 0 65.5 9.56546 65.5 30Z" />
                </svg>
                <svg className="absolute text-purple-600 w-9 h-9" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </div>
              <h3 className="mt-8 text-lg font-semibold text-black">Light & Dark Version</h3>
              <p className="mt-4 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
            </div>

            <div>
              <div className="relative flex items-center justify-center mx-auto">
                <svg className="text-gray-100" width="65" height="70" viewBox="0 0 65 70" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M64.5 26C64.5 46.4345 56.4345 70 36 70C15.5655 70 0 53.9345 0 33.5C0 13.0655 13.0655 0 33.5 0C53.9345 0 64.5 5.56546 64.5 26Z" />
                </svg>
                <svg className="absolute text-gray-600 w-9 h-9" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mt-8 text-lg font-semibold text-black">Fast & Easy to Load</h3>
              <p className="mt-4 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
            </div>

            <div>
              <div className="relative flex items-center justify-center mx-auto">
                <svg className="text-yellow-100" width="78" height="78" viewBox="0 0 78 78" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.49996 28.0002C4.09993 47.9554 14.1313 66.7885 35.5 71.5002C56.8688 76.2119 68.0999 58.4553 72.5 38.5001C76.9 18.5449 68.3688 12.711 47 7.99931C25.6312 3.28759 12.9 8.04499 8.49996 28.0002Z" />
                </svg>
                <svg className="absolute text-yellow-500 w-9 h-9" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                  />
                </svg>
              </div>
              <h3 className="mt-8 text-lg font-semibold text-black">Secured Payments</h3>
              <p className="mt-4 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
            </div>

            <div>
              <div className="relative flex items-center justify-center mx-auto">
                <svg className="text-gray-100" width="62" height="64" viewBox="0 0 62 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M62 13.001C62 33.4355 53.9345 64.001 33.5 64.001C13.0655 64.001 0 50.435 0 30.0005C0 9.56596 2.56546 4.00021 23 4.00021C43.4345 4.00021 62 -7.43358 62 13.001Z"></path>
                </svg>
                <svg className="absolute text-gray-600 w-9 h-9" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </div>
              <h3 className="mt-8 text-lg font-semibold text-black">Light & Dark Version</h3>
              <p className="mt-4 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
            </div>

            <div>
              <div className="relative flex items-center justify-center mx-auto">
                <svg className="text-rose-100" width="72" height="75" viewBox="0 0 72 75" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M63.6911 28.8569C68.0911 48.8121 74.6037 61.2674 53.2349 65.9792C31.8661 70.6909 11.6224 61.2632 7.22232 41.308C2.82229 21.3528 3.6607 12.3967 25.0295 7.68503C46.3982 2.97331 59.2911 8.90171 63.6911 28.8569Z" />
                </svg>
                <svg className="absolute text-rose-600 w-9 h-9" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                  />
                </svg>
              </div>
              <h3 className="mt-8 text-lg font-semibold text-black">Secured Payments</h3>
              <p className="mt-4 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
            </div>

            <div>
              <div className="relative flex items-center justify-center mx-auto">
                <svg className="text-lime-100" width="62" height="65" viewBox="0 0 62 65" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 13.0264C0 33.4609 8.06546 64.0264 28.5 64.0264C48.9345 64.0264 62 50.4604 62 30.0259C62 9.59135 59.4345 4.0256 39 4.0256C18.5655 4.0256 0 -7.40819 0 13.0264Z" />
                </svg>

                <svg className="absolute text-lime-600 w-9 h-9" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mt-8 text-lg font-semibold text-black">Fast & Easy to Load</h3>
              <p className="mt-4 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 bg-gray-100 sm:py-16 lg:py-24">
        <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">Numbers tell our story</h2>
            <p className="mt-3 text-xl leading-relaxed text-gray-600 md:mt-8">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis.</p>
          </div>

          <div className="grid grid-cols-1 gap-8 mt-10 text-center lg:mt-24 sm:gap-x-8 md:grid-cols-3">
            <div>
              <h3 className="font-bold text-7xl">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-blue-600"> 6+ </span>
              </h3>
              <p className="mt-4 text-xl font-medium text-gray-900">Years in business</p>
              <p className="text-base mt-0.5 text-gray-500">Creating the successful path</p>
            </div>

            <div>
              <h3 className="font-bold text-7xl">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-blue-600"> 4821 </span>
              </h3>
              <p className="mt-4 text-xl font-medium text-gray-900">Projects delivered</p>
              <p className="text-base mt-0.5 text-gray-500">In last 6 years</p>
            </div>

            <div>
              <h3 className="font-bold text-7xl">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-blue-600"> 37+ </span>
              </h3>
              <p className="mt-4 text-xl font-medium text-gray-900">Team members</p>
              <p className="text-base mt-0.5 text-gray-500">Working for your success</p>
            </div>
          </div>
        </div>
      </section>



      {Boolean(props.data.testimonials?.testimonials) && ((props.data.testimonials!.testimonials ?? []).length > 0) && <section className="bg-gray-200 w-full py-16">

        <div className="w-full flex justify-center text-center text-gray-800">
          <h2 className="font-bold text-3xl">{props.data.testimonials?.title}</h2>
        </div>

        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 mt-8">
          {props.data.testimonials?.testimonials!.map((testimonial, index) => (
            <Testimonial key={index} description={testimonial.description} name={testimonial.name} company={testimonial.company} />
          ))}
        </div>
      </section>}

      {Boolean(props.data.questions?.questions) && (props.data.questions!.questions!.length > 0) && <section className="py-16 bg-white">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          {Boolean(props.data.questions?.description) && <div className="w-full flex justify-center mx-auto text-center mb-8">
            <RichText className="prose prose-lg w-full" data={props.data.questions?.description!} />
          </div>}

          <div className="max-w-3xl mx-auto space-y-4">
            {props.data.questions?.questions!.map((question, index) => (
              <div key={index} className="transition-all duration-200 bg-white border border-gray-200 shadow-lg cursor-pointer hover:bg-white">
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

          <Link href={"https://wa.me/" + props.whatsapp} className="w-full">
            <p className="text-center text-green-600 font-medium mt-9 w-full self-center">
              {props.data.questions?.altText}
            </p>
          </Link>
        </div>
      </section>}</>
  )
}