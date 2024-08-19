'use client'

import React, { createContext, useContext } from 'react';
import { useImmerReducer } from 'use-immer';
import { diceThrow, diceScore } from '../../../utils/dice';

const Features = {
    SHADOW: 'shadow',
    VENOM: 'venom',
    REAPER: 'reaper',
    STAFF: 'staff',
    DOUBLE_DAMAGE: 'doubleDamage',
    NO_GOLD_RING_BONUS: 'noGoldRingBonus',
    DAMAGE_TOGETHER: 'damageTogether'
}

export interface Enemy {
    name: string
    health?: number
    damage?: number
    rounds?: number
}

export interface FightScenario {
    weapon?: string
    enemies: Enemy[]
    ranged?: boolean
    rangeBonusScoreSkillReq?: number
    modificator?: (state) => void
    onAfterRound?: (state) => boolean
    features?: (string | {id: string, [key: string]: any})[]
}

const fightScenarios: {[id:number]: FightScenario} = {
    10: { weapon: 'FLYNT', enemies: [
            {name: 'GUARD', rounds: 4, health: 3, damage: 2}
        ]},
    18: { weapon: 'FLYNT', enemies: [
            {name: 'OWEN THE GATEKEEPER', rounds: 5, health: 5, damage: 2}
        ]},
    26: { weapon: 'SHADOW BLADE', enemies: [
            {name: "ASH'S SHADOW", rounds: 4, health: 2, damage: 4}
        ],
        features: [
            Features.SHADOW
        ]},
    29: { weapon: 'FLYNT', enemies: [
            {name: 'HALF-HARLAN', rounds: 3, health: 2, damage: 1}
        ]},
    36: { weapon: 'FLYNT', enemies: [
            {name: 'HOODED FIGURE', rounds: 6, health: 5, damage: 2}
        ]},
    69: { weapon: 'FLYNT', enemies: [
            {name: 'WOAD GRIBLIN', rounds: 4, health: 4, damage: 2}
        ]},
    75: { weapon: 'FLYNT', enemies: [
            {name: 'BAT-HOUND', rounds: 4, health: 3, damage: 2}
        ]},
    86: { enemies: [
            {name: 'OLD PIRATE', rounds: 6, health: 4, damage: 2}
        ],
        modificator: (state) => {
            state.fight.weapon = !!state.inventory['FLYNT']
                ? itemMap['FLYNT']
                : itemMap['SILVER DAGGER']
        }},
    125: { weapon: 'FLYNT', enemies: [
            {name: 'ODAN BRITCHES', rounds: 5, health: 3, damage: 2}
        ]},
    129: { weapon: 'FLYNT', enemies: [
            { name: 'FIRST GUARD', rounds: 4, health: 2, damage: 3 }, 
            { name: 'SECOND GUARD', rounds: 2, health: 2, damage: 2 }, 
            { name: 'THIRD GUARD', rounds: 3, health: 3, damage: 2 }
        ],
        features: [
            Features.DAMAGE_TOGETHER
        ]},
    144: { weapon: 'SHADOW BLADE', enemies: [
            {name: 'SHADOW REAPER', rounds: 8, health: 4, damage: 4}
        ],
        modificator: (state) => {
            state.fight.features[Features.STAFF] = 
                confirm('Does enemy still have the staff:\nYes - Ok\nNo - Cancel')
        },
        features: [
            Features.SHADOW,
            Features.REAPER
        ]},
    154: { weapon: 'HATCHET', enemies: [
            {name: 'HOODED FIGURE', rounds: 5, health: 5, damage: 2}
        ]},
    167: { ranged: true, rangeBonusScoreSkillReq: 5, enemies: [
            { name: 'HOODED FIGURE' },
            { name: 'CITY GUARD' },
            { name: 'HOODED FIGURE' }
        ]},
    180: { weapon: 'FLYNT', enemies: [
            {name: 'KIDNAPPER', rounds: 6, health: 5, damage: 3}
        ]},
    192: { weapon: 'SHADOW BLADE', enemies: [
            {name: 'SHADOW WRAITH', rounds: 4, health: 2, damage: 4}
        ],
        features: [
            Features.SHADOW
        ]},
    198: { weapon: 'FLYNT', enemies: [
            {name: 'FIRST MARSH GOBLIN', rounds: 4, health: 3, damage: 2},
            {name: 'SECOND MARSH GOBLIN', rounds: 2, health: 2, damage: 2},
            {name: 'THIRD MARSH GOBLIN', rounds: 4, health: 3, damage: 2},
            {name: 'FOURTH MARSH GOBLIN', rounds: 2, health: 2, damage: 3},
            {name: 'FIFTH MARSH GOBLIN', rounds: 3, health: 2, damage: 2},
            {name: 'SIXTH MARSH GOBLIN', rounds: 3, health: 2, damage: 3}
        ],
        modificator: (state) => {
            //some goblins may be captured using net
            let captured = Number.parseInt(prompt('If you happen to capture goblins, enter their number here:', '0'))
            state.fight.enemies.splice(6 - captured, captured)
        }}, 
    205: { weapon: 'FLYNT', enemies: [
            {name: 'GUARD', rounds: 4, health: 3, damage: 3}
        ]},
    224: { weapon: 'SHADOW BLADE', enemies: [
            {name: 'SHADOW WRAITH', rounds: 4, health: 2, damage: 4}
        ],
        features: [
            Features.SHADOW
        ]},
    236: { weapon: 'FLYNT', enemies: [
            {name: 'STREET URCHIN', rounds: 2, health: 3, damage: 1}
        ]},
    252: { weapon: 'FLYNT', enemies: [
            {name: 'PRISON GUARD', rounds: 4, health: 3, damage: 2}
        ]},
    264: { weapon: 'FLYNT', enemies: [
            {name: 'TEMPLE GUARD', rounds: 6, health: 5, damage: 2}
        ],
        features: [
            Features.DOUBLE_DAMAGE
        ]},
    273: { weapon: 'FLYNT', enemies: [
            {name: 'CITY GUARD', rounds: 6, health: 5, damage: 2}
        ],
        onAfterRound: (state) => {
            if (!state.inventory['SILVER BRACELET'] || state.fight.enemies[0].rounds > 2) {
                return true;
            }
            state.messages.unshift('Special SILVER BRACELET option, Stopping the fight.')
            return false;
        }},
    281: { weapon: 'FLYNT', enemies: [
            {name: 'SHADOW REAPER', rounds: 8, health: 4, damage: 4}
        ],
        modificator: (state) => {
            state.fight.features[Features.STAFF] =
                confirm('Does enemy still have the staff:\nYes - Ok\nNo - Cancel')
        },
        features: [
            Features.SHADOW,
            Features.REAPER
        ]},
    302: { weapon: 'SHADOW BLADE', enemies: [
            {name: 'SHADOW WRAITH', rounds: 4, health: 2, damage: 4}
        ],
        features: [
            Features.SHADOW
        ]},
    328: { weapon: 'FLYNT', enemies: [
            { name: 'FIRST GUARD', rounds: 3, health: 2, damage: 3 },
            { name: 'SECOND GUARD', rounds: 3, health: 3, damage: 2 }
        ],
        features: [
            Features.DAMAGE_TOGETHER
        ]},
    334: { weapon: 'SHADOW BLADE', enemies: [
            {name: 'SHADOW REAPER', rounds: 8, health: 4, damage: 4}
        ],
        modificator: (state) => {
            state.fight.features[Features.STAFF] =
                confirm('Does enemy still have the staff:\nYes - Ok\nNo - Cancel')
        },
        features: [
            Features.SHADOW,
            Features.REAPER
        ]},
    338: { weapon: 'FLYNT', enemies: [
            {name: 'WOAD GRIBLIN', rounds: 4, health: 4, damage: 2}
        ]},
    368: { weapon: 'FLYNT', enemies: [
            {name: 'PUSTULA', rounds: 5, health: 5, damage: 2}
        ],
        features: [
            Features.VENOM
        ]},
    372: { enemies: [
            {name: 'SHADOW WRAITH', rounds: 4, health: 2, damage: 4}
        ],
        features: [
            Features.SHADOW
        ]},
    387: { enemies: [
            {name: 'SHADOW WRAITH', rounds: 4, health: 2, damage: 4}
        ],
        features: [
            Features.SHADOW
        ]},
    393: { ranged: true, rangeBonusScoreSkillReq: 8, enemies: [
            { name: 'WINGED BEAST' },
            { name: 'WINGED BEAST' },
            { name: 'WINGED BEAST' }
        ],
        features: [
            Features.NO_GOLD_RING_BONUS
        ]},
    426: { weapon: 'SHADOW BLADE', enemies: [
            {name: 'SHADOW WRAITH', rounds: 4, health: 2, damage: 4}
        ],
        features: [
            Features.SHADOW
        ]},
    429: { weapon: 'FLYNT', enemies: [
            {name: 'FIRST GUARD', rounds: 5, health: 2, damage: 2},
            {name: 'SECOND GUARD', rounds: 4, health: 3, damage: 3}
        ],
        features: [
            Features.DAMAGE_TOGETHER
        ]}
}

