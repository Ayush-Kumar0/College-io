import React from 'react';
import { Signup } from './components/signup/Signup';
import { Signin } from './components/signin/Signin';



// const [user, setUser] = useState(null);
// const handleLogin = async () => {
//   window.open("https://localhost:8000/auth/google");
// }
function App() {

  return (
    <>
      <Signin />
    </>
  );
}

export default App;
