import { useState } from "react";
import Router from "next/router"
import useRequest from "../../hooks/use-request";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { doRequest, errors } = useRequest({
    url: "/api/users/signup",
    method: "post",
    body: { email, password },
    onSuccess: (data) => {
      console.log("Signup success:", data);
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
      <h1>Sign up</h1>
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

      <button className="btn btn-primary mt-2">Sign Up</button>
    </form>
  );
};

export default Signup;
