import React from "react"
import Loading from './components/Loading'
import PokePic from './components/PokePic'
import Guesses from './components/Guesses'
import Footer from "./components/Footer"
import boxes from "./components/boxes"
import trackGuessBox from "./components/trackGuessBox"
import Box from "./components/Box"
import TrackGuessBoxes from "./components/TrackGuessBoxes"


// set all the api data into an array
// https://pokeapi.co/api/v2/pokemon/{id or name}/limit 905
let rawPokemonAPIData = []
for (let i = 1; i < 494; i++) {
    rawPokemonAPIData.push(`https://pokeapi.co/api/v2/pokemon/${i}/?limit=500`)
}

export default function App() {

    // initiate loading state for loading the page
    const [loading, setLoading] = React.useState(true);

    // initiate pokemondata as an array
    const [allPokemonData, setAllPokemonData] = React.useState([]);
    
    // initiate  pokemon data object, which will be used to store the api data into a more
    // managable object/state
    let[pokemonDataObject, setPokemonDataObject] = React.useState({
        id: null,
        name: '',
        weight: null,
        // type0: '',
        // type1: '',
        image: '',
        match: false,
        idk: false,
        start: false,
        guessCounter: 0,
    })

    let [squares, setSquares] = React.useState(boxes)
    let [allPokemonNames, setAllPokemonNames] = React.useState([])
    let [guessBoxes, setGuessBoxes] = React.useState(trackGuessBox)
    let [idTracker, setIdTracker] = React.useState()
    let [boxCounter, setBoxCounter] = React.useState({counter:1})
    let [counterCounter, setCounterCounter] = React.useState({counter:1})
    let [instructions, setinstructions] = React.useState(true)
    console.log(allPokemonNames);
    // console.log(allPokemonData);
    // this is our fetch for the api data
    const fetchPokemon = async () => {
        try{
            // here we use promise all to promise the entire array rawPokemonAPIData
            // set the state AllpokemonData using the function
            const allPokemonData = await Promise.all(
                rawPokemonAPIData.map((url) => fetch(url).then((res) => res.json()))           
                ) 

            setAllPokemonData(allPokemonData);

            const allPokemonDataNames = 
            allPokemonData.map((thing, index) => ({ id: index, name: thing.name}))                           
                setAllPokemonNames(allPokemonDataNames); 
            // turn off loading compnenet
            setLoading(false);
            // console.log(allPokemonData);
        }   catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        fetchPokemon();
      }, []);
    //   loading true, make loading comp run
    if (loading) {
    return <Loading />;
    }

    function getRandomPokemonInfo(){
        let randomPokemon = allPokemonData[Math.floor(Math.random()*allPokemonData.length)]
        setPokemonDataObject(prevPoke => ({
            ...prevPoke, 
            image: randomPokemon.sprites.other['official-artwork'].front_default, 
            id: randomPokemon.id,
            name: randomPokemon.name,
            weight: randomPokemon.weight,
            match: false,
            idk: false,
            start: true,
            guessCounter: 1,
        }))
        setSquares(prevSquares => {
            return prevSquares.map((square) => {
            return {...square, on: true, disabled: false}
        })
        })
        setBoxCounter( prevValue =>{
            return {...prevValue, counter: 1}
        })
        setCounterCounter( prevValue =>{
            return {...prevValue, counter: 1}
        })
        setIdTracker( prevValue => prevValue = [])
        setGuessBoxes(prevVal => {
            return prevVal.map((guessSquare) => {
                return {...guessSquare, on: true}
            })
        })

    }


    function takeGuess(guess){
        setPokemonDataObject(prevValue => {
            return pokemonDataObject.name === guess ? {...prevValue, match: true, idk: false} :  
            pokemonDataObject.guessCounter === 5 ? {...prevValue, idk: true, match: false} :
            {...prevValue, guessCounter: prevValue.guessCounter + 1}
        })
        setSquares(prevSquares => {
            return pokemonDataObject.name === guess ? prevSquares.map((square) => {
            return {...square, on: false}
        }) : squares
        })
        setSquares(prevSquares => {
            
            return prevSquares.map((square) => {
            return pokemonDataObject.guessCounter === 5 ? {...square, on: false, disabled: true} : square
        })
        })
        setSquares(prevSquares => {
            return prevSquares.map((square) => {
                return  idTracker.includes(square.id) ?   square:{...square, disabled: false}
            })
        })
    }

    function revealAnswer(){
        setPokemonDataObject(prevValue => {
            return  {...prevValue, idk: true, match: false, guessCounter: 5}
        })
        setSquares(prevSquares => {
            return prevSquares.map((square) => {
            return {...square, on: false, disabled: true}
        })
        })
    }

    function toggle(id) {
        setSquares(prevSquares => {
            return prevSquares.map((square) => {
                return square.id === id ? {...square, on: false, disabled: true} : square
            })
        })
        setSquares(prevSquares => {
            return prevSquares.map((square) => {
                return boxCounter.counter % 3 === 0 && boxCounter.counter > 1 ? {...square, disabled: true} : square
            })
        })
        setCounterCounter(prevCount => {
            return boxCounter.counter % 3 === 0 ? {counter: prevCount.counter + 1} : prevCount
        })
        
        setGuessBoxes(prevVal => {
            return prevVal.map((guessSquare) => {
                return boxCounter.counter % 3 === 0 && boxCounter.counter > 1 && 
                counterCounter.counter == guessSquare.id ? {...guessSquare, on: false} : guessSquare
            })
        })
     
        console.log(counterCounter);
        setBoxCounter( prevValue =>{
            return {...prevValue, counter: prevValue.counter + 1}
        })
        setIdTracker(prevValue => {
            return   [...prevValue, id]
        });
    }
    
        function toggleInstructions(){
            setinstructions(previnstructions => previnstructions = previnstructions ? false : true )
            console.log(instructions);
}
console.log(instructions);

    const squareElements = squares.map(square => (
        <Box 
            key={square.id} 
            id={square.id}
            on={square.on} 
            disabled={square.disabled} 
            toggle={toggle}
            pokemonDataObject = {pokemonDataObject}
        />
    ))
    const guessBoxElements = guessBoxes.map(guessBox => (
        <TrackGuessBoxes 
            key={guessBox.id} 
            id={guessBox.id}
            on={guessBox.on} 
        />
    ))
    const style = {
        display: instructions ?  "inline": "none"
    }

    return (
        // pass pokemondataobject as a parameter into Pokepic under the variable name pokemon data object
        // also run getrandompokemoninfo function through the variable handleClick
        <div className="InfoContainer">
            <div className="content">
                <PokePic 
                    instructions = {instructions} 
                    pokemonDataObject={pokemonDataObject}   
                />
                <div style={style} className="boxContainer">{squareElements}</div>
                <Guesses 
                    handleClick= {getRandomPokemonInfo}
                    takeGuess={takeGuess}
                    revealAnswer = {revealAnswer}
                    pokemonDataObject = {pokemonDataObject}
                    handleInstructions = {toggleInstructions}
                    instructions = {instructions}
                    allPokemonNames = {allPokemonNames}
                />
                <div className="trackGuessBoxContainer">
                    {guessBoxElements}
                </div>
                <Footer />
            </div>
        </div>
    )
}