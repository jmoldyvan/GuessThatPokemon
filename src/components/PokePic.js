import React from 'react';

// pokemonData.id
// pokemonData.name
// pokemonData.weight
// pokemonData.type[0]
// pokemonData.type[1]
// pokemonData.sprites.front_default

export default function PokePic(props) {

    return (
            <main className="main">
                <img className="pokePic" src={props.pokemonDataObject.image} />
                <div className="pokeNameContainer">
                    {props.pokemonDataObject.match && <h2 className="pokeName">{`CORRECT, THIS IS ${props.pokemonDataObject.name.toUpperCase()}`}</h2>}
                    {props.pokemonDataObject.idk && <h2 className="pokeName">{`OAK SAYS THIS IS ${props.pokemonDataObject.name.toUpperCase()}`}</h2>}
                </div>
            </main>

    );
  }