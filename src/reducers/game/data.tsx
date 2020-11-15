export enum Size {
    SMALL,
    MEDIUM,
    BIG,
    HUGE
}

export enum Complexity {
    EASY,
    MEDIUM,
    HARD,
    CRAZY
}

export interface LevelParams {
    width: number,
    height: number,
    bombAmount: number,
    magicWandAmount: number
}

export const levelsTable = new Map<number, Map<number, LevelParams>>([
    [Size.SMALL, new Map<number, LevelParams>([
        [Complexity.EASY, {width: 10, height: 10, bombAmount: 15, magicWandAmount: 3}],
        [Complexity.MEDIUM, {width: 10, height: 10, bombAmount: 20, magicWandAmount: 3}],
        [Complexity.HARD, {width: 10, height: 10, bombAmount: 25, magicWandAmount: 3}],
        [Complexity.CRAZY, {width: 10, height: 10, bombAmount: 30, magicWandAmount: 3}]
    ])],
    [Size.MEDIUM, new Map<number, LevelParams>([
        [Complexity.EASY, {width: 20, height: 20, bombAmount: 60, magicWandAmount: 6}],
        [Complexity.MEDIUM, {width: 20, height: 20, bombAmount: 80, magicWandAmount: 6}],
        [Complexity.HARD, {width: 20, height: 20, bombAmount: 100, magicWandAmount: 6}],
        [Complexity.CRAZY, {width: 20, height: 20, bombAmount: 120, magicWandAmount: 6}]
    ])],
    [Size.BIG, new Map<number, LevelParams>([
        [Complexity.EASY, {width: 30, height: 30, bombAmount: 135, magicWandAmount: 10}],
        [Complexity.MEDIUM, {width: 30, height: 30, bombAmount: 180, magicWandAmount: 10}],
        [Complexity.HARD, {width: 30, height: 30, bombAmount: 225, magicWandAmount: 10}],
        [Complexity.CRAZY, {width: 30, height: 30, bombAmount: 270, magicWandAmount: 10}]
    ])],
    [Size.HUGE, new Map<number, LevelParams>([
        [Complexity.EASY, {width: 50, height: 50, bombAmount: 375, magicWandAmount: 15}],
        [Complexity.MEDIUM, {width: 50, height: 50, bombAmount: 500, magicWandAmount: 15}],
        [Complexity.HARD, {width: 50, height: 50, bombAmount: 625, magicWandAmount: 15}],
        [Complexity.CRAZY, {width: 50, height: 50, bombAmount: 750, magicWandAmount: 15}]
    ])]
])