"use server";

import { signIn, signOut } from "@/auth";

export const leave = async () => signOut();
export const enter = async () => signIn();
