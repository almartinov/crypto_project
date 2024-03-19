
import React, { useState } from 'react';
import { MDBBtn, MDBContainer, MDBBtnGroup, MDBCard, MDBCardBody, MDBCardTitle } from 'mdb-react-ui-kit';
import {CreateMnemonic} from './crypto'
import { useRef, useEffect, useContext } from "react"
import { Input, initMDB } from "mdb-ui-kit"


function WalletScreen({page,setPage}){
    return(
        <div className="container-xl">
        <div className="container h-10 d-flex align-items-center justify-content-center mt-5" ></div>
        <div className="container h-10 d-flex align-items-center justify-content-center mt-5" >
        <div className="card " style={{width:"40%"}}>
        <MDBCardBody>
        <MDBCardTitle>Your Wallet</MDBCardTitle>

        <div><a href="" onClick={() => setPage("home")}>Go back</a></div>
        </MDBCardBody>
        <div className="container h-10 d-flex align-items-center justify-content-center mt-4" ></div>
        </div>
        </div>
        </div>
    )
}


export default WalletScreen;
