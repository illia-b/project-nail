'use client'

import React, { createContext, useContext } from 'react';
import { useImmerReducer } from 'use-immer';

export interface Enemy {
    name: string
    health?: number
    damage?: number
    rounds?: number
}

export interface FightScenario {
    enemies: Enemy[]
    ranged?: boolean
    damageTogether?: boolean
    shadow?: boolean
    venom?: boolean
    reaper?: boolean
    modificator?: (state) => void
}

const fightScenarios: {[id:number]: FightScenario} = {
    10: { enemies: [{name: 'GUARD', rounds: 4, health: 3, damage: 2}]},
    18: { enemies: [{name: 'OWEN THE GATEKEEPER', rounds: 5, health: 5, damage: 2}]},
    26: { enemies: [{name: "ASH'S SHADOW", rounds: 4, health: 2, damage: 4}], shadow: true},
    29: { enemies: [{name: 'HALF-HARLAN', rounds: 3, health: 2, damage: 1}]},
    36: { enemies: [{name: 'HOODED FIGURE', rounds: 6, health: 5, damage: 2}]},
    69: { enemies: [{name: 'WOAD GRIBLIN', rounds: 4, health: 4, damage: 2}]},
    75: { enemies: [{name: 'BAT-HOUND', rounds: 4, health: 3, damage: 2}]},
    86: { enemies: [{name: 'OLD PIRATE', rounds: 6, health: 4, damage: 2}]}, // POSSIBLE THAT FLYNT IS TAKEN (THEN ATTACK SCORE PENALTY = 1)
    125: { enemies: [{name: 'ODAN BRITCHES', rounds: 5, health: 3, damage: 2}]},
    129: { damageTogether: true, enemies: [
        {name: 'FIRST GUARD', rounds: 4, health: 2, damage: 3}, 
        {name: 'SECOND GUARD', rounds: 2, health: 2, damage: 2}, 
        {name: 'THIRD GUARD', rounds: 3, health: 3, damage: 2}]},
    144: { enemies: [{name: 'SHADOW REAPER', rounds: 8, health: 4, damage: 4}], reaper: true}, // SHADOW BLADE ONLY, POSSIBLE ADDITIONAL DAMAGE FROM STAFF
    154: { enemies: [{name: 'HOODED FIGURE', rounds: 5, health: 5, damage: 2}]}, // HATCHET ONLY (ATTACK SCORE PENALTY = 1)
    167: { ranged: true, enemies: [
        {name: 'HOODED FIGURE'}, 
        {name: 'CITY GUARD'}, 
        {name: 'HOODED FIGURE'}]},
    180: { enemies: [{name: 'KIDNAPPER', rounds: 6, health: 5, damage: 3}]},
    192: { enemies: [{name: 'SHADOW WRAITH', rounds: 4, health: 2, damage: 4}], shadow: true},
    198: { enemies: [
        {name: 'FIRST MARSH GOBLIN', rounds: 4, health: 3, damage: 2},
        {name: 'SECOND MARSH GOBLIN', rounds: 2, health: 2, damage: 2},
        {name: 'THIRD MARSH GOBLIN', rounds: 4, health: 3, damage: 2},
        {name: 'FOURTH MARSH GOBLIN', rounds: 2, health: 2, damage: 3},
        {name: 'FIFTH MARSH GOBLIN', rounds: 3, health: 2, damage: 2},
        {name: 'SIXTH MARSH GOBLIN', rounds: 3, health: 2, damage: 3},],
        modificator: (state) => {
            //some goblins may be captured using net
            let captured = Number.parseInt(prompt('If you happen to capture goblins, enter their number here:', '0'))
            state.fight.enemies.splice(6 - captured, captured)
        }}, 
    205: { enemies: [{name: 'GUARD', rounds: 4, health: 3, damage: 3}]},
    224: { enemies: [{name: 'SHADOW WRAITH', rounds: 4, health: 2, damage: 4}], shadow: true},
    236: { enemies: [{name: 'STREET URCHIN', rounds: 2, health: 3, damage: 1}]},
    252: { enemies: [{name: 'PRISON GUARD', rounds: 4, health: 3, damage: 2}]},
    264: { enemies: [{name: 'TEMPLE GUARD', rounds: 6, health: 5, damage: 2}]}, // Inflict double damage if score is double
    273: { enemies: [{name: 'CITY GUARD', rounds: 6, health: 5, damage: 2}]}, // Sivler bracelet option
    281: { enemies: [{name: 'SHADOW REAPER', rounds: 8, health: 4, damage: 4}], reaper: true}, // FLYNT ONLY, POSSIBLE ADDITIONAL DAMAGE FROM STAFF
    302: { enemies: [{name: 'SHADOW WRAITH', rounds: 4, health: 2, damage: 4}], shadow: true},
    328: { damageTogether: true, enemies: [
        {name: 'FIRST GUARD', rounds: 3, health: 2, damage: 3}, 
        {name: 'SECOND GUARD', rounds: 3, health: 3, damage: 2}]},
    334: { enemies: [{name: 'SHADOW REAPER', rounds: 8, health: 4, damage: 4}], reaper: true}, // DUAL WIELD SHAODW BLADES + FLYNT, POSSIBLE ADDITIONAL DAMAGE FROM STAFF
    338: { enemies: [{name: 'WOAD GRIBLIN', rounds: 4, health: 4, damage: 2}]},
    368: { enemies: [{name: 'PUSTULA', rounds: 5, health: 5, damage: 2}], venom: true},
    372: { enemies: [{name: 'SHADOW WRAITH', rounds: 4, health: 2, damage: 4}], shadow: true},
    387: { enemies: [{name: 'SHADOW WRAITH', rounds: 4, health: 2, damage: 4}], shadow: true},
    393: { ranged: true, enemies: [
        {name: 'WINGED BEAST'}, 
        {name: 'WINGED BEAST'}, 
        {name: 'WINGED BEAST'}]}, // SKILL BONUS, GOLD RING DOES NOT HELP
    426: { enemies: [{name: 'SHADOW WRAITH', rounds: 4, health: 2, damage: 4}], shadow: true},
    429: { damageTogether: true, enemies: [
        {name: 'FIRST GUARD', rounds: 5, health: 2, damage: 2}, 
        {name: 'SECOND GUARD', rounds: 4, health: 3, damage: 3}]}
}

