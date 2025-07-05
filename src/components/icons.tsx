import { type SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="40" height="40" rx="8" fill="currentColor" />
      <path d="M11 28V12H15L20 19L25 12H29V28H26V17L20 24L14 17V28H11Z" fill="hsl(var(--primary-foreground))" />
    </svg>
  );
}
