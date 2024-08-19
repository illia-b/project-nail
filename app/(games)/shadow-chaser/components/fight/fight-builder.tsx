'use client'

import {FC, useState, useRef, useEffect } from 'react';
import Button from '../../../../components/button';
import {usePlayerState, buildFight} from '../../states/player-state';

export const FightBuilder: FC = () => {
    const { state, dispatch } = usePlayerState()
    const [ emptyInput, setEmptyInput ] = useState(false);
    const entryInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        entryInputRef.current.onkeydown = (e) => {
            setEmptyInput(entryInputRef.current.value === '')
        }
    }, [])

    function startAFight() {
        let entryId = Number.parseInt(entryInputRef.current.value)
        dispatch(buildFight(entryId))
    }

    return <div>
        <Button disabled={emptyInput} onClick={startAFight} className="text-2xl pb-2 pt-1 rounded-lg">START FIGHT</Button>
        <input className="w-20 text-2xl font-semibold text-center rounded-lg px-2 pb-2 pt-1 border-2 border-gray-400 valid:bg-blue-200 invalid:bg-red-200" ref={entryInputRef} placeholder='#' type="text" pattern="\d[1-3]" />
    </div>
}
