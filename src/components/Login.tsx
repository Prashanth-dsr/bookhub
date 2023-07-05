import { FormEvent, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Label, TextField, PrimaryButton } from "@fluentui/react";
import { useId } from "@fluentui/react-hooks";
import Cookies from "js-cookie";
import { loginActions, LoginObj } from "../store/loginSlice";
import "../css/Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formRef = useRef<HTMLFormElement | null>(null);

  const loginObj = useSelector(
    (state: { login: LoginObj }): LoginObj => state.login
  );
  const { showInvalid } = loginObj;

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    const formValues = new FormData(formRef.current || undefined);

    const userDetails = {
      username: formValues.get("username"),
      password: formValues.get("password"),
    };

    (async () => {
      const options = {
        method: "POST",
        body: JSON.stringify(userDetails),
      };
      const response = await fetch("https://apis.ccbp.in/login", options);
      const data = await response.json();

      if (response.ok) {
        Cookies.set("jwt_token", data["jwt_token"]);
        navigate("/");
      } else {
        dispatch(loginActions.toggleInvalid());
      }
    })();
  };

  const changeHandler = () => {
    if (showInvalid) {
      dispatch(loginActions.toggleInvalid());
    }
  };

  const usernameId = useId("username");
  const passwordId = useId("password");

  useEffect(() => {
    if (Cookies.get("jwt_token")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="login">
      <div>
        <img src="https://res.cloudinary.com/dfnwpgiwt/image/upload/v1688455158/bookhub/Rectangle_1467_hakeqw.png" />
      </div>
      <div>
        <form onSubmit={submitHandler} onChange={changeHandler} ref={formRef}>
          <img src="https://res.cloudinary.com/dfnwpgiwt/image/upload/v1688462046/bookhub/Group_7731_or3m7x.png" />
          <div>
            <Label htmlFor={usernameId} className="label" required>
              username
            </Label>
            <TextField id={usernameId} name="username" className="input" />
          </div>
          <div>
            <Label htmlFor={passwordId} className="label" required>
              password
            </Label>
            <TextField
              id={passwordId}
              name="password"
              className="input"
              type="password"
              canRevealPassword
              revealPasswordAriaLabel="Show password"
            />
          </div>
          {showInvalid && (
            <p className="form-error">Usename and Password is invalid</p>
          )}
          <PrimaryButton type="submit" text="Login" className="login-btn" />
        </form>
      </div>
    </div>
  );
};

export default Login;
