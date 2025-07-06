import { type SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="40" height="40" rx="8" fill="currentColor" />
      <path
        d="M12 28V12H17.2L22.4 20L27.6 12H32.8V28H28.4V17L22.4 25L16.4 17V28H12Z"
        fill="white"
      />
    </svg>
  );
}
