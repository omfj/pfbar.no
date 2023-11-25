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
    </Container>
  );
}
