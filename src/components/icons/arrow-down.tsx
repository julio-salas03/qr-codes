import { JSX } from 'solid-js';

export function ArrowDown(props: {
  classList?: JSX.CustomAttributes<SVGSVGElement>['classList'];
}) {
  return (
    <svg
      fill="currentColor"
      stroke-width="0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      style="overflow: visible; color: currentcolor;"
      height="1em"
      width="1em"
      classList={props.classList}
    >
      <title>chevron arrow</title>
      <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"></path>
    </svg>
  );
}
