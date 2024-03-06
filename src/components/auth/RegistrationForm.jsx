import { useForm } from "react-hook-form";
import Field from "../common/Field";
import { api } from "../../api";
import { useNavigate } from "react-router-dom";

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const navigate = useNavigate();

  const submitForm = async (data) => {
    console.log({ data });
    try {
      const response = await api.post(`/auth/register`, data);
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      setError("root.random", {
        type: "random",
        message: `Something went wrong ${error.message}`,
      });
    }
  };

  return (
    <form
      className="border-b border-[#3F3F3F] pb-10 lg:pb-[30px]"
      onSubmit={handleSubmit(submitForm)}
    >
      <Field label="First Name" error={errors.firstName}>
        <input
          {...register("firstName", { required: "First name is required!" })}
          className="auth-input"
          name="firstName"
          type="text"
          id="firstName"
        />
      </Field>

      <Field label="Last Name" error={errors.lastName}>
        <input
          {...register("lastName", { required: "Last name is required!" })}
          className="auth-input"
          name="lastName"
          type="text"
          id="lastName"
        />
      </Field>

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
            required: "Password is required!",
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
        Register
      </button>
    </form>
  );
}
