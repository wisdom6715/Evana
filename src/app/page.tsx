// import Image from "next/image";
"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthFlow from "./auth/AuthFlow";
import WelcomePage from "./auth/WelcomePage";
import PricingPage from "./payment/PrincingPage";
import PaymentPage from "./payment/PaymentPage";
export default function Home() {
  const router = useRouter();
  return (
    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    //   <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
    //     {/* <Link href= '/auth/AuthFlow'>Get Started</Link> */}
    //   </main>
    // </div>
    <div>
      {/* <AuthFlow /> */}
      {/* <WelcomePage /> */}
      {/* <PricingPage /> */}
      <PaymentPage />
    </div>
  );
}
