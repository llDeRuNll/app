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

export default function RegisterPage() {
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
    <main>
      <h1>Register</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email</label>

          <input
            id="email"
            type="email"
            autoComplete="email"
            {...register("email")}
          />

          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password">Password</label>

          <input
            id="password"
            type="password"
            autoComplete="new-password"
            {...register("password")}
          />

          {errors.password && <p>{errors.password.message}</p>}
        </div>

        {serverError && <p>{serverError}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Register"}
        </button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </main>
  );
}
