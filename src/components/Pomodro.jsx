import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AiOutlinePlayCircle, AiOutlinePauseCircle } from 'react-icons/ai'
import { GrPowerReset } from 'react-icons/gr'
import { useEffect, useState } from "react";

function Pomodro({ user }) {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [timer, setTimer] = useState();
    const [timerMode, setTimerMode] = useState(false);

    const timeMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const timeSeconds = seconds < 10 ? `0${seconds}` : seconds;

    const start = () => {
        let timer = setInterval(() => {
            if (seconds === 0) {
                setMinutes(minutes - 1);
                setSeconds(59);
            } else {
                setSeconds(seconds - 1)
            }

            setTimer(timer);
        }, 1000);
    }

    const signout = async () => {
        await signOut(auth);
    }

    useEffect(() => {

        if (timerMode) {
            start();
        }

        if (minutes === 0 && seconds === 0) {
            clearInterval(timer);
        }

        return () => { clearInterval(timer); }
    }, [timer, seconds, timerMode, minutes])

    return (
        <>
            <div className="flex items-center justify-between mt-8 px-10">
                <h3>Hello, {user.displayName}</h3>
                <button className="bg-[#4285F4] p-3 rounded-lg cursor-pointer" onClick={signout}>Sign Out</button>
            </div>

            <div className="flex flex-col items-center justify-center space-y-8">
                <h1 className="mt-10">Pomodro Timer</h1>

                <div className="text-6xl">{timeMinutes} : {timeSeconds}</div>

                <div className="flex items-center justify-between space-x-6 mt-8 cursor-pointer">
                    <AiOutlinePlayCircle size={50} onClick={() => setTimerMode(true)} />
                    <AiOutlinePauseCircle size={50} onClick={() => setTimerMode(false)} />
                    <GrPowerReset size={50} />
                </div>
            </div>
        </>
    )
}

export default Pomodro;