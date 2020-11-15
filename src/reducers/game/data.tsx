import {GameComplexity, GameScale} from "../../components/level-dialog/level-dialog.component";

export interface LevelParams {
    width: number,
    height: number,
    bombAmount: number,
    magicWandAmount: number
}

export const levelsTable = new Map<GameScale, Map<GameComplexity, LevelParams>>([
    ["small", new Map<GameComplexity, LevelParams>([
        ["easy", {width: 10, height: 10, bombAmount: 15, magicWandAmount: 3}],
        ["medium", {width: 10, height: 10, bombAmount: 20, magicWandAmount: 3}],
        ["hard", {width: 10, height: 10, bombAmount: 25, magicWandAmount: 3}],
        ["crazy", {width: 10, height: 10, bombAmount: 30, magicWandAmount: 3}]
    ])],
    ["medium", new Map<GameComplexity, LevelParams>([
        ["easy", {width: 20, height: 20, bombAmount: 60, magicWandAmount: 6}],
        ["medium", {width: 20, height: 20, bombAmount: 80, magicWandAmount: 6}],
        ["hard", {width: 20, height: 20, bombAmount: 100, magicWandAmount: 6}],
        ["crazy", {width: 20, height: 20, bombAmount: 120, magicWandAmount: 6}]
    ])],
    ["big", new Map<GameComplexity, LevelParams>([
        ["easy", {width: 30, height: 30, bombAmount: 135, magicWandAmount: 10}],
        ["medium", {width: 30, height: 30, bombAmount: 180, magicWandAmount: 10}],
        ["hard", {width: 30, height: 30, bombAmount: 225, magicWandAmount: 10}],
        ["crazy", {width: 30, height: 30, bombAmount: 270, magicWandAmount: 10}]
    ])],
    ["huge", new Map<GameComplexity, LevelParams>([
        ["easy", {width: 50, height: 50, bombAmount: 375, magicWandAmount: 15}],
        ["medium", {width: 50, height: 50, bombAmount: 500, magicWandAmount: 15}],
        ["hard", {width: 50, height: 50, bombAmount: 625, magicWandAmount: 15}],
        ["crazy", {width: 50, height: 50, bombAmount: 750, magicWandAmount: 15}]
    ])]
])