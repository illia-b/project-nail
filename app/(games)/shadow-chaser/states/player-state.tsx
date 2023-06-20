'use client'

import React, { createContext, useContext } from 'react';
import { useImmerReducer } from 'use-immer';


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
    weapon: {
        scorePenalty: number
    },
    armor: {
        defense: number
    }
}

const fightState: FightState = {
    enemies: [
    ],
    inFight: false,
    prepare: true,
    ranged: false,
    weapon: {
        scorePenalty: 0
    },
    armor: {
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
        if (!state.inventory[action.item]) {
            state.inventory[action.item] = 0
        }
        state.inventory[action.item] += action.delta || 1
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

    'FIGHT_PREPARE': (state, action) => {
        state.fight.prepare = true
        state.fight.inFight = true
        state.messages.unshift('Prepare for fight')
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
    'ENEMY_REMOVE': (state, action) => {
        state.fight.enemies.splice(action.index, 1)
    },
    'MELEE_ATTACK': (state, action) => {
        let enemy = state.fight.enemies[action.enemyIndex]

        let minScore = 6 + action.damage - state.fight.weapon.scorePenalty
        let score = Math.floor(Math.random() * 12) + 1

        let message = `Melee attack on ${enemy.name} with score ${score} vs ${minScore} :`
        if (score >= minScore) {
            message += ' hit'
            enemy.health -= action.damage
        } else {
            message += ' miss'
            state.health -= enemy.damage
            message += ` and you are hit for ${enemy.damage} damage`
        }
        enemy.rounds -= 1

        state.messages.unshift(message)

        checkFightOver(state)
        checkGameOver(state)
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

export const prepareFight = () => {
    return {
        type: 'FIGHT_PREPARE'
    }
}

export const startFight = () => {
    return {
        type: 'FIGHT_START'
    }
}

export const addEnemy = (name: string, health: number, damage: number, rounds: number) => {
    return {
        type: 'ENEMY_ADD',
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

export const meleeAttack = (index: number, damage: number) => {
    return {
        type: 'MELEE_ATTACK',
        enemyIndex: index,
        damage: damage
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