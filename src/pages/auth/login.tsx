import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  LoginValidationSchema,
  loginValidationSchema,
} from "../../types/schema";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValidationSchema>({
    resolver: zodResolver(loginValidationSchema),
  });

  const onSubmit: SubmitHandler<LoginValidationSchema> = async (data) => {
    const accountResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      body: JSON.stringify({
        firstName: data.firstName,
        password: data.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await accountResponse.json();
    console.log(result);
    if (result) {
      if (sessionStorage.getItem("access_token") === null) {
        sessionStorage.setItem("access_token", result);
        router.push("/");
      }
      router.push("/");
    }
  };

  return (
    <section className="lg:min-h-screen flex items-center justify-center">
      <div className="p-5 flex">
        <div className="md:w-1/2 px-5">
          <h2 className="text-2xl font-bold text-gray-700">Login</h2>
          <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="Enter Email Address"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                {...register("firstName")}
              />
              {errors.firstName && (
                <p className="text-xs italic text-[#F7D060] mt-2">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                id="pwd"
                placeholder="Enter Password"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                  focus:bg-white focus:outline-none"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-xs italic text-[#F7D060] mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg
                px-4 py-3 mt-6"
            >
              Log In
            </button>
          </form>

          <div className="mt-7 grid grid-cols-3 items-center text-gray-500">
            <hr className="border-gray-500" />
            <p className="text-center text-sm">OR</p>
            <hr className="border-gray-500" />
          </div>

          <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 ">
            <span className="ml-4">Login with Google</span>
          </button>

          <div className="text-sm flex justify-between items-center mt-3">
            <p>If you do not have an account...</p>
            <button className="py-2 px-5 ml-3 bg-white border rounded-xl hover:scale-110 duration-300 border-blue-400 " onClick={() => router.push('/auth/register')}>
              Register
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
