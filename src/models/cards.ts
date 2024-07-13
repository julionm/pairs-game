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
    handleError: (callback?: () => void) => void,
    handleSuccess: (callback?: () => void) => void
}