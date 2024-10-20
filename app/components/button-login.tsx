/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */
import { useState } from "react";

import { Button, ButtonProps } from "@mui/joy";
import { TextField } from "@mui/material";
import { SignInMethod, useSignIn } from "../core/auth";
import { GoogleIcon } from "../icons";

export function LoginButton(props: LoginButtonProps): JSX.Element {
  const { signInMethod, ...other } = props;
  const [signIn, inFlight] = useSignIn(signInMethod);
  const [email, setEmail] = useState(""); // State to hold email input

  const icon = signInMethod === "google.com" ? <GoogleIcon /> : null;
  const handleSignIn = () => {
    if (signInMethod === "email") {
      signIn(email); // Pass the email to signIn
    } else {
      signIn(undefined); // For Google sign-in
    }
  };

  return (
    <>
      {signInMethod === "email" && (
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Update email state
          fullWidth
          margin="normal"
        />
      )}
      <Button
        startDecorator={icon}
        variant="outlined"
        onClick={handleSignIn} // Call the handler
        loading={inFlight}
        {...other}
      >
        {signInMethod === "google.com"
          ? "Continue via Google"
          : signInMethod === "email"
            ? "Sign in via magic-link"
            : ""}
      </Button>
    </>
  );
}

export type LoginButtonProps = Omit<
  ButtonProps<
    "button",
    {
      signInMethod: SignInMethod;
    }
  >,
  "children"
>;
