import styles from "./customInput.module.scss";

const CustomInput = ({
  name,
  id,
  labelClassName,
  inputClassName,
  type,
  placeholder,
  onChange,
}) => {
  return (
    <label className={labelClassName} htmlFor={id}>
      <span>{placeholder}</span>
      <input
        name={name}
        id={id}
        className={inputClassName}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
    </label>
  );
};

export default CustomInput;
