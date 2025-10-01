import { useState } from "react";
import Router from "next/router"
import useRequest from "../../hooks/user-request";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { doRequest, errors } = useRequest({
    url: "/api/users/signin",
    method: "post",
    body: { email, password },
    onSuccess: (data) => {
      console.log("Signin success:", data);
      Router.push("/")
      // e.g. redirect to home page
    },
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    await doRequest(); // will use { email, password } from body
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign in</h1>
      {errors}

      <div className="form-group">
        <label>Email Address</label>
        <input
          className="form-control"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          className="form-control"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button className="btn btn-primary mt-2">Sign In</button>
    </form>
  );
};

export default Signin;
