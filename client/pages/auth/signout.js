import { useEffect } from "react";
import { useRouter } from "next/router";
import useRequest from "../../hooks/user-request";

const Signout = () => {
  const router = useRouter();

  const { doRequest, errors } = useRequest({
    url: "/api/users/signout",
    method: "post",
    body: {},
    onSuccess: () => router.push("/"),
  });

  useEffect(() => {
    // Trigger only once when component mounts
    doRequest();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h4 className="mb-3">Signing you out...</h4>
      {errors && <div className="alert alert-danger w-50">{errors}</div>}
    </div>
  );
};

export default Signout;
