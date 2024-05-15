import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "./../redux/features/User";

function Header() {
    const userInfo = useSelector((state) => state.user.value);
    const dispatch = useDispatch();

    function home() {
        window.location.href = '/';
    }

    function userpage() {
        window.location.href = '/userpage';
    }


    function deconnexion() {
        localStorage.removeItem('token');
        const email = localStorage.getItem('email');
        dispatch(deleteUser({ email: email }));
        window.location.href = '/';
    }

    return (
        <div className="home">
            {userInfo != null && (
                <div className='nav'>
                    <button onClick={userpage}>Mon profil</button>
                    <button onClick={home}>Yummy Yams 🎲</button>
                    <button onClick={deconnexion}>Deconnexion</button>
                </div>
            )}
        </div>
    );
}

export default Header;
