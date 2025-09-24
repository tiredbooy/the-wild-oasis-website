"use server";

import { redirect } from "next/navigation";
import { signIn, signOut } from "./auth";

export async function signInAction(formData) {
  const provider = formData.get("provider") || "google";
  await signIn(provider, { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
