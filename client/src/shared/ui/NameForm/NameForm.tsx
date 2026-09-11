import type { ZodObject, ZodString } from "zod";
import s from "./NameForm.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export interface NameFormValues {
  name: string;
}

export type NameFormSchema = ZodObject<{
  name: ZodString;
}>;

interface NameFormProps {
  initialValue?: string;
  placeholder?: string;
  submitText: string;
  schema: NameFormSchema;
  onSubmit: (value: string) => void;
}

const NameForm = ({
  initialValue = "",
  placeholder = "Enter name",
  submitText,
  schema,
  onSubmit,
}: NameFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NameFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: initialValue,
    },
  });
  return (
    <form
      className={s.form}
      onSubmit={handleSubmit((data) => onSubmit(data.name))}
    >
      <input
        className={s.input}
        type="text"
        placeholder={placeholder}
        {...register("name")}
      />

      {errors.name && <p className={s.error}>{errors.name.message}</p>}

      <button className={s.button} type="submit">
        {submitText}
      </button>
    </form>
  );
};

export default NameForm;
