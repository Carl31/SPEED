import Image from "next/image";
import Navbar from "../../components/navbar";
import SignUpForm from "../../components/signUpForm";

export default function Home() {

  

  return (
    <main className="blueGradient min-h-screen items-center p-6">
      <Navbar title={"Sign Up"} />
      <SignUpForm />

    </main>
  );
}
