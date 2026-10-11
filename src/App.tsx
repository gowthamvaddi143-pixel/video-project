
import './App.css'

import {useFormik} from 'formik'
import type { AdiminContract } from './contracts/AdminContracts'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function App() {

  let navigate = useNavigate();

  const adminForm = useFormik({
    initialValues:{
      admin_id:'',
      password:''

    },
    onSubmit:(admin)=>{
      axios.get('http://127.0.0.1:6060/admin')
      .then(response=>{
        var adminuser = response.data.find((item:AdiminContract)=>item.admin_id===admin.admin_id)
        if(adminuser){
          if(adminuser.password===admin.password){
            navigate('/Admin-dashboard')

          }else{
            alert('Invalid password');
          }
          }else{
            alert('invalid Admin id')      
            }
        
      })

    }

  })

  return (
    <div className='home-container  row'>
      <div className='col-7'>

      </div>
      <div className='col-5 bg-white w-25 p-4' style={{marginTop:'170px',height:'435px', borderRadius:'25px' }}>
        <ul className='nav nav-pills '>
          <li className='nav-item'><a href="#user" data-bs-toggle='tab'  className='nav-link active'>User Login</a></li>
          <li className='nav-item'><a href="#admin" data-bs-toggle='tab' className='nav-link'>Admin Module Login</a></li>

        </ul>
        <div className='tab-content mt-3'>
          <div className='tab-pane active ' id='user'>
            <form >
              <dl>
              <dt> User Id</dt>
              <dd><input type="text"  className='form-control' /></dd>
              <dt>Password</dt>
              <dd><input type="password"className='form-control' /></dd>
            </dl>
            <button className='btn btn-primary w-100'>User Login</button>

            </form>
          </div>
       
        <div className='tab-pane' id='admin'>
            <form onSubmit={adminForm.handleSubmit}>
              <dl>
              <dt>Admin Id</dt>
              <dd><input type="text" name='admin_id' onChange={adminForm.handleChange}  className='form-control' /></dd>
              <dt>Password</dt>
              <dd><input type="password"name='password'onChange={adminForm.handleChange} className='form-control' /></dd>
            </dl>
            <button type='submit' className='btn btn-warning w-100'>Admin Login</button>

            </form>
          </div>
           </div>

      </div>

    </div>
    

  )

}

export default App
