import { computed, ReadonlySignal, useComputed } from "@preact/signals";
import { HTMLAttributes } from "preact/compat";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: "primary" | "secondary";
  isLoading?: ReadonlySignal<boolean>;
}

const Button = ({
  label,
  isLoading,
  className,
  variant = "primary",
  ...rest
}: Props) => {
  const btnLabel = useComputed(() => (!isLoading?.value ? label : ""));
  const btnClass = useComputed(
    () =>
      `btn ${variant} ${isLoading?.value ? "btn-loading" : ""} ${
        className ?? ""
      }`
  );
  return (
    <button className={btnClass} {...rest}>
      {btnLabel}
    </button>
  );
};

export default Button;
