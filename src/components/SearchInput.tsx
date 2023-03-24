import { HTMLAttributes } from "preact/compat";

interface Props extends HTMLAttributes<HTMLInputElement> {
  src: string;
  alt: string;
  variant?: "input" | "search-input";
}

const SearchInput = ({
  className,
  src,
  alt,
  variant = "input",
  ...rest
}: Props) => {
  return (
    <div className={"search-input-wrapper"}>
      <input className={`${variant} ${className ?? ""}`} {...rest} />
      <img src={src} alt={alt} />
    </div>
  );
};

export default SearchInput;
