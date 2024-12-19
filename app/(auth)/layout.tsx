import Image from "next/image";
import { Toaster } from "@/components/ui/toaster"
export default function AuthLayout({children,}:{children: React.ReactNode;}) {
    return (
      <main className="bg-background w-full h-screen flex">

        <Image className="hidden md:flex" src="/image/sign.png" width={778} height={300} alt="sign" />
        <div className="max-w-4xl mx-auto mt-40">
          {children}
          <Toaster />
        </div>
      </main>
    );
  }