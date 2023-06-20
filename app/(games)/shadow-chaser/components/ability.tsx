"use client"

import { usePlayerState, changeAbility } from "../states/player-state"
import Button from "../../../components/button"

const labels = {
    dexterity: "Athletecism",
    perception: "Six Sense",
    constitution: "Endurance",
    skill: "Skill",
}

const Ability = ({name}) => {
    const {state, dispatch} = usePlayerState()

    return (
        <>
            <div className="w-full flex justify-between">
                <span className="inline-block">{labels[name]}: </span>
                <div className="w-1/3 flex justify-between">
                    <Button disabled={state.abilities[name] == 0} onClick={() => dispatch(changeAbility(name, -1))}>➖</Button> 
                    <span className="
                        inline-block
                        w-12
                        text-center
                        border-2
                        border-gray-400
                        rounded-md
                    ">{state.abilities[name]}</span>
                    <Button onClick={() => dispatch(changeAbility(name, 1))}>➕</Button>
                </div>
            </div>
        </>
    )
}
export default Ability