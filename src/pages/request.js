import React, {useEffect, useState} from 'react';
import axios from 'axios';
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:3001";
function Request(){
  const [result, setResult] = useState([]);
  const [load, setLoad] = useState(null);

  useEffect(() => {
    const body ={
     
      name:localStorage.getItem('name'),
      
    }
    
 
    console.log(localStorage.getItem('myValueInLocalStorage'))
    axios.post('http://localhost:3001/tasks/getByName',  body,{
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
    

  }, [load]);

  function onApprove(e,id,dept,user,task){
    e.preventDefault();
    const socket = socketIOClient(ENDPOINT);
    var msg=user+" from department "+dept+" approved task : "+task;
    

    const body ={
      approve:true,
        id:id
    }
    
      
    axios.post('http://localhost:3001/tasks/update',  body,{
      headers: {
        xaccesstoken:localStorage.getItem('myValueInLocalStorage')
      }
    })
    .then(function (response) {
      console.log(response)
      socket.emit('notify',{dept: dept,msg:msg} );
      setLoad(1)
      alert(response.data.message)
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
    
  }
  function onReject(e,id,dept,user,task){
    e.preventDefault();
    const socket = socketIOClient(ENDPOINT);
    var msg=user+" from department "+dept+" rejected task : "+task;
    
    
    const body ={
      approve:false,
        id:id
    }
    
      
    axios.post('http://localhost:3001/tasks/update',  body,{
      headers: {
        xaccesstoken:localStorage.getItem('myValueInLocalStorage')
      }
    })
    .then(function (response) {
      console.log(response);
      socket.emit('notifyfalse',{dept: dept,msg:msg} );
      setLoad(1)
      alert(response.data.message)
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
  }


const renderTable = () => {
  return result.map(user => {
    return (
      <tr>
        <td>{user.date_on}</td>
        <td>{user.name_from}</td>
        <td>{user.department_from}</td>
        <td>{user.task}</td>
        <button onClick={(e) => onApprove(e,user.id,user.department_from,user.name_from,user.task)}>Approve</button>
        <button onClick={(e) => onReject(e,user.id,user.department_from,user.name_from,user.task)}>Reject</button>
        </tr>
    )
  })
}

    return(
      <div>
    
      <h1 id="title">Request Table</h1>
      <table id="users"> 
        <thead>
          <tr>
            <th>Date</th>
            <th>Requested By</th>
            <th>Department From</th>
            <th>Task</th>
            
          </tr>
        </thead>
        <tbody>{renderTable()}</tbody>
      </table>
    </div>
    )
}

export default Request