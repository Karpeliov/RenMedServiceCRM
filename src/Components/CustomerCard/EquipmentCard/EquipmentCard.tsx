import React from 'react';
import {EqpmntType} from "../../../App";

export type EquipmentPropsType = {
    id: string
    name: string
    sn: string
    instDate: string
    removeEqpmnt: (eqpmntId: string) => void
}

function EquipmentCard(props: EquipmentPropsType) {
    return (
        <div>
            <div className={"eqpmnt"}>
                <span>{props.name}</span>
                <span> S/N: {props.sn}</span>
                <span>, Installed: {props.instDate}</span>

            </div>
            <button onClick={ () =>  props.removeEqpmnt(props.id)}>Delete</button>
        </div>
    )
}

export default EquipmentCard