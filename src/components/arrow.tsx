type ArrowProps = {
  className?: string;
};

/* Arrow ported from frenchfrystudio.com; strokes follow currentColor. */
export default function ArrowRight({
  className = "h-3 w-[1.125rem]",
}: ArrowProps) {
  return (
    <svg aria-hidden viewBox="0 0 256 171" fill="none" className={className}>
      <path
        d="M256 85.1051C208.853 85.1051 170.56 47.0205 170.56 0"
        stroke="currentColor"
        strokeWidth="24"
        strokeMiterlimit="10"
      />
      <path
        d="M0 85.1038H256"
        stroke="currentColor"
        strokeWidth="24"
        strokeMiterlimit="10"
      />
      <path
        d="M256 85.1038C208.853 85.1038 170.56 123.188 170.56 170.209"
        stroke="currentColor"
        strokeWidth="24"
        strokeMiterlimit="10"
      />
    </svg>
  );
}
