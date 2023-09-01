'use client'

import { usePlayerState, startFight } from "../../states/player-state"
import Button from "../../../../components/button"

const PreparePhase = () => {
    const {state, dispatch} = usePlayerState()

    let canStart = state.fight.enemies.length > 0

    const fight = () => {
        dispatch(startFight())
    }

    return <>
        <div>
            <Button className="text-2xl pb-2 pt-1 rounded-lg" disabled={!canStart} onClick={fight}>Fight!</Button>
        </div>
    </>
}

export default PreparePhase