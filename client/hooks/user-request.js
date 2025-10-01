import { useState } from "react";
import axios from "axios";

const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async (props = {}) => {
    try {
      setErrors(null);

      const response = await axios[method](url, {
        ...body,
        ...props, // merge in additional data if passed
      });

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(
          <div className="alert alert-danger">
            <ul>
              {err.response.data.errors.map((e, idx) => (
                <li key={idx}>{e.message}</li>
              ))}
            </ul>
          </div>
        );
      } else {
        setErrors(
          <div className="alert alert-danger">Something went wrong</div>
        );
      }
    }
  };

  return { doRequest, errors };
};

export default useRequest;
