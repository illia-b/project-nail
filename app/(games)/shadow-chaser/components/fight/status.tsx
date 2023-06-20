'use client'

import Button from '../../../../components/button'
import { usePlayerState, prepareFight, startFight } from '../../states/player-state'

const FightStatus = () => {
    const {state, dispatch} = usePlayerState()

    return (<>
        {!state.fight.inFight && <div>
            <Button onClick={() => dispatch(prepareFight(false))}>Melee fight</Button>
            <Button onClick={() => dispatch(prepareFight(true))}>Ranged fight</Button>
        </div>}
        {state.fight.inFight && <div>
            {state.fight.prepare && state.fight.enemies.length > 0 && <Button onClick={() => dispatch(startFight())}>Fight!</Button>}
        </div>}
    </>)
}
export default FightStatus