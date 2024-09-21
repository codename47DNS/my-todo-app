type ImportIconProps = {
  width: string;
  height: string;
  className: string;
}

function ImportIcon({
  width = "24px",
  height = "24px",
  className = "",
}: Partial<ImportIconProps>) {
  return (
    <svg className={className} width={width} height={height} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m13 13.1752814 3.2426407-3.24264066 1.4142135 1.41421356-5.6568542 5.6568543-5.65685425-5.6568543 1.41421356-1.41421356 3.24264069 3.24264066v-11.1752814h2zm-9 2.8247186h2v4h12v-4h2v4c0 1.1000004-.8999996 2-2 2h-12c-1.0999999 0-2-.962796-2-2 0 0 0-1.3333333 0-4z" fillRule="evenodd" /></svg>
  );
}

export default ImportIcon;