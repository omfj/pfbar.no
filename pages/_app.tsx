import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/common/Header";
import Footer from "components/common/Footer";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "lib/auth-context";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Toaster />
        <Header />
        <Component {...pageProps} />
        <div className="flex-grow" />
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default App;
