import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect } from "react";

const Home = () => {
  const supabase = useSupabaseClient();

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event == "PASSWORD_RECOVERY") {
        const newPassword = prompt(
          "What would you like your new password to be?"
        );

        const { data, error } = await supabase.auth.updateUser({
          password: newPassword,
        });

        if (data) alert("Password updated successfully!");

        if (error) alert("There was an error updating your password.");
      }
    });
  }, [supabase.auth]);

  return (
    <div>
      <p>Hjemmeside</p>
    </div>
  );
};

export default Home;
