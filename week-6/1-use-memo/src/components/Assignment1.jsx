import { useState,useMemo } from "react";

// In this assignment, your task is to create a component that performs an expensive calculation (finding the factorial) based on a user input. 
// Use useMemo to ensure that the calculation is only recomputed when the input changes, not on every render.

export function Assignment1() {
    const [input, setInput] = useState(0);
    // Your solution starts here
    let expensiveValue = useMemo(() =>calculateFactorial(input) , [input]);

    // Your solution ends here

    return (
        <div>
            <input
                type="number"
                value={input}
                onChange={(e) => setInput(Number(e.target.value))}
            />
            <p>Calculated Value: {expensiveValue}</p>
        </div>
    );
}

function calculateFactorial(num)
{
    let res = 1;
    if (num == 0 || num == 1)
        return 1;
    for (let t = num; t >= 1; t--) {
        res = res * t;
    }
    return res;
}