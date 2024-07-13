import { Types } from 'models/cards';
import { ReactNode } from 'react';

type RendererOptions = {
    cardValue: string | number
};
type Renderer = (props: RendererOptions) => ReactNode;

const Default: Renderer = function ({ cardValue }: RendererOptions) {
    return (
        <p className='font-semibold text-lg'>{ cardValue }</p>
    );
}

const Japanese: Renderer = function ({ cardValue }: RendererOptions) {
    return (
        <p className='font-japanese font-extrabold text-3xl'>{ cardValue }</p>
    )
}

export const ComponentByCardType: Record<Types, Renderer> = {
    [Types.NUMBER]: Default,
    [Types.STRING]: Default,
    [Types.JAPANESE]: Japanese
}
