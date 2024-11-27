import { Skeleton } from './ui/skeleton';

export const Loading = () => {
  return (
    <div className="flex flex-col space-y-3 mt-14 mx-6 md:mx-0">
      <Skeleton className="h-[125px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
        <Skeleton className="h-4 w-3/6" />
        <Skeleton className="h-4 w-2/6" />
      </div>
    </div>
  );
};
