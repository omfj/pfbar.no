import { getSession } from "@/auth/utils";
import { redirect } from "next/navigation";

export default async function Profile() {
  const session = await getSession();

  if (!session) {
    return redirect("/logg-inn");
  }

  return (
    <main>
      <h1>Min profil</h1>
    </main>
  );
}
