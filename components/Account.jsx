import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "react-hot-toast";
import Button from "./Button";
import Box from "./Box";
import Link from "next/link";

const Account = ({ session }) => {
  const user = useUser();
  const supabase = useSupabaseClient();

  const [full_name, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  useEffect(() => {
    const getProfile = async () => {
      try {
        let { data, error, status } = await supabase
          .from("profiles")
          .select("bio, full_name, roles(role)")
          .eq("id", user?.id)
          .single();

        if (error && status !== 406) {
          throw error;
        }

        if (data) {
          setFullName(data.full_name);
          setBio(data.bio);
          setRole(data.roles.role);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getProfile();
  }, [session, supabase, user]);

  const updateProfile = async ({ bio, full_name }) => {
    try {
      if (!user) throw new Error("No user");

      let { error } = await supabase
        .from("profiles")
        .upsert({
          id: user.id,
          bio,
          full_name,
          updated_at: new Date().toISOString,
        })
        .eq("id", user.id);

      if (error) throw error;

      toast.success("Profilen er oppdatert");
    } catch (error) {
      console.log(error);
      toast.error("Noe gikk galt, prøv igjen senere");
    }
  };

  const handleSignOut = async () => {
    try {
      let { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.log(error);
      toast.error("Kunne ikke logge ut");
    }
  };

  const handleUpdatePassword = async () => {
    try {
      if (!user) throw new Error("No user");

      if (password !== passwordConfirm) {
        toast("Passordene er ikke like");
        return;
      }

      let { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) throw error;

      toast.success("Passordet er oppdatert");
      setPassword("");
      setPasswordConfirm("");
    } catch (error) {
      toast.error("Noe gikk galt, prøv igjen senere");
    }
  };

  return (
    <div className="flex flex-col px-3 sm:px-5 gap-10">
      <Box modifier="outline">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">Min konto</h1>
          <div className="flex gap-2 items-center mb-5">
            <p className="font-bold">E-post:</p>
            <p> {session.user.email}</p>
          </div>

          <div className="flex flex-col md:flex-row gap-2 items-center">
            <label className="font-bold" htmlFor="name">
              Navn:
            </label>
            <input
              className="border border-black p-1"
              id="name"
              type="text"
              value={full_name || ""}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-2 items-center">
            <label className="font-bold" htmlFor="bio">
              Beskrivelse:
            </label>
            <input
              className="border border-black p-1"
              id="bio"
              type="text"
              value={bio || ""}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <Button
            variant="safe"
            onClick={() => updateProfile({ bio, full_name })}
          >
            Oppdater
          </Button>
          <Button variant="danger" onClick={() => handleSignOut()}>
            Logg ut
          </Button>
        </div>
      </Box>

      <Box modifier="outline">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">Endre passord</h1>
          <div className="flex flex-col md:flex-row gap-2 items-center">
            <label className="font-bold" htmlFor="password">
              Nytt passord:
            </label>
            <input
              className="border border-black p-1"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-2 items-center">
            <label className="font-bold" htmlFor="confirm-password">
              Bekreft passord:
            </label>
            <input
              className="border border-black p-1"
              id="confirm-password"
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>

          {password !== passwordConfirm && (
            <p className="text-red-500">Passordene er ikke like</p>
          )}
        </div>

        <div className="flex gap-2 items-center">
          <Button
            variant="safe"
            onClick={() => handleUpdatePassword()}
            disabled={password !== passwordConfirm}
          >
            Oppdater
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              setPassword("");
              setPasswordConfirm("");
            }}
          >
            Nullstill
          </Button>
        </div>
      </Box>
      {role === "admin" && (
        <Link href="/admin">
          <Button>Dashboard</Button>
        </Link>
      )}
    </div>
  );
};

export default Account;
