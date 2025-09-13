/* components/skeletons/HeaderSkeleton.tsx */
export default function HeaderSkeleton() {
  return (
    <header className="flex justify-between items-center bg-white shadow rounded-xl px-4 py-3 sm:px-6 sm:py-4 mb-6 sm:mb-8 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-40"></div>
      <div className="flex gap-3">
        <div className="w-9 h-9 bg-gray-200 rounded-full"></div>
        <div className="w-9 h-9 bg-gray-200 rounded-full"></div>
      </div>
    </header>
  );
}
