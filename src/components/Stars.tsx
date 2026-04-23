import { cn } from "../utils/cn";

type StarsProps = {
  count?: number;
  className?: string;
};

export function Stars({ count = 5, className }: StarsProps) {
  return (
    <div className={cn("flex items-center gap-1.5 text-[#d6b16a]", className)}>
      {Array.from({ length: count }).map((_, index) => (
        <svg
          key={index}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          className="h-4 w-4 drop-shadow-[0_0_12px_rgba(214,177,106,0.45)]"
        >
          <path d="M12 2.75l2.96 6 6.62.96-4.79 4.67 1.13 6.6L12 17.86l-5.92 3.12 1.13-6.6-4.79-4.67 6.62-.96L12 2.75z" />
        </svg>
      ))}
    </div>
  );
}
