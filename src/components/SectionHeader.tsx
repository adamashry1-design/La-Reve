import { cn } from "../utils/cn";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "space-y-5",
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl",
        className
      )}
    >
      <div className="inline-flex items-center gap-3 rounded-full border border-[rgba(214,177,106,0.25)] bg-[rgba(214,177,106,0.08)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.36em] text-[#d6b16a]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#d6b16a]" />
        {eyebrow}
      </div>
      <div className="space-y-4">
        <h2 className="font-display text-4xl leading-none text-white sm:text-5xl lg:text-6xl">
          {title}
        </h2>
        <p className="text-base leading-8 text-stone-300/85 sm:text-lg">{description}</p>
      </div>
    </div>
  );
}
