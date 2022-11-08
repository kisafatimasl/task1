import React, { useEffect } from "react";
import MkdSDK from "../utils/MkdSDK";

const AdminDashboardPage = () => {
  useEffect(()=>{
    // const url='https://reacttask.mkdlabs.com/v1/api/rest/video/PAGINATE';
    // await fetch(
    //   url,
    //   {
    //     method: 'POST',

    //   }
    // )
    const sdk=new MkdSDK();
    sdk.callRestAPI()
  });
  return (
    <>
      <div className="w-full flex justify-center items-center text-7xl h-screen text-gray-700 ">
        Dashboard
      </div>
    </>
  );
};

export default AdminDashboardPage;
