import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  registerSchema,
  type RegisterFormData,
} from "../../schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { authService } from "../../services/authService";
import s from "./RegisterPage.module.css";

const RegisterPage = () => {
  const navigate = useNavigate();

  const setAuth = useAuthStore((state) => state.setAuth);

  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setServerError(null);

    try {
      const result = await authService.register(data);

      setAuth(result.user, result.accessToken);

      navigate("/", {
        replace: true,
      });
    } catch {
      setServerError("Could not create account");
    }
  };

  return (
    <main className={s.page}>
      <section className={s.card}>
        <div className={s.header}>
          <h1 className={s.title}>Register</h1>
          <p className={s.subtitle}>
            Create an account to start managing your workspaces
          </p>
        </div>

        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={s.field}>
            <label className={s.label} htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              className={s.input}
              placeholder="you@example.com"
              autoComplete="email"
              {...register("email")}
            />

            {errors.email && <p className={s.error}>{errors.email.message}</p>}
          </div>

          <div className={s.field}>
            <label htmlFor="password" className={s.label}>
              Password
            </label>

            <input
              id="password"
              type="password"
              className={s.input}
              placeholder="Create a password"
              autoComplete="new-password"
              {...register("password")}
            />

            {errors.password && (
              <p className={s.error}>{errors.password.message}</p>
            )}
          </div>

          {serverError && <p className={s.serverError}>{serverError}</p>}

          <button
            className={s.submitButton}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Register"}
          </button>
        </form>

        <p className={s.footer}>
          Already have an account?{" "}
          <Link className={s.link} to="/login">
            Login
          </Link>
        </p>
      </section>
    </main>
  );
};
export default RegisterPage;