export interface Item {
    name: string
    aliases?: string[]
    armorDefense?: number
    protectFromShadows?: boolean
    weaponScorePenalty?: number
    meleeWeapon?: boolean
    rangedWeapon?: boolean
    shadowWeapon?: boolean
}

const items: Item[] = [
    { name: 'ARROW', aliases: ['ARROWS'] },
    { name: 'BOW', rangedWeapon: true },
    { name: 'HATCHET', meleeWeapon: true, weaponScorePenalty: 1 },
    { name: 'FLYNT', meleeWeapon: true, aliases: ['SWORD'] },
    { name: 'LOCKET' },
    { name: 'SHADOW BLADE', meleeWeapon: true, shadowWeapon: true },
    { name: 'FIRECRACKERS', aliases: ['FIRECRACKER', 'FIRE CRACKERS', 'FIRE CRACKER'] },
    { name: 'YELLOW POUCH', aliases: ['POUCH'] },
    { name: 'ROPE WITH HOOK', aliases: ['ROPE AND HOOK'] },
    { name: 'SILVER BRACELET', aliases: ['BRACELET'] },
    { name: 'CHAINMAIL VEST', aliases: ['CHAINMAIL'], armorDefense: 1, protectFromShadows: true },
    { name: 'SILVER RING' },
    { name: 'GOLD RING' },
    { name: 'HOODED CLOAK', aliases: ['CLOAK'] },
    { name: 'SILVER DAGGER', aliases: ['DAGGER'], meleeWeapon: true, weaponScorePenalty: 1 },
    { name: 'WHITE FLOWER', aliases: ['FLOWER'] },
    { name: 'MAGNIFYING GLASS', aliases: ['GLASS', 'LOOKING GLASS'] },
    { name: "CITY GUARD'S BADGE", aliases: ['BADGE'] },
    { name: 'HANDCUFFS', aliases: ['CUFFS', 'HAND CUFFS'] },
    { name: 'BLUE STONE', aliases: ['BLUESTONE'] },
    { name: 'SLEEPING POTION', aliases: ['SLEEP POTION'] },
    { name: 'FUEL' },
    { name: 'LANTERN' },
    { name: 'COMPASS' },
    { name: 'CHALK' },
    { name: 'CALTROPS' },
    { name: 'LEATHER ARMOUR', aliases: ['LEATHER', 'LEATHER ARMOR'], armorDefense: 1, protectFromShadows: false },
    { name: 'BOOK OF FAIRY TALES', aliases: ['BOOK', 'FAIRY TALES', 'FAIRYTALES'] },
    { name: 'NET'},
    { name: 'RED CHAIN' },
    { name: 'MIRROR' }
]

