import diceThrow from "./dice";

describe('diceThrow', () => {
    test('should return a number between 1 and 6 for default value', () => {
        const [result] = diceThrow();
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(6);
    });

    test('should return a number between 1 and the specified value', () => {
        const sides = 10;
        const [result] = diceThrow(sides);
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(sides);
    });

    test('should return an array of numbers for an array of dice', () => {
        const dice = [4, 6, 8];
        const result = diceThrow(dice);
        expect(Array.isArray(result)).toBeTruthy();
        expect(result).toHaveLength(dice.length);
        // @ts-ignore
        result.forEach((value, index) => {
            expect(value).toBeGreaterThanOrEqual(1);
            expect(value).toBeLessThanOrEqual(dice[index]);
        });
    });
});