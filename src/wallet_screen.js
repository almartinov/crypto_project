
import React, { useState } from 'react';
import { MDBBtn, MDBContainer, MDBBtnGroup, MDBCard, MDBCardBody, MDBCardTitle, MDBInput, MDBInputGroup, MDBTypography  } from 'mdb-react-ui-kit';
import {CreateMnemonic, getBalance, gen_new, getPrice} from './crypto'
import { useRef, useEffect, useContext } from "react"
import { Input, initMDB } from "mdb-ui-kit"
import { coinList } from './coin_list';
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";


function WalletScreen({page,setPage,g_wallet,g_setWallet,ready,setReady}){
    const [balance, setBalance] = useState({ETH:0, sETH:0,wETH:0,ARB:0})
    const [prices, setPrices] = useState({ETH:0, sETH:0,wETH:0,ARB:0});
    const [currentCoin, setCurrentCoin] = useState("");
    const [loading, setLoading] = useState(<h1>Loading...</h1>)
    const [enterOnce, setEnterOnce] = useState(0);
    console.log("rendering screen")
    if (enterOnce == 0){
        console.log("entered if")
        setEnterOnce(1)
        getBalance(g_wallet).then((bal) => {setBalance(bal)}).then(() =>{setLoading(<div></div>);})
        getPrice().then((price) => {setPrices(price)})
    }
    let currentDisplay
    if(currentCoin==""){
        currentDisplay = (<CoinTable balance={balance} prices={prices} setCurrentCoin={setCurrentCoin}/>)
    }
    else{
        currentDisplay = (<CoinDisplay coin={currentCoin} balance={balance} wallet={g_wallet} prices={prices} setCurrentCoin={setCurrentCoin}/>)

    }
    const walletOverview = (
    <div className="container-xl">
    <div className="container h-10 d-flex align-items-center justify-content-center mt-5" ></div>
    <div className="container h-10 d-flex align-items-center justify-content-center mt-5" >
    <div className="card " style={{minWidth:"500px"}}>
    <MDBCardBody>
    <MDBCardTitle>Your Wallet</MDBCardTitle>
    {loading}
    {currentDisplay}
    </MDBCardBody>
    <div className="container h-10 d-flex align-items-center justify-content-center mt-4" ></div>
    </div>
    </div>
    </div>
    )
    return(
        walletOverview
    )
}

function CoinTable({balance,prices,setCurrentCoin}){
    return(
        <div>
        <table className="table  table-hover align-middle mb-0 bg-white">
        <thead className="bg-light">
            <tr>
            <th>Asset</th>
            <th>Balance</th>
            <th></th>
            <th></th>
            </tr>
        </thead>
        <tbody>
            <TableEntry coin={"ARB" } balance={balance} prices={prices} setCurrentCoin={setCurrentCoin} />
            <TableEntry coin={"ETH"} balance={balance} prices={prices} setCurrentCoin={setCurrentCoin}/>
            <TableEntry coin={"sETH"} balance={balance} prices={prices} setCurrentCoin={setCurrentCoin} /> 
            <TableEntry coin={"wETH"} balance={balance} prices={prices} setCurrentCoin={setCurrentCoin} /> 
        </tbody>
        </table>
        <div><a href="">Go back</a></div>
        </div>
        )
}

function TableEntry({coin, balance, prices,setCurrentCoin}){
    const badges ={
        mainnet: <span className="badge badge-primary rounded-pill d-inline">Mainnet</span>,
        testnet: <span className="badge badge-secondary rounded-pill d-inline">Testnet</span>
    }
    return(
        <tr onClick={() => setCurrentCoin(coin)}>
        <td>
            <div className="d-flex align-items-center">
            <img
                src={coinList[coin].image}
                alt=""
                style={{width: "45px", height: "45px"}}
                className="rounded-circle"
                />
            <div className="ms-3">
                <p className="fw-bold mb-1">{coinList[coin].name}</p>
                <p className="text-muted mb-0">${Math.floor(prices[coin]*100)/100}</p>
            </div>
            </div>
        </td>
        <td>
            <p className="fw-normal mb-1">{Math.floor(balance[coin]*10000)/10000}</p>
            <p className="text-muted mb-0">${Math.floor(prices[coin]*balance[coin]*100)/100}</p>
        </td>
        <td>
        {badges[coinList[coin].net]}
      </td>
        <td>
        <i className="fas fa-angle-right"></i>
        </td>
        </tr>
    )
}

