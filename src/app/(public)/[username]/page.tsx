import PublicCardServerSide from "@/components/name-card-serverside/public-card-serverside";
import { _envCons } from "@/constants";
import { CardResponse } from "@/types/card-type";

const CardByUserName = async ({ params }: { params: { username: string } }) => {
  const { username } = await params;
  const data = await fetch(
    `${_envCons.baseUrl}/card/get-card-username/${username}`
  );
  const cards: CardResponse = await data.json();
  return (
    <div className="min-h-screen  bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="p-4 flex items-center justify-center">
        <PublicCardServerSide cards={cards} />
      </div>
    </div>
  );
};

export default CardByUserName;
