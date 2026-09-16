import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormData } from "../../schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { authService } from "../../services/authService";
import s from "./LoginPage.module.css";

const LoginPage = () => {
  const navigate = useNavigate();

  const setAuth = useAuthStore((state) => state.setAuth);

  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setServerError(null);

    try {
      const result = await authService.login(data);

      setAuth(result.user, result.accessToken);

      navigate("/", {
        replace: true,
      });
    } catch {
      setServerError("Invalid email or password");
    }
  };

  return (
    <main className={s.page}>
      <section className={s.card}>
        <div className={s.header}>
          <h1 className={s.title}>Login</h1>

          <p className={s.subtitle}>Sign in to continue to your workspaces</p>
        </div>

        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={s.field}>
            <label htmlFor="email" className={s.label}>
              Email
            </label>

            <input
              id="email"
              className={s.input}
              type="email"
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
              className={s.input}
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
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
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className={s.footer}>
          No account?{" "}
          <Link className={s.link} to="/register">
            Register
          </Link>
        </p>
      </section>
    </main>
  );
};

export default LoginPage;
