import React,{useState, useEffect, useContext} from "react";
import {
  Footer,
  Table,
  Form,
  Services,
  Profile,
  GetShipment,
  CompleteShipment,
  StartShipment,
  Nav1,
  Nav3,
  Nav2,
  Fot1,
  Fot2,
  Str1,
} from "../Components/index";
import { TrackingContext} from "@/Context/Tracking";
const index = () =>{
  const {
    currentUser,
    createShipment,
    getAllShipment,
    CompleteShipment,
    GetShipment,
    StartShipment,
    GetShipmentCount,
  } = useContext(TrackingContext);
  //state variable
  const [createShipmentModel, setCreateShipmentModel] = useState(false);
  const [openProfile,setOpenProfile] = useState(false);
  const [completeModal, setCompleteModal]= useState(false);
  const [startModal, setStartModal] = useState(false);
  const [getModal, setGetModal] = useState(false);
  const [allShipmentsdata, setallShipmentsdata]= useState();

  useEffect(()=> {
    const getCampaignData = getAllShipment();
    return async () =>{
      const allData = await getCampaignData;
      setallShipmentsdata(allData);

    };
  }, []);
  return (
    <>
    <Services
    setOpenProfile = {setOpenProfile}
    setCompleteModal = {setCompleteModal}
    setGetModal = {setGetModal}
    setStartModal= {setStartModal}
    />
    <Table
    setCreateShipmentModel = {setCreateShipmentModel}
    allShipmentsdata = {allShipmentsdata}
    />
    <Form
    createShipmentModel ={createShipmentModel}
    createShipment = {createShipment}
    setCreateShipmentModel = {setCreateShipmentModel}
    />
    <Profile
    openProfile = {openProfile}
    setOpenProfile = {setOpenProfile}
    currentUser= {currentUser}
    GetShipmentCount = {GetShipmentCount}
    />
    <CompleteShipment
    completeModal = {completeModal}
    setCompleteModal = {setCompleteModal}
    CompleteShipment = {CompleteShipment}
    />
    <GetShipment
    getModal = {getModal}
    setGetModal = {setGetModal}
    GetShipment = {GetShipment}
    />
    <StartShipment
    startModal = {startModal}
    setStartModal= {setStartModal}
    StartShipment = {StartShipment}
    />
    </>
  );
};
export default index;