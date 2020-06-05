import React, {useEffect, useState} from 'react';
import axios from 'axios';
function Pending(){
  const [result, setResult] = useState([]);


  useEffect(() => {
    const body ={
     
      name:localStorage.getItem('name'),
      
    }
    
 
    console.log(localStorage.getItem('myValueInLocalStorage'))
    axios.post('https://switchon-node.herokuapp.com/tasks/getFive',  body,{
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
  if(result.length<1){
    return(<td>Nothing to display</td>)
  }
  else{
    return result.map(user => {
    
    return (
      <tr>
        <td>{user.date_on}</td>
        <td>{user.task}</td>
        <td>{user.name_to}</td>
        <td>{user.department_to}</td>
        
        </tr>
    )
  })
  }
  
}

    return(
      <div>
    
      <h1 id="title">Pending Table</h1>
      <div class="container">
      <table id="users"> 
        <thead>
          <tr>
            <th>Date</th>
            <th>Task</th>
            <th>Requested To</th>
            <th>Department </th>
          </tr>
        </thead>
        <tbody>{renderTable()}</tbody>
      </table>
      </div>
    </div>
    )
}

export default Pending