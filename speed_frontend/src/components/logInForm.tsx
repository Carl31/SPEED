"use client";
import { FormEvent } from "react";

export default function logInForm() {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const credentials = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    console.log("Creds:" + JSON.stringify(credentials));
  }

  return (
    <section id="loginForm">
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
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
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
