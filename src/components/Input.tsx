interface Props {
  type: string;
  id: string;
  className: string;
  inputName: string;
  required?: boolean;
  defaultChecked?: boolean;
  placeholder?: string;
  autoComplete?: string;
}

const Input = ({
  type,
  id,
  className,
  inputName,
  required,
  defaultChecked,
  placeholder,
  autoComplete,
}: Props) => {
  return (
    <input
      type={type}
      id={id}
      className={className}
      name={inputName}
      required={required}
      defaultChecked={defaultChecked}
      placeholder={placeholder}
      autoComplete={autoComplete}
    />
  );
};

export default Input;
