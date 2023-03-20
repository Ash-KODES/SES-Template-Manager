import { HTMLAttributes } from "preact/compat";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: "primary" | "secondary";
}

const Button = ({ label, className, variant = "primary", ...rest }: Props) => {
  return (
    <button className={`btn ${variant} ${className ?? ""}`} {...rest}>
      {label}
    </button>
  );
};

export default Button;
