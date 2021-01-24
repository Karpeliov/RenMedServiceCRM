import React from 'react';
import './App.css';
import EquipmentListNew from "./Components/EquipmentList/EquipmentListNew";
import {storeType} from "./index";
import Header from "./Components/Header/Header";
import VerticalTabs from "./Components/VerticalTabs/VerticalTabs";
import Navbar from "./Components/Navbar/Navbar";
import EquipmentListWithTable from "./Components/CustomerCard/EquipmentListWithTable";
import EquipmentListWithRedux from "./Components/CustomerCard/EquipmentListWithRedux";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./Redux/redux-store";
import {initialEqpmntStateType} from "./Redux/eqpmnt-reduser";
import EquipmentListNewWithTable from "./Components/EquipmentList/EquipmentListNewWithTable";


type appPropsType = {
    store: storeType
}

function App(props: appPropsType) {

    const equipmentState = useSelector<AppRootStateType, initialEqpmntStateType>(state => state.Equipment)

    return (
        <div className="app-wrapper">
            <Header/>
            {/*<VerticalTabs store={props.store}/>*/}
            <Navbar/>

            <div className='app-wrapper-content'>
                <EquipmentListNewWithTable store={props.store}  />


            </div>
        </div>
    );
}

export default App;

