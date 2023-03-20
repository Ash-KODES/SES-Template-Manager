interface Props {
  type: string;
  id: string;
  className: string;
  inputName: string;
  required?: boolean;
  defaultChecked?: boolean;
}

const Input = ({
  type,
  id,
  className,
  inputName,
  required,
  defaultChecked,
}: Props) => {
  return (
    <input
      type={type}
      id={id}
      className={className}
      name={inputName}
      required={required}
      defaultChecked={defaultChecked}
    />
  );
};

export default Input;
