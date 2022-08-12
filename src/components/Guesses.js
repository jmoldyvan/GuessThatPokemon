import React from "react"

export default function Guesses(props){

    const [formData, setFormData] = React.useState(
        {firstGuess: ""}
    )
    console.log(props.pokemonDataObject.start);

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
        // submitToApi(formData)
        console.log(formData)
    }
    return(
        <main className="formsAndButtons">
            <div className="aboutContainer">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        onChange={handleChange}
                        name="firstGuess"
                        value={formData.firstGuess}
                    />
                    <button disabled={props.pokemonDataObject.start ? false :true} className="submitButton" onClick={()=> props.takeGuess(formData.firstGuess)}> SUBMIT</button>
                </form>
                <button onClick={props.handleClick} >NEW POKEMON</button>
                <button  onClick={()=> props.revealAnswer()} >I DON'T KNOW</button>
            </div>
        </main>

        )}