export interface Item {
    name: string
    aliases?: string[]
    armorDefense?: number
    protectsFromShadows?: boolean
    weaponScorePenalty?: number
    meleeWeapon?: boolean
}

const items: Item[] = [
    { name: 'ARROW', aliases: ['ARROWS'] },
    { name: 'BOW' },
    { name: 'HATCHET', meleeWeapon: true, weaponScorePenalty: 1 },
    { name: 'FLYNT', meleeWeapon: true, aliases: ['SWORD', 'FLINT'] },
    { name: 'LOCKET' },
    { name: 'SHADOW BLADE', meleeWeapon: true },
    { name: 'FIRECRACKERS', aliases: ['FIRECRACKER', 'FIRE CRACKERS', 'FIRE CRACKER'] },
    { name: 'YELLOW POUCH', aliases: ['POUCH'] },
    { name: 'ROPE WITH HOOK', aliases: ['ROPE AND HOOK'] },
    { name: 'SILVER BRACELET', aliases: ['BRACELET'] },
    { name: 'CHAINMAIL VEST', aliases: ['CHAINMAIL'], armorDefense: 1, protectsFromShadows: true }, //149
    { name: 'SILVER RING' },
    { name: 'GOLD RING' }, //379
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
    { name: 'LEATHER ARMOUR', aliases: ['LEATHER', 'LEATHER ARMOR'], armorDefense: 1, protectsFromShadows: false },
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
    rangeBonusScoreSkillReq?: number
    weapon: Item
    features: {[key: string]: any}
    onAfterRound?: (PlayerState) => boolean
}

