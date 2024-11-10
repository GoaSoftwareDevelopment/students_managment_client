import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const login = useCallback(async (data) => {
        try {
            const res = await fetch('http://localhost:3000/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                credentials: 'include',
            });
    
            localStorage.setItem('email', JSON.stringify(data.email));
            localStorage.setItem('pass', JSON.stringify(data.password));
    
            if(res.ok) {
                const info = await res.json();
                setUser(info);
                navigate('/panel');
            } else {
                setUser(null);
                navigate('/login');
            }
                
    
        } catch(err) {
            console.log(err);
        }
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('email');
        localStorage.removeItem('pass');
        setUser(null);
        navigate('/login');
    }, []);

    useEffect(() => {
        // const checkAuth = async () => {
        //     try {
        //         const res = await fetch('http://localhost:3000/api/admin/validate-token', {
        //             credentials: 'include',
        //         });
        //         if (res.ok) {
        //             const userData = await res.json();
        //             setUser(userData);
        //             navigate('/panel');
        //         } else {
        //             setUser(null);
        //             navigate('/login');
        //         }
        //     } catch (err) {
        //         console.error("Auth check error:", err);
        //     } finally {
        //         setLoading(false);
        //     }  
        // };
        // checkAuth();

        const checkAuth = async () => {
            const email = JSON.parse(localStorage.getItem('email'));
            const pass = JSON.parse(localStorage.getItem('pass'));
    
            if (email && pass) {
                await login({ email, password: pass });
            }
        }

        checkAuth();

        
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);