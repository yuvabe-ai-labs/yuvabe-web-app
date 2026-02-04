import { Skeleton } from "@/components/ui/skeleton";

export function TeamLeaveDetailSkeleton() {
  return (
    <>
      <div className="flex items-center px-4 py-4 bg-white sticky top-0 z-10 shrink-0 border-gray-100">
        <div className="p-1 -ml-1">
          <Skeleton className="h-7 w-7 rounded-full" />
        </div>
        <div className="flex-1 flex justify-center pr-7">
          <Skeleton className="h-6 w-32" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5 pb-24">
        <div className="bg-[#F5F5F5] p-5 rounded-[15px] border border-gray-200">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className={i === 1 ? "" : "mt-5"}>
              <Skeleton className="h-4 w-28 mb-2" /> {/* Label */}
              <Skeleton className="h-6 w-full max-w-50" /> {/* Content */}
            </div>
          ))}

          <div className="mt-5">
            <Skeleton className="h-3 w-24 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>
    </>
  );
}
