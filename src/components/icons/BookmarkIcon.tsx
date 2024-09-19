type BookmarkIconProps = {
  width: string;
  height: string;
  className: string;
}

function BookmarkIcon({ width = "24px", height = "24px", className = "" }: Partial<BookmarkIconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} className={className} viewBox="0 -960 960 960" fill="currentColor"><path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Z" /></svg>
  );
}

export default BookmarkIcon;