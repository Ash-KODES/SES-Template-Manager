import { HTMLAttributes } from "preact/compat";

interface Props extends HTMLAttributes<HTMLTextAreaElement> {
  label: string;
  variant?: "textarea";
}
const TextArea = ({
  label,
  className,
  variant = "textarea",
  ...rest
}: Props) => {
  const id = label.replaceAll(" ", "-").toLowerCase();

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <textarea className={`${variant} ${className ?? ""}`} id={id} {...rest} />
    </div>
  );
};

export default TextArea;
