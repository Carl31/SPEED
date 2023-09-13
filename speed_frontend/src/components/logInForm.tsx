"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showNotification } from './notification';


interface LogInFormProps {
  params: Record<string, string>;
}

export default function LogInForm({ params }: LogInFormProps) {


  if (params['signUp'] === 'true') {
    showNotification("Welcome new user!", true);
    showNotification("Please log in.", false);
  }


  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);

    const formData = new FormData(event.currentTarget);

    const credentials = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    console.log("Creds:" + JSON.stringify(credentials));


    try {
      const callbackUrl = '/dashboard';
      const res = await signIn("credentials", {
        redirect: true,
        username: credentials.username,
        password: credentials.password,
        callbackUrl,
      });
    } catch {
      // reset form
      formData.set("username", "");
      formData.set("password", "");
      console.log("Error signing up.");
      setLoading(false);
    }
    
  }

  return (
    <section id="LoginForm">
      <div className="grid grid-cols-6 gap-4 my-36">
        <div className="col-start-2 col-span-4">
          <div className="bg-blue-600 rounded-lg">
            <p className="text-center font-semibold">Log In</p>

            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Username"
                  required
                  maxLength={50}
                  minLength={3}
                />
              </div>

              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="************"
                  required
                  maxLength={50}
                  minLength={3}
                />
                {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
              </div>

              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-slate-400 disabled:text-slate-700"
                  type="submit"
                  disabled={loading}
                >
                  Log In
                </button>

                <span className="inline-block align-baseline font-bold text-sm text-black text-right">
                  <p>No account?</p>
                  <a
                    className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                    href="/signup"
                  >
                    Sign Up Here
                  </a>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
