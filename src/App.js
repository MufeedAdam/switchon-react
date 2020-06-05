import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Particles from 'react-particles-js';
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100vh',
    },
  },
}));
const department = [
  {
    value: 'Marketing',
    label: 'Marketing',
  },
  {
    value: 'Operation',
    label: 'Operation',
  },
  {
    value: 'Finance',
    label: 'Finance',
  },
  {
    value: 'Sale',
    label: 'Sale',
  },
];
function App(props) {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [Name, setName] = useState("");
  const [Department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailer, setEmailer] = useState("");
  const [passworder, setPassworder] = useState("");
  const classes = useStyles();
  
  const [currency, setCurrency] = React.useState('EUR');

  const handleChange = (event) => {
    setDepartment(event.target.value);
  };
 
useEffect(() => {
      if(localStorage.getItem('myValueInLocalStorage')){
        props.history.push('/home');


      }
      else{
        
        
        
      }
        
        
    });
    


  function handleClick(e){
    e.preventDefault();
    const body ={
      name:Name,
      email:email,
      department:Department,
      password:password
    }
    console.log(body)
    const header = {
      ContentType: 'application',
      Accept: 'application/json'
    };
    axios.post('https://switchon-node.herokuapp.com//users/register',  body,header)
    .then(function (response) {
      console.log(response);
      alert(response.data.message)
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
      // always executed
    });  
  }

  function handleClicker(e){
    e.preventDefault();
    const body ={
      
      email:emailer,
      password:passworder
    }
 
    const header = {
      ContentType: 'application',
      Accept: 'application/json'
    };
    axios.post('https://switchon-node.herokuapp.com/users/authenticate',  body,header)
    .then(function (response) {
      
     alert(response.data.message)
     console.log(response.data.data)
   
    localStorage.setItem('myValueInLocalStorage', response.data.data.token);
    localStorage.setItem('id', response.data.data.user.email);
    localStorage.setItem('department', response.data.data.user.department);
    localStorage.setItem('name', response.data.data.user.name);
    
      props.history.push('/home');
   
     
      
    })
    .catch(function (error) {
      console.log(error);
  
      
    })
    .finally(function () {
      // always executed
    }); 
    console.log(body)
    props.history.push('/home')
    
  }
  return (
    
    <div className="App">
    
      <header className="App-header">
      <Particles 
      params={{
            		particles: {
            			line_linked: {
            				shadow: {
            					enable: true,
            					color: "#3CA9D1",
            					blur: 1
            				}
            			}
            		}
            	}}
              style={{
                width: '200' 
              }}
              />
        <h1>TASK IT</h1>
        <hr></hr>
      <MDBContainer>
  <MDBRow>
    <MDBCol md="6">
      <form>
        <p className="h5 text-center mb-4">Sign up</p>
        <div className="grey-text">
          <MDBInput label="Your name" icon="user" group type="text" validate error="wrong"
            success="right" onChange={e => setName(e.target.value)} />
          <MDBInput label="Your email" icon="envelope" group type="email" validate error="wrong"
            success="right" onChange={e => setEmail(e.target.value)}/>
             <div>
        <TextField
          id="standard-select-currency"
          select
          label="Department"
          value={Department}
          onChange={handleChange}
          helperText="Please select the department"
        >
          {department.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        
      </div>
     
          
          <MDBInput label="Your password" icon="lock" group type="password" validate onChange={e => setPassword(e.target.value)}/>
        </div>
        <div className="text-center" onClick={handleClick}>
          <MDBBtn color="primary">Register</MDBBtn>
        </div>
      </form>
    </MDBCol>
    <MDBCol md="6">
      <form>
        <p className="h5 text-center mb-4">Sign in</p>
        <div className="grey-text">
          <MDBInput label="Type your email" icon="envelope" group type="email" validate error="wrong" onChange={e => setEmailer(e.target.value)}
            success="right" />
          <MDBInput label="Type your password" icon="lock" group type="password" validate onChange={e => setPassworder(e.target.value)} />
        </div>
        <div className="text-center" onClick={handleClicker}>
          <MDBBtn>Login</MDBBtn>
        </div>
      </form>
    </MDBCol>
  </MDBRow>
</MDBContainer>
      </header>
      
      
      
    
    </div>
    
    
  );
}

export default App;
