import { Link, useNavigate } from 'react-router-dom';
const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/signup')
    }
    return (
        <div>
            {auth ?
                <ul className="nav-ul">
                    <li>
                        {/* do not add anchor tag otherwise it will refresh page everytime */}
                        <Link to="/" >Welcome {JSON.parse(auth).name}</Link>
                    </li>
                    <li className='shift-right'><Link onClick={logout} to="/signup" >Logout</Link></li>
                </ul>
                :
                <ul className="nav-ul nav-right">
                    <li> <Link to="/signup" >SignUp</Link></li>
                    <li><Link to="/login" >Login</Link></li>
                </ul>
            }
        </div>
    )
}
export default Nav;