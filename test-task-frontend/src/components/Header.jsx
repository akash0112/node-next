import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/store/actions/authActions';


const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state?.auth?.user?.user?.accessToken);

  const handleLogout = () => {
    dispatch(logout()); 
    router.push('/');
  };

  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto py-4 flex justify-between items-center px-5">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold">ERM</h1>
        </div>
        <nav>
          <ul className="flex space-x-4">
            {accessToken ? (
              <>
                <li>
                  <Link href="/employee" className="hover:text-gray-300">
                    Employee List
                  </Link>
                </li>
                <li
                  onClick={handleLogout}
                  className="hover:text-gray-300 cursor-pointer"
                >
                  Logout
                </li>
              </>
            ) : (
             <>
              <li>
                <Link href="/" className="hover:text-gray-300">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-gray-300">
                  Signup
                </Link>
              </li>
             </>
              
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
