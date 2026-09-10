import { useState } from "react";
import s from "./NameForm.module.css";

interface NameFormProps {
  initialValue?: string;
  placeholder?: string;
  submitText: string;
  validate?: (value: string) => string | null;
  onSubmit: (value: string) => void;
}

const NameForm = ({
  initialValue = "",
  placeholder = "Enter name",
  submitText,
  validate,
  onSubmit,
}: NameFormProps) => {
  const [name, setName] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      className={s.form}
      onSubmit={(event) => {
        event.preventDefault();

        const validationError = validate?.(name) ?? null;

        if (validationError) {
          setError(validationError);
          return;
        }

        setError(null);
        onSubmit(name);
      }}
    >
      <input
        className={s.input}
        type="text"
        value={name}
        placeholder={placeholder}
        onChange={(event) => {
          setName(event.target.value);

          if (error) {
            setError(null);
          }
        }}
      />

      {error && <p className={s.error}>{error}</p>}

      <button className={s.button} type="submit">
        {submitText}
      </button>
    </form>
  );
};

export default NameForm;
