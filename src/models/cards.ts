export interface Card {
    id: number,
    value: string | number, // string: link, hiragana, 
    type: Types
}

export enum Types {
    NUMBER = 'number',
    STRING = 'string',
    JAPANESE = 'japanese'
}

export interface CardRef {
    setCardState: (cardState: CardState) => void
}

export enum CardState {
    DEFAULT = 'default',
    SELECTED = 'selected',
    CORRECT = 'correct',
    ERROR = 'error'
}