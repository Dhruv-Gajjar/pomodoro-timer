import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AiOutlinePlayCircle, AiOutlinePauseCircle } from 'react-icons/ai'
import { GrPowerReset } from 'react-icons/gr'

function Pomodro({ user }) {

    const signout = async () => {
        await signOut(auth);
    }

    return (
        <>
            <div className="flex items-center justify-between mt-8 px-10">
                <h3>Hello, {user.displayName}</h3>
                <button className="bg-[#4285F4] p-3 rounded-lg cursor-pointer" onClick={signout}>Sign Out</button>
            </div>

            <div className="flex flex-col items-center justify-center space-y-8">
                <h1 className="mt-10">Pomodro Timer</h1>

                <div className="text-6xl">25 : 00</div>

                <div className="flex items-center justify-between space-x-6 mt-8 cursor-pointer">
                    <AiOutlinePlayCircle size={50} />
                    <AiOutlinePauseCircle size={50} />
                    <GrPowerReset size={50} />
                </div>
            </div>
        </>
    )
}

export default Pomodro;