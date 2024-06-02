import React, { useState, useEffect } from 'react';
import Cookie from 'js-cookie';
import AdminPanel from '../AdminPanel/AdminPanel';
import Result from '../Result'

const AdminLayout = () => {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const role = Cookie.get('role');
        if (role === 'admin') {
            setIsAdmin(true);
        } else if (role !== 'admin') {
            setIsAdmin(false);
            window.location.href = '/result'; // assuming the Result component is at the '/result' route
        }
    }, []);

    return (
        <div>
            {isAdmin ? <AdminPanel /> : <Result />}
        </div>
    );
};

export default AdminLayout;