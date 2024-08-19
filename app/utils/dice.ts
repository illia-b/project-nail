export function diceThrow(value: number | number[] = 6): number[] {
    const dice = Array.isArray(value) ? [...value] : [value]
    return dice.map(d => Math.floor(Math.random() * d) + 1)
}

export function diceScore(value: number | number[] = 6): number {
    return diceThrow().reduce((acc, d) => acc + d, 0)
}