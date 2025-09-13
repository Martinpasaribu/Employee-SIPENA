/* components/skeletons/ReportListSkeleton.tsx */
export default function ReportListSkeleton() {
  return (
    <div className="space-y-4 animate-pulse w-full">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="bg-white p-5 rounded-xl shadow-sm border border-gray-100"
        >
          <div className="flex justify-between border-b border-gray-100 pb-3 mb-3">
            <div className="h-4 bg-gray-200 rounded w-32"></div>
            <div className="h-4 bg-gray-200 rounded w-20"></div>
          </div>
          <div className="h-3 bg-gray-200 rounded w-24 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
        </div>
      ))}
    </div>
  );
}
