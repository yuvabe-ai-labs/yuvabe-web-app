import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function LeaveHistorySkeleton() {
  return (
    <div className="space-y-4 pt-2">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="border-gray-200 shadow-sm mb-4 overflow-hidden rounded-[14px]">
          <CardContent className="p-4.5">
           
            <div className="flex justify-between items-center mb-4">
              <Skeleton className="h-6 w-32" /> 
              <Skeleton className="h-6 w-20 rounded-[20px]" /> 
            </div>

            
            <Skeleton className="h-4 w-48 mt-2.5" />
            
           
            <Skeleton className="h-4 w-32 mt-2.5" />

           
            <Skeleton className="h-4 w-40 mt-2.5" />

          
            <Skeleton className="h-3 w-36 mt-3" />
            
           
            <div className="flex justify-end mt-3">
               <Skeleton className="h-8 w-20 rounded-[20px]" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}