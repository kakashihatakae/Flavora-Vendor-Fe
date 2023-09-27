import { BASE_URL, ROLE } from "../../Shared/const";

export enum AuthMethod {
  LOGIN = "/login",
  SINGUP = "/register",
}

export const authHelper = async ({
  email,
  password,
  path,
}: {
  email: string;
  password: string;
  path: AuthMethod;
}) => {
  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, role: ROLE }),
    });
    if (response.status !== 200) {
      throw new Error(`${response.statusText}`);
    }
    return response;
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to authenticate.  ${error}`);
  }
};
