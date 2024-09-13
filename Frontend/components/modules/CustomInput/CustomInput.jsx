import styles from "./customInput.module.scss";

const CustomInput = ({
  keyName,
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
        data-key={keyName}
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
