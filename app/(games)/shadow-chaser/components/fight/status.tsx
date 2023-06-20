"use client"

import Button from "../../../../components/button"
import { usePlayerState, prepareFight, startFight } from "../../states/player-state"

const FightStatus = () => {
    const {state, dispatch} = usePlayerState()

    return (<>
        {!state.fight.inFight && <div>
            <Button onClick={() => dispatch(prepareFight())}>Prepare a fight</Button>
        </div>}
        {state.fight.inFight && <div>
            {/* {!state.prepare && <Button onClick={() => dispatch(prepareFight())}>Prepare a fight</Button>} */}
            {state.fight.prepare && state.fight.enemies.length > 0 && <Button onClick={() => dispatch(startFight())}>Fight!</Button>}
        </div>}
    </>)
}
export default FightStatus