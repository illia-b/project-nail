import ActionsList from "./components/actions-list";
import FightContainer from "./components/fight/container";
import PlayerStatus from "./components/player-status";
import Messages from "./components/messages";

const ShadowsChaser = () => {
    return (<div className="grid h-screen place-items-center">
                <div className="flex flex-col w-screen h-full text-xl absolute space-y-1 sm:w-96">
                    <h1 className="text-center h-8 text-2xl bg-slate-500">Shadow Chaser</h1>
                    <Messages />
                    <PlayerStatus />
                    <ActionsList />
                    <FightContainer />
                </div>
            </div>)
}

export default ShadowsChaser