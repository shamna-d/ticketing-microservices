import Link from "next/link";

const Header = ({ currentUser }) => {
  const renderLinks = () => {
    if (!currentUser) {
      return (
        <>
          <li className="nav-item">
            <Link className="nav-link" href="/auth/signup">
              Sign Up
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="/auth/signin">
              Sign In
            </Link>
          </li>
        </>
      );
    }

    return (
      <li className="nav-item">
        <Link className="nav-link" href="/auth/signout">
          Sign Out
        </Link>
      </li>
    );
  };

  return (
    <nav className="navbar navbar-light bg-light px-3">
      <Link className="navbar-brand fw-bold" href="/">
        GitTix
      </Link>

      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center gap-2">{renderLinks()}</ul>
      </div>
    </nav>
  );
};

export default Header;
