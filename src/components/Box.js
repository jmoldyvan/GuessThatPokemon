import React from "react"

export default function Box(props) {
    const styles = {
        backgroundColor: props.on ? "#b2d8d8" : "transparent",
        pointerEvents : props.disabled === true ? "none" : "all",
        borderWidth: props.disabled === true ? "0px" : "1px",
    }
    if (props.pokemonDataObject.id == null){
        return null
    }
    
    return (
            <div 
                style={styles} 
                className="box"
                onClick={()=>props.toggle(props.id)}
            >
            </div>
    )
}