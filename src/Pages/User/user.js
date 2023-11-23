import './user.css'
import React, { useEffect, useState } from 'react';
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../Services/userServices/logout';
import ProfileIcon from '../../Components/ProfileIcon/profileIcon';


const initialState = {
  firstName: '',
  lastName: '',
};

const User = () => {
  let navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['accessToken']);
  //Profile section
  const [state, setState] = useState(initialState);

  useEffect(() => {
    setState(JSON.parse(localStorage.getItem('user')));
  }, [cookies.userToken])

  const disconnect = () => {
    logoutUser(cookies.accessToken);
    setCookie('accessToken', '');
  }

  return (
    <div className='user-page'>
      <div style={{display: 'flex'}}>
        <ProfileIcon
            firstName={state.firstName}
            lastName={state.lastName}
            color={state.profileIconColor}
            backgroundColor={state.profileIconBackgroundColor}
            size={100}
        />
        <button
          className='user-disconnectButton'
          onClick={disconnect}
        >
          Se Déconnecter
        </button>
      </div>
      <div>
        <h1 style={{color: '#82bf00'}}>
          nom: {state.firstName} {state.lastName}
        </h1>
        <button
          className='user-modifyButton'
          onClick={() => navigate('/user/modifyName')}
        >
          Modifié votre nom
        </button>
        <h1 style={{color: '#82bf00'}}>
          nom d'utilisateur: {state.username}
        </h1>
        <button
          className='user-modifyButton'
          onClick={() => navigate('/user/modifyUsername')}
        >
          Modifié votre nom d'utilisateur
        </button>
        <h1 style={{color: '#82bf00'}}>
          votre email: {state.email}
        </h1>
        <button
          className='user-modifyButton'
          onClick={() => navigate('/user/modifyEmail')}
        >
          changer d'adresse email
        </button>
      </div>
    </div>
  );
};

export default User;
