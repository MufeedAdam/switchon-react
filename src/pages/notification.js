import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '../table.css';
function Notification(){
  const [result, setResult] = useState([]);


  useEffect(() => {
    const body ={
     
      department:localStorage.getItem('department'),
      
    }
    
 
    console.log(localStorage.getItem('myValueInLocalStorage'))
    axios.post('http://localhost:3001/tasks/getByDepartment',  body,{
    headers: {
      xaccesstoken:localStorage.getItem('myValueInLocalStorage')
    }
  })
    .then(function (response) {
      console.log(response);
      setResult(response.data.data.tasks);
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
      // always executed
      console.log(result)
    });
    

  }, []);

  


const renderTableApprove = () => {
  if(result.length<1){
    return(<td>Nothing to display</td>)
  }
  else{
  return result.map(user => {
      if(user.approve==true)
    return (
      <tr>
        <td>{user.date_on}</td>
        <td>{user.name_from}</td>
        <td>{user.department_from}</td>
        <td>{user.task}</td>
        <td>{user.department_to}</td>
        <td>{user.name_to}</td>
        </tr>
    )
  })
}
}
const renderTableReject = () => {
  if(result.length<1){
    return(<td>Nothing to display</td>)
  }
  else{
  return result.map(user => {
      if(user.approve==false && user.pending==false)
    return (
      <tr>
        <td>{user.date_on}</td>
        <td>{user.name_from}</td>
        <td>{user.department_from}</td>
        <td>{user.task}</td>
        <td>{user.department_to}</td>
        <td>{user.name_to}</td>
        
        </tr>
    )
  })
}
}
const renderTablePending = () => {
  if(result.length<1){
    return(<td>Nothing to display</td>)
  }
  else{
  return result.map(user => {
      if(user.pending==true)
    return (
        
      <tr>
        <td>{user.date_on}</td>
        <td>{user.name_from}</td>
        <td>{user.department_from}</td>
        <td>{user.task}</td>
        <td>{user.department_to}</td>
        <td>{user.name_to}</td>
        </tr>
    )
  })
}
}

    return(
      <div>
    
      <h1 id="title">Approved Table</h1>
      <div class="container">
      <table id="approve"> 
        <thead>
          <tr>
            <th>Date</th>
            <th>Requested By</th>
            <th>Department From</th>
            <th>Task</th>
            <th>Department to</th>
            <th>Name To</th>
          </tr>
        </thead>
        <tbody>{renderTableApprove()}</tbody>
      </table>
      </div>
      <h1 id="title">Rejected Table</h1>
      <div class="container">
      <table id="reject"> 
        <thead>
          <tr>
            <th>Date</th>
            <th>Requested By</th>
            <th>Department From</th>
            <th>Task</th>
            <th>Department to</th>
            <th>Name To</th>
          </tr>
        </thead>
        <tbody>{renderTableReject()}</tbody>
      </table>
      </div>
      <h1 id="title">Pending Table</h1>
      <div class="container">
      <table id="pending"> 
        <thead>
          <tr>
            <th>Date</th>
            <th>Requested By</th>
            <th>Department From</th>
            <th>Task</th>
            <th>Department to</th>
            <th>Name To</th>
          </tr>
        </thead>
        <tbody>{renderTablePending()}</tbody>
      </table>
      </div>
    </div>
    )
}

export default Notification