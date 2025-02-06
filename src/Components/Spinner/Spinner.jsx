import React, { useState } from 'react'
import {PacmanLoader} from 'react-spinners';

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
export default function Spinner() {
   
        let [loading, setLoading] = useState(true);
        let [color, setColor] = useState("#ffffff");
  return <>
  
  <div className="sweet-loading">
      <PacmanLoader
        color={'#0aad0a'}
        size={100}
        cssOverride={override}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  </>
}
