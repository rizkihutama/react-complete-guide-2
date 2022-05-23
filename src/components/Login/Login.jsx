import { useState, useEffect } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = props => {
  const INITIAL_STATE = {
    email: '',
    password: '',
  };

  const [formInput, setFormInput] = useState(INITIAL_STATE);
  const [isEmailValid, setIsEmailValid] = useState();
  const [isPasswordValid, setIsPasswordValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    const debouncer = setTimeout(() => {
      setFormIsValid(
        formInput.email.includes('@') && formInput.password.length > 6
      );
    }, 500);

    // clear timeout if component is unmounted
    return () => {
      clearTimeout(debouncer);
    };
  }, [formInput]);

  const inputChangeHandler = event => {
    const { name, value } = event.target;
    setFormInput({ ...formInput, [name]: value });
  };

  const validateEmailHandler = () => {
    setIsEmailValid(formInput.email.includes('@'));
  };

  const validatePasswordHandler = () => {
    setIsPasswordValid(formInput.password.length > 6);
  };

  const submitHandler = event => {
    event.preventDefault();
    props.onLogin(formInput.email, formInput.password);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div className={`${classes.control} ${isEmailValid === false ? classes.invalid : ''}`}>
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formInput.email}
            onChange={inputChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>

        <div className={`${classes.control} ${isPasswordValid === false ? classes.invalid : ''}`}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formInput.password}
            onChange={inputChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>

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