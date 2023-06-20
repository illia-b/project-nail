"use client"

import exp from "constants"
import { usePlayerState } from "../states/player-state"
import Ability from "./ability"


const Abilities = () => {
    const {state, reducer} = usePlayerState()

    return (
        <>
            <Ability name={'dexterity'} />
            <Ability name={'perception'} />
            <Ability name={'constitution'} />
            <Ability name={'skill'} />
        </>
    )
}

export default Abilities