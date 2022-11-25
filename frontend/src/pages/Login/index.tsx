import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form } from '@unform/web'
import axios from 'axios'


export default function Login(){
    const [username, setUsername]:any = useState()
    const [password, setPassword]:any = useState()
    const [passwordError, setPasswordError] = useState(false)
    const formRef = useRef(null)
    const navigate = useNavigate()
    const endPoint = process.env.REACT_APP_END_POINT

    async function handleSubmit(){
        if(passwordError === false){
            axios.post(`${endPoint}/users/login`, {
                'username': username,
                'password': password
            })
            .then((res) => {
                localStorage.setItem('userNg', username)
                localStorage.setItem('tokenNg', res.data.token)
                localStorage.setItem('accountIdNg', res.data.accountId)
                navigate('/dashboard')
            })
            .catch((e) => {
                alert('Por favor, revise seus dados!')
                
            })
        }
    }

    return (
        <Form ref={formRef} onSubmit={handleSubmit}>  
            <div className="h-screen w-screen p-6 bg-gray-200 flex ">
            
                <div className="h-64  p-4 bg-white w-80 mx-auto my-32 rounded justify-center shadow-md">
                    <h2 className="text-lg font-bold text-center">Login</h2>

                
                    
                    <div className="text-sm font-medium text-slate-700 space-y-2 ">
                        <label > Username </label>
                        <input type="text" onChange={(e) => setUsername(e.target.value)} 
                            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300
                            placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full 
                            rounded-md sm:text-sm focus:ring-1"
                            placeholder="Your username" />
                    </div>
                    

                    
                    <div className="text-sm font-medium text-slate-700 space-y-2 ">
                        <label > Password </label>  
                        <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500
                            focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
                            placeholder="******" 
                        /> 
                        
                    </div>
                
                    <div>
                        <button type='submit' className="px-2 py-1 mb-4 mt-2 w-full text-white font-semibold text-sm bg-blue-600 border rounded
                        hover:bg-blue-700">
                            Login
                        </button>

                        <Link to="/cadastro" className="flex text-blue-400 justify-center text-sm underline underline-offset-2 hover:text-blue-300"> 
                            You don't have a record?
                        </Link>
                    </div>
                </div>
        
            </div>
    </Form>
        

    )
}