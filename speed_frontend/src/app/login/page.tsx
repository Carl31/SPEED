import Image from "next/image";
import Navbar from "../../components/navbar";
import LogInForm from "../../components/logInForm";

export default function Home() {

  

  return (
    <main className="blueGradient min-h-screen items-center p-6">
      <Navbar title={"Log In"}/>

      <LogInForm />

    </main>
  );
}
