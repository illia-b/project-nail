'use client'

import { removeEnemy, usePlayerState, meleeAttack as meleeAttackAction } from "../../states/player-state"
import Button from "../../../../components/button"

const Enemy = ({index}) => {
    const { state, dispatch } = usePlayerState()

    let enemy = state.fight.enemies[index]
    let status = (<div className="flex justify-between w-48">
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

    let attackOptions = (<>
    {state.ranged ? 
        <span>
        </span>
        :
        <div className="flex w-80 justify-between">
            <Button onClick={() => simpleAttack(index)}>1 DP Attack</Button>
            <Button onClick={() => strongAttack(index)}>3 DP Attack</Button>
            <Button onClick={() => superAttack(index)}>5 DP Attack</Button>
        </div>
    }
    </>)

    return (
        <>
            <div className="flex w-80 justify-between">
                <span>{enemy.name}</span>
                {status}
                {state.fight.prepare && <button onClick={() => dispatch(removeEnemy(index))}>❌</button>}
            </div>
            {state.fight.inFight && !state.fight.prepare && <div className="flex w-full justify-between">
                {attackOptions}
            </div>}
        </>
    )
}

export default Enemy