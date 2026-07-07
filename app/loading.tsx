export default function Loading() {
  return (
    <div className="w-full animate-pulse min-h-screen">
      {/* Hero Skeleton */}
      <section className="relative pt-20 pb-16 sm:pt-24 sm:pb-20 bg-neutral-50 border-b border-neutral-100 flex flex-col items-center justify-center">
        <div className="w-24 h-4 bg-neutral-200 rounded-full mb-6"></div>
        <div className="w-3/4 max-w-2xl h-12 sm:h-14 bg-neutral-200 rounded-2xl mb-4"></div>
        <div className="w-2/3 max-w-xl h-12 sm:h-14 bg-neutral-200 rounded-2xl mb-6"></div>
        
        <div className="w-full max-w-xl h-6 bg-neutral-200 rounded-lg mb-2"></div>
        <div className="w-4/5 max-w-lg h-6 bg-neutral-200 rounded-lg mb-10"></div>
        
        <div className="flex gap-4">
          <div className="w-32 h-12 bg-neutral-200 rounded-xl"></div>
          <div className="w-32 h-12 bg-neutral-200 rounded-xl"></div>
        </div>
      </section>

      {/* Content Skeleton */}
      <section className="section-padding max-w-6xl mx-auto w-full px-6">
        <div className="w-48 h-8 bg-neutral-200 rounded-lg mb-12"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-neutral-100 rounded-2xl border border-neutral-100 p-6 flex flex-col gap-4">
              <div className="w-12 h-12 bg-neutral-200 rounded-xl"></div>
              <div className="w-3/4 h-6 bg-neutral-200 rounded-lg"></div>
              <div className="w-full h-4 bg-neutral-200 rounded-lg"></div>
              <div className="w-5/6 h-4 bg-neutral-200 rounded-lg"></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
