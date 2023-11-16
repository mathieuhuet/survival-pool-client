import './emailVerification.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import { useCookies } from 'react-cookie';
import { verifyUser } from '../../Services/userServices/verifyLoginCode';
import Spinner from '../Spinner/spinner';

/*
List all the devices on screen and fetch the live data of all of them.
*/


function EmailVerification (props) {
  const [cookies, setCookie] = useCookies(['accessToken']);
  const [message, setMessage] = useState('');


  const handleEmailVerification = (code, setSubmitting) => {
    setSubmitting(true);
    // call backend
    verifyUser({loginCode: code, email: props.email.email}).then((result) => {
      setSubmitting(false);
      if (result.data) {
        setCookie('accessToken', result.data.token);
        return setMessage('Vous êtes conntecté');
      }
    }).catch(err => {
      setSubmitting(false);
      return setMessage(err.message);
    });
  }

  return (
    <div className='emailVerification-page'>
      <Formik
        initialValues={{ code: '' }}
        validate={values => {
          const errors = {};
          if (!values.code) {
            errors.code = 'Required';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          handleEmailVerification(values.code.toUpperCase(), setSubmitting);
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
          <form onSubmit={handleSubmit} className='emailVerification-form'>
            <h3>
              Entrer le code de 4 charactère que vous avez reçu par email : 
            </h3>
            <div>
              <input
                type="code"
                name="code"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.code}
                className='emailVerification-code'
              />
              {!isSubmitting && 
                <button type="submit" disabled={isSubmitting} className='emailVerification-submitCode'>
                  Valider
                </button>
              }
              {isSubmitting &&
                <div className='emailVerification-loading'>
                  <Spinner/>
                </div>
              }
            </div>
            <h6>
              {message || ' '}
            </h6>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default EmailVerification;