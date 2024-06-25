interface CardOptions {
    value: string,
    customClass: string,
    callback: (value: string) => void
}

function Card({ value, customClass, callback }: CardOptions) {

    return (
        <div
            id={value}
            className={`
                h-24 w-20 rounded-xl cursor-pointer
                grid place-items-center font-bold text-lg
                transition-[transform] font-inter
                ${ customClass ||  'hover:scale-105 border-2 border-gray-500'}
            `}
            onClick={() => callback(value)}>
            { value }
        </div>  
    );
}

export default Card;