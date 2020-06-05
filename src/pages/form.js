import React, {useEffect, useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import socketIOClient from "socket.io-client";
import '../table.css';
const ENDPOINT = "http://127.0.0.1:3001";
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '70vh',
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

  const employee=[]
  var filemployee=[]
  
export default function FormPropsTextFields() {


    useEffect(() => {
        
          console.log("User : ",localStorage.getItem('id'))
          console.log("Department : ",localStorage.getItem('department'))
          const index = department.findIndex(x => x.value === localStorage.getItem('department'));

          if (index !== undefined) department.splice(index, 1);

          console.log("After removal:", department);
    
          const header = {
            ContentType: 'application',
            Accept: 'application/json'
          };
          axios.get('http://localhost:3001/users/getUser',  header)
          .then(function (response) {
            console.log(response);
            employee.push(response.data.data.movies)
          })
          .catch(function (error) {
            console.log(error);
          })
          .finally(function () {
            // always executed
            console.log("Employee : ",employee)
          });


        }, []);


  const classes = useStyles();
  const [Task, setTask] = React.useState('');
  const [Department, setDepartment] = React.useState('');
  const [New, setNew] = React.useState('');
  const handleChange = (event) => {
      event.preventDefault()
       filemployee=employee[0].filter(function(item){
        return item.department == event.target.value;         
    });
    setDepartment(event.target.value);
    console.log(filemployee)
          
  };

  const handleChangeEmp = (event) => {
    event.preventDefault()
    
  setNew(event.target.value);

        
};

function handleClick(e){
  e.preventDefault();
  const socket = socketIOClient(ENDPOINT);
    var msg=localStorage.getItem('id')+" from department "+localStorage.getItem('department')+" send task : "+Task
    

  const body ={
    task:Task,
    name_from:localStorage.getItem('name'),
    name_to:New,
    date_on: new Date(),
    department_to:Department,
    department_from:localStorage.getItem('department')
  }
  console.log(body)
    
  axios.post('http://localhost:3001/tasks/',  body,{
    headers: {
      xaccesstoken:localStorage.getItem('myValueInLocalStorage')
    }
  })
  .then(function (response) {
    console.log(response);
    socket.emit('task',{dept: Department,msg:msg} );
    alert(response.data.message)
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {
    // always executed
  });  
}

  return (

    <React.Fragment>
    <div class="container">
      <CssBaseline />
      <Container maxWidth="sm">
      
        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '60vh' }} >
        <Typography component="p" align="center" >Fill the form to Assign Task</Typography>
        <form className={classes.root} noValidate autoComplete="off">
      <div>
      
        <TextField required  id="standard-required" label=" Task" helperText="Write your task here"  onChange={e => setTask(e.target.value)}/>

      </div>
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
      <div>
        <TextField
          id="standard-select-currency"
          select
          label="Employee"
          value={New}
          onChange={handleChangeEmp}
          helperText="Please select the Employee"
        >
          {filemployee.map((option) => (
            <MenuItem key={option.name} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
        
      </div>
      <div>
      <Button variant="contained" color="secondary" onClick={handleClick}>
        REQUEST TASK
      </Button>
      </div>
      </form>
      </Typography>
    
      </Container>
      </div>
    </React.Fragment>
   
  );
}
