import { Skeleton } from '@/components/ui/skeleton';

export const LoadingSkeleton = () => {
  return (
    <div className="space-y-12">
      {[1, 2].map((section) => (
        <div key={section} className="space-y-4">
          <div className="flex items-center gap-3">
            <Skeleton className="w-12 h-12 rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((card) => (
              <div
                key={card}
                className="bg-slate-900/50 rounded-xl p-5 border border-slate-700/50"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-6 w-24" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>

                  <Skeleton className="h-8 w-24" />

                  <Skeleton className="h-12 w-full" />

                  <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};