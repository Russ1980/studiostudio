import { type SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="40" height="40" rx="8" fill="currentColor" />
      <path
        d="M9 28V12h6l5 10 5-10h6v16h-4.5V17.5L21 27l-5.5-9.5V28H9z"
        fill="white"
      />
    </svg>
  );
}
