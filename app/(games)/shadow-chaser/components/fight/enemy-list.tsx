'use client'

import Button from "../../../../components/button"
import { usePlayerState, addEnemy } from "../../states/player-state"
import Enemy from "./enemy"

const EnemyList = () => {
    const { state, dispatch } = usePlayerState()
    let enemies = []
    for (let i = 0, len = state.fight.enemies.length; i < len; i++) {
        enemies.push(<Enemy key={i} index={i} />)        
    }

    return (
        <>
            {state.fight.prepare && <span>
                Enemies:
                <Button onClick={() => dispatch(addEnemy())} >➕</Button>
            </span>}
            <div>
                {enemies}
            </div>
        </>
    )
}

export default EnemyList