// Cannot access Login or Register page when signed in
import { Route, Routes, Navigate } from 'react-router-dom';
import User from '../Pages/User/user';
import ModifyEmail from '../Pages/User/ModifyEmail/modifyEmail';
import ModifyName from '../Pages/User/ModifyName/modifyName';
import ModifyUsername from '../Pages/User/ModifyUsername/modifyUsername';
import Main from '../Pages/Main/main';




const SignedInRoute = () => {
  return (
    <Routes>
      <Route
        path="/user"
        element={<User />}
      />
      <Route
        path="/user/modifyEmail"
        element={<ModifyEmail />}
      />
      <Route
        path="/user/modifyName"
        element={<ModifyName />}
      />
      <Route
        path="/user/modifyUsername"
        element={<ModifyUsername />}
      />
      
      <Route 
        path="/" 
        element={<Main />} 
      />
      <Route
        path="*"
        element={<Navigate to="/" replace={true} />}
      />
    </Routes>
  )
}

export default SignedInRoute;