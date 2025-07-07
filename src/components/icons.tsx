import { type SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="40" height="40" rx="8" fill="#3F51B5" />
      <path
        d="M10 28V12h4l6 10 6-10h4v16h-4v-9l-6 9-6-9v9h-4z"
        fill="white"
      />
    </svg>
  );
}

export function NIcon() {
    return (
        <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center border-2 border-gray-600">
            <span className="font-bold text-white text-lg italic">N</span>
        </div>
    )
}