const itemMap: { [name: string]: Item } = {}

const fillItemMap = () => {
    if (Object.keys(itemMap).length > 0) return
    items.forEach(item => {
        itemMap[item.name] = item
        if (item.aliases) {
            item.aliases.forEach(alias => {
                itemMap[alias] = item
            })
        }
    })
}
fillItemMap()

export interface FightState {
    enemies: {
        name: string
        health: number
        damage: number
        rounds: number
    }[]
    inFight: boolean
    prepare: boolean
    ranged: boolean
    damageTogether: boolean
    venom?: boolean
    shadow?: boolean
    reaper?: boolean
    weapon: {
        scorePenalty: number
    },
    armor: {
        shadowDefense: number
        defense: number
    }
}

const fightState: FightState = {
    enemies: [
    ],
    damageTogether: false,
    inFight: false,
    prepare: true,
    ranged: false,
    weapon: {
        scorePenalty: 0
    },
    armor: {
        shadowDefense: 0,
        defense: 0
    }
}

export interface PlayerState {
    abilities: {
        perception: number
        dexterity: number
        constitution: number
        skill: number
    },
    health: number
    lost: boolean
    inventory: {
        [name: string]: number
    }
    messages: string[]
    fight: FightState
}

const playerState: PlayerState = {
    abilities: {
        perception: 3,
        dexterity: 3,
        constitution: 3,
        skill: 3
    },
    health: 12,
    lost: false,
    inventory: {}, //  start with empty inventory
    messages: [],
    fight: fightState
}

const checkFightOver = (state) => {
    let defeated = false;
    let won = true;
    for (let enemy of state.fight.enemies) {
        if (enemy.health > 0) {
            won = false;
            if (enemy.rounds == 0) {
                defeated = true;
            }
        }
    }
    if (defeated) {
        state.fight.inFight = false
        state.messages.unshift('You lost the fight')
    } else if (won) {
        state.fight.inFight = false
        state.messages.unshift('You won the fight')
    }
    if (!state.fight.inFight) {
        state.fight.enemies.length = 0
    }
}

const checkRangedFightOver = (state) => {

    let won = true;
    for (let enemy of state.fight.enemies) {
        if (enemy.health > 0) {
            won = false;
        }
    }
    if (won) {
        state.fight.inFight = false
        state.messages.unshift('You won the fight')
    }

    let arrows = state.inventory['ARROW'] || 0

    if (arrows <= 0) {
        state.fight.inFight = false
        state.messages.unshift('No arrows left. You lost the fight')
        state.fight.enemies.length = 0
    }
}

const prepareCustomFight = (state) => {
    state.fight.prepare = true
    state.fight.inFight = true
    state.fight.enemies.push({name: 'Enemy', health: 2, damage: 2, rounds: 2})
}

const buildFightScenario = (state, scenario: FightScenario) => {
for (let enemy of scenario.enemies) {
        state.fight.enemies.push({
            name: enemy.name,
            health: enemy.health,
            damage: enemy.damage,
            rounds: enemy.rounds
        })
    }
    state.fight.ranged = scenario.ranged
    state.fight.damageTogether = scenario.damageTogether
    state.fight.shadow = scenario.shadow
    state.fight.venom = scenario.venom
    state.fight.reaper = scenario.reaper

    if (scenario.modificator) {
        scenario.modificator(state)
    }
}

const checkGameOver = (state) => {
    if (state.health <= 0) {
        state.lost = true
        state.messages.unshift('You died. Game over.')
        reset(state)
    }
}

