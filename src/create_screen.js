import React, { useState } from 'react';
import { MDBBtn, MDBContainer, MDBBtnGroup, MDBCard, MDBCardBody, MDBCardTitle } from 'mdb-react-ui-kit';
import {CreateMnemonic, InitWallets} from './crypto'
import { useRef, useEffect, useContext } from "react"
import { Input, initMDB } from "mdb-ui-kit"
import { loadFromStorage, saveToStorage} from './storage.js'

function CreateScreen({page,setPage, g_wallet, g_setWallet}){
    initMDB({ Input });
    const [name, setName] = useState("");
    const [pwd, setPwd] = useState("");
    const [cpwd, setCpwd] = useState("");
    const [up,setUp] = useState("");
    const [mnemonic,setMnemonic] = useState(<div></div>)
    const [gobtn,setGobtn] = useState("Create Menomic")

    useEffect(() => {
        setUp("a")
    },[])
    const handleSubmit = async (e) => {
        if(gobtn == "Create Menomic"){
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
            else {
                const random_mnem = await CreateMnemonic();
                setMnemonic(<textarea className="form-control" id="textAreaExample" rows="4" 
                    value={random_mnem} readOnly ></textarea>);
                const wallet = await InitWallets(name, random_mnem)
                saveToStorage(name,wallet,pwd);
                g_setWallet(wallet)
                setGobtn("Next")
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
        <MDBCardTitle>Wallet Creation</MDBCardTitle>
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
        <div className="container h-10 d-flex align-items-center justify-content-center mt-4" ></div>
        {mnemonic}
        <div><a href="" onClick={() => setPage("home")}>Go back</a></div>
        </MDBCardBody>
        </div>
        </div>
        </div>
    );
}

export default CreateScreen;
