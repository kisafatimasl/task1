import React, { useEffect } from "react";
import MkdSDK from "../utils/MkdSDK";
import { AuthContext } from "../authContext";
import { useNavigate } from "react-router";

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
      <div className="w-full flex justify-center items-center text-7xl h-screen text-gray-700 ">
        
        <button className="button" onClick={logout}>LOGOUT</button>
      </div>
    </>
  );
};

export default AdminDashboardPage;