const reset = (state) => {
    state.abilities = {
        perception: 3,
        dexterity: 3,
        constitution: 3,
        skill: 3
    }
    state.health = 12
    state.inventory = {}
    state.fight.enemies = []    
    state.fight.inFight = false
}

const _playerStateActions = {
    'HEALTH_CHANGE': (state, action) => {
        if (action.delta) {
            state.health += action.delta
            if (action.delta > 0) {
                state.messages.unshift(`You gained ${action.delta} health. Now is ${state.health}`)
            } else {
                state.messages.unshift(`You lost ${-action.delta} health. Now is ${state.health}`)
            }
        } else {
            state.health = action.value
            state.messages.unshift(`Your health is now ${action.value}`)
        }
        if (state.health > 12) {
            state.health = 12
        }
        if (state.health < 0) {
            state.health = 0
        }
        checkGameOver(state)
        
    },
    'ABILITY_CHANGE': (state, action) => {
        state.abilities[action.ability] += action.delta
    },
    'INVENTORY_PUT_ITEM': (state, action) => {
        let name = action.item
        if (!itemMap[name]) {
            state.messages.unshift(`Cannot put ${name} in inventory, unknown item`)
            return;
        }
        let item = itemMap[name]
        if (!state.inventory[item.name]) {
            state.inventory[item.name] = 0
        }
        state.inventory[item.name] += action.delta || 1
    },
    'INVENTORY_REMOVE_ITEM': (state, action) => {
        let itemAmount = state.inventory[action.item] || 0
        let removeAmount = action.delta || 1
        if (itemAmount < removeAmount) {
            throw new Error(
                `Cannot remove ${removeAmount} of ${action.item} from inventory, only ${itemAmount} available`)
        }
        state.inventory[action.item] = itemAmount - removeAmount
    },
    'MESSAGE_ADD': (state, action) => {
        state.messages.unshift(action.message)
    },

    'THROW_DICE': (state, action) => {
        let message = `Throwing ${action.dice} dice: `
        let score = 0
        for (let i = 0; i < action.dice; i++) {
            let roll = Math.floor(Math.random() * 6) + 1
            score += roll
            message += ` ${roll}`
        }
        message += ` total: ${score}`
        state.messages.unshift(message)
    },
    'PREPARE_FIGHT_SCENARIO': (state, action) => {
        let scenario = fightScenarios[action.entryId]
        if (!scenario) {
            prepareCustomFight(state)
            state.messages.unshift('Unknown entry, you need to set up manually')
        } else {
            state.fight.inFight = true
            state.fight.prepare = true
            buildFightScenario(state, scenario)
            state.messages.unshift('Fight set up. Press START when ready')
        }

    },
    'PREPARE_FIGHT': (state, action) => {
        state.fight.prepare = true
        state.fight.inFight = true
        state.fight.enemies.push({name: 'Enemy', health: 2, damage: 2, rounds: 2})
        state.messages.unshift('Set up your fight. Press START when ready')
    },
    'FIGHT_START': (state, action) => {
        state.fight.prepare = false
        state.messages.unshift('Fight begins')
    },
    'ENEMY_ADD': (state, action) => {
        state.fight.enemies.push({
            name: action.name,
            health: action.health,
            damage: action.damage,
            rounds: action.rounds
        })
    },
    'ENEMY_UPDATE': (state, action) => {
        let enemy = state.fight.enemies[action.index]
        enemy.name = action.name
        if (action.health) {
            enemy.health = action.health
        }
        if (action.damage) {
            enemy.damage = action.damage
        }
        if (action.rounds) {
            enemy.rounds = action.rounds
        }
    },
    'ENEMY_REMOVE': (state, action) => {
        state.fight.enemies.splice(action.index, 1)
    },
    'MELEE_ATTACK': (state, action) => {
        let enemy = state.fight.enemies[action.enemyIndex]

        let minScore = 6 + action.damage - state.fight.weapon.scorePenalty
        let score = Math.floor(Math.random() * 6) + 1
        score += Math.floor(Math.random() * 6) + 1

        let message = `Melee attack on ${enemy.name} with score ${score} vs ${minScore} :`
        if (score >= minScore) {
            message += ' hit'
            enemy.health -= action.damage
        } else {
            message += ' miss'
            let aliveEnemyDamageTotal = 0
            for (let enemy of state.fight.enemies) {
                if (enemy.health > 0) {
                    aliveEnemyDamageTotal += enemy.damage - state.fight.armor.defense
                }
            }
            state.health -= aliveEnemyDamageTotal
            message += ` and you are hit for ${aliveEnemyDamageTotal} damage`
        }
        enemy.rounds -= 1

        state.messages.unshift(message)

        checkFightOver(state)
        checkGameOver(state)
    },
    'RANGED_ATTACK': (state, action) => {
        let enemy = state.fight.enemies[action.enemyIndex]
        
        let score = Math.floor(Math.random() * 6) + 1
        let message = `Ranged attack on ${enemy.name} with score ${score} : `
        if (state.abilities.skill >= 5) {
            score += 1
        }

        let damage = 0
        if (score >= 6) {
            damage = 2
            message += 'Critical hit! Enemy is dead.'
            enemy.health = 0
        } else if (score >= 4) {
            damage = 1
            message += 'Hit!. '
            enemy.health -= 1
            if (enemy.health > 0) {
                message += `Enemy is wounded.`
            } else {
                message += `Enemy is dead.`
            }
        } else {
            message += 'Miss.'
        }

        state.messages.unshift(message)
        state.inventory['ARROW'] -= 1        

        checkRangedFightOver(state)
    }
}

