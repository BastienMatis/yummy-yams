import { useState } from 'react';
import { useDispatch } from "react-redux";
import { addUser } from '../redux/features/User';

function Signin() {
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    async function signinUser(event) {
        event.preventDefault()
        const response = await fetch('http://localhost:3001/users/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            }),
        })

        const data = await response.json()

        if (data.user) {
            localStorage.setItem('token', data.token)
            dispatch(addUser({ email: email, username: data.username, token: data.token }))
            window.location.href = '/game'
        } else {
            alert('Please check your username and password')
        }
    }

    return (
        <div className="main">
            <form className="main">
                <h1>Se connecter</h1>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                />
                <br />
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                />
                <br />
                <button onClick={signinUser}>Se connecter</button>
                <a href="/signup">Je n'ai pas encore de compte !</a>
            </form>
        </div>
    );
}

export default Signin;