import type { SVGProps } from "react";

type BrandMarkProps = SVGProps<SVGSVGElement>;

const BrandMark = ({ className, ...props }: BrandMarkProps) => (
  <svg
    viewBox="0 0 32 32"
    className={className}
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <rect width="32" height="32" rx="7.5" fill="#06d0f9" />
    <path
      d="M9.25 10.75 16 16l-6.75 5.25"
      fill="none"
      stroke="#0b0d13"
      strokeWidth="2.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.75 21.25h5"
      fill="none"
      stroke="#0b0d13"
      strokeWidth="2.75"
      strokeLinecap="round"
    />
  </svg>
);

export default BrandMark;
