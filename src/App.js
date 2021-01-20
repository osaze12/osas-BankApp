
import './App.css';
import Nav from './components/Nav';
import MainPage from './components/MainPage';
import React from 'react';
import UserPage from './components/UserPage';


import {connect} from 'react-redux';


function App({store, data}) {
  const user = data.loggedIn ? true: false;

  return (
    <div className="App">
        {!user ? 
        <>
          <Nav/> 
          <MainPage store={store}/>
        </> :
        <UserPage store={store}/> }

    </div>
  );
}
let mapStateToProps = (state)=>{
  return {
      data: state
  }
}
export default connect(mapStateToProps)(App);
