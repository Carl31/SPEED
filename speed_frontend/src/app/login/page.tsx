"use client";

import Image from "next/image";
import Navbar from "../../components/navbar";
import LogInForm from "../../components/logInForm";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showNotification } from '../../components/notification';
import { useSearchParams  } from "next/navigation";
import { useEffect } from "react";

function getUrlParams(url: string | null): Record<string, string> {
  if (!url) {
    return {};
  }

  const params = url.split('?')[1] || ''; // Get the query string part after the '?'
  const paramPairs = params.split('&'); // Split key-value pairs by '&'

  const result: Record<string, string> = {};

  for (const pair of paramPairs) {
    const [key, value] = pair.split('=');
    if (key && value) {
      result[key] = value;
    }
  }

  return result;
}

export default function Home() {
 // Get the current URL
 const searchParams =  useSearchParams()

 // Display the key/value pairs
 const url = searchParams.get('callbackUrl');

  const params = getUrlParams(url);
  //console.log(params); // Output: { signUp: 'true' }

  

  return (
    <main className="blueGradient min-h-screen items-center p-6">
      <Navbar title={"Log In"}/>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
      <LogInForm params={params}/>
    </main>
  );
}