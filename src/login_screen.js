
import React, { useState } from 'react';
import { MDBBtn, MDBContainer, MDBBtnGroup, MDBCard, MDBCardBody, MDBCardTitle } from 'mdb-react-ui-kit';
import {CreateMnemonic} from './crypto'
import { useRef, useEffect, useContext } from "react"
import { Input, initMDB } from "mdb-ui-kit"


function LoginScreen({page,setPage}){
  initMDB({ Input });
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");
  const [up,setUp] = useState("");


  const handleSubmit = async (e) => {
    if (name==""){
      alert("Name can't be blank")
    }
    else{
        setPage('wallet');
    }
  }
    return (
      <div className="container-xl">
      <div className="container h-10 d-flex align-items-center justify-content-center mt-5" ></div>
      <div className="container h-10 d-flex align-items-center justify-content-center mt-5" >
      <div className="card" style={{width:"40%"}}>
      <MDBCardBody>
      <MDBCardTitle>Log in</MDBCardTitle>
      <form>
      {/* email */}
      <div data-mdb-input-init className="form-outline mb-4">
        <input type="text" id="form1Example1" className="form-control" value={name} 
            onChange={e => setName(e.target.value)} />
        <label className="form-label" htmlFor="form1Example1">Wallet Name</label>
      </div>

       {/* Password input  */}
      <div data-mdb-input-init className="form-outline mb-4">
        <input type="password" className="form-control" value={pwd} onChange={e => setPwd(e.target.value)} />
        <label className="form-label" htmlFor="form1Example2">Password</label>
      </div>

       {/* Submit button  */}
       <MDBBtn
              tag='a'
              target='_blank'
              className="btn btn-primary btn-block"
              role='button'
              onClick={() => handleSubmit()}
            >Log In</MDBBtn>
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

  export default LoginScreen; 
