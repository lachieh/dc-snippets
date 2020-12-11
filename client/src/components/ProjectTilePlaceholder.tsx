export default function ProjectTilePlaceholder() {
  return (
    <div className="py-4 px-6 animate-pulse">
      <div className="flex flex-col sm:flex-row justify-between">
        <div className="rounded-md h-6 w-1/4 bg-brand-lighter"></div>
        <div className="flex items-center flex-row rounded-md h-8 sm:w-1/2 mb-2">
          <div className="h-5 w-16 bg-gray-200 rounded-md mr-2"></div>
          <div className="h-7 w-1/2 border rounded border-gray-300 flex-grow"></div>
        </div>
      </div>
      <div className="flex flex-wrap text-sm">
        <div className="rounded-xl h-6 w-24 mr-2 mt-1 border border-lemon-light"></div>
        <div className="rounded-xl h-6 w-28 mr-2 mt-1 border border-brand-light"></div>
        <div className="rounded-xl h-6 w-28 mr-2 mt-1 border border-rose-light"></div>
        <span className="border-b-2 border-gray-100 mt-3 mb-2 w-full flex-grow self-center xs:mr-2 xs:w-auto"></span>
        <div className="rounded-md h-6 w-32 mt-1 bg-rose-lighter"></div>
      </div>
    </div>
  );
}
