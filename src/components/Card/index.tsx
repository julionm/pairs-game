import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Card as CardType } from "../../models/cards";

enum CardState {
    DEFAULT = 'default',
    SELECTED = 'selected',
    CORRECT = 'correct'
}

const stateToClass: Record<CardState, String> = {
    [CardState.DEFAULT]: 'hover:scale-105 border-2 border-gray-500',
    [CardState.CORRECT]: 'bg-correct',
    [CardState.SELECTED]: 'bg-wrong'
}

interface CardOptions {
    card: CardType,
    onSelect: (card: CardType) => boolean
}

export interface CardRef {
    handleError: (callback?: () => void) => void,
    handleSuccess: (callback?: () => void) => void
}

export const Card = forwardRef<CardRef | null, CardOptions>(
    ({ card, onSelect }: CardOptions, ref) => {

        const [cardState, setCardState] = useState<CardState>(CardState.DEFAULT);
        const [customClass, setCustomClass] = useState<String>("");
        const cardRef = useRef<HTMLDivElement | null>(null);

        useImperativeHandle(ref, () => {
            return {
                handleError: (callback) => {
                    if (!cardRef.current) {
                        return;
                    }
                    
                    setCustomClass('animate-[wrong_0.3s_linear_infinite]');

                    setTimeout(() => {
                        setCustomClass('');
                        setCardState(CardState.DEFAULT);

                        if (callback) {
                            callback();
                        }
                    }, 300);
                },
                handleSuccess: (callback) => {
                    setCardState(CardState.CORRECT);

                    if (callback) {
                        callback();
                    }
                }
            }
        }, []);

        function handleSelection() {
            if (cardState === CardState.DEFAULT) {
                setCardState(CardState.SELECTED);
                onSelect(card);
            } else if (cardState === CardState.SELECTED) {
                setCardState(CardState.DEFAULT);
                onSelect(card);
            }

        }

        return (
            <div
                id={"" + card.id}
                ref={cardRef}
                className={`
                    h-24 w-20 rounded-xl cursor-pointer
                    grid place-items-center font-bold text-lg
                    transition-[transform] font-inter
                    ${ stateToClass[cardState] }
                    ${ customClass }
                `}
                onClick={handleSelection}>
                { card.value }
            </div>  
        );
    }
);
