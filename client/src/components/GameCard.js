import React from 'react';

function GameCard({game}){
    return(
        <div className="border p-4 m-1" key={game._id}>
            <h3>{game.title}</h3>
            <p>{game.rate}</p>
            <p>{game.content}</p>
          </div>
    );

}


export default GameCard;