import React, {useState} from 'react';
import './App.css';
import CustomerCard from "./Components/CustomerCard/CustomerCard";
import {v1} from 'uuid';

export type EqpmntType = {
    id: string
    name: string
    sn: string
    instDate: string

}

function App() {

    let [eqpmnt, setEqpmnt] = useState<Array<EqpmntType>>([
        {id: v1(), name: "Vectus", sn: "35-0100", instDate: "22.06.2015"},

    ])
    
    function addEqpmnt(name: string, sn: string, date: string) {
        const newEqpmnt: EqpmntType = { id: v1(), name: name, sn: sn, instDate: date}
        setEqpmnt([newEqpmnt, ...eqpmnt])
        console.log(eqpmnt)
    }

    function removeEqpmnt(eqpmntId: string) {
        const filteredTasks = eqpmnt.filter(eq => eq.id !== eqpmntId)
        setEqpmnt(filteredTasks)
    }

    return (
        <div className="App">
            <div>
                <CustomerCard eqpmnt={eqpmnt} setEqpmnt={setEqpmnt} addEqpmnt={addEqpmnt} removeEqpmnt={removeEqpmnt}/>

            </div>
        </div>
    );
}

export default App;
