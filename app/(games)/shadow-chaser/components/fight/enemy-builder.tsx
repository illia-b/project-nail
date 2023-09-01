'use client'

import { useState, useRef, useEffect } from "react"
import Button from "../../../../components/button"
import { usePlayerState, updateEnemy, removeEnemy } from "../../states/player-state"

const EnemyBuilder = ({index}) => {
    const {state, dispatch} = usePlayerState()

    let enemy = state.fight.enemies[index]

    const maxHealth = 5
    const maxRounds = 8
    const maxDamage = 4


    const setName = (event) => {
        dispatch(updateEnemy(index, event.target.value, enemy.health, enemy.damage, enemy.rounds))
    }

    const setHealth = (value) => {
        dispatch(updateEnemy(index, enemy.name, value, enemy.damage, enemy.rounds))
    }

    const setRounds = (value) => {
        dispatch(updateEnemy(index, enemy.name, enemy.health, enemy.damage, value))
    }

    const setDamage = (value) => {
        dispatch(updateEnemy(index, enemy.name, enemy.health, value, enemy.rounds))
    }

    const makeSelectBar = (
        icon: string,
        max: number,
        value: number,
        setValue: (number) => void) => {
        let selectBar = []
        for (let i = 0; i < max; i++) {
            if (i == 4) {
                selectBar.push(<span key={'spacer' + i} className="inline-block w-2"> </span>)
            }
            let bgColor = i < value ? "bg-blue-500" : "bg-gray-500";
            selectBar.push(
            <span key={i} onClick={() => setValue(i + 1)} className={
            "rounded-md border-1 border-gray-500 inline-block w-7 text-center " + bgColor }>
                {icon}
            </span>)
        }
        return selectBar
    }

    let healthBar = makeSelectBar("💀", maxHealth, enemy.health, setHealth)
    let roundBar = makeSelectBar("⏳", maxRounds, enemy.rounds, setRounds)
    let damageBar = makeSelectBar("🗡", maxDamage, enemy.damage, setDamage)

    const ranged = state.fight.ranged

    return (
        <>
        <div>
            <span className="inline-block w-20">Enemy: </span>
            <input 
                className="border-1 border-gray-400 rounded-md px-1" 
                value={enemy.name} type="text" placeholder="Name" onChange={setName}/>
            {state.fight.prepare && <button onClick={() => dispatch(removeEnemy(index))}>❌</button>}
        </div>
        {!ranged && <div>
            <span className="inline-block w-20">Health: </span>
            {healthBar}
        </div>}
        {!ranged && <div>
            <span className="inline-block w-20">Rounds: </span>
            {roundBar}
        </div>}
        {!ranged && <div>
            <span className="inline-block w-20">Damage: </span>
            {damageBar}
        </div>}
        </>
    )
}

export default EnemyBuilder