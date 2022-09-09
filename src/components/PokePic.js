import React from 'react';



export default function PokePic(props) {

const style = {
    display: props.instructions ?  "flex": "none"
}

    return (
            <main style={style} className="main">
                <img className="pokePic" src={props.pokemonDataObject.image} />
                <div className="pokeNameContainer">
                    {props.pokemonDataObject.match && <h2 className="pokeName">{`CORRECT, THIS IS ${props.pokemonDataObject.name.toUpperCase()}`}</h2>}
                    {props.pokemonDataObject.idk && <h2 className="pokeName">{`OAK SAYS THIS IS ${props.pokemonDataObject.name.toUpperCase()}`}</h2>}
                </div>
            </main>

    );
  }