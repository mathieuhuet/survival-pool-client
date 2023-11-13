// Cannot access Login or Register page when signed in
import { Route, Routes, Navigate } from 'react-router-dom';
import User from '../Pages/User/user';
import Main from '../Pages/Main/main';




const SignedInRoute = () => {
  return (
    <Routes>
      <Route
        path="/user"
        element={<User />}
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