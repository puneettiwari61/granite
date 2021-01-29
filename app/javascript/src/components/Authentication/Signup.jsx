import React, { useState } from "react";

import SignupForm from "./Form/SignupForm";
import authApi from "../../apis/auth";
import Logger from "js-logger";

const Signup = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      setLoading(true);
      const responce = await authApi.signup({
        user: {
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
        },
      });
      Logger.info(responce, "response");
      setLoading(false);
      history.push("/");
    } catch (error) {
      setLoading(false);
      Logger.error(error);
    }
  };
  return (
    <SignupForm
      setName={setName}
      setEmail={setEmail}
      setPassword={setPassword}
      setPasswordConfirmation={setPasswordConfirmation}
      loading={loading}
      handleSubmit={handleSubmit}
    />
  );
};

export default Signup;
