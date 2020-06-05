import React, {useEffect, useState} from 'react';
import axios from 'axios';
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
  return result.map(user => {
      if(user.approve==true)
    return (
      <tr>
        <td>{user.date_on}</td>
        <td>{user.name_from}</td>
        <td>{user.department_from}</td>
        <td>{user.task}</td>
        <td>{user.department_to}</td>
        
        </tr>
    )
  })
}
const renderTableReject = () => {
  return result.map(user => {
      if(user.approve==false && user.pending==false)
    return (
      <tr>
        <td>{user.date_on}</td>
        <td>{user.name_from}</td>
        <td>{user.department_from}</td>
        <td>{user.task}</td>
        <td>{user.department_to}</td>
        
        </tr>
    )
  })
}
const renderTablePending = () => {
  return result.map(user => {
      if(user.pending==true)
    return (
        
      <tr>
        <td>{user.date_on}</td>
        <td>{user.name_from}</td>
        <td>{user.department_from}</td>
        <td>{user.task}</td>
        <td>{user.department_to}</td>
        
        </tr>
    )
  })
}

    return(
      <div>
    
      <h1 id="title">Approved Table</h1>
      <table id="approve"> 
        <thead>
          <tr>
            <th>Date</th>
            <th>Requested By</th>
            <th>Department From</th>
            <th>Task</th>
            <th>To</th>
          </tr>
        </thead>
        <tbody>{renderTableApprove()}</tbody>
      </table>
      <h1 id="title">Rejected Table</h1>
      <table id="reject"> 
        <thead>
          <tr>
            <th>Date</th>
            <th>Requested By</th>
            <th>Department From</th>
            <th>Task</th>
            <th>To</th>
          </tr>
        </thead>
        <tbody>{renderTableReject()}</tbody>
      </table>
      <h1 id="title">Pending Table</h1>
      <table id="pending"> 
        <thead>
          <tr>
            <th>Date</th>
            <th>Requested By</th>
            <th>Department From</th>
            <th>Task</th>
            <th>To</th>
          </tr>
        </thead>
        <tbody>{renderTablePending()}</tbody>
      </table>
    </div>
    )
}

export default Notification