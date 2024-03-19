import React, { useState } from 'react';
import { MDBBtn, MDBContainer, MDBBtnGroup, MDBCard, MDBCardBody, MDBCardTitle } from 'mdb-react-ui-kit';
import { ethers } from 'ethers'
import CreateScreen from './create_screen';
import Home from './home_screen';
import WalletScreen from './wallet_screen.js';
import LoginScreen from './login_screen.js';
import RestoreScreen from './restore_screen.js';

function App() {
  const [page, setPage] = useState('home')

  switch (page) {
    case 'home':
      return (<Home page={page} setPage={setPage} />);
    case 'create':
      return(<CreateScreen page={page} setPage={setPage}/>);
    case 'wallet':
      return (<WalletScreen page={page} setPage={setPage} />);
    case 'login':
      return (<LoginScreen page={page} setPage={setPage} />);
    case 'restore':
      return (<RestoreScreen inScreen page={page} setPage={setPage} />);
    default:
      return <div>Error: Unknown Screen</div>;
}
}

export default App;
