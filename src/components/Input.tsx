import { HTMLAttributes } from "preact/compat";

interface Props extends HTMLAttributes<HTMLInputElement> {
  label: string;
  variant?: "input";
}

const Input = ({ label, className, variant = "input", ...rest }: Props) => {
  const id = label.replaceAll(" ", "-").toLowerCase();

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input className={`${variant} ${className ?? ""}`} id={id} {...rest} />
    </div>
  );
};

export default Input;
