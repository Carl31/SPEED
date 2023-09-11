"use client";


import { FormEvent, useState } from "react";

export default function SignUpForm() {
  const [loading, setLoading] = useState(false);
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);

    const formData = new FormData(event.currentTarget);

    const credentials = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      username: formData.get("username"),
      password: formData.get("password"),
    };

    console.log("Creds:" + JSON.stringify(credentials));

    // send data to back-end
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (response.ok) {
      console.log("Sign up successful");
      setLoading(false);

      // reset form
      formData.set("firstName", "");
      formData.set("lastName", "");
      formData.set("email", "");
      formData.set("username", "");
      formData.set("password", "");

    } else {
      console.log("Error signing up:" + response.json);
      setLoading(false);
    }
  }

  return (
    <section id="SignUpForm">
      <div className="grid grid-cols-6 gap-4 my-36">
        <div className="col-start-2 col-span-4">
          <div className="bg-blue-600 rounded-lg">
            <p className="text-center font-semibold">Sign Up</p>

            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  required
                  maxLength={50}
                  minLength={1}
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  required
                  maxLength={50}
                  minLength={1}
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                  maxLength={50}
                  minLength={1}
                />
              </div>

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
                  Sign Up
                </button>

                <span className="inline-block align-baseline font-bold text-sm text-black text-right">
                  <p>Already have an account?</p>
                  <a
                    className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                    href="/login"
                  >
                    Log In Here
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
