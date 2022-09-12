import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AiOutlinePlayCircle, AiOutlinePauseCircle } from 'react-icons/ai'
import { GrPowerReset } from 'react-icons/gr'
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
        }, 10);
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
            <div className="flex items-center justify-between mt-8 px-10">
                <h3>Hello, {user.displayName}</h3>
                <button className="bg-[#4285F4] p-3 rounded-lg cursor-pointer" onClick={signout}>Sign Out</button>
            </div>

            <div className="flex flex-col items-center justify-center space-y-8">
                <h1 className="mt-10">Pomodro Timer</h1>
                {mode === 'work' ? "WORK" : "BREAK"}
                <div className="text-6xl">{
                    mode === 'work' ? <div>{workMinutes} : {timeSeconds}</div> : <div>{breakMinutes} : {timeSeconds}</div>
                }</div>

                <div className="flex items-center justify-between space-x-6 mt-8 cursor-pointer">
                    <AiOutlinePlayCircle size={50} onClick={() => setTimerMode(true)} />
                    <AiOutlinePauseCircle size={50} onClick={() => setTimerMode(false)} />
                    <GrPowerReset size={50} onClick={reset} />
                </div>
            </div>
        </>
    )
}

export default Pomodro;