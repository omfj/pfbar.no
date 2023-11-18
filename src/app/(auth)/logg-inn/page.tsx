import Image from "next/image";
import FlamingoImage from "./flamingo-chill.jpg";
import { SignInWithGoogle } from "./sign-in-button";
import { getSession } from "@/auth/utils";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const session = await getSession();

  if (session) {
    return redirect("/");
  }

  return (
    <div className="flex w-full h-screen">
      <div className="md:max-w-[500px] w-full h-full items-center flex">
        <div className="p-8 w-full">
          <div className="w-full flex flex-col gap-6">
            <div className="text-center w-full">
              <h1 className="text-3xl font-medium mb-2">Logg inn</h1>

              <p className="text-xl text-gray-800">
                Velg en måte å logg inn med.
              </p>
            </div>

            <SignInWithGoogle />
          </div>
        </div>
      </div>

      <div className="hidden md:block relative w-full border-l-2 border-black">
        <Image
          src={FlamingoImage}
          alt="Flamingo"
          className="object-cover"
          fill
        />
      </div>
    </div>
  );
}
