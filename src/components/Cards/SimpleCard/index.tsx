import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from "react";
import { CardOptions, CardRef, CardState } from "models/cards";
import { ComponentByCardType } from "components/cards/ComponentByCardType";

const cardStateToClass: Record<CardState, String> = {
    [CardState.DEFAULT]: 'hover:scale-105 border-2 border-gray-500',
    [CardState.CORRECT]: 'bg-correct',
    [CardState.SELECTED]: 'bg-wrong',
    [CardState.ERROR]: 'bg-wrong'
}

export const SimpleCard = forwardRef<CardRef | null, CardOptions>(
    ({ card, onSelect }: CardOptions, ref) => {

        const CardValue = useCallback(() => {
            const Component = ComponentByCardType[card.type];

            return (
                <Component cardValue={card.value} />
            )
        }, []);

        const [cardState, setCardState] = useState<CardState>(CardState.DEFAULT);
        const [customClass, setCustomClass] = useState<String>("");
        
        const cardRef = useRef<HTMLDivElement | null>(null);

        useImperativeHandle(ref, () => {
            return {
                setCardState: (newCardState: CardState) => {
                    if (newCardState === CardState.ERROR) {
                        if (!cardRef.current) {
                            return;
                        }
                        
                        setCustomClass('animate-[wrong_0.3s_linear_infinite]');
    
                        setTimeout(() => {
                            setCustomClass('');
                            setCardState(CardState.DEFAULT);
                        }, 300);    
                    } else {
                        setCardState(newCardState);
                    }
                }
            }
        }, []);

        function handleSelection() {
            if (cardState === CardState.CORRECT) return;

            onSelect(card, cardState);
        }

        return (
            <div
                id={String(card.id)}
                ref={cardRef}
                className={`
                    h-24 w-20 rounded-xl cursor-pointer
                    grid place-items-center transition-[transform]
                    ${ cardStateToClass[cardState] }
                    ${ customClass }
                `}
                onClick={handleSelection}>
                <CardValue />
            </div>  
        );
    }
);
