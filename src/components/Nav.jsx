import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Nav = () => {
    const {user, logout} = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    // common styles
    const linkClasses = "block";
    const ulClasses = `md:flex md:space-x-8 ${isOpen ? 'block' : 'hidden'} gap-4 space-y-4 md:space-y-0 absolute md:static top-16 left-0 w-full md:w-auto bg-gray-800 md:bg-transparent p-4 md:p-0`;

    return (
        <header className="bg-blue-900 text-white">
            <nav className="container mx-auto h-16 p-4 flex items-center justify-between">
                <div className="text-xl font-bold">
                    <a href="/">GOA</a>
                </div>
                <button onClick={() => setIsOpen(!isOpen)} className="block md:hidden text-white focus:outline-none">
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                    </svg>
                </button>
                <ul className={ulClasses}>
                    <li>
                        <Link to="/" className={linkClasses}>მთავარი</Link>
                    </li>
                    <li>
                        <Link to="/about" className={linkClasses}>ჩვენს შესახებ</Link>
                    </li>
                    {
                        user ? (
                            <li className={`${linkClasses} cursor-pointer`} onClick={logout}>
                                გამოსვლა
                            </li>
                        )
                        : (
                            <>
                                <li>
                                    <Link to="/register" className={linkClasses}>რეგისტრაცია</Link>
                                </li>
                                <li>
                                    <Link to="/login" className={linkClasses}>ავტორიზაცია</Link>
                                </li>
                            </>
                        )
                    }
                </ul>
            </nav>
        </header>
    );
}

export default Nav;
