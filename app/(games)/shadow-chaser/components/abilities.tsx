"use client"

import exp from "constants"
import { usePlayerState } from "../states/player-state"
import Ability from "./ability"


const Abilities = () => {
    return (
        <>
            <Ability name={'perception'} />
            <Ability name={'dexterity'} />
            <Ability name={'constitution'} />
            <Ability name={'skill'} />
        </>
    )
}

export default Abilities