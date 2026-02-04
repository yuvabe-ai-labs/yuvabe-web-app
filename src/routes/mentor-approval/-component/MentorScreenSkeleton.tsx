import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function MentorApprovalSkeleton() {
  return (
    <div className="flex flex-col h-full bg-white">
      
      <div className="flex items-center px-4 py-4 bg-white border-b border-gray-50">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex-1 flex justify-center pr-7">
          <Skeleton className="h-6 w-36" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-4">
        
        <div className="flex gap-4 mb-8 pt-5">
          {[1, 2].map((i) => (
            <Card key={i} className="flex-1 bg-gray-50/50 border-gray-100 shadow-none rounded-xl">
              <CardContent className="p-5 flex flex-col items-center">
                <Skeleton className="h-4 w-20 mb-3" /> 
                <Skeleton className="h-8 w-12 mb-2" />  
                <Skeleton className="h-3 w-16" />       
              </CardContent>
            </Card>
          ))}
        </div>

        
        <div className="space-y-6 mb-10">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex flex-col gap-2">
              <Skeleton className="h-4 w-32" /> 
              <Skeleton className="h-5 w-48" /> 
            </div>
          ))}

         
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-24 w-full rounded-xl" />
          </div>
        </div>
      </div>

     
      <div className="bg-white p-4 border-t border-gray-100 shrink-0">
        <div className="flex gap-3">
          <Skeleton className="flex-1 h-13.5 rounded-xl" />
          <Skeleton className="flex-1 h-13.5 rounded-xl" />
        </div>
      </div>
    </div>
  );
}