export const changeHealth = (delta: number) => {
    return {
        type: 'HEALTH_CHANGE',
        delta: delta
    }
}

export const setHealth = (value: number) => {
    return {
        type: 'HEALTH_CHANGE',
        value: value
    }
}

export const changeAbility = (ability: string, delta: number) => {
    return {
        type: 'ABILITY_CHANGE',
        ability: ability,
        delta: delta
    }
}

export const addItem = (item: string, delta?: number) => {
    return {
        type: 'INVENTORY_PUT_ITEM',
        item: item,
        delta: delta
    }
}

export const removeItem = (item: string, delta?: number) => {
    return {
        type: 'INVENTORY_REMOVE_ITEM',
        item: item,
        delta: delta
    }
}

export const addMessage = (message: string) => {
    return {
        type: 'MESSAGE_ADD',
        message: message
    }
}

export const throwDice = (dice: number) => {
    return {
        type: 'THROW_DICE',
        dice: dice
    }
}

export const prepareFight = (entryId?: number) => {
    if (entryId) {
        return {
            type: 'PREPARE_FIGHT_SCENARIO',
            entryId: entryId
        }
    } else {
        return {
            type: 'PREPARE_FIGHT'
        }
    }
}

export const startFight = () => {
    return {
        type: 'FIGHT_START'
    }
}

export const addEnemy = (name = "Enemy", health = 2, damage = 2, rounds = 2) => {
    return {
        type: 'ENEMY_ADD',
        name: name,
        health: health,
        damage: damage,
        rounds: rounds
    }
}

export const updateEnemy = (index: number, name: string, health?: number, damage?: number, rounds?: number) => {
    return {
        type: 'ENEMY_UPDATE',
        index: index,
        name: name,
        health: health,
        damage: damage,
        rounds: rounds
    }
}

export const removeEnemy = (index: number) => {
    return {
        type: 'ENEMY_REMOVE',
        index: index
    }
}
export const buildFight = (entryId: number) => {
    return {
        type: 'PREPARE_FIGHT_SCENARIO',
        entryId: entryId
    }
}
export const meleeAttack = (index: number, damage: number) => {
    return {
        type: 'MELEE_ATTACK',
        enemyIndex: index,
        damage: damage
    }
}

export const rangedAttack = (index: number) => {
    return {
        type: 'RANGED_ATTACK',
        enemyIndex: index
    }
}

const playerStateReducer = (state, action) => {
    _playerStateActions[action.type](state, action);
}

export const PlayerState = createContext(null);

export const usePlayerState = () => {
    return useContext(PlayerState);
}

export const PlayerStateProvider = ({ children }) => {
    const [state, dispatch] = useImmerReducer(playerStateReducer, playerState);
    return (
        <PlayerState.Provider value={{state, dispatch}}>
            {children}
        </PlayerState.Provider>
    )
}