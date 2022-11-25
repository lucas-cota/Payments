import {BiLogOut} from 'react-icons/bi'
import { useNavigate } from 'react-router-dom';

export default function NavBar(){
    const navigate = useNavigate()

    const logOut = () => {
        //localStorage.removeItem("tokenNg")
        navigate('/')
    }
    return(
        <nav className="w-full h-20 bg-gray-100 border-b border gray-200 space-x-80">
            <div className="w-full h-full max-w-7xl flex items-center m-auto justify-between">
                <p className="text-3xl">NG<span className="font-bold italic">CASH</span></p>
                <button className='font'>
                    <BiLogOut size={40} onClick={logOut}/>
                </button>
            </div>
            
        </nav>
    )
}