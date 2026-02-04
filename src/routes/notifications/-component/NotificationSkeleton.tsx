import { Skeleton } from "@/components/ui/skeleton";

export function NotificationSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3, 4, 5, 6].map((i) => {
        const isUnread = i < 3;

        return (
          <div
            key={i}
            className={`p-4.5 rounded-xl border transition-colors duration-300 ${
              isUnread
                ? "bg-[#E6F0FF]/50 border-blue-100"
                : "bg-white border-transparent"
            }`}
          >
            <div className="flex justify-between items-start">
              <Skeleton className="h-5 w-2/3" />

              {isUnread && (
                <Skeleton className="w-2.5 h-2.5 bg-[#007BFF]/30 rounded-full shrink-0 mt-1.5" />
              )}
            </div>

            <div className="mt-2.5 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
