import { auth, db } from "firebase-config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

interface User {
  uid: string;
  email: string;
  roles: Array<string>;
}

interface Auth {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  signIn: () => void;
  signOut: () => void;
}

const AuthContext = createContext<Auth>({
  user: null,
  loading: true,
  setUser: () => {},
  signIn: () => {},
  signOut: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const signIn = async () => {
    await signInWithPopup(auth, new GoogleAuthProvider());
  };

  const signOut = async () => {
    await auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docSnap = await getDoc(doc(db, "roles", user.uid));

        setUser({
          uid: user.uid,
          email: user.email ?? "",
          roles: docSnap.data()?.roles ?? [],
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        setUser,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export default useAuth;
export { AuthProvider };