const fightState: FightState = {
    enemies: [
    ],
    inFight: false,
    prepare: true,
    ranged: false,
    weapon: undefined,
    features: {}
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
    defence: number
    shadowDefence: number
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
    defence: 0,
    shadowDefence: 0,
    fight: fightState
}

const stopFight = (state: PlayerState) => {
    state.fight.inFight = false
    state.fight.enemies.length = 0
}

const checkFightOver = (state: PlayerState) => {
    let defeated = false;
    let enemiesAlive = 0;
    for (let enemy of state.fight.enemies) {
        if (enemy.health > 0) {
            enemiesAlive++;
            if (enemy.rounds == 0) {
                defeated = true;
            }
        }
    }
    if (defeated) {
        state.messages.unshift(`You lost the fight, undefeated ${enemiesAlive} enemy(ies)`)
        stopFight(state)
    } else if (enemiesAlive === 0) {
        state.messages.unshift('You won the fight')
        stopFight(state)
    } else if (state.fight.onAfterRound && !state.fight.onAfterRound(state)) {
        stopFight(state)
    }
}

const checkRangedFightOver = (state: PlayerState) => {

    let enemiesAlive = 0;

    for (let enemy of state.fight.enemies) {
        if (enemy.health > 0) {
            enemiesAlive++;
        }
    }
    if (enemiesAlive === 0) {
        state.fight.inFight = false
        state.messages.unshift('You won the fight')
    } else {
        let arrows = state.inventory['ARROW'] || 0

        if (arrows <= 0) {
            state.fight.inFight = false
            state.messages.unshift(`No arrows left. You lost the fight, undefeated ${enemiesAlive} enemy(ies)`)
            state.fight.enemies.length = 0
        }

    }

}

const prepareFightCommon = (state: PlayerState) => {
    state.fight.inFight = true
    state.fight.prepare = true
}
//
// const prepareCustomFight = (state) => {
//     prepareFightCommon(state)
//     state.fight.enemies.push({name: 'Enemy', health: 2, damage: 2, rounds: 2})
// }

const buildFightScenario = (state: PlayerState, scenario: FightScenario) => {
    prepareFightCommon(state)
    state.fight.enemies.push(...scenario.enemies.map(({ name, health, damage, rounds}) => ({
        name, health, damage, rounds
    })))
    state.fight.ranged = scenario.ranged
    if (scenario.rangeBonusScoreSkillReq) {
        state.fight.rangeBonusScoreSkillReq = scenario.rangeBonusScoreSkillReq
    }

    if (scenario.weapon) {
        state.fight.weapon = itemMap[scenario.weapon]
    }
    state.fight.features = scenario.features?.reduce((map, feat) => {
        if (typeof feat === 'object') {
            map[feat.id] = feat
        } else {
            map[feat] = true
        }
        return map
    }, {}) || {}
    if (scenario.modificator) {
        scenario.modificator(state)
    }
}

