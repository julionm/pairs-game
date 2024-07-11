import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Card as CardType } from "../../models/cards";

interface CardOptions {
    card: CardType,
    onSelect: (card: CardType) => void
}

export interface CardRef {
    handleError: (callback?: () => void) => void,
    handleSuccess: (callback?: () => void) => void
}

const Card = forwardRef<CardRef | null, CardOptions>(
    ({ card, onSelect }: CardOptions, ref) => {

        const [customClass, setCustomClass] = useState<String>("");
        const cardRef = useRef<HTMLDivElement | null>(null);

        useImperativeHandle(ref, () => {
            return {
                handleError: (callback) => {
                    if (!cardRef.current) {
                        return;
                    }
                    
                    setCustomClass(`${customClass} animate-[wrong_0.3s_linear_infinite]`);

                    setTimeout(() => {
                        setCustomClass('');

                        if (callback) {
                            callback();
                        }
                    }, 300);
                },
                handleSuccess: (callback) => {
                    setCustomClass('bg-correct');

                    if (callback) {
                        callback();
                    }
                }
            }
        });

        function handleSelection() {
            setCustomClass('bg-wrong');

            onSelect(card);
        }

        return (
            <div
                id={"" + card.id}
                ref={cardRef}
                className={`
                    h-24 w-20 rounded-xl cursor-pointer
                    grid place-items-center font-bold text-lg
                    transition-[transform] font-inter
                    ${ customClass ||  'hover:scale-105 border-2 border-gray-500'}
                `}
                onClick={handleSelection}>
                { card.value }
            </div>  
        );
    }
);

export default Card;