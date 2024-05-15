import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';

function Game() {
    const [pastries, setPastries] = useState([]);
    const [isTheGameOver, setIsTheGameOver] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [isUserAction, setIsUserAction] = useState(false);
    const previousPastriesRef = useRef([]);
    const navigate = useNavigate();

    function winners() {
        navigate('/winners');
    }

    useEffect(() => {
        fetchPastries();
        fetchEmptyPastry();
    }, []);

    const fetchPastries = async () => {
        try {
            const response = await fetch("http://localhost:3001/pastries");
            const result = await response.json();
            console.log("Fetched pastries:", result);

            if (previousPastriesRef.current.length > 0 && isUserAction) {
                const hasStockChanged = result.some((pastry, index) =>
                    pastry.stock !== previousPastriesRef.current[index]?.stock
                );

                if (hasStockChanged) {
                    setShowConfetti(true);
                    setTimeout(() => setShowConfetti(false), 8000);
                    alert('Bravo !')
                } else {
                    alert('Dommage 😔')
                }
            }

            previousPastriesRef.current = result;
            setPastries(result);
        } catch (error) {
            console.error("Error fetching pastries:", error);
        }
    };

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

    const playGame = async (event) => {
        event.preventDefault();
        setIsUserAction(true);
        try {
            await fetch('http://localhost:3001/games', {
                headers: {
                    'x-access-token': localStorage.getItem('token')
                },
            });
            await fetchPastries();
            fetchEmptyPastry();
        } catch (error) {
            console.error("Error playing game:", error);
        }
    };

    return (
        <div>
            {showConfetti && <Confetti />}
            {isTheGameOver ? (
                <div className="game_over">
                    <h1>Toutes les patisseries ont été gagnées !</h1>
                    <div className="buttons-wrapper">
                        <button onClick={winners}>Voir les gagnants</button>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="main">
                        <h1>Jouer</h1>
                        <div className="buttons-wrapper">
                            <button onClick={playGame}>Lancer les dés</button>
                        </div>
                    </div>
                    <div className="main">
                        <h1>Liste des gâteaux</h1>
                        {pastries.map(pastry => (
                            <p key={pastry.name}>{pastry.name}: {pastry.stock}</p>
                        ))}
                        <div className="buttons-wrapper">
                            <button onClick={winners}>Voir les gagnants</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Game;
