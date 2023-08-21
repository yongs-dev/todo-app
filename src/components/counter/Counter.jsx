import {useState} from "react";
import './Counter.css'
import CounterButton from "./CounterButton";

export default function Counter() {
    const [count, setCount] = useState(0)

    function decrementCounterParentFunction(by) {
        setCount(count - by)
    }

    function incrementCounterParentFunction(by) {
        setCount(count + by)
    }

    function resetCounter() {
        setCount(0)
    }

    return (
        <>
            <span className="totalCount">{count}</span>
            <CounterButton by={1} decrementMethod={decrementCounterParentFunction} incrementMethod={incrementCounterParentFunction} />
            <CounterButton by={2} decrementMethod={decrementCounterParentFunction} incrementMethod={incrementCounterParentFunction} />
            <CounterButton by={5} decrementMethod={decrementCounterParentFunction} incrementMethod={incrementCounterParentFunction} />
            <CounterButton decrementMethod={decrementCounterParentFunction} incrementMethod={incrementCounterParentFunction} />
            <button className="resetButton" onClick={resetCounter}>Reset</button>
        </>
    )
}