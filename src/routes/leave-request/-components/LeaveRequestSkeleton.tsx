import { Skeleton } from "@/components/ui/skeleton";

export function LeaveRequestSkeleton() {
  return (
    <div className="flex flex-col h-full bg-white">
      
      <div className="flex items-center px-4 py-6 bg-white">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div className="flex-1 flex justify-center pr-7">
          <Skeleton className="h-6 w-32" />
        </div>
      </div>

      <div className="px-4 pb-10">
        
        <div className="flex gap-3 mb-8">
          {[1, 2].map((i) => (
            <div 
              key={i} 
              className="flex-1 border border-gray-100 py-5 rounded-[14px] flex flex-col items-center"
            >
              <Skeleton className="h-4 w-20 mb-2" /> 
              <Skeleton className="h-8 w-10 mb-1" />  
              <Skeleton className="h-3 w-16" />     
            </div>
          ))}
        </div>

        
        <div className="space-y-5">
        
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" /> 
            <Skeleton className="w-full h-13 rounded-xl" /> 
          </div>

          
          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="w-full h-13 rounded-xl" />
            </div>
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-8" />
              <Skeleton className="w-full h-13 rounded-xl" />
            </div>
          </div>

          
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="w-full h-32 rounded-xl" />
          </div>

         
          <Skeleton className="w-full h-15 mt-4 rounded-xl" />
        </div>
      </div>
    </div>
  );
}