import styles from "./customForm.module.scss";
import CustomInput from "./../CustomInput/CustomInput";

const CustomForm = ({
  formClassName,
  formOnChange,
  inputs,
  formOnReset,
  formOnSubmit,
  isFormEmpty,
}) => {
  return (
    <form
      className={
        formClassName ? `${styles.form} ${formClassName}` : styles.form
      }
      action=""
      onChange={formOnChange}
      onReset={formOnReset}
      onSubmit={formOnSubmit}
    >
      {inputs.map((input, index) => (
        <CustomInput
          key={index}
          id={input.inputId}
          labelClassName={
            "labelClassName" in input
              ? input.labelClassName
              : styles.form__label
          }
          inputClassName={
            "inputClassName" in input
              ? input.inputClassName
              : styles.form__input
          }
          keyName={input.keyName}
          placeholder={input.placeholder}
          required={input.required}
          type={input.type}
          onChange={input.onChange}
        />
      ))}

      <input
        className={styles.form__input}
        disabled={!isFormEmpty}
        type="reset"
        value="Reset"
      />
      <input
        className={styles.form__input}
        disabled={!isFormEmpty}
        type="submit"
        value="Submit"
      />
    </form>
  );
};

export default CustomForm;
