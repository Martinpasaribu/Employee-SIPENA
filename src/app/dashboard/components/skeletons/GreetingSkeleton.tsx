/* components/skeletons/GreetingSkeleton.tsx */
export default function GreetingSkeleton() {
  return (
    <section className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl shadow p-5 sm:p-6 mb-6 sm:mb-8 animate-pulse">
      <div className="flex gap-4 items-center">
        <div className="bg-white/30 rounded-full w-12 h-12"></div>
        <div className="space-y-2">
          <div className="h-4 bg-white/30 rounded w-32"></div>
          <div className="h-3 bg-white/20 rounded w-48"></div>
        </div>
      </div>
      <div className="mt-4 flex gap-6">
        <div className="space-y-2">
          <div className="h-3 bg-white/30 rounded w-16"></div>
          <div className="h-4 bg-white/50 rounded w-24"></div>
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-white/30 rounded w-16"></div>
          <div className="h-4 bg-white/50 rounded w-24"></div>
        </div>
      </div>
    </section>
  );
}
