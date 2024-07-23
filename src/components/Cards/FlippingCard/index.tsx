import { CardOptions, CardRef, CardState } from "models/cards";
import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from "react"
import { Icons, IconsToElements } from "models/icons";
import './style.css';

const statusToClass = {
    [CardState.SELECTED]: 'rotate180',
    [CardState.ERROR]: '',
    [CardState.DEFAULT]: '',
    [CardState.CORRECT]: 'rotate180'
}

export const FlippingCard = forwardRef<CardRef | null, CardOptions>(
    ({ card, onSelect }: CardOptions, ref) => {

        const cardContainer = useRef<HTMLDivElement | null>(null);

        const [cardState, setCardState] = useState<CardState>(CardState.DEFAULT);

        const CardValueComponent = useCallback(() => {
            if (card.value in IconsToElements) {
                const IconElement = IconsToElements[card.value as Icons];
                return (
                    <IconElement />
                );
            }

            return (
                <div>{card.value}</div>
            );

        }, [card]);

        useImperativeHandle(ref, () => {
            return {
                setCardState: (newCardState: CardState) => {
                    if (newCardState === CardState.ERROR) {
                        setTimeout(() => setCardState(CardState.DEFAULT), 500);
                    } else {
                        setCardState(newCardState);
                    }

                }
            }
        }, []);

        function handleSelection () {
            if (cardState === CardState.CORRECT) return;

            onSelect(card, cardState);
        }

        return (
            <div
                ref={cardContainer}
                onClick={handleSelection}
                className="card-container">
                <div className={`object3d ${ statusToClass[cardState] }`}>
                    <div className="card">
                        <div className="content-front">
                            Teste 1
                        </div>
                    </div>
                    <div className="card rotate180">
                        <div className="content-back">
                            <CardValueComponent />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
);
  