import React, {useState} from 'react';
import {storeType} from "../../../index";
import {dellEqpmntAC, EqpmntType, initialEqpmntStateType} from "../../../Redux/eqpmnt-reduser";
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {TypeNameType} from "../EquipmentList";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../Redux/redux-store";

export type EquipmentPropsType = EqpmntType & {
     // store: storeType
  //  setEquipmentState: () => void
}

function EquipmentCard(props: EquipmentPropsType) {

    const equipmentState = useSelector<AppRootStateType, initialEqpmntStateType>(state => state.Equipment)

    const dispatch = useDispatch()

    const delEq = () => {
        dispatch(dellEqpmntAC(props.id))
      //props.store.dispatch(dellEqpmntAC(props.id))
      //  props.setEquipmentState()
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