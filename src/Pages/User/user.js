import './user.css'
import React, { useEffect, useState } from 'react';
import { useCookies } from "react-cookie";
import { Link } from 'react-router-dom';


const initialState = {
  firstName: '',
  lastName: '',
};

/*
User Page.

It only display the name of the user.

Also the page where you would logout.
*/


const User = () => {
  const [cookies, setCookie] = useCookies(['accessToken']);
  //Profile section
  const [state, setState] = useState(initialState);

  useEffect(() => {
    setState(JSON.parse(localStorage.getItem('user')));
  }, [cookies.userToken])

  const disconnect = () => {
    setCookie('accessToken', '');
  }

  return (
    <div className='user-page'>
      <div>
        <h1>
          {state.firstName}
        </h1>
        <h1>
          {state.lastName}
        </h1>
      </div>
      <button
        className='user-disconnectButton'
        onClick={disconnect}
      >
        Se Déconnecter
      </button>
    </div>
  );
};

export default User;
