import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { clearCart } from '../features/cart/cartSlice';
import { logoutUser } from '../features/user/userSlice';
import { useQueryClient } from '@tanstack/react-query';

const Header = () => {
  const queryCliente = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userState.user);
  const handleLogout = () => {
    navigate('/');
    dispatch(clearCart());
    dispatch(logoutUser());
    queryCliente.removeQueries();
  };
  return (
    <header className="bg-neutral py-2 text-neutral-content">
      <div className="align-element flex justify-center sm:justify-end">
        {user ? (
          <div className="flex gap-x-2 sm:gap-x-8 items-center">
            <p className="text-xs sm:text-sm">hello, {user.username}</p>
            <button
              className="btn btn-xs btn-outline btn-primary"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-x-6 justify-center items-center">
            <Link to="/login" className="link link-hover text-xs sm:text-sm">
              Sign In / Guest
            </Link>
            <Link to="/register" className="link link-hover text-xs sm:text-sm">
              Create Account
            </Link>
          </div>
        )}
        {/* USER */}
        {/* LINKS */}
      </div>
    </header>
  );
};

export default Header;
