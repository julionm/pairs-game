interface CardOptions {
    value: string,
    isCorrect: boolean,
    isSelected: boolean,
    callback: (value: string) => void
}

function Card({ value, isCorrect, isSelected, callback }: CardOptions) {
    const customClass = isCorrect ? 'bg-blue-400' : (isSelected ? 'bg-orange-500' : 'hover:scale-105 border-2 border-gray-500');

    return (
        <div
            key={value}
            className={`
                h-24 w-20 rounded-xl
                grid place-items-center font-bold text-lg
                transition-[transform]
                ${ customClass }
            `}
            onClick={() => callback(value)}>
            { value }
        </div>  
    );
}

export default Card;