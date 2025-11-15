interface PillButtonProps {
  label: string;
  color?: string;
  hoverColor?: string;
  className?: string;
  onClick?: () => void;
}
export default function PillButton({
  label,
  color = "green1",
  onClick,
  className,
}: PillButtonProps) {
  const colorMap: Record<string, string> = {
    green1: "bg-[#424319] hover:bg-[#2B2C0C]",
    green2: "bg-[#50460B] hover:bg-[#302901]",
    maroon1: "bg-[#612E19] hover:bg-[#491D0A]",
    maroon2: "bg-[#4F1219] hover:bg-[#3D090F]",
  };

  return (
    <button
      onClick={onClick}
      className={`px-12 py-8 sm:py-3 rounded-full text-background 
      ${colorMap[color]}
      ${className}
     duration-200`}
    >
      {label}
    </button>
  );
}
