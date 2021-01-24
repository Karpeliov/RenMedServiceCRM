import React, {useState} from 'react';
import {initialEqpmntStateType} from "../../../Redux/eqpmnt-reduser";
import {
    Button, Grid,
    Paper,
} from "@material-ui/core";
import style from "../../EquipmentList/EquipmentComponent/EquipmentCard.module.css";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../Redux/redux-store";

export type EquipmentPropsType = {
    // store: storeType
    // setEquipmentState: () => void
    index: number
    setIsInfoShowing: (f: boolean) => void
}

function EquipmentCardWithTable(props: EquipmentPropsType) {

    const equipmentState = useSelector<AppRootStateType, initialEqpmntStateType>(state => state.Equipment)

    return (
        <div className={style.equipmentCard}>
            <Paper elevation={3}>
                <span><b>Last pulse count: </b>{equipmentState[props.index].pulseCount} </span>
                <div><b>дата: </b>{equipmentState[props.index].repairs?.map(r => r.date)} </div>
                <span><b>что сделано: </b>{equipmentState[props.index].repairs?.map(r => r.whatWasDone)}; </span>
                <span><b>заменено: </b>{equipmentState[props.index].repairs?.map(r => r.whatWasReplaced)}; </span>
                <div><b>примечания: </b>{equipmentState[props.index].repairs?.map(r => r.notes)};
                <b> исполнитель: </b> {equipmentState[props.index].repairs?.map(r => r.serviceMan)}</div>
                <Button onClick={() => props.setIsInfoShowing(false)} style={{}}>X</Button>
            </Paper>

        </div>
    )
}

export default EquipmentCardWithTable