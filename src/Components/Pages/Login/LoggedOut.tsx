import { Flex, Group } from "@mantine/core";
import React, { useEffect, useState } from "react";
import LoginPage from "./LoginPage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import SignupPage from "./SignupPage";
import { checkIsLoggedIn } from "./Authlice";

export enum AuthPages {
  LOGIN = "login",
  SIGNUP = "signup",
}

const LoggedOut = () => {
  const [authPage, setAuthPage] = useState<AuthPages>(AuthPages.LOGIN);
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkIsLoggedIn());
  }, []);

  if (loggedIn) {
    return null;
  }

  return (
    <Flex justify="center" h="100vh">
      <Group>
        {authPage === AuthPages.LOGIN ? (
          <LoginPage setAuthPage={setAuthPage} />
        ) : (
          <SignupPage setAuthPage={setAuthPage} />
        )}
      </Group>
    </Flex>
  );
};

export default LoggedOut;
