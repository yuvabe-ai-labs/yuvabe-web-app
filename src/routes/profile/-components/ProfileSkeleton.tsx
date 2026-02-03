import { Skeleton } from "@/components/ui/skeleton";

export function ProfileSkeleton() {
  return (
    <div className="mx-5 -mt-12.5 bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex items-center relative z-20">
      {/* Avatar Circle */}
      <Skeleton className="w-16.25 h-16.25 rounded-full mr-5" />
      
      <div className="flex-1 space-y-3">
        {/* Name Line */}
        <Skeleton className="h-6 w-3/4" />
        {/* Email Line */}
        <Skeleton className="h-4 w-1/2" />
        
        <div className="pt-2 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    </div>
  );
}