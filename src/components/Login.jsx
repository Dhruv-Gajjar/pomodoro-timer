import { FcGoogle } from 'react-icons/fc';
import { googleSignIn } from '../firebase'

function Login() {

    const login = async () => {
        await googleSignIn();
    }


    return (
        <div className="h-screen flex flex-col items-center justify-content-center">
            <div className='m-auto'>
                <h2 className="text-center">Login</h2>

                <div className='flex items-center justify-content-center space-x-4 bg-[#4285F4] p-3 rounded-lg cursor-pointer mt-8'>
                    <FcGoogle size={22} />
                    <button onClick={login}>Login in with Google</button>
                </div>
            </div>
        </div>
    );
}

export default Login;
