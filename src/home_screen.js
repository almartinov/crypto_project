import React, { useState } from 'react';
import { MDBBtn, MDBContainer, MDBBtnGroup, MDBCard, MDBCardBody, MDBCardTitle } from 'mdb-react-ui-kit';
import { Ripple, initMDB } from "mdb-ui-kit";

function Home({page,setPage}){
    initMDB({ Ripple });
    return (
        <div className="container-xl">
        <div className="container h-10 d-flex align-items-center justify-content-center mt-5" ></div>
        <div className="container h-10 d-flex align-items-center justify-content-center mt-5" >
        <div className="card " style={{width:"40%"}}>
        <MDBCardBody>
        <MDBCardTitle>HD Wallet</MDBCardTitle>
        <div className="d-grid gap-2">
        <button className="btn btn-primary" type="button" data-mdb-ripple-init onClick={() => setPage('login')}>
        Open existing wallet</button>
        <MDBBtn
        tag='a'
        target='_blank'
        role='button'
        onClick={() => setPage('create')}
        >
        Create New wallet
        </MDBBtn>
        <MDBBtn
        tag='a'
        target='_blank'
        role='button'
        onClick={() => setPage('restore')}
        >
        Restore wallet from mnemonic
        </MDBBtn>
        </div>
        </MDBCardBody>
        <div className="container h-10 d-flex align-items-center justify-content-center mt-4" ></div>
        </div>
        </div>
        </div>
    )
}

export default Home;
