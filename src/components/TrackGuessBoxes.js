import React from "react"

export default function TrackGuessBoxes(props) {
    const styles = {
        backgroundColor: props.on ? "#00FF00" : "#ff0000",
    }
    
    return (
        
            <div 
                style={styles} 
                className="trackGuessBox"
            >
            </div>
        
    )
}