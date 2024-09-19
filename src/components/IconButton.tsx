import { ReactNode } from "react";
import { motion } from "framer-motion";

type IconButtonProps = {
  [prop: string]: ReactNode | (() => void);
  onClick: () => void;
  className: string;
  isMotion: boolean;
  children: ReactNode;
};

function IconButton({ onClick = () => { }, className = "", isMotion = false, children = null, ...props }: Partial<IconButtonProps>) {
  return isMotion ? <motion.button
    className={className}
    onClick={onClick}
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    {...props}
  >
    {children}
  </motion.button> :
    <button
      className={className}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>;

}

export default IconButton;