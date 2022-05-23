import { ChangeEvent, ReactElement, useCallback, useEffect, useState, useContext } from "react";
import { useHttp, useMessage, useSetTextFieldsActive } from "../../hooks";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/Auth";

export const SignIn = (): ReactElement => {
  const { login } = useContext(AuthContext);
  const message = useMessage();
  useSetTextFieldsActive();

  const { error, loading, removeError, request } = useHttp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (error) {
      message(error);
      removeError();
    }
  }, [error, message]);

  const onSetEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value.trim()), [setEmail]);
  const onSetPassword = useCallback((e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value), [setPassword]);
  const submitHandler = async () => {
    try {
      const tokenData = await request({ url: "/sessions", method: "POST", body: { email, password } });
      const userTypeData = await request({ url: "/user", method: "POST", body: { email } });
      login(tokenData.accessToken, userTypeData.userType);
    } catch (error) {}
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1 className="center"> E-learning platform</h1>

        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title center">Sign In</span>

            <div>
              <div className="input-field ">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={onSetEmail}
                  placeholder="enter the email"
                  className="validate"
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field ">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={onSetPassword}
                  placeholder="enter the password"
                  className="validate"
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </div>
          <div className="card-action center">
            <button disabled={loading} className="btn grey" style={{ marginRight: 10 }} onClick={submitHandler}>
              Submit
            </button>
            <Link to="/sign-up">
              <button disabled={loading} className="btn yellow darken-3 black-text">
                Go to sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
