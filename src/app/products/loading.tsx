export default function ProductsLoading() {
  return (
    <div className="min-h-screen bg-zinc-950 px-6 py-8 lg:px-8">
      <div className="mx-auto max-w-7xl animate-pulse space-y-6">
        <div className="h-14 rounded-full bg-white/10" />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-56 rounded-[2rem] bg-white/10" />
          ))}
        </div>
      </div>
    </div>
  );
}
