import React, { useEffect } from "react";
import MkdSDK from "../utils/MkdSDK";

const AdminDashboardPage = () => {
  useEffect(async()=>{
    async function fetchData() {
      const sdk=new MkdSDK();
    const payload={
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
  return (
    <>
      <div className="w-full flex justify-center items-center text-7xl h-screen text-gray-700 ">
        Dashboard
      </div>
    </>
  );
};

export default AdminDashboardPage;
