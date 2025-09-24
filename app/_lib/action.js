"use server";

import { redirect } from "next/navigation";
import { signIn } from "./auth";

export async function signInAction(formData) {
  const provider = formData.get("provider") || "google";
  await signIn(provider, { redirectTo: "/account" });
  redirect("/account")
}
