function getRandomNumber(max: number) {
    return Math.floor(Math.random() * max);
}

export function randomize(values: string[]) {
    const n = values.length;
    const newValues = [...values];

    for (let i = 0; i < n; i++) {
        const newPosition = getRandomNumber(n);            
        [newValues[i], newValues[newPosition]] = [newValues[newPosition], newValues[i]];
    }

    return newValues;
}