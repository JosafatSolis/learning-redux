import React, { useState } from "react";

const Counter_copy = () => {
    const [count, setCount] = useState(0);
    const handleMinus = () => setCount(prevState => prevState -1 );
    const handlePlus = () => setCount(prevState => prevState +1 );
    return (
        <div>
            <h1>{count}</h1>
            <div>
                <button onClick={handleMinus} >-</button>
                <button onClick={handlePlus} >+</button>
            </div>
        </div>
    )
}

export default Counter_copy;