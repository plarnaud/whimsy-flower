type SectionTitleProps = {
  kicker?: string;
  title: string;
  align?: "center" | "left";
  className?: string;
};

/* Shared section heading: small uppercase kicker over the script title. */
export default function SectionTitle({
  kicker,
  title,
  align = "center",
  className = "",
}: SectionTitleProps) {
  const alignment =
    align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex flex-col ${alignment} ${className}`}>
      {kicker && (
        <h2 className="text-[18px] tracking-[-0.04em] uppercase">{kicker}</h2>
      )}
      <h3 className="py-6 font-title text-(--dark-olive) text-[clamp(48px,6vw,64px)] leading-[clamp(56px,7vw,72px)] tracking-[-0.04em]">
        {title}
      </h3>
    </div>
  );
}
