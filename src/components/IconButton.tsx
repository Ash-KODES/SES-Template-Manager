import { HTMLAttributes } from "preact/compat";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: "primary" | "secondary";
  src: string;
  alt: string;
}

const IconButton = ({
  label,
  src,
  alt,
  className,
  variant = "secondary",
  ...rest
}: Props) => {
  return (
    <button className={`btn ${variant} ${className ?? ""}`} {...rest}>
      <img src={src} alt={alt} />
      {label}
    </button>
  );
};

export default IconButton;
