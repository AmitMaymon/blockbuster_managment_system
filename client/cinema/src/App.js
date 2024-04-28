
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login';
import SignUp from './components/SignUp';
import Main from './components/Main';
import ManageUsers from './components/Users/ManageUsers';


function App() {


  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        {/* <Route path='/users' element={<ManageUsers/>}/> */}
        <Route path='/' element={<Main/>}/>
      
      </Routes>
    </div>
  );
}

export default App;
