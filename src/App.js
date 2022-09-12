import { useEffect, useState } from 'react';
import Login from "./components/Login";
import { auth } from "./firebase"
import Pomodro from './components/Pomodro';

function App() {
  const [user, setUser] = useState({});


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => setUser(user));

    return () => unsubscribe();
  }, [])


  return (
    <div className="w-full h-screen bg-[#1B1A17] text-[#fff] overflow-hidden">
      {!user ? <Login /> : <Pomodro user={user} />}
    </div>
  );
}

export default App;
