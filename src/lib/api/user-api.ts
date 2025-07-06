import request from "@/lib/api/request";
import { IUser } from "@/types/user-type";

export const userRequest = () => {
  const GET_ME = async (): Promise<IUser> => {
    return await request({
      url: `/user/me`,
      method: "GET",
    });
  };

  return {
    GET_ME,
  };
};
