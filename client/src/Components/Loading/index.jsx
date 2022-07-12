import React from "react";

export default function Loading() {


    return(
        <div className="loading">
        <img src= {"https://i.gifer.com/YGgI.gif " ? "https://i.gifer.com/YGgI.gif " : <p>Loading..</p> } alt="loading.." border="0"/>
        </div>
    )
}