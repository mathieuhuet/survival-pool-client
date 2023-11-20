import './register.css'
import React, {useState} from 'react';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import EmailVerification from '../../Components/EmailVerification/emailVerification';
import { registerUser } from '../../Services/userServices/register';
import Spinner from '../../Components/Spinner/spinner';
import ClickableText from '../../Components/ClickableText/clickableText';



const Register = (props) => {
  let navigate = useNavigate();
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  const handleLogin = async (credentials, setSubmitting) => {
    setMessage('');
    // call backend and move to next page if successful
    try {
      const result = await registerUser(credentials);
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
    <div className='register-page'>
      <div className='register-box'>
        <div className='register-formik'>
          <Formik
            initialValues={{ email: '', firstName: '', lastName: '', username: '' }}
            validate={values => {
              const errors = {};
              if (!values.email || !values.firstName || !values.username) {
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
              <form onSubmit={handleSubmit} className='register-emailForm'>
                <div className='register-emailInput'>
                  <div>
                    Votre email:
                  </div>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    className='register-email'
                  />
                  <div>
                    Votre prénom:
                  </div>
                  <input
                    type="email"
                    name="firstName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                    className='register-firstName'
                  />
                  <div>
                    Votre nom:
                  </div>
                  <input
                    type="email"
                    name="lastName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                    className='register-lastName'
                  />
                  <div>
                    Votre nom d'utilisateur:
                  </div>
                  <input
                    type="email"
                    name="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    className='register-username'
                  />
                  <h6>
                    {message || ' '}
                  </h6>
                </div>
                {isSubmitting && 
                  <div className='register-loading'>
                    <Spinner/>
                  </div>
                }
                {!isSubmitting && 
                  <button type="submit" disabled={isSubmitting} className='register-submitEmail'>
                    Créer un compte
                  </button>
                }
              </form>
            )}
          </Formik>
        </div>
        <div className='register-bottomtxt'>
          Vous avez déjà compte? <ClickableText onClick={() => navigate('/login')}>Vous pouvez vous connecter en cliquant ici.</ClickableText>
        </div>
      </div>
      {showEmailVerification &&
        <div className='register-emailVerification'>
          <EmailVerification
            email={email}
            close={() => setShowEmailVerification(false)}
          />
        </div>
      }
    </div>
  );
};

export default Register;
