import { Skeleton } from "@/components/ui/skeleton";

export function AssetsSkeleton() {
  return (
    <div className="space-y-4.5">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="w-[95%] mx-auto bg-white py-5 px-4.5 rounded-[18px] flex flex-row items-center border border-[#FFCA2D]/30 shadow-sm"
        >
          <div className="w-12.5 h-12.5 flex justify-center items-center ml-3 mr-4.5">
            <Skeleton className="w-10 h-10 rounded-lg" />
          </div>

          <div className="flex-1 ml-5 space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>

          <div className="px-5.5 py-1.5">
            <Skeleton className="h-7 w-20 rounded-[28px]" />
          </div>
        </div>
      ))}
    </div>
  );
}
