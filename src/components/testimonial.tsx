type Props = {
  description: string;
  name: string;
  company?: string | null;
};

export const Testimonial = (props: Props) => {
  return (
    <div className="flex flex-col bg-white border border-gray-200 rounded-md">
      <div className="flex flex-col justify-between flex-1 p-8">
        <div className="flex-1">
          <blockquote>
            <p className="text-lg text-gray-800">{props.description}</p>
          </blockquote>
        </div>

        <div className="mt-8">
          <div className="w-full h-0 mb-8 border-t-2 border-gray-200 border-dotted"></div>
          <div className="flex items-center">
            <div className="ml-3">
              <p className="text-base font-semibold text-gray-800 truncate">{props.name}</p>
              <p className="text-base text-gray-500 truncate">{props.company}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}