import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";

const schema = yup.object({
  name: yup.string().required().min(3),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

const Register = () => {
  const { register: registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => registerUser(data);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-4">Register</h2>

        <input {...register("name")} placeholder="Name" className="input" />
        <p className="error">{errors.name?.message}</p>

        <input {...register("email")} placeholder="Email" className="input" />
        <p className="error">{errors.email?.message}</p>

        <input
          type="password"
          {...register("password")}
          placeholder="Password"
          className="input"
        />
        <p className="error">{errors.password?.message}</p>

        <button className="btn-primary">Register</button>

        <Link to="/" className="text-blue-500 text-sm">
          Already have account?
        </Link>
      </form>
    </div>
  );
};

export default Register;
