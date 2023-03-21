import { HTMLAttributes } from "preact/compat";

interface Props extends HTMLAttributes<HTMLInputElement> {
  label: string;
}

const CheckBoxInput = ({ label, ...rest }: Props) => {
  const id = label.replaceAll(" ", "-").toLowerCase();
  return (
    <>
      <input id={id} {...rest} />
      <label htmlFor={id}>{label}</label>
    </>
  );
};

export default CheckBoxInput;
