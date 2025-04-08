import React, { Children, useEffect, useState } from 'react'
import { checkAuthorization } from '../scripts/scripts'
import { useNavigate } from 'react-router-dom'


function ProtectedRoute({ children }: { children: React.ReactNode }) {

    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)
    const navigate = useNavigate()


    useEffect(() => {
        const verifyAuth = async () => {
            const authorized = await checkAuthorization();
            if (!authorized) {
                localStorage.setItem("user", "")
                navigate("/home");
            } else {
                setIsAuthorized(true);
            }
        };

        verifyAuth();
    }, [navigate]);

    if (isAuthorized == null)
        return <div className='loader'></div>


    return (
        <>{children}</>
    )
}

export default ProtectedRoute