// "use client";

// import { useState, useMemo } from "react";
// import { ICard, CardResponse } from "@/types/card-type";
// // import MinimalCardService from "./minimal-card";
// // import ModernCardService from "./modern-card";
// import CorporateCardService from "./corporate-card";

// type Props = {
//   cards: CardResponse;
// };

// const PublicCardServerSide = ({ cards }: Props) => {
//   // Dynamically get unique card types from data
//   const availableTypes = useMemo(() => {
//     const types = new Set<string>();
//     cards.card.forEach((card) => types.add(card.card_type));
//     return Array.from(types) as Array<"Minimal" | "Modern" | "Corporate">;
//   }, [cards]);

//   // Default to first available type (usually "Modern")
//   const [selectedType, setSelectedType] = useState<
//     "Minimal" | "Modern" | "Corporate"
//   >(availableTypes[0] ?? "Modern");

//   const filteredCards = cards.card.filter(
//     (card) => card.card_type === selectedType
//   );

//   const renderCardComponent = (card: ICard, idx: number) => {
//     switch (card.card_type) {
//       case "Minimal":
//         return (
//           <CorporateCardService
//             key={idx}
//             me={card.user}
//             card={card}
//             idx={idx}
//           />
//         );
//       case "Modern":
//         return (
//           <CorporateCardService
//             key={idx}
//             me={card.user}
//             card={card}
//             idx={idx}
//           />
//         );
//       case "Corporate":
//         return (
//           <CorporateCardService
//             key={idx}
//             me={card.user}
//             card={card}
//             idx={idx}
//           />
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="w-full">
//       {/* Style switch buttons only for available types */}
//       <div className="fixed bottom-0 left-0 w-full bg-white shadow-md py-3 flex justify-center gap-3 z-50">
//         {availableTypes.map((type) => (
//           <button
//             key={type}
//             onClick={() => setSelectedType(type)}
//             className={`px-4 py-2 rounded-md font-medium transition-all duration-150 ${
//               selectedType === type
//                 ? "bg-blue-600 text-white shadow"
//                 : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//             }`}
//           >
//             {type}
//           </button>
//         ))}
//       </div>

//       {/* Show cards for selected type */}
//       {filteredCards.length > 0 ? (
//         filteredCards.map((card, idx) => (
//           <div key={idx}>{renderCardComponent(card, idx)}</div>
//         ))
//       ) : (
//         <p className="text-center text-gray-500">
//           No {selectedType} cards found
//         </p>
//       )}
//     </div>
//   );
// };

// export default PublicCardServerSide;
"use client";

import { useState, useMemo } from "react";
import { ICard, CardResponse } from "@/types/card-type";
// import MinimalCardService from "./minimal-card";
// import ModernCardService from "./modern-card";
import CorporateCardService from "./corporate-card";
import ModernCardServerSide from "./modern-card-serverside";
import MinimalCardServerSide from "./minimal-card-serverside";

type Props = {
  cards: CardResponse;
};

const PublicCardServerSide = ({ cards }: Props) => {
  const availableTypes = useMemo(() => {
    const types = new Set<string>();
    cards.card.forEach((card) => types.add(card.card_type));
    return Array.from(types) as Array<"Minimal" | "Modern" | "Corporate">;
  }, [cards]);

  const [selectedType, setSelectedType] = useState<
    "Minimal" | "Modern" | "Corporate"
  >(availableTypes[0] ?? "Modern");

  const filteredCards = cards.card.filter(
    (card) => card.card_type === selectedType
  );

  const renderCardComponent = (card: ICard, idx: number) => {
    switch (card.card_type) {
      case "Minimal":
        return (
          <MinimalCardServerSide
            key={idx}
            me={card.user}
            card={card}
            idx={idx}
          />
        );
      case "Modern":
        return (
          <ModernCardServerSide
            key={idx}
            me={card.user}
            card={card}
            idx={idx}
          />
        );
      case "Corporate":
        return (
          <CorporateCardService
            key={idx}
            me={card.user}
            card={card}
            idx={idx}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Card list scrollable with padding to avoid overlap */}
      <div className="overflow-y-auto pb-28 px-3 pt-4 max-w-md mx-auto">
        {filteredCards.length > 0 ? (
          filteredCards.map((card, idx) => (
            <div
              key={idx}
              className="mb-6 transition-all duration-300 ease-in-out"
            >
              {renderCardComponent(card, idx)}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No {selectedType} cards found
          </p>
        )}
      </div>

      {/* Bottom sticky button group for mobile view */}
      <div className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-sm border-t border-gray-200 shadow-md py-3 flex justify-center gap-3 z-50 px-2">
        {availableTypes.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
              selectedType === type
                ? "bg-blue-600 text-white shadow"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PublicCardServerSide;
