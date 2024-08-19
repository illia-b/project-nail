"use client"

import PreparePhase from "./prepare-phase"
import EnemyList from "./enemy-list"
import { FightBuilder } from './fight-builder'
import { usePlayerState } from "../../states/player-state"

const FightContainer = () => {
    const {state, dispatch} = usePlayerState()

    return <>
        { !state.fight.inFight && <FightBuilder /> }
        { false && state.fight.inFight && state.fight.prepare && <PreparePhase /> }
        { state.fight.inFight && <EnemyList />}
    </>
}

export default FightContainer