import { useRef, useState, } from 'react';
import { Link, redirect, useNavigate } from 'react-router-dom';
import { Form } from '@unform/web'
import axios from 'axios'


export default function Cadastro(){
  const [username, setUsername]:any = useState()
  const [password, setPassword]:any = useState()
  const formRef = useRef(null)
  const endPoint = process.env.REACT_APP_END_POINT
  const navigate = useNavigate()

  async function handleSubmit(){
    axios.post(`${endPoint}/users`, {
      'username': username,
      'password': password
    })
    .then((res) => {
      console.log(res)
      navigate('/')
     
    })
    .catch((e) => {
      console.log(e)
    })
  }

  return(
    <Form ref={formRef} onSubmit={handleSubmit}>
      <div className="h-screen w-screen p-6 bg-gray-200 flex ">
          <div className="h-64  p-4 bg-white w-80 mx-auto my-24 rounded shadow-md space-y-1">
            <h2 className="text-lg font-bold text-center">Create user</h2>

            <div className="text-sm font-medium text-slate-700 space-y-2 ">
              <label> Username </label>
            
                <input type="text" onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 
                  focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                  placeholder="Your username"
                />
                <span></span>
            
            </div>
          

            
            <div className="text-sm font-medium text-slate-700 space-y-2 ">
              <label> Password </label>
            
                <input type="password" onChange={(e) => setPassword(e.target.value)}
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 
                focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
                placeholder="******" />
                <span></span>
            
            </div>

          
            <div>
              <button className="px-2 py-1 mt-4 w-full text-white font-semibold text-sm bg-blue-600 border rounded
              Name hover:bg-blue-700" type="submit">
                Create
              </button>
              
            </div>

          </div>
        </div>
    </Form>
  )
}