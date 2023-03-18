import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Cardo } from "next/font/google";

import { api } from "@/utils/api";
import Layout from "@/components/layout";

import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import Head from "next/head";

const cardo = Cardo({
  weight: "400",
  subsets: ["latin"],
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --cardo-font: ${cardo.style.fontFamily};
          }
        `}
      </style>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Toaster
        toastOptions={{
          className: "",
          style: {
            background: "#fff",
            color: "#000",
            borderRadius: "0px",
            border: "1px solid black",
            padding: "6px 18px",
          },
        }}
      />
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
