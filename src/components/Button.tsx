import { computed, ReadonlySignal } from "@preact/signals";
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
  console.log("button rendered");

  const btnLabel = computed(() => (!isLoading?.value ? label : ""));
  const btnClass = computed(
    () =>
      `btn ${variant} ${isLoading?.value ? "btn-loading" : ""} ${
        className ?? ""
      }`
  );
  return (
    <button className={btnClass.value} {...rest}>
      {btnLabel}
    </button>
  );
};

export default Button;
