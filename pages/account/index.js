import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Account from "../../components/Account";

const AccountPage = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <div className="max-w-[600px] mx-auto px-3">
      {!session ? (
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="light"
        />
      ) : (
        <Account session={session} />
      )}
    </div>
  );
};

export default AccountPage;
