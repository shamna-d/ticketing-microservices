const OrderIndex = ({ orders = [] }) => {
  if (!orders.length) {
    return <p>No orders found.</p>;
  }

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto" }}>
      <h2>Your Orders</h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "10px",
        }}
      >
        <thead>
          <tr>
            <th style={thStyle}>Title</th>
            <th style={thStyle}>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td style={tdStyle}>{order.ticket?.title}</td>
              <td style={tdStyle}>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Simple inline styles
const thStyle = {
  textAlign: "left",
  padding: "8px",
  borderBottom: "2px solid #ddd",
};

const tdStyle = {
  padding: "8px",
  borderBottom: "1px solid #eee",
};

OrderIndex.getInitialProps = async (context, client) => {
  const { data } = await client.get("/api/orders");
  return { orders: data };
};

export default OrderIndex;
