import { Form } from '@unform/web'
import { useEffect, useRef, useState } from 'react';
import axios from "axios";
import numeral from 'numeral'


import NavBar from "components/NavBar"







export default function Dashboard(){
    const formRef = useRef(null)
    const [select, setSelect] = useState('todas')
    const [balance, setBalance]:any = useState()
    const [name, setName]:any = useState()
    const [value, setValue]:any = useState()
    const [transactions, setTransactions]:any = useState([])
    const userName:any =  localStorage.getItem('userNg')
    const accountId = localStorage.getItem('accountIdNg')
    const token = localStorage.getItem('tokenNg')
    const endPoint = process.env.REACT_APP_END_POINT
    

    //Submit Transaction
    async function handleSubmit() {
        const data = {
            "username": name,
            "myAccount": accountId,
            "value": parseFloat(value.replace(',', '.'))
        }
          axios.post(`${endPoint}/transactions`, data, {
            headers: {          
                'x-access-token': token
            } 
        })
        .then((res) => {
            console.log(res)
            alert('Transferência realizada com sucesso ')
            window.location.reload()
        })
        .catch((e) => {
            console.log(e)
            alert(e.response.data)
        })

    }
    

    //Get user logged
    async function getAccountUser(){
        await axios.get(`${endPoint}/accounts/${accountId}`, {
            headers: {
                'x-access-token': token
            }
        })
        .then((res) => {
            setBalance(parseInt(res.data.balance))
        })
        .catch((e) => {
            console.log(e)
        })
    }

    //Get Transactions
    async function getTransactions(){
        await axios.get(`${endPoint}/transactions/${accountId}`,{ 
            headers: {
                'x-access-token': token
            }
        })
        .then((res) => {
            setTransactions(res.data)
            
        })
        .catch((e) => {
            console.log(e)
        })
    }

    
    useEffect(() => {
       
        getAccountUser()
        getTransactions()
    }, [])
    
    
    console.log(balance)
   
    return (     
        <div className="w-full h-full ">
            <NavBar />
            <div className="h-80 gray-200 space-y-36">
                <div className="w-full  max-w-7xl flex  m-auto justify-between">
                    <h1 className="m-6 text-2xl font-semibold">Olá, {userName}!</h1>
                    <h2 className="m-6 text-2xl font-semibold">Balance atual: {numeral(balance).format("$0,0.00")} </h2>
                </div>
            </div>
                <div className="flex justify-between h-80 mb-36 -mt-16">
                    <div className="ml-28  border-2 w-1/3  rounded-2xl  p-4">
                        <div className="justify-center space-y-12">
                            <h1 className=" text-2xl">Realize uma transferência digitando o nome do usuário</h1>
                            <Form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                                <p className=" text-xl flex ">Nome 
                                    <input onChange={e => setName(e.target.value)} className="ml-2 px-3 py-2
                                        bg-white border shadow-sm border-slate-300 placeholder-slate-400
                                        focus:outline-none focus:border-sky-500
                                        focus:ring-sky-500 block w-60 rounded-md sm:text-sm focus:ring-1" 
                                        placeholder="Nome do usuário" >
                                    </input>
                                </p>
                                <p className=" text-xl flex">Valor
                                    <input type='number' step="0.01" onChange={e => setValue(e.target.value)} name="value" className="ml-4 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400
                                        focus:outline-none focus:border-sky-500
                                        focus:ring-sky-500 block w-60 rounded-md sm:text-sm focus:ring-1" 
                                        placeholder="Digite o valor" >
                                    </input>
                                </p>
                                <div>
                                    <button type="submit" className="ml-44 w-32 h-7 mt-4 text-white font-semibold 
                                    bg-blue-600 border rounded
                                    hover:bg-blue-700">
                                        Transferir
                                    </button>
                                </div>
                            </Form>
                        </div>
                    </div>
                    <div className="border-2 w-1/3 rounded-2xl p-4 mr-28 space-y-12 overflow-auto ">
                        <div className="justify-center space-y-12 ">
                            <h1 className="text text-2xl">Transações</h1>
                            <div className="flex">
                                <p className=" text-xl flex ">
                                    Filtrar
                                </p>
                                <select name="select" value={select} onChange={e => setSelect(e.target.value)}
                                    className="px-1 py-2 bg-white border shadow-sm border-slate-300
                                    focus:outline-none focus:border-sky-500 ml-2
                                    focus:ring-sky-500 block w-60 rounded-md sm:text-sm focus:ring-1" >
                                        <option  value='todas'>Todas</option>
                                        <option  value='cashin'>cash-in</option>
                                        <option  value='cashout'>cash-out</option>
                                </select>
                                
                               
                            
                            </div>
                        </div>
                        <div style={select === 'todas' ? { display: 'block' }: { display: 'none'} }>
                            <ul>
                                {transactions.map((items:any) => {
                                    return (
                                        
                                        <li>{items.type}:  {numeral(items.value).format("$0,0.00")}</li>
                                        
                                    )
                                })}
                            </ul>
                        </div>
                        <div style={select === 'cashin' ? { display: 'block' }: { display: 'none'} }>
                            <ul >    
                                {transactions.map((items:any) => {
                                    return (
                                        
                                        <li>{items.type === 'Credited' ? items.type + ':' + numeral(items.value).format("$0,0.00") : null}</li>
                                        
                                    )
                                })}
                            </ul>
                        </div>
                        <div style={select === 'cashout' ? { display: 'block' }: { display: 'none'} }>
                            <ul>    
                                {transactions.map((items:any) => {
                                    return (
                                        
                                        <li>{items.type === 'Debited' ? items.type + ':' + numeral(items.value).format("$0,0.00") : null}</li>
                                        
                                    )
                                })}
                            </ul>
                        </div>
                        
                    </div>
                </div>
            
            

        </div>
    )
}