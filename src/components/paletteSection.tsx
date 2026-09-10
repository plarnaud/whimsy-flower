import WhimsyImage from "@/components/whimsyImage";

export type PaletteColor = {
  name: string;
  mainColor: string;
  borderColor: string;
};

const defaultColors: PaletteColor[] = [
  { name: "Olive", mainColor: "(--olive)", borderColor: "--dark-green" },
  { name: "Clover", mainColor: "(--clover)", borderColor: "--dark-clover" },
  { name: "Rose", mainColor: "[#D8A48F]", borderColor: "#612E19" },
  { name: "Peach", mainColor: "[#BB8588]", borderColor: "#4F1219" },
];

// Flowers breakdown hidden for now; flip back on to restore it.
const showFlowers = false;

type PaletteSectionProps = {
  colors?: PaletteColor[];
  text?: string;
};

/* Shared palette + flowers breakdown used by gallery and brand case study pages. */
export default function PaletteSection({ colors, text }: PaletteSectionProps) {
  const paletteColors = colors ?? defaultColors;

  return (
    <section className="bg-(--clover)/25 px-6 md:px-12 lg:px-16 py-16 gap-16 flex flex-col justify-center items-center">
      {/* No filler copy: pages without a story simply show the palette */}
      {text && (
        <p className="text-center text-[14px] leading-6 whitespace-pre-line w-full lg:max-w-[644px] sm:max-w-[610px]">
          {text}
        </p>
      )}

      <div className=" w-full grid grid-cols-2 sm:grid-cols-4 gap-6">
        {paletteColors.map(({ name, mainColor, borderColor }) => (
          <ColorPreview
            key={name}
            name={name}
            mainColor={mainColor}
            borderColor={borderColor}
          />
        ))}
      </div>

      {showFlowers && (
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center w-full ">
          {Object.entries({
            Eucalyptus: {
              subname: "Eucalyptus globulus (Blue Gum)",
              imgSrc: "/services/workshops.webp",
              imgAlt: "Olive flower",
            },
            Eucalyptus2: {
              subname: "Eucalyptus globulus (Blue Gum)",
              imgSrc: "/services/workshops.webp",
              imgAlt: "Olive flower",
            },
            Eucalyptus3: {
              subname: "Eucalyptus globulus (Blue Gum)",
              imgSrc: "/services/workshops.webp",
              imgAlt: "Olive flower",
            },
            Eucalyptus4: {
              subname: "Eucalyptus globulus (Blue Gum)",
              imgSrc: "/services/workshops.webp",
              imgAlt: "Olive flower",
            },
          }).map(([name, { subname, imgSrc, imgAlt }]) => (
            <FlowerPreview
              key={name}
              name={name}
              subName={subname}
              imgSrc={imgSrc}
              imgAlt={imgAlt}
            />
          ))}
        </div>
      )}
    </section>
  );
}

type ColorPreviewProps = {
  name: string;
  mainColor: string;
  borderColor: string;
};
function ColorPreview({ name, mainColor, borderColor }: ColorPreviewProps) {
  const resolveColor = (value: string) => {
    const trimmed = value.trim();

    if (trimmed.startsWith("var(")) {
      return trimmed;
    }

    if (trimmed.startsWith("--")) {
      return `var(${trimmed})`;
    }

    if (trimmed.startsWith("(--") && trimmed.endsWith(")")) {
      return `var(${trimmed.slice(1, -1)})`;
    }

    if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
      return trimmed.slice(1, -1);
    }

    return trimmed;
  };

  const resolvedMainColor = resolveColor(mainColor);
  const resolvedBorderColor = resolveColor(borderColor);

  return (
    <div className="w-full flex flex-col gap-6 items-center justify-center">
      <div
        className="w-full max-w-[155px] h-full max-h-[155px] rounded-full p-1 border"
        style={{
          backgroundColor: resolvedMainColor,
          borderColor: resolvedBorderColor,
        }}
      >
        <svg className="" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke={resolvedBorderColor}
            strokeWidth=".5"
            strokeDasharray="6 4"
          />
        </svg>
      </div>
      <span className="text-[18px] uppercase text-(--dark-green) tracking-[-0.04em] text-center w-full">
        {name}
      </span>
    </div>
  );
}

type FlowerPreviewProps = {
  name: string;
  subName: string;
  imgSrc: string;
  imgAlt: string;
};
function FlowerPreview({ name, subName, imgSrc, imgAlt }: FlowerPreviewProps) {
  return (
    <div className="flex flex-col gap-6 w-full md:w-[214px] lg:w-[25%] ">
      <div className="relative aspect-square lg:aspect-9/16 rounded-lg overflow-hidden">
        <WhimsyImage
          src={imgSrc}
          alt={imgAlt}
          fill
          sizes="310px, 214px, 380px"
          className="object-cover object-center"
        />
      </div>
      <div className="w-full flex flex-col text-center">
        <span className="text-[18px] uppercase tracking-[-0.04em]">
          {name}
        </span>
        <span className="text-[14px] italic leading-6">{subName}</span>
      </div>
    </div>
  );
}
