import * as React from "react";

function SvgArrowUp(props) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 15 15"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <defs>
        <path
          d="M3.75 1.358l2.835 2.977c.21.22.549.22.758 0a.583.583 0 000-.795L4.13.165a.518.518 0 00-.758 0L.157 3.54a.583.583 0 000 .795c.21.22.548.22.758 0L3.75 1.358z"
          id="arrow-up_svg__a"
        />
      </defs>
      <use
        fill="#333"
        xlinkHref="#arrow-up_svg__a"
        transform="translate(3.75 4.5)"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default SvgArrowUp;
