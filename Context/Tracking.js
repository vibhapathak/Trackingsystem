import React, { useState, useEffect, Children } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

// Import the ABI
import tracking from '../Context/Tracking.json';

// Contract details
const ContractAddress = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
const ContractABI = tracking.abi;

// Function to get the contract instance
const fetchContract = (signerOrProvider) =>
    new ethers.Contract(ContractAddress, ContractABI, signerOrProvider);

export const TrackingContext = React.createContext();

export const TrackingProvider = ({ children }) => {
    // State variable
    const DappName = "PRODUCT TRACKING DAPP";
    const [currentUser, setCurrentUser] = useState("");

    const createShipment = async (items) => {
        console.log(items);
        const { receiver, pickUpTime, distance, price } = items;
        try {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);
            const createItem = await contract.createShipment(
                receiver,
                new Date(pickUpTime).getTime(),
                distance,
                ethers.utils.parseUnits(price, 18), {
                    value: ethers.utils.parseUnits(price, 18),
                }
            );
            await createItem.wait();
            console.log(createItem);
        } catch (error) {
            console.log("something went wrong", error);
        }
    };

    const getAllShipments = async () => {
        try {
            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);
            const shipments = await contract.getAllTransactions();
            const allShipments = shipments.map((shipment) => ({
                sender: shipment.sender,
                receiver: shipment.receiver,
                price: ethers.utils.formatEther(shipment.price.toString()),
                pickUpTime: shipment.pickUpTime.toNumber(),
                deliveryTime: shipment.deliveryTime.toNumber(),
                distance: shipment.distance.toNumber(),
                isPaid: shipment.isPaid,
                status: shipment.status,
            }));
            return allShipments;
        } catch (error) {
            console.log("error fetching shipments", error);
        }
    };

    const getShipmentsCount = async () => {
        try {
            if (!window.ethereum) return "Install MetaMask";
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);
            const shipmentCount = await contract.getShipmentsCount(accounts[0]);
            return shipmentCount.toNumber();
        } catch (error) {
            console.log("error getting shipment count", error);
        }
    };

    const completeShipment = async (completeShip) => {
        console.log(completeShip);
        const { receiver, index } = completeShip;
        try {
            if (!window.ethereum) return "Install MetaMask";
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);

            const transaction = await contract.completeShipment(
                accounts[0],
                receiver,
                index, {
                    gasLimit: 300000,
                }
            );
            await transaction.wait();
            console.log(transaction);
        } catch (error) {
            console.log("error completing shipment", error);
        }
    };

    const getShipment = async (index) => {
        console.log(index * 1);
        try {
            if (!window.ethereum) return "Install MetaMask";
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);
            const shipment = await contract.getShipment(accounts[0], index * 1);
            const singleShipment = {
                sender: shipment[0],
                receiver: shipment[1],
                pickUpTime: shipment[2].toNumber(),
                deliveryTime: shipment[3].toNumber(),
                distance: shipment[4].toNumber(),
                price: ethers.utils.formatEther(shipment[5].toString()),
                status: shipment[6],
                isPaid: shipment[7],
            };
            return singleShipment;
        } catch (error) {
            console.log("error fetching shipment", error);
        }
    };

    const startShipment = async (getProduct) => {
        const { receiver, index } = getProduct;
        try {
            if (!window.ethereum) return "Install MetaMask";
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);
            const shipment = await contract.startShipment(
                accounts[0],
                receiver,
                index * 1
            );
            await shipment.wait();
            console.log(shipment);
        } catch (error) {
            console.log("error starting shipment", error);
        }
    };

    const checkIfWalletConnected = async () => {
        try {
            if (!window.ethereum) return "Install MetaMask";
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            if (accounts.length) {
                setCurrentUser(accounts[0]);
            } else {
                return "No account";
            }
        } catch (error) {
            console.log("error checking wallet connection", error);
        }
    };

    const connectWallet = async () => {
        try {
            if (!window.ethereum) return "Install MetaMask";
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setCurrentUser(accounts[0]);
        } catch (error) {
            return "Something went wrong";
        }
    };

    useEffect(() => {
        checkIfWalletConnected();
    }, []);

    return (
        <TrackingContext.Provider
            value={{
                connectWallet,
                createShipment,
                getAllShipments,
                completeShipment,
                getShipment,
                startShipment,
                getShipmentsCount,
                DappName,
                currentUser,
            }}
        >
            {children}
        </TrackingContext.Provider>
    );
};

