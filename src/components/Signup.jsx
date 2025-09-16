import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const Handlesubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log("password mismatch ");
      return;
    }
    try{
      const API = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${API}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      // Defensive pa \rse: if response isn't JSON (e.g., HTML error page), capture text and show a helpful message
      const contentType = res.headers.get('content-type') || '';
      let b;
      if (contentType.includes('application/json')) {
        b = await res.json();
      } else {
        const text = await res.text();
        throw new Error(`Unexpected non-JSON response from ${API || 'current origin'}${API ? '/signup' : '/signup'} (status ${res.status}). Response starts: ${text.slice(0,120)}`);
      }
      if (!res.ok) throw new Error(b.msg || 'Signup failed');
      alert('Signup successful, please login');
      navigate('/login');
    }catch(err){
      console.error('signup failed', err);
      alert(err.message || 'Signup failed');
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            {/* form is startingg / */}
            <form onSubmit={Handlesubmit} className="space-y-4 md:space-y-6">
              {/* EMail */}
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your full name"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                />
              </div>


              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="name@gmail.com"
                  vaue={email}
                  // {not value= 'email'}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                    focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              {/* password   */}
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                    focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              {/* /// confirm password  */}

              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                 onChange={(e) => {setConfirmPassword(e.target.value);
                setPasswordMatchError(e.target.value && e.target.value !== password ? "Passwords do not match" : "");
                // user have typed something  and this value is not equal to the Paassword
}}

                  placeholder="Re-type your password"
                  required
                  className={`w-full p-2.5 text-sm rounded-lg 
      border focus:outline-none 
      ${
        confirmPassword
          ? password !== confirmPassword
            ? "border-red-500 focus:ring-2 focus:ring-red-400"
            : "border-green-500 focus:ring-2 focus:ring-green-400"
          : "border-gray-300 focus:ring-blue-500"
      }
      dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:placeholder-gray-400`}
                />


                {confirmPassword && (
                  <p
                    className={`mt-1 text-sm ${
                      password !== confirmPassword
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {password !== confirmPassword
                      ? "Passwords do not match"
                      : " Passwords match"}
                  </p>
                )}
              </div>

              {/* // terms and condition  */}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    required
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 
                      focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 
                      dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
                >
                  Sign in
                </button>
              </div>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
