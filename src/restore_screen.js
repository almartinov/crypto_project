import React, { useState } from 'react';
import { MDBBtn, MDBContainer, MDBBtnGroup, MDBCard, MDBCardBody, MDBCardTitle } from 'mdb-react-ui-kit';
import {CreateMnemonic} from './crypto'
import { useRef, useEffect, useContext } from "react"
import { Input, initMDB } from "mdb-ui-kit"


function RestoreScreen({page,setPage}){
  initMDB({ Input });
  const [mnemonic, setMnemonic] = useState("");

  const handleSubmit = async (e) => {
        localStorage.setItem("set_local","hello");
        setPage('wallet');
    }
    return (
      <div className="container-xl">
      <div className="container h-10 d-flex align-items-center justify-content-center mt-5" ></div>
      <div className="container h-10 d-flex align-items-center justify-content-center mt-5" >
      <div className="card" style={{width:"40%"}}>
      <MDBCardBody>
      <MDBCardTitle>Restore Wallet</MDBCardTitle>
      <form> 
        <textarea className="form-control" id="textAreaExample" rows="4" value={mnemonic}
        onChange={e => setMnemonic(e.target.value)}  >
            </textarea>
        <div className="mt-2"></div>
       {/* Submit button  */}
       <MDBBtn
              tag='a'
              target='_blank'
              className="btn btn-primary btn-block"
              role='button'
              onClick={() => handleSubmit()}
            >Restore</MDBBtn>
        </form>
    <div></div>
    <div className="container h-10 d-flex align-items-center justify-content-center mt-4" ></div>
    <div><a href="" onClick={() => setPage("home")}>Go back</a></div>
    </MDBCardBody>
        </div>
        </div>
        </div>
    );
  }

  export default RestoreScreen; 
