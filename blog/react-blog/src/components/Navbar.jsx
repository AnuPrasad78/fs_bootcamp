import { Link } from "react-router-dom"

const Navbar = () => {

    return (
        <nav className="navbar navbar-dark fs-4" style={{ backgroundColor: '#00695C' }}>
            <div className="container">
                <Link className="navbar-brand fs-4" to={"/"}> My Blog </Link>

                <ul className="navbar-nav flex-row">
                    <li className="nav-item me-3">
                        <Link to={"/"} className="nav-link"> Home</Link>
                    </li>
                    <li className="nav-item me-3">
                        <Link to={"/posts"} className="nav-link"> Posts</Link>
                    </li>
                    <li className="nav-item me-3">
                        <Link to={"/about"} className="nav-link"> About</Link>
                    </li>
                    <li className="nav-item me-3">
                        <Link to={"/contact"} className="nav-link"> Contact</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )

}
export default Navbar