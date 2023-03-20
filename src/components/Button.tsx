interface Props {
  id?: string;
  className?: string;
  onClick?: () => void;
  type: string;
  isDisabled?: boolean;
  value: string;
  opacity?: string;
}

const Button = ({
  id,
  className,
  type,
  isDisabled,
  onClick,
  value,
  opacity,
}: Props) => {
  return (
    <button
      id={id}
      className={`btn ${className}`}
      onClick={onClick}
      type={type}
      disabled={isDisabled}
      style={{ opacity: opacity }}
    >
      {value}
    </button>
  );
};

export default Button;
