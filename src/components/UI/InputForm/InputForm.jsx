import { useRef, forwardRef, useImperativeHandle } from 'react';
import classes from './InputForm.module.css';

const InputForm = forwardRef((props, ref) => {
  const inputRef = useRef();

  const focus = () => {
    inputRef.current.focus();
  };

  useImperativeHandle(ref, () => {
    return {
      focus: focus,
    };
  });

  return (
    <div className={`${classes.control}  ${props.isValid === false ? classes.invalid : ''}`}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={inputRef}
        type={props.type}
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
});

export default InputForm;
