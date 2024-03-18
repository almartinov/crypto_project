import React, { useState } from 'react';
import { MDBBtn, MDBContainer, MDBBtnGroup, MDBCard, MDBCardBody, MDBCardTitle } from 'mdb-react-ui-kit';
import { ethers } from 'ethers'
import CreateScreen from './create_screen';
import Home from './home_screen';

function App() {
  const [page, setPage] = useState('home')

  switch (page) {
    case 'home':
      return (<Home page={page} setPage={setPage} />);
    case 'create':
      return(<CreateScreen page={page} setPage={setPage}/>);
    default:
      return <div>Error: Unknown Screen</div>;
}
}

export default App;
