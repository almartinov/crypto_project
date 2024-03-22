import React, { useState } from 'react';
import { MDBBtn, MDBContainer, MDBBtnGroup, MDBCard, MDBCardBody, MDBCardTitle } from 'mdb-react-ui-kit';
import {CreateMnemonic, InitWallets}  from './crypto'
import { useRef, useEffect, useContext } from "react"
import { Input, initMDB } from "mdb-ui-kit"
import { loadFromStorage, saveToStorage} from './storage.js'

function RestoreScreen({page,setPage,g_wallet,g_setWallet}){
  initMDB({ Input });
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");
  const [cpwd, setCpwd] = useState("");
  const [up,setUp] = useState("");
  const [mnemonic,setMnemonic] = useState("")
  const [gobtn,setGobtn] = useState("Restore")

  useEffect(() => {
    setUp("a")
},[])

  const handleSubmit = async (e) => {
      if(gobtn == "Restore"){
          if (pwd == ""){
              alert("Password can't be blank")
          }
          else if (pwd !== cpwd) {
              alert("Password and confirmation don't match!")
              return
          }
          else if (name==""){
              alert("Name can't be blank")
          }
          else if (loadFromStorage(name, pwd)){
              alert("Wallet already exists")
          }
          else if (mnemonic==""){
            alert("Mnemonic can't be blank")
        }
          else {
              const wallet = await InitWallets(name, mnemonic)
              saveToStorage(name,wallet,pwd);
              g_setWallet(wallet)
              setGobtn("Go to wallet")
          }
      }
      else{
          setPage('wallet');
      }
  }
  return (
      <div className="container-xl">
      <div className="container h-10 d-flex align-items-center justify-content-center mt-5" ></div>
      <div className="container h-10 d-flex align-items-center justify-content-center mt-5" >
      <div className="card" style={{minWidth:"500px"}}>
      <MDBCardBody>
      <MDBCardTitle>Wallet Restoration</MDBCardTitle>
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

      {/* Password input  */}
      <div data-mdb-input-init className="form-outline mb-4">
      <input type="password" id="form1Example3" className="form-control" value={cpwd} 
      onChange={e => setCpwd(e.target.value)} />
      <label className="form-label" htmlFor="form1Example3">Confirm Password</label>
      </div>

      <textarea className="form-control" id="textAreaExample" rows="4" 
        placeholder='Mnemonic' onChange={e => setMnemonic(e.target.value)} ></textarea>
      <div className="container h-10 d-flex align-items-center justify-content-center mt-4" ></div>
      {/* Submit button  */}
      <MDBBtn
      tag='a'
      target='_blank'
      className="btn btn-primary btn-block"
      role='button'
      onClick={() => handleSubmit()}
      >{gobtn}</MDBBtn>
      </form>
      <div></div>
      <div className="container h-10 d-flex align-items-center justify-content-center mt-3" ></div>

      <div><a href="" onClick={() => setPage("home")}>Go back</a></div>
      </MDBCardBody>
      </div>
      </div>
      </div>
  );
}
  export default RestoreScreen; 
