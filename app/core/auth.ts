/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import {
  GoogleAuthProvider,
  User,
  UserCredential,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import { atom, useAtomValue } from "jotai";
import { loadable } from "jotai/utils";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { app, auth } from "./firebase";
import { store } from "./store";
import { supabase } from "./supabase";

interface SupabaseUser {
  email: string;
}

interface SupabaseUserCredential {
  email: string;
}

export const currentUser = atom<
  Promise<User | SupabaseUser | null> | User | null
>(new Promise<User | SupabaseUser | null>(() => {}));

currentUser.debugLabel = "currentUser";

// Listen for Firebase auth changes
const unsubscribe = auth.onAuthStateChanged((user: any) => {
  store.set(currentUser, user);
});

// Listen for Supabase auth changes
const supabaseUnsubscribe = supabase.auth.onAuthStateChange(
  (event, session) => {
    // Get current user
    const user = supabase.auth.getUser();
    store.set(currentUser, user);
  },
);

if (import.meta.hot) {
  import.meta.hot.dispose(() => unsubscribe());
}

export function useCurrentUser() {
  return useAtomValue(currentUser);
}

export const currentUserLoadable = loadable(currentUser);

export function useCurrentUserLoadable() {
  return useAtomValue(currentUserLoadable);
}

async function signInWithEmail(email: string) {
  // Log the email to ensure it's a string
  // console.log("Email:", email);

  try {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        // set this to false if you do not want the user to be automatically signed up
        shouldCreateUser: true,
        //
      },
    });

    if (error) {
      console.error("Error during sign in:", error);
      throw new Error(error.message); // Handle error appropriately
    }

    console.log("Sign in data:", data);

    // Display: Please check email.

    return; // Return the data or handle it as needed
  } catch (err) {
    console.error("Unexpected error:", err);
  }
}

export function useSignIn(
  signInMethod: SignInMethod,
): [signIn: (email: string | undefined) => void, inFlight: boolean] {
  const navigate = useNavigate();
  const [inFlight, setInFlight] = useState(false);

  const signIn = useCallback(
    (email: string | undefined) => {
      let p: Promise<UserCredential | SupabaseUserCredential> | null = null;

      if (signInMethod === "email") {
        const auth = getAuth(app);
        if (typeof email !== "undefined") {
          p = signInWithEmail(email);
        }
      }

      if (signInMethod === "google.com") {
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();
        provider.addScope("profile");
        provider.addScope("email");
        provider.setCustomParameters({
          // login_hint: ...
          prompt: "consent",
        });
        p = signInWithPopup(auth, provider);
      }

      if (!p) throw new Error(`Not supported: ${signInMethod}`);

      setInFlight(true);
      p.then(() => navigate("/")).finally(() => setInFlight(false));
    },
    [signInMethod, navigate],
  );

  return [signIn, inFlight] as const;
}

export type SignInMethod = "google.com" | "email";
