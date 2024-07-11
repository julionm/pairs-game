import { expect, it } from 'vitest';
import { getRandomNumber, randomize } from './random';

it('should return a number within a range', () => {
    const max = 5;
    const randomValue = getRandomNumber(max);

    expect(randomValue).toBeLessThan(5);
})

it('should randomize the values', () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const randomized = randomize(values);

    let slotsMatched = 0;
    values.forEach((value, index) => {
        if (value === randomized[index]) {
            slotsMatched++;
        }
    });

    expect(slotsMatched/values.length).toBeLessThan(0.3);
})