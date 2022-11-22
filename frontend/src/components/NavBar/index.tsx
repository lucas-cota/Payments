import {BiLogOut} from 'react-icons/bi'

export default function NavBar(){
    return(
        <nav className="w-full h-20 bg-gray-100 border-b border gray-200 space-x-80">
            <div className="w-full h-full max-w-7xl flex items-center m-auto justify-between">
                <p className="text-3xl">NG<span className="font-bold italic">CASH</span></p>
                <button className='font'>
                    <BiLogOut size={40} />
                </button>
            </div>
            
        </nav>
    )
}