import Link from 'next/link'
import Button from './components/button'

export default function StartPage() {
    return (
        <>
            <div className="bg-white p-4 rounded-2xl">
                <h1 className="pb-3 text-xl font-semibold">Hello, Gamer!</h1>
                <h2 className="text-lg">What do you want to play?</h2>
                <Link href="/shadow-chaser"><Button className="text-lg py-1 px-3 mt-4">Shadow Chaser</Button></Link></div></>
    )
}