import logo from '@/assets/logoPreto.png'
import SignUp from "@/components/sign-up"
import Image from "next/image"
import Link from "next/link"

export default function SignUpPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-bold text-[20px]">
              <Image src={logo} alt="" width={35} height={35} />
            Finance360
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="flex items-center justify-center">
            <SignUp />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
