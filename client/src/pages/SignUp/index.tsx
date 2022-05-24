import { ChangeEvent, ReactElement, SyntheticEvent, useCallback, useEffect, useState } from "react";
import { useHttp, useMessage, useSetTextFieldsActive } from "../../hooks";
import { Link } from "react-router-dom";
import { UserType } from "../../types";

export const SignUp = (): ReactElement => {
  useSetTextFieldsActive();
  const { error, loading, removeError, request } = useHttp();
  const message = useMessage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<UserType>(UserType.Student);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (error) {
      message(error);
      removeError();
    }
  }, [error, message, removeError]);

  const onSetName = useCallback((e: ChangeEvent<HTMLInputElement>) => setName(e.target.value.trim()), [setName]);
  const onSetEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value.trim()), [setEmail]);
  const onSetPassword = useCallback((e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value), [setPassword]);

  const onSetPasswordConfirmation = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setPasswordConfirmation(e.target.value),
    [setPasswordConfirmation],
  );

  const onSetUserType = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      Object.values(UserType).includes(e.target.value as UserType)
        ? setUserType(e.target.value as UserType)
        : setFormError("wrong User Type Value");
    },
    [setUserType, setFormError],
  );

  const submitHandler = async () => {
    try {
      const data = await request({
        url: "/users/create",
        method: "POST",
        body: {
          name,
          email,
          passwordConfirmation,
          password,
          userType,
        },
      });
      data && message("your user was created");
    } catch (error) {}
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1 className="center"> E-learning platform</h1>
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title center">Sign Up</span>
            <div>
              <div className="input-field ">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={onSetName}
                  placeholder="enter the name"
                  className="validate"
                />
                <label htmlFor="name">name</label>
              </div>
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

              <div className="input-field">
                <select id="userType" value={userType} onChange={onSetUserType}>
                  <option value={UserType.Student}>Student</option>
                  <option value={UserType.Admin}>Admin</option>
                </select>
                <label htmlFor="userType">Select User Type</label>
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

              <div className="input-field ">
                <input
                  type="password"
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  value={passwordConfirmation}
                  onChange={onSetPasswordConfirmation}
                  placeholder="enter the password confirmation"
                  className="validate"
                />
                <label htmlFor="passwordConfirmation">Password confirmation</label>
              </div>
            </div>
          </div>
          <div className="card-action center">
            <button disabled={loading} className="btn grey" style={{ marginRight: 10 }} onClick={submitHandler}>
              Submit
            </button>
            <Link to="/sign-in">
              <button disabled={loading} className="btn yellow darken-3 black-text">
                Go to sign In
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
