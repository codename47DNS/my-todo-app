type DeleteIconProps = {
  width: string;
  height: string;
};

function DeleteIcon({ width = "24px", height = "24px" }: Partial<DeleteIconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={height} viewBox="0 -960 960 960" width={width} fill="currentColor"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
  );
}

export default DeleteIcon;