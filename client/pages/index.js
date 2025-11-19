const Landing = ({ currentUser, tickets }) => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-gradient-primary text-white py-3">
              <h1 className="h4 mb-0 text-center">
                <i className="bi bi-ticket-perforated me-2"></i>
                Available Tickets
              </h1>
            </div>
            
            <div className="card-body p-0">
              {tickets.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-ticket-x display-1 text-muted"></i>
                  <p className="text-muted mt-3 fs-5">No tickets available at the moment</p>
                  <p className="text-muted">Check back later for new events</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="ps-4">
                          <i className="bi bi-tag me-2"></i>
                          Title
                        </th>
                        <th>
                          <i className="bi bi-currency-dollar me-2"></i>
                          Price
                        </th>
                        <th className="text-center">
                          <i className="bi bi-info-circle me-2"></i>
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {tickets.map((ticket) => (
                        <tr key={ticket.id} className="hover-shadow">
                          <td className="ps-4 fw-semibold text-dark">
                            {ticket.title}
                          </td>
                          <td>
                            <span className="badge bg-success bg-gradient fs-6">
                              ${ticket.price}
                            </span>
                          </td>
                          <td className="text-center">
                            <a 
                              href={`/tickets/${ticket.id}`} 
                              className="btn btn-primary btn-sm rounded-pill px-3"
                            >
                              <i className="bi bi-eye me-1"></i>
                              View Details
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            
            {tickets.length > 0 && (
              <div className="card-footer bg-light py-3">
                <div className="row align-items-center">
                  <div className="col">
                    <small className="text-muted">
                      Showing <strong>{tickets.length}</strong> ticket{tickets.length !== 1 ? 's' : ''}
                    </small>
                  </div>
                  <div className="col-auto">
                    <small className="text-muted">
                      <i className="bi bi-credit-card me-1"></i>
                      Secure checkout available
                    </small>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;

Landing.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get("/api/tickets");

  return { tickets: data };
};
