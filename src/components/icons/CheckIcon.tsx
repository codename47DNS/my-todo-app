type CheckIconProps = {
  width: string;
  height: string;
  className: string;
}

function CheckIcon({ width = "24px", height = "24px", className = "" }: Partial<CheckIconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} height={height} viewBox="0 -960 960 960" width={width} fill="currentColor"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" /></svg>
  );
}

export default CheckIcon;