import React, {useState} from 'react';
import {storeType} from "../../../index";
import {dellEqpmntAC, EqpmntType} from "../../../Redux/eqpmnt-reduser";
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {TypeNameType} from "../EquipmentListNew";

export type EquipmentPropsType = EqpmntType & {
       store: storeType
    setEquipmentState: () => void
}

function EquipmentCard(props: EquipmentPropsType) {

    const delEq = () => {
        props.store.dispatch(dellEqpmntAC(props.id))
        props.setEquipmentState()
    }

    return (
        <div>
            <div className={"eqpmnt"}>
                <span>{props.name}</span>
                <span> S/N: {props.sn}</span>
                <span>, Installed: {props.instDate}</span>
                <span>, {props.owner}</span>
                <span> - </span>

                <IconButton
                  //  onClick={() => {props.store.dispatch({type: "REMOVE_EQPMNT", eqpmntId: props.id})}}
                    onClick={delEq}
                size={"small"}><Delete/></IconButton>
                {/*onClick={ () =>  props.removeEqpmnt(props.id)}>Delete</button>*/}
            </div>

        </div>
    )
}

export default EquipmentCard