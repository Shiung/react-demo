import * as React from "react";

function SvgArrowRight(props) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <defs>
        <path
          d="M5.586 7L.293 12.293a1 1 0 001.414 1.414l6-6a1 1 0 000-1.414l-6-6A1 1 0 10.293 1.707L5.586 7z"
          id="arrow-right_svg__a"
        />
      </defs>
      <use
        fill="#959595"
        xlinkHref="#arrow-right_svg__a"
        transform="translate(6 3)"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default SvgArrowRight;
