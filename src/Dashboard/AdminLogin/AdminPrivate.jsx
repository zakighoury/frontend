import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';
import AdminLogin from './AdminLogin';
import Result from '../Result';
import Cookies from 'js-cookie'

const AdminPrivate = () => {
    const [isAdmin, setAdmin] = useState(null)
    const Navigate = useNavigate();
    useEffect(() => {
        const role = Cookies.get('role')
        if (role === 'user') {
            setAdmin(true)
            Navigate('/result')
        } else {
            setAdmin(false)

        }

    })

    return (
        <div>

            {isAdmin ? <Result /> : <AdminLogin />}

        </div>
    )
}

export default AdminPrivate