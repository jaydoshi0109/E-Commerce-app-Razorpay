import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";


const LoginForm: React.FC = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
      });
    
      const navigate = useNavigate();
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const auth = useAuth(); // ⬅️ get context
    

      const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          const res = await API.post("/auth/login", formData);
          const { token, user } = res.data;
      
          // Save token + user into AuthContext
          auth?.login(user, token);
      
          // Optional: also store token in localStorage
          localStorage.setItem("token", token);
      
          // Redirect to home or admin dashboard
          if (user.isAdmin) {
            navigate("/admin/dashboard");
          } else {
            navigate("/");
          }
        } catch (error: any) {
          console.error("Login error:", error.response?.data?.message || error.message);
        }
      };
      

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input onChange={handleChange} type="email" name="email" id="email" placeholder="name@company.com" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input onChange={handleChange} type="password" name="password" id="password" placeholder="••••••••" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 transition duration-300 ease-in-out focus:ring-2 focus:outline-none focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center shadow-md dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-400 cursor-pointer"
                onClick={handleLogin}
              >
                Login
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account?{" "}
                <Link to="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Sign up here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
