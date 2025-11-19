import useRequest from "../../hooks/use-request";
import Router from "next/router";

const TicketShow = ({ ticket }) => {
  const { doRequest, errors } = useRequest({
    url: "/api/orders",
    method: "post",
    body: {
      ticketId: ticket.id,
    },
    onSuccess: (order) => {
      Router.push("/orders/[orderId]", `/orders/${order.id}`);
    },
  });

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <h2 className="card-title mb-3">{ticket.title}</h2>

          <h5 className="text-muted mb-4">
            Price: <span className="fw-bold">${ticket.price}</span>
          </h5>

          {errors}

          <button
            onClick={() => doRequest()}
            className="btn btn-primary w-100 py-2"
          >
            Purchase Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

TicketShow.getInitialProps = async (context, client) => {
  const { ticketId } = context.query;
  const { data } = await client.get(`/api/tickets/${ticketId}`);

  return { ticket: data };
};

export default TicketShow;
