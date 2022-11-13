export default function SearchLoading() {
  return (
    <div className="px-8 py-10 animate-pulse w-full">
      <div className="bg-neutral-200 rounded h-8 w-56" />
      
      <div className="flex justify-between my-8">
        <div className="bg-neutral-200 rounded h-10 w-72" />
        <div className="bg-yellow-400 rounded h-10 w-32" />
      </div>

      {/* Details */}
      <div className="space-y-6">
        <div className="bg-neutral-200 rounded h-8 w-44" />

        <div className="flex space-x-3">
          <div className="bg-emerald-100 rounded-lg h-[54px] w-64" />
          <div className="bg-sky-100 rounded-lg h-[54px] w-28" />
        </div>

        <div className="bg-yellow-100 rounded-lg w-full h-24" />

        <div className="bg-yellow-100 rounded-lg w-full h-12" />
        <div className="bg-yellow-100 rounded-lg w-full h-12" />
        <div className="bg-yellow-100 rounded-lg w-full h-12" />
        <div className="bg-yellow-100 rounded-lg w-full h-12" />
        <div className="bg-yellow-100 rounded-lg w-full h-12" />
      </div>
    </div>
  );
}