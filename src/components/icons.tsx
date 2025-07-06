import { type SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.7" />
        </filter>
      </defs>
      <rect width="40" height="40" rx="8" fill="currentColor" />
      <g style={{ mixBlendMode: 'screen' }}>
        {/* The 'M' path data for a more refined letter shape */}
        <path
          d="M10 28V12h4l6 10 6-10h4v16h-4v-9l-6 9-6-9v9h-4z"
          fill="#ff00ff"
          transform="translate(-0.5, 0)"
          opacity="0.6"
          filter="url(#soft-glow)"
        />
        <path
          d="M10 28V12h4l6 10 6-10h4v16h-4v-9l-6 9-6-9v9h-4z"
          fill="#00ffff"
          transform="translate(0.5, 0)"
          opacity="0.6"
          filter="url(#soft-glow)"
        />
      </g>
      <path
        d="M10 28V12h4l6 10 6-10h4v16h-4v-9l-6 9-6-9v9h-4z"
        fill="white"
      />
    </svg>
  );
}
