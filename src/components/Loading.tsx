import { Skeleton } from './ui/skeleton';

export const Loading = () => {
  return (
    <div className="flex flex-col mt-14 flex-1 gap-8 md:flex-row mx-6 md:mx-auto">
      <div className="flex flex-col text-left basis-2/6 gap-2">
        <div className="space-y-2">
          {[...new Array(18)].map(() => (
            <Skeleton className="h-4 w-12/12" />
          ))}
        </div>
      </div>
      <div className="basis-2/6 flex flex-col">
        <Skeleton className="h-[425px] w-full rounded-xl" />
      </div>
      <div className="basis-2/6 flex flex-col">
        <Skeleton className="h-[425px] w-full rounded-xl" />
      </div>
    </div>
  );
};
