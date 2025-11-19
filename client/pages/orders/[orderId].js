import { useEffect, useState } from "react";
import Router from "next/router";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import useRequest from "../../hooks/use-request";

const stripePromise = loadStripe(
  "pk_test_51STjxQR5QlPMJUOQilS3bUQ75L5z1TYdsQxfSaGPLOQDjEuZQSZW1xeKgqGAFJY2XoDNpJNq79Yj78bzY2lwc84P00oyLUFIly"
);

// -----------------------
// Payment Form Component
// -----------------------
const CheckoutForm = ({ order }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { doRequest, errors } = useRequest({
    url: "/api/payments",
    method: "post",
    body: { orderId: order.id },
    onSuccess: (paymentIntent) => {
      console.log("Payment Intent:", paymentIntent);
    },
  });

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!stripe || !elements) {
      setError("Stripe not loaded yet.");
      setLoading(false);
      return;
    }

    // 1️⃣ Create Payment Intent
    const paymentIntent = await doRequest();
    if (!paymentIntent || !paymentIntent.clientSecret) {
      setError("Unable to initiate payment.");
      setLoading(false);
      return;
    }

    const clientSecret = paymentIntent.clientSecret;

    // 2️⃣ Confirm payment
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      setError(result.error.message || "Payment failed");
      setLoading(false);
      return;
    }

    if (result.paymentIntent?.status === "succeeded") {
      Router.push("/orders");
    }
  };

  return (
    <form onSubmit={handlePayment} className="mt-4">
      <div
        className="p-3 border rounded shadow-sm bg-light"
        style={{ maxWidth: "420px" }}
      >
        <label className="form-label mb-2 fw-semibold">Card Details</label>

        <div className="p-2 border rounded bg-white">
          <CardElement
            options={{
              hidePostalCode: true,
              style: {
                base: {
                  fontSize: "16px",
                  color: "#32325d",
                  "::placeholder": { color: "#a0a0a0" },
                },
                invalid: { color: "#e5424d" },
              },
            }}
          />
        </div>

        <button
          disabled={loading || !stripe}
          className={`btn btn-primary w-100 mt-3 ${
            loading || !stripe ? "disabled" : ""
          }`}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>

        {error && <div className="alert alert-danger mt-3 py-2">{error}</div>}
      </div>
    </form>
  );
};

// -----------------------
// Main Page Component
// -----------------------
const OrderShow = ({ order }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => clearInterval(timerId);
  }, []);

  if (timeLeft < 0) return <div>Order Expired</div>;

  return (
    <div>
      Time left to pay: {timeLeft} seconds
      <Elements stripe={stripePromise}>
        <CheckoutForm order={order} />
      </Elements>
    </div>
  );
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);
  return { order: data };
};

export default OrderShow;
