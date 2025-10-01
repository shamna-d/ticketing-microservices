import buildClient from "../api/build-client";

const Landing = ({ currentUser }) => {
  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4">Welcome to GitTix 🎟️</h1>
      {currentUser ? (
        <h3>Hello, {currentUser.email}! You are signed in.</h3>
      ) : (
        <h3>You are not signed in.</h3>
      )}
    </div>
  );
};

export default Landing;

Landing.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get("/api/users/currentuser");

  return data;
};
