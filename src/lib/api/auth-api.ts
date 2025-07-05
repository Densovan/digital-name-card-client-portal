import type {
  IAuthResponse,
  AuthRegisterForm,
  AuthLoginForm,
} from "@/types/auth-type";
import request from "@/lib/api/request";

export const authRequest = () => {
  const AUTH_LOGIN = async (payload: AuthLoginForm): Promise<IAuthResponse> => {
    return await request({
      url: "/auth/login",
      method: "POST",
      data: payload,
    });
  };

  const AUTH_REGISTER = async (payload: AuthRegisterForm) => {
    return await request({
      url: "/auth/register",
      method: "POST",
      data: payload,
    });
  };
  return {
    AUTH_LOGIN,
    AUTH_REGISTER,
  };
};
