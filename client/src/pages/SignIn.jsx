import React, { useEffect, useState } from "react";
import { Eye, EyeOff, LoaderPinwheel } from "lucide-react";
import { Link, useNavigate } from "react-router";
import Return from "../shared/Return";
import AuthStore from "../zustandStore/useAuthStore";
import toast from "react-hot-toast";

const SignIn = () => {
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const { AuthUser, isLoading, getAuthSignIn } = AuthStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const email = formData.email.trim();
    const password = formData.password.trim();

    if (!email || !password) {
      return toast.error("All fields are required");
    }
    const data = {
      email: email,
      password: password,
    };
    getAuthSignIn(data);
  };

  useEffect(() => {
    (() => {
      if (AuthUser) {
        navigate("/");
      }
    })();
  }, [AuthUser, navigate]);

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleFormSubmit}
        className="max-w-[400px] w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white"
      >
        <div onClick={() => navigate("/")} className="flex justify-start">
          <Return />
        </div>
        <h1 className="text-gray-900 text-3xl mt-10 font-medium">Login</h1>
        <p className="text-gray-500 text-sm mt-2">Please sign in to continue</p>
        <div className="flex items-center w-full mt-10 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <svg
            width="16"
            height="11"
            viewBox="0 0 16 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
              fill="#6B7280"
            />
          </svg>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="Email id"
            className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
            required
          />
        </div>

        <div className="relative flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <svg
            width="13"
            height="17"
            viewBox="0 0 13 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
              fill="#6B7280"
            />
          </svg>
          <input
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            type={showPass ? "text" : "password"}
            placeholder="Password"
            className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
            required
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPass ? (
              <EyeOff className="size-5 text-gray-400" />
            ) : (
              <Eye className="size-5 text-gray-400" />
            )}
          </button>
        </div>
        <div className="mt-5 text-left text-indigo-500">
          <a className="text-sm" href="#">
            Forgot password?
          </a>
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="mt-2 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <LoaderPinwheel className="animate-spin mx-auto" />
          ) : (
            "Log in"
          )}
        </button>
        <p className="text-gray-500 text-sm mt-3 mb-11">
          Don’t have an account?{" "}
          <Link className="text-indigo-500" to="/signup">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
