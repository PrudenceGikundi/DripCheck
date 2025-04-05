import { rootAuthLoader } from "@clerk/react-router/ssr.server";

export async function loader(args) {
  return rootAuthLoader(args);
}