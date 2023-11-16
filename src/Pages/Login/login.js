import './login.css'
import React, {useState} from 'react';
import { Formik } from 'formik';
import EmailVerification from '../../Components/EmailVerification/emailVerification';
import { loginEmail } from '../../Services/userServices/login';
import Spinner from '../../Components/Spinner/spinner';



/*
Login Page, where you login when you navigate to the site.
The Registration form is also on that page.
*/





const Login = (props) => {
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  const handleLogin = async (credentials, setSubmitting) => {
    setMessage('');
    // call backend and move to next page if successful
    try {
      const result = await loginEmail(credentials);
      if (result.data) {
        setEmail(result.data);
        setShowEmailVerification(true);
      }
      setSubmitting(false);
    } catch (error) {
      if (error.message) {
        setMessage(error.message);
      }
      console.log(error);
      setSubmitting(false);
    }
  }


  return (
    <div className='login-page'>
      <div className='login-box'>
        <div className='login-formik'>
          <Formik
            initialValues={{ email: '' }}
            validate={values => {
              const errors = {};
              if (!values.email) {
                errors.email = 'Required';
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = 'Invalid email address';
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              handleLogin({email: values.email.toLowerCase()}, setSubmitting)
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
              <form onSubmit={handleSubmit} className='login-emailForm'>
                <div className='login-emailInput'>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    className='login-email'
                  />
                  <h6>
                    {message || ' '}
                  </h6>
                </div>
                {isSubmitting && 
                  <div className='login-loading'>
                    <Spinner/>
                  </div>
                }
                {!isSubmitting && 
                  <button type="submit" disabled={isSubmitting} className='login-submitEmail'>
                    Se Connecter
                  </button>
                }
              </form>
            )}
          </Formik>
        </div>
      </div>
      {showEmailVerification &&
        <div className='login-emailVerification'>
          <EmailVerification
            email={email}
          />
        </div>
      }
    </div>
  );
};

export default Login;
