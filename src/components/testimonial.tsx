import Image from "next/image";

type Props = {
  description: string;
  name: string;
  company?: string | null;
};

export const Testimonial = ({}: Props) => {
  return (
    <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
      <div className="grid items-center grid-cols-1 lg:items-stretch md:grid-cols-2 gap-y-8 gap-x-12 xl:gap-x-20">
        <div className="relative">
          <div className="aspect-w-4 aspect-h-3">
            <Image width={0} height={0} className="object-cover w-full h-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/5/man-using-phone.jpg" alt="" />
          </div>
        </div>

        <div className="flex flex-col justify-between md:py-5">
          <blockquote>
            <p className="text-2xl leading-relaxed text-black">You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the change and click save. No need to think twice before making it.</p>
          </blockquote>

          <div className="mt-6 lg:mt-auto">
            <p className="text-xl font-semibold text-black">Jenny Wilson</p>
            <p className="mt-2 text-base text-gray-600">Co-founder, Appson</p>
          </div>
        </div>
      </div>
    </div>

  );
}