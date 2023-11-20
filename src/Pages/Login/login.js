import './login.css'
import React, {useState} from 'react';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import EmailVerification from '../../Components/EmailVerification/emailVerification';
import { loginEmail } from '../../Services/userServices/login';
import Spinner from '../../Components/Spinner/spinner';
import ClickableText from '../../Components/ClickableText/clickableText';


const Login = (props) => {
  let navigate = useNavigate();
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
        <div className='login-toptxt'>
          Login
        </div>
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
                  <div>
                    Votre email:
                  </div>
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
                </div>
              </form>
            )}
          </Formik>
        </div>
        <div className='login-bottomtxt'>
          Pas de compte? <ClickableText onClick={() => navigate('/register')}>Vous pouvez en créer un en cliquant ici.</ClickableText>
        </div>
      </div>
      {showEmailVerification &&
        <div className='login-emailVerification'>
          <EmailVerification
            email={email}
            close={() => setShowEmailVerification(false)}
          />
        </div>
      }
    </div>
  );
};

export default Login;
