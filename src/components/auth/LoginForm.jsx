import { useNavigate } from "react-router-dom";
import Field from "../common/Field";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { api } from "../../api";

export default function LoginForm() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const formSubmit = async (data) => {
    try {
      const response = await api.post("/auth/login", data);
      if (response.status === 200) {
        const { user, token } = response.data;
        if (token) {
          const authToken = token.token;
          const refreshToken = token.refreshToken;
          setAuth({ user, authToken, refreshToken });
          navigate("/");
        }
      }
    } catch (error) {
      setError("root.random", {
        type: "random",
        message: "User and password doesn't match",
      });
    }
  };

  return (
    <form
      className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px]"
      onSubmit={handleSubmit(formSubmit)}
    >
      <Field label="Email address" error={errors.email}>
        <input
          {...register("email", { required: "Email address is required!" })}
          className="auth-input"
          name="email"
          type="email"
          id="email"
        />
      </Field>
      <Field label="Password" error={errors.password}>
        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Your password must be at least 8 characters",
            },
          })}
          className="auth-input"
          name="password"
          type="password"
          id="password"
        />
      </Field>
      {errors?.root?.random && (
        <p className="text-red-400 mb-4">{errors.root.random.message}</p>
      )}
      <button
        className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
        type="submit"
      >
        Login
      </button>
    </form>
  );
}
