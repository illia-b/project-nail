'use client'

import { startFight, usePlayerState } from "../../states/player-state"
import Button from "../../../../components/button"
import AddEnemy from "./add-enemy"
import EnemyList from "./enemy-list"

const PreparePhase = () => {
    const {state, dispatch} = usePlayerState()
    var preparing = state.fight.inFight && state.fight.prepare  
    return (<>
        {preparing && <div>
            <AddEnemy />
        </div>}
    </>)
}
export default PreparePhase