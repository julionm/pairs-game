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

export enum Answer {
    CORRECT = "correct",
    WRONG = "wrong"
}

export interface Round {
    answerType: Answer,
    id: string,
    triedValues: number[] // value types
 }