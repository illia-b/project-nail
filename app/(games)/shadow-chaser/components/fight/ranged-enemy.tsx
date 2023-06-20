'use client'

import { removeEnemy, usePlayerState, rangedAttack } from "../../states/player-state"
import Button from "../../../../components/button"

const RangedEnemy = ({index}) => {
    const { state, dispatch } = usePlayerState()

    let enemy = state.fight.enemies[index]
    let status = (<div className="flex justify-between w-48">
        <span>💀: {enemy.health}</span>
    </div>)

    const attack = (enemyIndex) => {
        dispatch(rangedAttack(enemyIndex))
    }

    return (
        <>
            <div className="flex w-80 justify-between">
                <span>{enemy.name}</span>
                {status}
                {state.fight.prepare && <button onClick={() => dispatch(removeEnemy(index))}>❌</button>}
            </div>
            {state.fight.inFight && !state.fight.prepare && <div className="flex w-full justify-between">
                <Button onClick={() => attack(index)}>Attack</Button>
            </div>}
        </>
    )
}

export default RangedEnemy