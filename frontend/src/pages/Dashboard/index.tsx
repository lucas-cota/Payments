import NavBar from "components/NavBar"
import { Form } from '@unform/web'
import React, { useEffect, useRef, useState } from 'react';
import LoadNg from "services/loadNg";
import axios from "axios";

const transacoes = [
    { 
        id: 1,
        cashin : 1,
        value: 20
    },
    { 
        id: 2,
        cashout : 3,
        value: 30
    },
    { 
        id: 1,
        cashin : 1,
        value: 40
    },
    { 
        id: 1,
        cashin : 1,
        value: 40
    },
    { 
        id: 1,
        cashin : 1,
        value: 40
    },
    
]


export default function Dashboard(){
    const formRef = useRef(null)
    const [select, setSelect] = useState('')
    const [balance, setBalance] = useState()
    const userName:any =  localStorage.getItem('userNg')
    const accountId = localStorage.getItem('accountIdNg')
    
    const endPoint = process.env.REACT_APP_END_POINT
    const handleSubmit = () => {

    }

    //Buscar usuario logado
    async function getAccountUser(){
        const ng = new LoadNg()
        await ng.get(`${endPoint}/accounts/${accountId}`)
        .then((res) => {
            console.log(res)
            setBalance(res.balance)
        })
        .catch((e) => {
            console.log(e)
        })
    }
    console.log(balance)
    useEffect(() => {
        getAccountUser()
        
    })
    

   
    return (     
        <div className="w-full h-full">
            <NavBar />
            <div className="h-80 gray-200 -space-y-36">
                <div className="w-full h-full max-w-7xl flex  m-auto justify-between">
                    <h1 className="m-6 text-2xl font-semibold">Olá, {userName}!</h1>
                    <h2 className="m-6 text-2xl font-semibold">Balance atual: R${balance}</h2>
                </div>
                <div className="flex justify-between">
                    <div className="ml-28  border-2 w-1/3 h-92 rounded-2xl  p-4">
                        <div className="justify-center space-y-12">
                            <h1 className=" text-2xl">Realize uma transferência digitando o nome do usuário</h1>
                            <Form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                                <p className=" text-xl flex ">Nome 
                                    <input className="ml-2 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400
                                        focus:outline-none focus:border-sky-500
                                        focus:ring-sky-500 block w-60 rounded-md sm:text-sm focus:ring-1" 
                                        placeholder="Nome do usuário" >
                                    </input>
                                </p>
                                <p className=" text-xl flex">Valor
                                    <input className="ml-4 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400
                                        focus:outline-none focus:border-sky-500
                                        focus:ring-sky-500 block w-60 rounded-md sm:text-sm focus:ring-1" 
                                        placeholder="Digite o valor em centavos" >
                                    </input>
                                </p>
                                <div>
                                    <button type='submit' className="ml-44 w-32 h-7 mt-4 text-white font-semibold 
                                    bg-blue-600 border rounded
                                    hover:bg-blue-700">
                                        Transferir
                                    </button>
                                </div>
                            </Form>
                        </div>
                    </div>
                    <div className="border-2 w-1/3 h-92 rounded-2xl p-4 mr-28 space-y-12">
                        <div className="justify-center space-y-12 ">
                            <h1 className="text text-2xl">Transações</h1>
                            <div className="flex">
                                <p className="text-xl">
                                    Filtrar
                                </p>
                                <select name="select" value={select} onChange={e => setSelect(e.target.value)}
                                    className="px-1 py-2 bg-white border shadow-sm border-slate-300
                                    focus:outline-none focus:border-sky-500 ml-2
                                    focus:ring-sky-500 block w-60 rounded-md sm:text-sm focus:ring-1" >
                                        <option value=""></option>
                                        <option value="cashin">cash-in</option>
                                        <option value="cashout">cash-out</option>
                                </select>
                            </div>
                            
                            
                        </div>
                        <div>
                            <ul  className="overflow-auto ">
                                {transacoes.map((items) => {
                                    return (
                                        <>
                                        <li>{items.value}</li>
                                        </>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            

        </div>
    )
}