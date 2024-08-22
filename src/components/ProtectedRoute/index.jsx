import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const ProtectedRoute = (props) => {

    // Lấy biến isAuthenticated trong Reducer của Redux 
    // Con Reducer tên là 'account' trong file store.js
    const isAuthenticated = useSelector(state => state.account.isAuthenticated)

    return (
        <>
            {isAuthenticated === true ?
                <>
                    {props.children}
                </>
                :
                <Navigate to='/login' replace />
            }
        </>
    )
}

export default ProtectedRoute