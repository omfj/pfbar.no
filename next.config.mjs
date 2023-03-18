// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import pwa from "next-pwa";

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env.mjs"));

const withPWA = pwa({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  // i18n: {
  //   locales: ["no"],
  //   defaultLocale: "no",
  // },
};



export default withPWA(config);
