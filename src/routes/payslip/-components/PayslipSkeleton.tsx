import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PayslipSkeleton() {
  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="flex items-center px-4 py-4 sticky top-0 z-10 bg-white">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex-1 flex justify-center pr-7">
          <Skeleton className="h-6 w-36" />
        </div>
      </div>

      <div className="flex-1 px-4 pb-32">
        <Skeleton className="h-6 w-40 mt-2 mb-4" />

        <div className="space-y-3">
          {[1, 2].map((i) => (
            <Card key={i} className="border-[#E5E7EB] shadow-none">
              <CardContent className="p-4">
                <Skeleton className="h-5 w-32 mb-2" />
                <Skeleton className="h-4 w-48" />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex items-center my-8">
          <div className="flex-1 h-px bg-[#E5E7EB]" />
          <Skeleton className="mx-3 h-4 w-4 rounded-full" />
          <div className="flex-1 h-px bg-[#E5E7EB]" />
        </div>

        <Skeleton className="h-5 w-44 mb-4" />
        <div className="flex gap-3.5">
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>
      </div>

      <div className="p-4 bg-white border-t">
        <Skeleton className="w-full h-14 rounded-xl" />
      </div>
    </div>
  );
}
