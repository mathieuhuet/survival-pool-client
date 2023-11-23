import './modifyName.css';
import './modifyNameMobile.css';
import React, { useEffect, useState } from 'react';
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { changeName } from '../../../Services/userServices/changeName';
import Spinner from '../../../Components/Spinner/spinner';


const ModifyName = () => {
  let navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['accessToken']);
  const [message, setMessage] = useState('');

  const handleChangeName = async (credentials, setSubmitting) => {
    setMessage('');
    // call backend and move to next page if successful
    changeName(credentials, cookies.accessToken).then(result => {
      if (result.data) {
        return navigate('/user');
      }
      setSubmitting(false);
    }).catch(err => {
      if (err.message) {
        setMessage(err.message);
      }
      console.log(err);
      setSubmitting(false);
    });
  }

  return (
    <div className='modifyName-page'>
      <div className='modifyName-box'>
        <div className='modifyName-formik'>
          <Formik
            initialValues={{firstName: '', lastName: ''}}
            validate={values => {
              const errors = {};
              if (!values.firstName) {
                errors.firstName = 'Requis';
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              handleChangeName({firstName: values.firstName, lastName: values.lastName}, setSubmitting)
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit} className='modifyName-emailForm'>
                <div className='modifyName-emailInput'>
                  <div>
                    Votre prénom:
                  </div>
                  <input
                    type="text"
                    name="firstName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                    className='modifyName-firstName'
                  />
                  <div>
                    Votre nom (facultatif):
                  </div>
                  <input
                    type="text"
                    name="lastName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                    className='modifyName-lastName'
                  />
                  <h6 style={{color: 'red'}}>
                    {message || ' '}
                  </h6>
                </div>
                {isSubmitting && 
                  <div className='modifyName-loading'>
                    <Spinner/>
                  </div>
                }
                {!isSubmitting && 
                  <button type="submit" disabled={isSubmitting} className='modifyName-submitEmail'>
                    Changer votre nom
                  </button>
                }
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ModifyName;