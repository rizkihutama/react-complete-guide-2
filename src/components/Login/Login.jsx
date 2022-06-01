import { useState, useEffect, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../context/auth-context';
import InputForm from '../UI/InputForm/InputForm';

const emailReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_USER':
      return { value: action.value, isValid: action.value.includes('@') };
    case 'INPUT_BLUR':
      return { value: state.value, isValid: state.value.includes('@') };
    default:
      return { value: '', isValid: false };
  }
};

const passwordReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_USER':
      return { value: action.value, isValid: action.value.trim().length > 6 };
    case 'INPUT_BLUR':
      return { value: state.value, isValid: state.value.trim().length > 6 };
    default:
      return { value: '', isValid: false };
  }
};

const Login = () => {
  const authCtx = useContext(AuthContext);

  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, { value: '', isValid: null });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, { value: '', isValid: null });

  // alias assignment of object destructuring
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking form validity!');
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const inputChangeHandler = event => {
    const { name, value } = event.target;

    if (name === 'email') {
      dispatchEmail({ type: 'INPUT_USER', value });
    } else if (name === 'password') {
      dispatchPassword({ type: 'INPUT_USER', value });
    }
  };

  const validateInputHandler = event => {
    const { name } = event.target;

    if (name === 'email') {
      dispatchEmail({ type: 'INPUT_BLUR' });
    } else if (name === 'password') {
      dispatchPassword({ type: 'INPUT_BLUR' });
    }
  };

  const submitHandler = event => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <InputForm
          label="Email"
          id="email"
          name="email"
          value={emailState.value}
          onChange={inputChangeHandler}
          onBlur={validateInputHandler}
        />
        <InputForm
          label="Password"
          id="password"
          name="password"
          value={passwordState.value}
          onChange={inputChangeHandler}
          onBlur={validateInputHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