const checkGameOver = (state) => {
    if (state.health <= 0) {
        state.lost = true
        state.messages.unshift('You died. Game over.')
        reset(state)
        return true;
    }
    return false;
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

const isShadow = (state: PlayerState) => state.fight.features[Features.SHADOW];
const isVenom = (state: PlayerState) => state.fight.features[Features.VENOM];
const isReaper = (state: PlayerState) => state.fight.features[Features.REAPER];
const isDoubleDamage = (state: PlayerState) => state.fight.features[Features.DOUBLE_DAMAGE];
const isNoGoldRingBonus = (state: PlayerState) => state.fight.features[Features.NO_GOLD_RING_BONUS];
const isDamageTogether = (state: PlayerState) => state.fight.features[Features.DAMAGE_TOGETHER];
const isStaff = (state: PlayerState) => state.fight.features[Features.STAFF];

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
        state.defence = item.armorDefense ? item.armorDefense : state.defence
        state.shadowDefence = item.protectsFromShadows ? item.armorDefense : 0
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
            let roll = diceScore()
            score += roll
            message += ` ${roll}`
        }
        message += ` total: ${score}`
        state.messages.unshift(message)
    },
    'PREPARE_FIGHT_SCENARIO': (state, action) => {
        let scenario = fightScenarios[action.entryId]
        if (!scenario) {
            // prepareCustomFight(state)
            state.messages.unshift('Unknown entry')
        } else {
            buildFightScenario(state, scenario)
            state.messages.unshift('Fight begins!')
            state.fight.prepare = false
        }

    },
    // 'PREPARE_FIGHT': (state, action) => {
    //     state.fight.prepare = true
    //     state.fight.inFight = true
    //     state.fight.enemies.push({name: 'Enemy', health: 2, damage: 2, rounds: 2})
    //     state.messages.unshift('Set up your fight. Press START when ready')
    // },
    // 'FIGHT_START': (state, action) => {
    //     state.fight.prepare = false
    //     state.messages.unshift('Fight begins')
    // },
    // 'ENEMY_ADD': (state, action) => {
    //     state.fight.enemies.push({
    //         name: action.name,
    //         health: action.health,
    //         damage: action.damage,
    //         rounds: action.rounds
    //     })
    // },
    // 'ENEMY_UPDATE': (state, action) => {
    //     let enemy = state.fight.enemies[action.index]
    //     enemy.name = action.name
    //     if (action.health) {
    //         enemy.health = action.health
    //     }
    //     if (action.damage) {
    //         enemy.damage = action.damage
    //     }
    //     if (action.rounds) {
    //         enemy.rounds = action.rounds
    //     }
    // },
    // 'ENEMY_REMOVE': (state, action) => {
    //     state.fight.enemies.splice(action.index, 1)
    // },
    'END_FIGHT': (state, action) => {
        state.fight.inFight = false
        state.fight.enemies.length = 0
        state.messages.unshift('Fight ended manually')
    },
    'MELEE_ATTACK': (state, action) => {
        let enemy = state.fight.enemies[action.enemyIndex]
        let def = isShadow(state) ? state.shadowDefence : state.defence
        let minScore = 6 + action.damage - (state.fight.weapon.weaponScorePenalty || 0)
        let result = diceThrow([6,6])
        let double = result[0] === result[1]
        let dmgMultiplier = isDoubleDamage(state) && double ? 2 : 1
        let scoreBonus = !isNoGoldRingBonus(state) && state.inventory['GOLD RING'] ? 1 : 0
        let score = result.reduce((acc, d) => acc + d, 0) + scoreBonus
        let message = ''

        if (isStaff(state) && double) {
            message += `Double!. You zapped for the 1 damage.`
            state.health -= 1;
        }

        message += `Melee attack on ${enemy.name} with score ${score} vs ${minScore} :`
        if (score >= minScore) {
            if (!isReaper(state) || state.abilities.skill >= 9 || diceScore() >= 4) {
                message += ' hit'
                enemy.health -= action.damage
            } else {
                message += 'attack phased through, no damage'
            }
        } else {
            message += ' miss'
            if (isVenom(state) && diceScore() % 2 === 0) dmgMultiplier*=2
            let aliveEnemyDamageTotal = isDamageTogether(state)
                ? state.fight.enemies
                    .filter(enemy => enemy.health > 0)
                    .reduce((total, enemy) => total + enemy.damage * dmgMultiplier - def, 0)
                : enemy.damage * dmgMultiplier  - def
            state.health -= aliveEnemyDamageTotal
            message += ` and you are hit for ${aliveEnemyDamageTotal} damage`
        }
        enemy.rounds -= 1

        state.messages.unshift(message)

        const isOver = checkGameOver(state)
        isOver || checkFightOver(state)
    },
    'RANGED_ATTACK': (state, action) => {
        let enemy = state.fight.enemies[action.enemyIndex]

        let scoreBonus = !isNoGoldRingBonus(state) && state.inventory['GOLD RING'] ? 1 : 0
        let score = diceScore() + scoreBonus
        let message = `Ranged attack on ${enemy.name} with score ${score} : `
        if (state.abilities.skill >= state.fight.rangeBonusScoreSkillReq) {
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

export const endFightManual = () => ({
        type: 'END_FIGHT'
    })

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