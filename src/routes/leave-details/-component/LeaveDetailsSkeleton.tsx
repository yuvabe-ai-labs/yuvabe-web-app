import { Skeleton } from "@/components/ui/skeleton";

export function LeaveDetailsSkeleton() {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex items-center px-4 py-4 bg-white sticky top-0 z-10 shrink-0 border-b border-gray-100">
        <div className="p-1 -ml-1">
          <Skeleton className="h-7 w-7 rounded-full" />
        </div>
        <div className="flex-1 flex justify-center pr-7">
          <Skeleton className="h-6 w-32" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        <div className="bg-[#F5F5F5] p-5 rounded-[15px] border border-purple-100">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="mb-5">
              <Skeleton className="h-4 w-28 mb-2" />
              <Skeleton className="h-6 w-3/4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
