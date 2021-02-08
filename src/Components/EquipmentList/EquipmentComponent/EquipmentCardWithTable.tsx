import React, {useState} from 'react';
import {initialEqpmntStateType} from "../../../Redux/eqpmnt-reduser";
import {
    Button, Grid, IconButton,
    Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from "@material-ui/core";
import style from "../../EquipmentList/EquipmentComponent/EquipmentCard.module.css";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../Redux/redux-store";
import {Delete} from "@material-ui/icons";

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

                <TableContainer component={Paper}>
                    <Table className={style.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Дата ремонта</TableCell>
                                <TableCell align="right">Кол-во импульсов </TableCell>
                                <TableCell align="left">Проведённые работы</TableCell>
                                <TableCell align="left">Заменено</TableCell>
                                <TableCell align="left">Комментарии</TableCell>
                                <TableCell align="right">Исполнитель</TableCell>

                            </TableRow>
                        </TableHead>
                        {equipmentState[props.index].repairs?.map((r, index, array) => {
                            return <TableRow key={index}>
                                <TableCell component="th" scope="row">{r.date}

                                    {array[index + 1] && array[index + 1].date !== array[index].date && <hr/>}
                                </TableCell>
                                <TableCell align="right">{r.pulseCount} </TableCell>
                                <TableCell align="left">{r.whatWasDone}</TableCell>
                                <TableCell align="left">{r.whatWasReplaced}</TableCell>
                                <TableCell align="left">{r.notes}</TableCell>
                                <TableCell align="right">{r.serviceMan}</TableCell>
                            </TableRow>

                        })}
                        <TableBody>

                        </TableBody>

                    </Table>
                </TableContainer>
                <Button onClick={() => props.setIsInfoShowing(false)} style={{}}>X</Button>
            </Paper>

        </div>
    )
}

export default EquipmentCardWithTable