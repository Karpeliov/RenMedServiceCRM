import {v1} from "uuid";

export type SingleRepairType = {
    date: string
    whatWasDone: string
    serviceMan: string
    whatWasReplaced: string
    notes: string
}

export type EqpmntType = {
    id: string
    name: string
    sn: string
    instDate: string
    owner: string
    pulseCount?: number
    repairs?: Array<SingleRepairType>
}

export type EqpmntActionType = addEqpmntActionType | removeEqpmntActionType | findEqpmntActionType | showAllEqpmntActionType

export type addEqpmntActionType = {
    type: "ADD_NEW_EQPMNT"
    // id: string
    name: string
    sn: string
    instDate: string
    owner: string

}
export type findEqpmntActionType = {
    type: "FIND_EQPMNT"
    // id: string
    owner: string
    name: string
    sn: string
    instDate: string
    findWith: "name" | "date" | "sn" | "owner"
}
export type removeEqpmntActionType = {
    type: "REMOVE_EQPMNT"
    // id: string
    eqpmntId: string

}
export type showAllEqpmntActionType = {
    type: "SHOW_ALL_EQPMNT"
}

export const addEqpmntAC = (name: string, sn: string, instDate: string, owner: string): addEqpmntActionType => {
    return {
        type: "ADD_NEW_EQPMNT",
        name: name,
        sn: sn,
        instDate: instDate,
        owner: owner
    }
}

export const dellEqpmntAC = (eqpmntId: string): removeEqpmntActionType => {
    return {
        type: "REMOVE_EQPMNT",
        eqpmntId: eqpmntId
    }
}

export const findEqpmntAC = (name: string, sn: string, instDate: string, owner: string, findWith: "name" | "date" | "sn" | "owner"): findEqpmntActionType => {
    return {
        type: "FIND_EQPMNT",
        name: name,
        sn: sn,
        instDate: instDate,
        findWith: findWith,
        owner: owner
    }
}

export const showAllEqpmntAC = (): showAllEqpmntActionType => {
    return {
        type: "SHOW_ALL_EQPMNT",

    }
}

export type initialEqpmntStateType = Array<EqpmntType>

const initialEqpmntState = [
    {id: v1(), name: "Vectus", sn: "35-0651", instDate: "18.04.2013", owner: "ШайнЭст Люкс",
        pulseCount: 12000000,
        repairs:[{date: "2021-01-24", serviceMan: "Карпелёв", whatWasDone: "замена/ремонт помпы", notes: "выходной", whatWasReplaced: "-"},
        ]},
    {id: v1(), name: "Vectus", sn: "35-0632", instDate: "06.01.2014", owner: "ШайнЭст Люкс"},
    {id: v1(), name: "Icon", sn: "25-0618", instDate: "18.04.2013", owner: "ШайнЭст Люкс"},
    {id: v1(), name: "MedArt", sn: "123456", instDate: "02.04.2020", owner: "ШайнЭст Люкс"},

    {id: v1(), name: "Vectus", sn: "35-0269", instDate: "4.18.2013", owner: "ШайнЭст Плюс"},
    {id: v1(), name: "Vectus", sn: "35-0639", instDate: "26.02.2014", owner: "ШайнЭст Плюс"},

    {id: v1(), name: "Vectus", sn: "35-1351", instDate: "18.10.2016", owner: "ШайнЭст Медикал"},
    {id: v1(), name: "Vectus", sn: "35-1504", instDate: "XX.08.2017", owner: "ШайнЭст Медикал"},

] as Array<EqpmntType>

export const eqpmntReducer = (state = initialEqpmntState, action: EqpmntActionType): initialEqpmntStateType => {
    switch (action.type) {
        case "ADD_NEW_EQPMNT": {

            let newEqpmnt: EqpmntType = {
                id: v1(), name: action.name, sn: action.sn,
                instDate: action.instDate,
                owner: action.owner
            }
            return [newEqpmnt, ...state]
        }

        case "REMOVE_EQPMNT": {
            let stateFiltered = state.filter((eq) => eq.id !== action.eqpmntId)
            let stateCopy = [...stateFiltered]
            return stateCopy
        }

        case "FIND_EQPMNT": {
            let stateFiltered = [...state]
            switch (action.findWith) {
                case "name":
                    stateFiltered = state.filter(eq => eq.name === action.name)
            }
            switch (action.findWith) {
                case "sn":
                    stateFiltered = state.filter(eq => eq.sn === action.sn)
            }
            switch (action.findWith) {
                case "date":
                    stateFiltered = state.filter(eq => eq.instDate === action.instDate)
            }
            switch (action.findWith) {
                case "owner":
                    stateFiltered = state.filter(eq => eq.owner === action.owner)
            }

            let stateCopy = [...stateFiltered]

            return stateCopy
        }

        case "SHOW_ALL_EQPMNT":
            return state
        default:
            return state

    }
}
export default eqpmntReducer

// old state
// eqpmnt: [
//     {id: v1(), name: "Vectus", sn: "35-0651", instDate: "18.04.2013", owner: "ShineEst", subOwner: "LUX"},
//     {id: v1(), name: "Vectus", sn: "35-0632", instDate: "06.01.2014", owner: "ShineEst", subOwner: "LUX"},
//     {id: v1(), name: "Icon", sn: "25-0618", instDate: "18.04.2013", owner: "ShineEst", subOwner: "LUX"},
//
//     {id: v1(), name: "Vectus", sn: "35-0269", instDate: "4.18.2013", owner: "ShineEst", subOwner: "Plus"},
//     {id: v1(), name: "Vectus", sn: "35-0639", instDate: "26.02.2014", owner: "ShineEst", subOwner: "Plus"},
//
//     {id: v1(), name: "Vectus", sn: "35-1351", instDate: "18.10.2016", owner: "ShineEst", subOwner: "Medical"},
//     {id: v1(), name: "Vectus", sn: "35-1504", instDate: "XX.08.2017", owner: "ShineEst", subOwner: "Medical"},
//
// ] as Array<EqpmntType>