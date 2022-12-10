import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

const Account = ({ session }) => {
  const user = useUser();
  const supabase = useSupabaseClient();

  const [full_name, setFullName] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    const getProfile = async () => {
      try {
        let { data, error, status } = await supabase
          .from("profiles")
          .select("bio, full_name")
          .eq("id", user?.id)
          .single();

        if (error && status !== 406) {
          throw error;
        }

        if (data) {
          setFullName(data.full_name);
          setBio(data.bio);
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
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      let { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 items-center">
        <p className="font-bold">E-post:</p>
        <p> {session.user.email}</p>
      </div>

      <div className="flex gap-2 items-center">
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

      <div className="flex gap-2 items-center">
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

      <div className="flex gap-2 items-center">
        <button
          className="bg-green-300 border border-black p-1"
          onClick={() => updateProfile({ bio, full_name })}
        >
          Oppdater
        </button>
        <button
          className="bg-red-300 border border-black p-1"
          onClick={() => handleSignOut()}
        >
          Logg ut
        </button>
      </div>
    </div>
  );
};

export default Account;
