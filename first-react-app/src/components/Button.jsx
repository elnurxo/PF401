import { useState } from "react";

const Button = () => {
  const [counter, setCounter] = useState(0);
  const [light, setLight] = useState(false);
  const [show, setShow] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [validPassword, setValidPassword] = useState(true);
 
  return (
    <>
      <button
        onClick={() => {
          if (counter > 0) {
            setCounter(counter - 1);
          } else {
            window.alert("less than zero error");
          }
        }}
      >
        -
      </button>
      <span>{counter}</span>
      <button
        onClick={() => {
          setCounter(counter + 1);
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          setCounter(0);
        }}
      >
        reset
      </button>
      <hr />
      <div
        style={{
          width: "100px",
          height: "100px",
          backgroundColor: light ? "yellow" : "transparent",
          border: "1px solid black",
        }}
      ></div>
      <button
        onClick={() => {
          setLight(!light);
        }}
      >
        switch {light ? "off" : "on"}
      </button>
      <hr />
      <button
        onClick={() => {
          setShow(!show);
        }}
      >
        {show ? "hide" : "show"}
      </button>
      <p style={{ display: show ? "block" : "none" }}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim veniam
        voluptates exercitationem, sunt aut excepturi voluptatem quaerat
        sapiente mollitia nobis eligendi reiciendis id facilis eaque minima
        beatae! Eos, natus libero.
      </p>
      <hr />
      <input
        onKeyUp={(e) => {
          const regex =
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
          const isValid = regex.test(e.target.value.trim());
          setValidPassword(isValid);
        }}
        type={showPass ? "text" : "password"}
        placeholder="enter your password"
      />
      <button
        onMouseDown={() => {
          setShowPass(true);
        }}
        onMouseUp={() => {
          setShowPass(false);
        }}
      >
        eye
      </button>
      <p style={{ color: "red", display: validPassword ? "none" : "block" }}>
        weak password
      </p>
      <hr />
     
    </>
  );
};

export default Button;