function CoinDisplay({coin,balance,wallet,prices,setCurrentCoin}){
    initMDB({ Input });
    const [to, setTo] = useState("");
    const [amountCoin, setAmountCoin] = useState("");
    const [amountUSD,setAmountUSD] = useState("");  
    const [errorMsg,setErrorMsg] = useState(<div></div>);  
    const [sendToggle,setSendToggle] = useState("send");
    const badges ={
        mainnet: <span className="badge badge-primary rounded-pill d-inline">Mainnet</span>,
        testnet: <span className="badge badge-secondary rounded-pill d-inline">Testnet</span>
    }
    const checkBalanceDifference = async (e) => {
        if (amountCoin>balance[coin]){
            setErrorMsg( <MDBTypography note noteColor='warning'>
            <strong>warning:</strong> Insufficient Balance
          </MDBTypography>)
        }
        else {
            setErrorMsg(<div></div>)
        }
    }
    const net = coinList[coin].net
    let currentDisplay 
    if (sendToggle == "send"){
        currentDisplay = (<div className="d-grid gap-4">
        <MDBBtnGroup aria-label='Basic example'>
        <MDBBtn href='#' active>send</MDBBtn>
        <MDBBtn href='#' color='light' onClick={() => setSendToggle("receive")}>Receive</MDBBtn>
        </MDBBtnGroup>
        <MDBInput label='From' id='formControlDisabled' type='text' value={wallet[net][coin].address} readonly />
        <MDBInput label='To' id='formControlto' type='text' value={to} onChange={e => setTo(e.target.value)}/>
        <MDBInputGroup className='mb-3'>
        <MDBInput label='Amount Coin' className='form-control' value={amountCoin} onChange={e => {setAmountCoin(e.target.value);
            checkBalanceDifference();
            setAmountUSD(Math.floor(e.target.value*prices[coin]*100)/100)}} type='number' />
        <MDBInput label='Amount USD' className='form-control' value={amountUSD} onChange={e => {setAmountUSD(e.target.value);
            checkBalanceDifference();
            setAmountCoin(Math.floor(e.target.value/prices[coin]*10000)/10000)}} type='number' />
        </MDBInputGroup>
        <button className="btn btn-primary" type="button" onClick={() => console.log("sent :)")}>Send Transaction</button>
        {errorMsg}
        </div>)

    }
    else {
        currentDisplay = (<div className="d-grid gap-4">
            <MDBBtnGroup aria-label='Basic example'>
            <MDBBtn href='#'  color='light'  onClick={() => setSendToggle("send")}>send</MDBBtn>
            <MDBBtn href='#' active>Receive</MDBBtn>
            </MDBBtnGroup>
            <MDBInput label='Click to copy address' id='formControlDisabled' type='text' value={wallet[net][coin].address} 
                onClick={() => {navigator.clipboard.writeText(wallet[net][coin].address)}}readonly />
            <div style={{ height: "auto", margin: "0 auto", maxWidth: 256, width: "100%" }}>
            <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={wallet[net][coin].address}
            viewBox={`0 0 256 256`}
            />
            </div>
            </div>)
    }
    return(
        <div>
        <div className="d-flex justify-content-between">
        <h1 ><img
            src={coinList[coin].image}
            alt=""
            style={{width: "60px", height: "60px"}}
            className="rounded-circle"/>{coinList[coin].name}
            </h1>
            <p>
            {badges[coinList[coin].net]}
            </p>
        </div>
            <div>
                <div className="d-flex justify-content-between">
                <h4>
                <p className="fw-normal mb-1">Price: ${Math.floor(prices[coin]*100)/100}</p>
                </h4>
                <h4>
                <p className="fw-normal mb-1">Balance: {Math.floor(balance[coin]*10000)/10000}</p>
                </h4>
                </div>
                <div className="d-grid gap-4">
                {currentDisplay}
                <button className="btn btn-primary" type="button" onClick={() => setCurrentCoin("")}>back to overview</button>
                </div>
            </div>            
            <div>
        </div>
        </div>)
}

export default WalletScreen;
