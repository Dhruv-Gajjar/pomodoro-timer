import { useEffect, useState } from 'react';
import Login from "./components/Login";
import { auth } from "./firebase"
import Timer from './components/Timer';

function App() {
  const [user, setUser] = useState({});


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => setUser(user));

    return () => unsubscribe();
  }, [])


  return (
    <div className="w-full h-full">
      {!user ? <Login /> : <Timer user={user} />}
    </div>
  );
}

export default App;
