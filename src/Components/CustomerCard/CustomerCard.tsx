import React, {ChangeEvent, useState} from 'react';
import EquipmentCard, {EquipmentPropsType} from "./EquipmentCard/EquipmentCard";
import {EqpmntType} from "../../App";

export type CustomerCardPropsType = {
    eqpmnt: Array<EqpmntType>
    setEqpmnt: (eqpmnt: Array<EqpmntType>) => void
    addEqpmnt: (name: string, sn: string, date: string) => void
    removeEqpmnt: (eqpmntId: string) => void
}

export type TypeNameType = string

// | "" | "Vectus" | "Icon" | "StarLux" | "Polus" | "Fimet" | "vectus" | "icon" | "starLux" | "polus" | "fimet"

function CustomerCard(props: CustomerCardPropsType) {




    const [typeName, setTypeName] = useState<TypeNameType>("")
    // function getSnBegin() {
    //
    //     return (typeName === "Vectus") ?  "25-" : ""
    //
    // }


    const [sn, setSn] = useState<string>("")
    const [date, setDate] = useState<string>("")
    const [error, setError] = useState("")



    const addEqpmnt = () => {
        const trimmedTypeName = typeName.trim()  //обрезает пробелы в начале и в конце строки
        const trimmedSn = sn.trim()  //обрезает пробелы в начале и в конце строки
        const trimmedDate = date.trim()  //обрезает пробелы в начале и в конце строки
        if (trimmedTypeName && trimmedSn && trimmedDate) {
            (props.addEqpmnt(typeName, sn, date))
        } else {
            setError("Enter all Inputs!")

        }
        setTypeName("")
        setSn("")
        setDate("")
    }


    // const onChangeTypeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setError("")
    //     setTypeName(e.currentTarget.value)
    // }
    const onChangeSelHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setError("")
        setTypeName(e.currentTarget.value)
        if (e.currentTarget.value === "Vectus") {
            setSn("25-")
        } else if (e.currentTarget.value === "Icon") {
            setSn("35-")
        } else {setSn("")}
    }

    const onChangeSnHandler = (e: ChangeEvent<HTMLInputElement>) => {
        // setTypeName("")
        setSn(e.currentTarget.value)
    }
    const onChangeDateHandler = (e: ChangeEvent<HTMLInputElement>) => {
        // setTypeName("")
        setDate(e.currentTarget.value)
    }



    const eqpmnts = props.eqpmnt.map(eq => {
        return (
            <div key={eq.id}>
                <EquipmentCard id={eq.id} instDate={eq.instDate} name={eq.name} sn={eq.sn}
                               removeEqpmnt={props.removeEqpmnt}/>
            </div>
        )
    })

    return (
        <div>Customer card
            <div>ShineEst</div>
            {/*{"Type: "}*/}
            <select className={error ? "error" : ""} onChange={onChangeSelHandler} value={typeName}>
                <option>Type</option>
                <option value={"Vectus"}>Vectus</option>
                <option value={"Icon"}>Icon</option>
                <option value={"MedArt"}>MedArt</option>
                <option value={"Beyond Polus"}>Beyond Polus</option>
            </select>
            {/*<input className={ error ? "error" : ""} onChange={onChangeTypeHandler} value={typeName}/>*/}
            {" S/N "}
            <input className={error ? "error" : ""} onChange={onChangeSnHandler} value={sn}/>
            {" Date of Installation: "}
            <input type={"date"} className={error ? "error" : ""} onChange={onChangeDateHandler} value={date}/>
            <button onClick={addEqpmnt}>Add new</button>
            {error && <div className={"error"}>{error}</div>}
            <hr/>
            {eqpmnts}
        </div>
    )
}

export default CustomerCard