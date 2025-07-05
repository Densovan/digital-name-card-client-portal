import request from "@/lib/api/request";
import { ICardResponse } from "@/types/card-type";

export const cardRequest = () => {
  const GET_CARD = async (id: string): Promise<ICardResponse> => {
    return await request({
      url: `/card/get-card/${id}`,
      method: "GET",
    });
  };
  return {
    GET_CARD,
  };
};
