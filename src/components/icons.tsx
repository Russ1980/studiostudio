import { type SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <path
          id="m-path"
          d="M13 28V12h6l5 10 5-10h6v16h-4.5V17.5L25, 27l-5.5-9.5V28H13z"
        />
        <filter id="m-blur">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" />
        </filter>
      </defs>
      <rect width="40" height="40" rx="8" fill="currentColor" />
      <g filter="url(#m-blur)" opacity="0.7">
        <use href="#m-path" fill="#ff00ff" transform="translate(-0.6 0)" />
        <use href="#m-path" fill="#00ffff" transform="translate(0.6 0)" />
      </g>
      <use href="#m-path" fill="white" />
    </svg>
  );
}
