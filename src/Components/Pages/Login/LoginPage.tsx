import {
  Button,
  Group,
  Paper,
  Text,
  TextInput,
  Title,
  createStyles,
} from "@mantine/core";
import React, { useState } from "react";
import { AuthPages } from "./LoggedOut";
import { AuthMethod, authHelper } from "./ApiHelper";
import { saveToken } from "../../Shared/AuthUtils";
import { useDispatch } from "react-redux";
import { login } from "./Authlice";

const useStyles = createStyles((theme) => ({
  signup: {
    justifyContent: "center",
    marginTop: 48,
    gap: 0,
  },
  titleCenter: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  loginSubTitle: {
    display: "flex",
    justifyContent: "center",
    color: theme.colors.gray[6],
    marginBottom: 32,
  },
}));

interface LoginPageProps {
  setAuthPage: React.Dispatch<React.SetStateAction<AuthPages>>;
}

function LoginPage({ setAuthPage }: LoginPageProps) {
  const dispatch = useDispatch();
  const { classes, theme } = useStyles();
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const disableSubmitButton = !emailId || !password;

  const onLogin = async () => {
    try {
      const response = await authHelper({
        email: emailId,
        password,
        path: AuthMethod.LOGIN,
      });
      const loginResponse = await response.json();
      if (!loginResponse) {
        throw new Error();
      }
      saveToken(loginResponse["token"], loginResponse["expiry"]);
      dispatch(login());
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  return (
    <Paper miw={350} shadow="md" radius="md" p={theme.spacing.xl}>
      <div className={classes.titleCenter}>
        <Title
          size="h1"
          variant="gradient"
          gradient={{ from: "blue", to: "cyan", deg: 90 }}
          className={classes.titleCenter}
        >
          Flavora
        </Title>
        <Title size="h5" className={classes.loginSubTitle}>
          Signin to your account
        </Title>
        {error && (
          <>
            <Text size={theme.fontSizes.sm} color={theme.colors.red[7]}>
              Oops! Somthing went wrong
            </Text>
            <Text
              size={theme.fontSizes.sm}
              color={theme.colors.red[7]}
              mb={theme.spacing.sm}
            >
              Please check your email/password
            </Text>
          </>
        )}
      </div>
      <div className={classes.titleCenter}>
        <TextInput
          w="100%"
          label="Emailid"
          mb={theme.spacing.xs}
          onChange={(e) => setEmailId(e.currentTarget.value)}
        />
        <TextInput
          w="100%"
          label="Password"
          mb={theme.spacing.md}
          type="password"
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <Button w="100%" onClick={onLogin} disabled={disableSubmitButton}>
          Submit
        </Button>
      </div>

      <Group className={classes.signup}>
        <Text mr={7}>Not a member?</Text>
        <Text
          color="blue"
          onClick={() => setAuthPage(AuthPages.SIGNUP)}
          style={{ cursor: "pointer" }}
        >
          Signup!
        </Text>
      </Group>
    </Paper>
  );
}

export default LoginPage;
