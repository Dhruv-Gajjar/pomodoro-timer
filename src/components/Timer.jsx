import { signOut } from "firebase/auth";
import { auth } from "../firebase";




function Timer({ user }) {

    const signout = async () => {
        await signOut(auth);
    }

    return (
        <div>
            <h3>Hello, {user.displayName}</h3>
            <button className="bg-[#4285F4] p-3 rounded-lg cursor-pointer" onClick={signout}>Sign Out</button>
        </div>
    )
}

export default Timer;