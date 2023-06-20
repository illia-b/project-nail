"use client"

import FightStatus from "./status"
import PreparePhase from "./prepare-phase"
import EnemyList from "./enemy-list"

const FightContainer = () => {
    return (
        <>
            <FightStatus />
            <EnemyList />
            <PreparePhase />
        </>
    )
}

export default FightContainer