import { getSession } from "@/auth/utils";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { redirect } from "next/navigation";

export default async function Profile() {
  const session = await getSession();

  if (!session) {
    return redirect("/logg-inn");
  }

  return (
    <Container as="main">
      <Heading>Min profil</Heading>

      <div className="py-2 space-y-4">
        <div className="px-4 border-l-primary border-l-4">
          <h2 className="text-2xl font-semibold">Navn</h2>
          <p className="text-xl">{session.user.name}</p>
        </div>

        <div className="px-4 border-l-primary border-l-4">
          <h2 className="text-2xl font-semibold">E-post</h2>
          <p className="text-xl">{session.user.email}</p>
        </div>
      </div>
    </Container>
  );
}
