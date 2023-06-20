'use client'

import { useState, useRef, useEffect } from "react"
import Button from "../../../../components/button"
import { addEnemy, usePlayerState } from "../../states/player-state"

const AddEnemy = () => {
    const {state, dispatch} = usePlayerState()
    const enemyInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        enemyInputRef.current.onkeydown = (e) => {
            if (e.key === 'Enter') {
                confirmEnemy()
            }
        }
    }, [])

    const maxHealth = 10
    const maxRounds = 10
    const maxDamage = 10

    const [health, setHealth] = useState(Math.floor(maxHealth / 3))
    const [rounds, setRounds] = useState(Math.floor(maxRounds / 3))
    const [damage, setDamage] = useState(Math.floor(maxDamage / 3))

    const makeSelectBar = (
        icon: string,
        max: number,
        value: number,
        setValue: (value: number) => void) => {
        let selectBar = []
        for (let i = 0; i < max; i++) {
            if (i == 5) {
                selectBar.push(<span key={'spacer' + i} className="inline-block w-2"> </span>)
            }
            let bgColor = i < value ? "bg-blue-500" : "bg-gray-500";
            selectBar.push(
            <span key={i} onClick={() => setValue(i + 1)} className={
            "rounded-md border-1 border-gray-500 inline-block w-7 text-center " + bgColor }>
                {icon}
            </span>)
        }
        return selectBar
    }

    let healthBar = makeSelectBar("💀", maxHealth, health, setHealth)
    let roundBar = makeSelectBar("⏳", maxRounds, rounds, setRounds)
    let damageBar = makeSelectBar("🗡", maxDamage, damage, setDamage)

    const confirmEnemy = () => {
        dispatch(addEnemy(enemyInputRef.current.value.toUpperCase(), health, damage, rounds))
        enemyInputRef.current.value = ""
    }

    return (
        <>
        <div>
            <span className="inline-block w-20">Enemy: </span>
            <input 
                className="border-1 border-gray-400 rounded-md px-1" 
                ref={enemyInputRef} type="text" placeholder="Name"/>            
            <Button onClick={confirmEnemy}>➕</Button>
        </div>
        <div>
            <span className="inline-block w-20">Health: </span>
            {healthBar}
        </div>
        <div>
            <span className="inline-block w-20">Rounds: </span>
            {roundBar}
        </div>
        <div>
            <span className="inline-block w-20">Damage: </span>
            {damageBar}
        </div>
        </>
    )
}

export default AddEnemy