import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from "./Sidebar";
import { useNavigate } from 'react-router';
import { logout, } from '../api'


function Header ({isAuthenticated, setIsAuthenticated, setState}) {

  const navigate = useNavigate();
  
  const handleLogout = async () => {
    await logout();
    setIsAuthenticated(false)
    setState({
      loading: true,
      users: [],
      group: null,
    })
    navigate('/login');
  }


  return (
    <nav className="navbar fixed-top bg-body-tertiary">
      {/*Offcanvas*/}
      {isAuthenticated &&
      <div className="d-block d-sm-none">  {/*serve per mostrare l'offcanvas solo per schermi  xs*/}
        <button className="navbar-toggler ms-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar" >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <Sidebar />
          </div>
        </div>
      </div>
}
      {/*Brand Name and Logo*/}

      <div className="navbar-brand ms-4">
        <i className="bi bi-house-fill"></i>
        <div className="d-none d-sm-inline"> Homeganizer</div>
      </div>

      {/*Right-side of Navbar*/}
      <nav className="navbar-expand">
        <ul className="navbar-nav me-4">
          {!isAuthenticated ?
            (<>
              <li className="nav-item">
                <button className="nav-link active" onClick={() => navigate('login')}>Login</button>
              </li>

              <li className="nav-item">
                <button className="nav-link active" onClick={() => navigate('/signup')}>Sign up</button>
              </li>
            </>)
            :
            (<li className="nav-item">
              <button className="nav-link active" onClick={handleLogout}>Logout</button>
            </li>)
          }
        </ul>
      </nav>

    </nav>
  );
}

export default Header;
