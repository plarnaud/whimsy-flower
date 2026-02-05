"use client";

interface PillButtonProps {
  label: string;
  color?: string;
  hoverColor?: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  size?: "default" | "form";
}
export default function PillButton({
  label,
  color = "green1",
  onClick,
  className,
  type,
  disabled = false,
  size = "default",
}: PillButtonProps) {
  const colorMap: Record<string, string> = {
    green1: "bg-[#424319] hover:bg-[#2B2C0C]",
    green2: "bg-[#50460B] hover:bg-[#302901]",
    maroon1: "bg-[#612E19] hover:bg-[#491D0A]",
    maroon2: "bg-[#4F1219] hover:bg-[#3D090F]",
    olive: "bg-(--olive) hover:bg-(--dark-olive)",
    rose: "bg-(--rose) hover:bg-(--dark-rose)",
    clover: "bg-(--clover) hover:bg-(--dark-clover)",
  };
  const sizeClasses =
    size === "form"
      ? "w-full px-6 py-3 text-[14px] uppercase tracking-[0.2em]"
      : "px-12 py-8 sm:py-3";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${sizeClasses} rounded-full text-background transition
      ${colorMap[color]}
      ${className} cursor-pointer
      disabled:cursor-not-allowed disabled:opacity-70`}
    >
      {label}
    </button>
  );
}

export function OpenContactFormButton() {
  return (
    <PillButton
      label="Contact us!"
      className="mt-12"
      onClick={() => console.log("Contact us clicked")}
    ></PillButton>
  );
}

export enum eventType {
  FLOWER_BAR = "flower bar",
  WORKSHOP = "workshop",
  CORPORATE = "corporate",
}
interface ScheduleEventButtonProps {
  eventType: eventType;
  label: string;
  color: string;
  className?: string;
}

export function ScheduleEventButton({
  eventType,
  label,
  className,
  color,
}: ScheduleEventButtonProps) {
  return (
    <PillButton
      label={label}
      color={color}
      onClick={() => console.log(`${eventType} us clicked`)}
      className={className}
    ></PillButton>
  );
}
