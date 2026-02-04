import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PendingLeavesSkeleton() {
  return (
    <div className="space-y-4 pt-2">
      {[1, 2, 3, 4].map((i) => (
        <Card
          key={i}
          className="border-[1.6px] border-purple-100 shadow-sm overflow-hidden rounded-xl"
        >
          <CardContent className="p-4.5">
            <div className="flex justify-between items-center mb-3">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-24 rounded-[20px]" />
            </div>

            <div className="mt-3">
              <Skeleton className="h-4 w-48" />
            </div>

            <div className="mt-3">
              <Skeleton className="h-4 w-32" />
            </div>

            <div className="mt-1.5">
              <Skeleton className="h-3 w-40" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
