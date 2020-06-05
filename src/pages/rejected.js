import React, {useEffect, useState} from 'react';
import axios from 'axios';
function Rejected(){
  const [result, setResult] = useState([]);


  useEffect(() => {
    const body ={
     
      name:localStorage.getItem('name'),
      
    }
    
 
    console.log(localStorage.getItem('myValueInLocalStorage'))
    axios.post('http://localhost:3001/tasks/getByRejected',  body,{
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

  


const renderTable = () => {
  return result.map(user => {
    return (
      <tr>
        <td>{user.date_on}</td>
        <td>{user.name_from}</td>
        <td>{user.department_from}</td>
        <td>{user.task}</td>
        </tr>
    )
  })
}

    return(
      <div>
    
      <h1 id="title">Approved Table</h1>
      <table id="users"> 
        <thead>
          <tr>
            <th>Date</th>
            <th>Requested By</th>
            <th>Department From</th>
            <th>task</th>
          </tr>
        </thead>
        <tbody>{renderTable()}</tbody>
      </table>
    </div>
    )
}

export default Rejected