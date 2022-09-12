import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AiOutlinePlayCircle, AiOutlinePauseCircle } from 'react-icons/ai'
import { BiReset } from 'react-icons/bi'
import { FiLogOut } from "react-icons/fi"
import { useEffect, useState } from "react";

function Pomodro({ user }) {
    const [workTime, setWorkTime] = useState(25);
    const [breakTime, setBreakTime] = useState(5);
    const [seconds, setSeconds] = useState(0);
    const [timer, setTimer] = useState();
    const [timerMode, setTimerMode] = useState(false);
    const [mode, setMode] = useState('work');

    const workMinutes = workTime < 10 ? `0${workTime}` : workTime;
    const breakMinutes = breakTime < 10 ? `0${breakTime}` : breakTime;
    const timeSeconds = seconds < 10 ? `0${seconds}` : seconds;

    const start = () => {
        let interval = setInterval(() => {
            if (mode === 'work') {
                if (workTime === 0 && seconds === 0) {
                    clearInterval(timer);
                } else if (seconds === 0) {
                    setWorkTime(workTime - 1)
                    setSeconds(59);
                } else {
                    setSeconds(seconds - 1)
                }
            }

            if (mode === 'break') {
                if (breakTime === 0 && seconds === 0) {
                    clearInterval(timer);
                } else if (seconds === 0) {
                    setBreakTime(breakTime - 1)
                    setSeconds(59);
                } else {
                    setSeconds(seconds - 1)
                }
            }

            setTimer(interval);
        }, 1000);
    }

    const signout = async () => {
        await signOut(auth);
    }


    const reset = () => {
        setTimer();
        clearInterval(timer);
        setTimerMode(false);
        setWorkTime(25);
        setBreakTime(5);
        setSeconds(0);
    }

    useEffect(() => {

        if (timerMode) {
            start();
        }

        if (workTime === 0 && seconds === 0) {
            setMode('break');
            setBreakTime(5);
        }

        if (breakTime === 0 && seconds === 0) {
            setMode('work')
            setWorkTime(25);
        }

        return () => { clearInterval(timer); }
    }, [timer, seconds, timerMode, mode])


    return (
        <>
            <div className="flex items-center justify-between mx-8 p-4 border-solid border-b-2 border-[#4285F4]">
                <h3>Hello, {user.displayName}</h3>
                <div className="flex items-center justify-center space-x-3 ring-2 ring-[#4285F4] ring-inset p-3 rounded-lg cursor-pointer">
                    <FiLogOut />
                    <button onClick={signout}>Sign Out</button>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center mt-4 space-y-6">
                <h1 className="font-bold">Pomodro Timer</h1>
                {mode === 'work'
                    ? <h3 className="text-4xl font-bold text-[#42855B]">WORK</h3>
                    : <h3 className="text-4xl font-bold text-[#C84B31]">BREAK</h3>}
                <div className="text-6xl">{
                    mode === 'work'
                        ? <div className="flex items-center justify-center w-[300px] h-[300px] ring-2 ring-[#42855B] ring-inset rounded-full text-[#42855B]">{workMinutes} : {timeSeconds}</div>
                        : <div className="flex items-center justify-center w-[300px] h-[300px] ring-2 ring-[#C84B31] ring-inset rounded-full text-[#C84B31]">{breakMinutes} : {timeSeconds}</div>
                }</div>

                <div className="flex items-center justify-between space-x-6 cursor-pointer text-[#fff]">
                    <AiOutlinePlayCircle size={50} onClick={() => setTimerMode(true)} />
                    <AiOutlinePauseCircle size={50} onClick={() => setTimerMode(false)} />
                    <BiReset size={50} onClick={reset} />
                </div>
            </div>
        </>
    )
}

export default Pomodro;