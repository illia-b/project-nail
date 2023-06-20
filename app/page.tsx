import Link from 'next/link'
import Button from './components/button'

export default function StartPage() {
    return (
        <>
        <h1>Hello, Gamer!</h1>
        <h2>What do you want to play?</h2>
        <Link href="/shadow-chaser"><Button>Shadow Chaser</Button></Link>
        </>
    )
}