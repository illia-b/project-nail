'use client'

import { removeEnemy, usePlayerState, meleeAttack as meleeAttackAction } from "../../states/player-state"
import EnemyBuilder from "./enemy-builder"
import Button from "../../../../components/button"

const Enemy = ({index}) => {
    const { state, dispatch } = usePlayerState()

    let enemy = state.fight.enemies[index]
    let status = (<div className="flex justify-between w-36">
        <span>💀: {enemy.health}</span>
        <span>⌛: {enemy.rounds}</span>
        <span>⚔: {enemy.damage}</span>
    </div>)

    const meleeAttack = (enemyIndex, damage) => {
        dispatch(meleeAttackAction(enemyIndex, damage))
    }
    const simpleAttack = (enemyIndex) => {
        meleeAttack(enemyIndex, 1)
    }
    const strongAttack = (enemyIndex) => {
        meleeAttack(enemyIndex, 3)
    }
    const superAttack = (enemyIndex) => {
        meleeAttack(enemyIndex, 5)
    }

    return (
        <>
            {!state.fight.prepare && <div className="pt-2 text-xl flex w-96 justify-between">
                <span>{enemy.name}</span>
                {status}
            </div>}
            {state.fight.prepare && <EnemyBuilder index={index} />}
            {!state.fight.prepare && <div className="flex w-full justify-between">
                <div className="flex w-96 justify-evenly">
                    <Button onClick={() => simpleAttack(index)}>🗡 1 DP</Button>
                    <Button onClick={() => strongAttack(index)}>🗡 3 DP</Button>
                    <Button onClick={() => superAttack(index)}>🗡 5 DP</Button>
                </div>
            </div>}
        </>
    )
}

export default Enemy