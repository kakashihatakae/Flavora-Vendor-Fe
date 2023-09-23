import {
  Button,
  Group,
  Notification,
  Paper,
  Text,
  TextInput,
  Title,
  createStyles,
} from "@mantine/core";
import React, { useState } from "react";
import { AuthPages } from "./LoggedOut";
import { IconCircleCheckFilled, IconCircleXFilled } from "@tabler/icons-react";
import { AuthMethod, authHelper } from "./ApiHelper";
import { saveToken } from "../../Shared/AuthUtils";
import { useDispatch } from "react-redux";
import { login } from "./Authlice";

const useStyles = createStyles((theme) => ({
  login: {
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
  signupSubTitle: {
    display: "flex",
    justifyContent: "center",
    color: theme.colors.gray[6],
    marginBottom: 32,
  },
}));

interface SignupProps {
  setAuthPage: React.Dispatch<React.SetStateAction<AuthPages>>;
}

function SignupPage({ setAuthPage }: SignupProps) {
  const dispatch = useDispatch();
  const { classes, theme } = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);

  const passwordEqualIcon = (
    <IconCircleCheckFilled size={20} style={{ color: theme.colors.green[5] }} />
  );
  const passwordUnequalIcon = (
    <IconCircleXFilled size={20} style={{ color: theme.colors.red[5] }} />
  );
  const confirmPasswordIcon =
    confirmPassword === password
      ? !!confirmPassword && passwordEqualIcon
      : !!confirmPassword && passwordUnequalIcon;
  const disableSubmitButton =
    !email ||
    !password ||
    !confirmPassword ||
    (confirmPassword ? confirmPassword !== password : true);

  const onSignup = async () => {
    try {
      const response = await authHelper({
        email,
        password,
        path: AuthMethod.SINGUP,
      });
      const signupResponse = await response.json();
      if (!signupResponse) {
        throw new Error();
      }
      saveToken(signupResponse["token"], signupResponse["expiry"]);
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
        <Title size="h5" className={classes.signupSubTitle}>
          Welcome to Flavora, Singup !
        </Title>
        {error && (
          <>
            <Text size={theme.fontSizes.sm} color={theme.colors.red[7]}>
              Oops! Somthing went wrong
            </Text>
            <Text size={theme.fontSizes.sm} color={theme.colors.red[7]}>
              {" "}
              Please check your email Id
            </Text>
          </>
        )}
      </div>
      <div className={classes.titleCenter}>
        <TextInput
          w="100%"
          label="Emailid"
          mb={theme.spacing.xs}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <TextInput
          w="100%"
          label="Password"
          mb={theme.spacing.xs}
          onChange={(e) => setPassword(e.currentTarget.value)}
          type="password"
        />
        <TextInput
          w="100%"
          label="Confirm Password"
          description={
            confirmPassword && confirmPassword !== password ? (
              <Text color={theme.colors.red[6]}>Passhords don't match</Text>
            ) : null
          }
          mb={theme.spacing.md}
          onChange={(e) => setConfirmPassword(e.currentTarget.value)}
          rightSection={confirmPasswordIcon}
          type="password"
        />
        <Button w="100%" disabled={disableSubmitButton} onClick={onSignup}>
          Submit
        </Button>
      </div>

      <Group className={classes.login}>
        <Text mr={7}>Already a member?</Text>
        <Text
          color="blue"
          onClick={() => setAuthPage(AuthPages.LOGIN)}
          style={{ cursor: "pointer" }}
        >
          Signin!
        </Text>
      </Group>
    </Paper>
  );
}

export default SignupPage;
