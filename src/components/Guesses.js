import React from "react"
import { ReactSearchAutocomplete } from "react-search-autocomplete";

export default function Guesses(props){

    const [formData, setFormData] = React.useState(
        {firstGuess: ""}
    )
    console.log(formData.firstGuess);
    const [searchString, setSearchString] = React.useState("");
    console.log(props.pokemonDataObject.start);
    console.log(props.instructions);

    function handleChange(event) {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value.toLowerCase()
            }
        })
    }
    function handleSubmit(event) {
        event.preventDefault()
        console.log(formData)
    }
    const style = {
        display: props.instructions ?  "none": "flex"
    }

    const handleOnSearch = (string, results) => {
        console.log(string, results);
        setSearchString(string);
      };
    const handleOnSelect = (string) => {
        console.log(string.name);
        setSearchString(string.name);
      };

      const handleOnFocus = () => {
        console.log("Focused");
      };
    
      const formatResult = (item) => {
        console.log(item);
        return (
          <div className="result-wrapper">
            <span className="result-span">id: {item.id}</span>
            <span className="result-span">name: {item.name}</span>
          </div>
        );
      };

    return(
        <main className="formsAndButtons">
            <div className="aboutContainer">
                <form onSubmit={handleSubmit}>
                    <div style={{ width: 200, margin: 20 }}>
                    <ReactSearchAutocomplete
                        items={props.allPokemonNames}
                        onSearch={handleOnSearch}
                        onSelect={handleOnSelect}
                        inputSearchString={searchString}
                        autoFocus
                        onChange={handleChange}
                        name="firstGuess"
                        value={formData.firstGuess}
                    />
                    </div>
                    
                    <button disabled={props.pokemonDataObject.start ? false :true} className="submitButton" onClick={()=> props.takeGuess(searchString)}> SUBMIT</button>
                </form>
                <button onClick={props.handleClick} >NEW POKEMON</button>
                <button  onClick={()=> props.revealAnswer()} >I DON'T KNOW</button>
                <button className="instructButton"  onClick={()=> props.handleInstructions()} >INSTRUCTIONS</button>
            </div>
            <section style={style} className = {props.instructions ? ".nodisplay" :"instructionpage"}>
                <div style={style} className= {props.instructions ? ".nodisplay" :"instructionContent"} >
                    <span className= {props.instructions ? ".nodisplay" :"X"} onClick={()=> props.handleInstructions()}>X</span>
                    <p >-- PRESS "NEW POKEMON" TO START GAME // RESET // GET NEW IMAGE</p>
                    <p>-- PRESS "I DON'T KNOW" TO REVEAL IMAGE</p>
                    <p>-- TYPE ANSWER IN WHITE BOX AND TAKE A GUESS USING THE "SUBMIT" BUTTON.</p>
                    <p >-- WHEN TILES APPEAR: YOU MUST REMOVE 3 TILES PER GUESS. YOU WILL BE LOCKED OUT FROM
                        REMOVING ANYMORE TILES UNTIL A GUESS IS SUBMITTED. 
                    </p>
                    <p>-- YOU HAVE 5 GUESSES TO ANSWER CORRECTLY AND GRADUATE POKEMON ACADEMY</p>
                </div>
            </section>
        </main>

        )}
