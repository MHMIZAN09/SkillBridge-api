import { UserRole } from "../../../generated/prisma/enums";
import { auth } from "../../lib/auth";

interface IRegisterPayload {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

interface ILoginPayload {
  email: string;
  password: string;
}

const register = async (payload: IRegisterPayload) => {
  const { name, email, password, role } = payload;

  if (role !== UserRole.STUDENT && role !== UserRole.TUTOR) {
    throw new Error("Invalid role");
  }

  const result = await auth.api.signUpEmail({
    body: { name, email, password, role },
  });

  if (!result.user) {
    throw new Error("Failed to register user");
  }

  return {
    user: result.user,
    token: result.token,
    needsOnboarding: role === UserRole.TUTOR,
  };
};

const login = async (payload: ILoginPayload) => {
  const result = await auth.api.signInEmail({
    body: { email: payload.email, password: payload.password },
  });

  if (!result.user) {
    throw new Error("Invalid email or password");
  }

  return {
    user: result.user,
    token: result.token,
  };
};

export const AuthService = {
  register,
  login,
};
