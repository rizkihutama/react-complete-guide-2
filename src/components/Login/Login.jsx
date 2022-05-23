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
  const [isInputValidate, setIsInputValidate] = useState(INITIAL_STATE);
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    setFormIsValid(
      formInput.email.includes('@') && formInput.password.length > 6
    );
  }, [formInput]);

  const inputChangeHandler = event => {
    const { name, value } = event.target;
    setFormInput({ ...formInput, [name]: value });
  };

  const validateInputHandler = () => {
    const emailValid = formInput.email.includes('@');
    const passwordValid = formInput.password.length > 6;
    setIsInputValidate({ emailValid, passwordValid });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(formInput.email, formInput.password);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div className={`${classes.control} ${isInputValidate.email === false ? classes.invalid : ''}`}>
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formInput.email}
            onChange={inputChangeHandler}
            onBlur={validateInputHandler}
          />
        </div>

        <div className={`${classes.control} ${isInputValidate.password === false ? classes.invalid : ''}`}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formInput.password}
            onChange={inputChangeHandler}
            onBlur={validateInputHandler}
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