import { useState } from "react";
import { toast } from "react-hot-toast";
import Button from "../common/Button";

const SignIn = () => {
  const handleSignIn = () => {
    try {
      toast("Du er nå logget inn.");
    } catch {
      toast("Kunne ikke logget inn.");
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <Button variant="primary">Logg inn med Google</Button>
    </div>
  );
};

export default SignIn;
