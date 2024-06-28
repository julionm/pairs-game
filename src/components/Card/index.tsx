import { forwardRef } from "react";
import { Card as CardType } from "../../models/cards";

interface CardOptions {
    card: CardType,
    customClass: string,
    onSelect: (card: CardType) => void
}

const Card = forwardRef<HTMLDivElement | null, CardOptions>(
    ({ card, customClass, onSelect }: CardOptions, ref) => {
        return (
            <div
                id={"" + card.id}
                ref={ref}
                className={`
                    h-24 w-20 rounded-xl cursor-pointer
                    grid place-items-center font-bold text-lg
                    transition-[transform] font-inter
                    ${ customClass ||  'hover:scale-105 border-2 border-gray-500'}
                `}
                onClick={() => onSelect(card)}>
                { card.value }
            </div>  
        );
    }
);

export default Card;