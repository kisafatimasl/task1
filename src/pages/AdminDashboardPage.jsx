import React, { useEffect } from "react";
import MkdSDK from "../utils/MkdSDK";
import { AuthContext } from "../authContext";
import { useNavigate } from "react-router";
import { Fragment } from 'react'

import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'


const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Logout', href: '#' , current: false },
]
const userNavigation = [
]
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const AdminDashboardPage = () => {
  const navigate=useNavigate()
  const { dispatch } = React.useContext(AuthContext);
  useEffect(()=>{
    async function fetchData() {
      const sdk=new MkdSDK();
    const payload={
      "payload": {},
      "page": 1,
    "limit": 10
    }
    sdk._table="video"
    const method="PAGINATE";
    const raw = sdk._project_id + ":" + sdk._secret;
    const header={
      "x-project": btoa(raw),
      Authorization: "Bearer " + localStorage.getItem("token"),
    }

    const res=await sdk.callRestAPI(payload, method, header)
    console.log(res)
    }
    fetchData();
  
    
  }, []);
  const logout=()=>{
    dispatch({ type: "LOGOUT", payload: {}})
    navigate('/admin/login')
  }
  return (
    <>
     <div className="min-h-full bg-black">
        

        <header className="bg-black text-white shadow">
          <div className="inline-flex mx-auto  max-w-screen py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-white ">Dashboard</h1>
            <button  onClick={logout} class="absolute right-10 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Logout</button>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {/* Replace with your content */}
            <div className="px-4 py-6 sm:px-0">
              <div className="h-96 rounded-lg " />
            </div>
            {/* /End replace */}
          </div>
        </main>
      </div>
      {/* <div className="w-full flex justify-center items-center text-7xl h-screen text-gray-700 "> */}
        
        
      {/* </div> */}
    </>
  );
};

export default AdminDashboardPage;
