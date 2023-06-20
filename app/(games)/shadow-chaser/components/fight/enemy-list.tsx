'use client'

import { usePlayerState } from "../../states/player-state"
import Enemy from "./enemy"
import RangedEnemy from "./ranged-enemy"

const EnemyList = () => {
    const { state, dispatch } = usePlayerState()
    let enemies = []
    for (let i = 0, len = state.fight.enemies.length; i < len; i++) {
        enemies.push(state.fight.ranged ? <RangedEnemy key={i} index={i} /> : <Enemy key={i} index={i} />)        
    }

    return (
        <>
            <div>
                {enemies}
            </div>
        </>
    )
}

export default EnemyList