import { type SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M4 20V4h2l6 8 6-8h2v16h-2V8l-6 8-6-8v12H4z"/>
    </svg>
  );
}
