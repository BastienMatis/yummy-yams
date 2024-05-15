import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import './../style/home.css';

function Home() {
    const navigate = useNavigate();

    function signin() {
        navigate('/signin');
    }

    function signup() {
        navigate('/signup');
    }

    function game() {
        navigate('/game');
    }

    function winners() {
        navigate('/winners');
    }

    const [isTheGameOver, setIsTheGameOver] = useState(false);
    const [isUserConnected, setIsUserConnected] = useState(false);

    useEffect(() => {
        const checkPastries = async () => {
            await fetchEmptyPastry();
        };

        checkPastries();

        if (localStorage.hasOwnProperty('token')) {
            setIsUserConnected(true);
        } else {
            setIsUserConnected(false);
        }
    }, []);

    const fetchEmptyPastry = async () => {
        try {
            const response = await fetch("http://localhost:3001/pastries/empty");
            const result = await response.json();
            console.log("Fetched pastries:", result);
            if (result.allOutOfStock) {
                setIsTheGameOver(true);
            } else {
                setIsTheGameOver(false);
            }
        } catch (error) {
            console.error("Error fetching pastries:", error);
        }
    };

    return (
        <div>
            {isTheGameOver ? (
                <div className="game_over">
                    <h1>Toutes les patisseries ont été gagnées !</h1>
                    <div className="buttons-wrapper">
                        <button onClick={winners}>Voir les gagnants</button>
                    </div>
                </div>
            ) : (
                <div className="main">
                    <h1>Yummy Yams</h1>
                    <p>Joue et tente de gagner des pâtisseries !</p>
                    {isUserConnected ? (
                        <div className="buttons-wrapper">
                            <div className="buttons">
                                <button onClick={game}>Jouer</button>
                            </div>
                        </div>
                    ) : (
                        <div className="connexion">
                            <p>Connecte toi ou créer un compte !</p>
                            <div className="buttons-wrapper">
                                <div className="buttons">
                                    <button onClick={signup}>Créer un compte</button>
                                    <button onClick={signin}>Se connecter</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Home;
