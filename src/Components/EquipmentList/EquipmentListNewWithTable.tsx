import React, {ChangeEvent, useState} from 'react';
import EquipmentCard, {EquipmentPropsType} from "./EquipmentComponent/EquipmentCard";
import {storeType} from "../../index";
import {
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField/TextField';
import style from './EquipmentList.module.css'
import {addEqpmntAC, dellEqpmntAC, EqpmntType, initialEqpmntStateType} from "../../Redux/eqpmnt-reduser";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../Redux/redux-store";
import EquipmentCardWithTable from "./EquipmentComponent/EquipmentCardWithTable";
import {Delete} from "@material-ui/icons";


export type CustomerCardPropsType = {
    store: storeType
}

export type TypeNameType = string

// | "" | "Vectus" | "Icon" | "StarLux" | "Polus" | "Fimet" | "vectus" | "icon" | "starLux" | "polus" | "fimet"

function EquipmentListNewWithTable(props: CustomerCardPropsType) {
    console.log("EquipmentListNewWithTable")
    const allEquipment = useSelector<AppRootStateType, initialEqpmntStateType>(state => state.Equipment)

    const dispatch = useDispatch()

    const [typeName, setTypeName] = useState<TypeNameType>("")
    const [sn, setSn] = useState<string>("")
    const [date, setDate] = useState<string>("")
    const [error, setError] = useState("")
    const [owner, setOwner] = useState("")
    const [isInfoShowing, setIsInfoShowing] = useState(false)
    const [showingIndex, setShowingIndex] = useState(0)
    const [equipmentState, setEquipmentState] = useState<Array<EqpmntType>>(allEquipment)

    const addEqpmnt = () => {
        const trimmedTypeName = typeName.trim()  //обрезает пробелы в начале и в конце строки
        const trimmedSn = sn.trim()
        const trimmedDate = date.trim()
        const trimmedOwner = owner.trim()
        if (trimmedTypeName && trimmedSn && trimmedDate && trimmedOwner) {
            // (props.store.dispatch({type: "ADD_NEW_EQPMNT", sn: sn, name: typeName, instDate: date}))
            dispatch(addEqpmntAC(typeName, sn, date, owner))
            setEquipmentState(props.store.getState().Equipment)
            // setEquipmentState(props.store.getState().Equipment)


        } else {
            setError("Заполните все поля.")
        }
        //setError('')
        setTypeName("")
        setSn("")
        setDate("")
        setOwner("")
    }

    const delEq = (id: string) => {
        dispatch(dellEqpmntAC(id))
        setEquipmentState(props.store.getState().Equipment)
    }

    const findEqpmnt = () => {
        const trimmedTypeName = typeName.trim()
        const trimmedSn = sn.trim()
        const trimmedDate = date.trim()
        const trimmedOwner = owner.trim()
        if (trimmedTypeName) {
            // (props.store.dispatch({type: "FIND_EQPMNT", sn: sn, name: typeName, instDate: date})) // for working with store
            setEquipmentState(props.store.getState().Equipment.filter(eq => eq.name === typeName))
        } else if (trimmedSn) {
            setEquipmentState(props.store.getState().Equipment.filter(eq => eq.sn === sn))
        } else if (trimmedDate) {
            setEquipmentState(props.store.getState().Equipment.filter(eq => eq.instDate === date))
        } else if (trimmedOwner) {
            setEquipmentState(props.store.getState().Equipment.filter(eq => eq.owner === owner))
        } else {
            setError("Заполните поля, по которым нужно искать.")

        }
        setTypeName("")
        setSn("")
        setDate("")
        setOwner("")
    }

    const ShowAllEqpmnt = () => {
        setEquipmentState(props.store.getState().Equipment)
        setTypeName("")
        setSn("")
        setDate("")
        setOwner("")
    }

    const onChangeSelHandler = (e: React.ChangeEvent<{ value: unknown }>) => {    //для родного селекта e: ChangeEvent<HTMLSelectElement>
        setError("")
        setTypeName(e.target.value as string)   // (e.currentTarget.value) для родного селекта
        if (e.currentTarget.value === "Vectus") {
            setSn("35-")
        } else if (e.currentTarget.value === "Icon") {
            setSn("25-")
        } else if (e.currentTarget.value === "Beyond Polus") {
            setSn("PG")
        } else {
            setSn("")
        }
    }

    const onChangeOwnerHandler = (e: React.ChangeEvent<{ value: unknown }>) => {
        setOwner(e.target.value as string)
    }

    const onChangeSnHandler = (e: ChangeEvent<HTMLInputElement>) => {
        // setTypeName("")
        setSn(e.currentTarget.value)
    }

    const onChangeDateHandler = (e: ChangeEvent<HTMLInputElement>) => {
        // setTypeName("")
        setDate(e.currentTarget.value)
    }

    const showInfo = (index: number) => {
        setShowingIndex(index)
        setIsInfoShowing(!isInfoShowing)
    }

    function sortByName(a: EqpmntType, b: EqpmntType) {
        switch (a.owner > b.owner) {
            case true:
                return 1
            case false:
                return -1
            default:
                return 0
        }
    }

    return (
        <div>Список оборудования
            <div className={style.equipment}>Всё оборудование</div>
            {/*{"Type: "}*/}
            {/*<InputLabel id="E-TYPE">Тип</InputLabel>*/}
            <Select labelId="E-TYPE"
                    label={"TYPE"}
                    variant={"outlined"}
                    error={!!error}
                    style={{marginLeft: "15px", width: "155px"}}
                    onChange={onChangeSelHandler}
                    value={typeName}>
                <option value={""}>-</option>
                <option value={"Vectus"}>Vectus</option>
                <option value={"Icon"}>Icon</option>
                <option value={"MedArt"}>MedArt</option>
                <option value={"Beyond Polus"}>Beyond Polus</option>
            </Select>


            {/*<input className={ error ? "error" : ""} onChange={onChangeTypeHandler} value={typeName}/>*/}
            {/*{" S/N "}*/}
            {/*<input  className={error ? "error" : ""} onChange={onChangeSnHandler} value={sn}/>*/}
            <TextField variant={"outlined"}
                       size={"medium"}
                       label={"S/N (серийный номер)"}
                       error={!!error}
                // helperText={error}
                       style={{marginLeft: "15px"}}
                       onChange={onChangeSnHandler}
                       value={sn}/>

            {/*{" Date of Installation: "}*/}
            {/*<input type={"date"} className={error ? "error" : ""} onChange={onChangeDateHandler} value={date}/>*/}

            <TextField id="install-date"
                       label="Дата установки"
                       type="date"
                       defaultValue={""}
                       variant={"outlined"}
                       size={"medium"}
                       error={!!error}
                // helperText={error}
                       style={{marginLeft: "15px"}}
                       onChange={onChangeDateHandler}
                       value={date}
            />

            <Select label={"Медцентр"}
                    variant={"outlined"}
                    error={!!error}
                    style={{marginLeft: "15px", width: "155px"}}
                    onChange={onChangeOwnerHandler}
                    value={owner}>
                <option value={""}>Медцентр</option>
                <option value={"ШайнЭст Плюс"}>ШайнЭст Плюс</option>
                <option value={"ШайнЭст Люкс"}>ШайнЭст Люкс</option>
                <option value={"ШайнЭст Медикал"}>ШайнЭст Медикал</option>
                <option value={"ШайнЭст Голд"}>ШайнЭст Голд</option>
            </Select>

            <Button variant={"contained"}
                    size={"large"}
                    style={{marginLeft: "15px", marginTop: "5px"}}
                    onClick={addEqpmnt}>Add new</Button>

            <Button variant={"contained"}
                    size={"large"}
                    style={{marginLeft: "15px", marginTop: "5px"}}
                    onClick={findEqpmnt}>Find</Button>

            <Button variant={"contained"}
                    size={"large"}
                    style={{marginLeft: "15px", marginTop: "5px"}}
                    onClick={ShowAllEqpmnt}>Show All</Button>

            {error && <div className={"error"} style={{color: "red"}}>{error}</div>}
            <hr/>
            <TableContainer component={Paper}>
                <Table className={style.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Тип
                                {/*<Button size={"small"} color={"secondary"} onClick={showInfo}>Info</Button>*/}
                            </TableCell>
                            <TableCell align="right"> </TableCell>
                            <TableCell align="right">S/N (серийный номер) </TableCell>
                            <TableCell align="right">Дата установки</TableCell>
                            <TableCell align="right">Владелец</TableCell>
                            <TableCell align="right">Удалить</TableCell>

                        </TableRow>
                    </TableHead>
                    {equipmentState.sort(sortByName).map((eq, index, array) => {
                        return <TableRow key={eq.id}>
                            <TableCell component="th" scope="row">{eq.name}

                                {array[index + 1] && array[index + 1].owner !== array[index].owner && <hr/>}
                            </TableCell>
                            <TableCell align="right"> <Button size={"small"} color={"secondary"}
                                                              onClick={() => showInfo(index)}>Info</Button></TableCell>
                            <TableCell align="right">{eq.sn}</TableCell>
                            <TableCell align="right">{eq.instDate}</TableCell>
                            <TableCell align="right">{eq.owner}
                                {array[index + 1] && array[index + 1].owner !== array[index].owner && <hr/>}
                            </TableCell>
                            <TableCell align="right">
                                <IconButton
                                    onClick={() => delEq(eq.id)}
                                    size={"small"}><Delete/>
                                </IconButton>
                            </TableCell>
                        </TableRow>

                    })}
                    <TableBody>

                    </TableBody>

                </Table>
            </TableContainer>
            {/*<div className={style.equipmentCard}>*/}
                {isInfoShowing &&

                <EquipmentCardWithTable index={showingIndex} setIsInfoShowing={setIsInfoShowing} />}
            {/*</div>*/}


        </div>
    )
}

export default EquipmentListNewWithTable