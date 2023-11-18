import { getServerSession } from "next-auth";
import { options } from "./options";

export function getSession() {
  return getServerSession(options);
}
