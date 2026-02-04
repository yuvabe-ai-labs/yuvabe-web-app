import { Skeleton } from "@/components/ui/skeleton";

export function TeamLeaveHistorySkeleton() {
  return (
    <div className="space-y-4.5">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-white p-4 rounded-[14px] border-[1.4px] border-gray-100"
        >
          <div className="flex flex-row justify-between items-center mb-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-6 w-20 rounded-[20px]" />
          </div>

          <div className="mt-2 flex gap-2">
            <Skeleton className="h-4 w-40" />
          </div>

          <Skeleton className="h-4 w-48 mt-3" />

          <Skeleton className="h-4 w-28 mt-2" />

          <Skeleton className="h-3 w-36 mt-4" />
        </div>
      ))}
    </div>
  );
}
