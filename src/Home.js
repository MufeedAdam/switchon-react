import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
  MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBContainer, MDBIcon } from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { BrowserRouter, Switch, Route, Link, Router,useHistory } from 'react-router-dom';
import Form from './pages/form'
import Approved from './pages/approved'
import Notification from './pages/notification'
import Pending from './pages/pending'
import Rejected from './pages/rejected'
import Request from './pages/request'
import socketIOClient from "socket.io-client";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const ENDPOINT = "https://switchon-node.herokuapp.com/";

function Home(props) {


  const [response, setResponse] = useState("");

  useEffect(() => {
    window.onpopstate=function(event){
      console.log("Back")
      props.history.push('/home');
    }
    const socket = socketIOClient(ENDPOINT);
    
    
      
      socket.emit('create', localStorage.getItem('department'));
  
  socket.on('notify',function(data) {
    console.log("Message : ",data)
    
    NotificationManager.success(data, 'Task Approved');
 });
 socket.on('notifyfalse',function(data) {
  console.log("Message : ",data)
  
  NotificationManager.error(data, 'Task Rejected');
});
socket.on('task',function(data) {
  console.log("Message : ",data)
  
  NotificationManager.info(data, 'New Task');
});
  socket.on('connectToRoom',function(data) {
    console.log("DATE : ",data)
 });
    
  }, []);
    //useEffect
    useEffect(() => {
      if(localStorage.getItem('myValueInLocalStorage')){
        console.log("User : ",localStorage.getItem('id'))
        console.log("name : ",localStorage.getItem('name'))
        console.log("Department : ",localStorage.getItem('department'))


      }
      else{
        
        props.history.push('/');
        
      }
        
        
    });
 

  const handleLogout = () => {
    console.log(localStorage.getItem('myValueInLocalStorage') )
    localStorage.removeItem('myValueInLocalStorage');
    localStorage.clear();
    props.history.push('/');
  }
  return (
    
<BrowserRouter >
    <div>
      
      <MDBNavbar color="unique-color-dark" style={{ marginTop: "20px" }} dark>
        <MDBNavbarBrand href="#">
          <img src="https://media-exp1.licdn.com/dms/image/C510BAQEvWNU4BIQeJw/company-logo_200_200/0?e=2159024400&v=beta&t=V0WMKGQRNeM4cnDkZWljBB5BouLNECDhKKaz3ssmHwg" height="30" alt="" />
        </MDBNavbarBrand>
      
            
              <Link to='/home'>Form</Link>
           
              <Link to='/pending'>Pending</Link>
            
              <Link to='/approved'>Approved</Link>
            
            <Link to='/request'>Request</Link>
           
              <Link to='/rejected'>Rejected</Link>
            
            <Link to='/notification'>History</Link>
            
            
            
            <input type="button" onClick={handleLogout} value="Logout" />
            
          
      </MDBNavbar>
      <p>
      
    </p>
       <div>
       <Switch>
          <Route exact path='/home' component={Form}/>
          <Route exact path='/request' component={Request}/>
          <Route exact path='/approved' component={Approved}/>
          <Route exact path='/rejected' component={Rejected}/>
          <Route exact path='/pending' component={Pending}/>
          <Route exact path='/notification' component={Notification}/>
          
        </Switch>
       </div>
      
      
       <NotificationContainer/>
    </div>
    </BrowserRouter>
  );
}

export default Home;
