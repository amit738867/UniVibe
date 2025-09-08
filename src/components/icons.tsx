import type { SVGProps } from "react";

export const CampusConnectLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    <path d="M12 22v-6" />
    <path d="M22 10.5V15h-2" />
    <path d="m2 15 3.1-3.1" />
    <path d="M12 22a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
  </svg>
);
