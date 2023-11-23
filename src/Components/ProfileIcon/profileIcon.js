import './profileIcon.css';
import './profileIconMobile.css';
import React from 'react';
import { getProfileColorCode } from '../../Utilities/profileColors';


const ProfileIcon = (props) => {
  const circleSize = (props.size / 100);
  const fontSize = (props.size / 220);
  return (
    <div className='profileIcon-background' style={{backgroundColor: `${getProfileColorCode(props.backgroundColor)}`}}>
      <div className='profileIcon-font' style={{color: `${getProfileColorCode(props.color)}`}}>
        {props.firstName[0]}{props.lastName ? props.lastName[0] : ''}
      </div>
    </div>
  );
}



export default ProfileIcon;