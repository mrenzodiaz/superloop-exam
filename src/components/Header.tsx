import { ModeToggle } from './ModeToggle';

export const Header = () => {
  return (
    <div className="sticky top-0 z-50 w-full border-b border-border/90 dark:border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center h-14 px-5">
        <h1 className="font-bold text-2xl">SUPERLOOP EXAM</h1>
        <div className="flex-1 flex items-center justify-end">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};
