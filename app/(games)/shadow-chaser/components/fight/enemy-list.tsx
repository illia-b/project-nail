'use client'

import Button from "../../../../components/button"
import {usePlayerState, addEnemy, endFightManual} from "../../states/player-state"
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
            {!state.fight.prepare &&
                <Button onClick={() => dispatch(endFightManual())} >End Fight</Button>
            }
        </>
    )
}

export default EnemyList