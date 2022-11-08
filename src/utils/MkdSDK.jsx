export default function MkdSDK() {
  this._baseurl = "https://reacttask.mkdlabs.com";
  this._project_id = "reacttask";
  this._secret = "d9hedycyv6p7zw8xi34t9bmtsjsigy5t7";
  this._table = "";
  this._custom = "";
  this._method = "";

  const raw = this._project_id + ":" + this._secret;
  let base64Encode = btoa(raw);

  this.setTable = function (table) {
    this._table = table;
  };
  
  this.login = async function (email, password, role) {
    //TODO
    
     this.setTable("login")
    const payload={
      "email":email,
      "password":password,
      "role":role,
    }

    const header = {
      "Content-Type": "application/json",
      "x-project": base64Encode,
    };
    const result=await this.callRestAPI(payload, "POST", header)
    if(result.error==false){
      localStorage.setItem("token", result.token)
      const data={
        token: result.token,
        status: "OK",
        role: "admin"
      }
      return data
    }
  };

  this.getHeader = function () {
    return {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "x-project": base64Encode,
    };
  };

  this.baseUrl = function () {
    return this._baseurl;
  };
  
  this.callRestAPI = async function (payload, method, header) {
    

    switch (method) {
      case "POST":
        const getResult = await fetch(
          this._baseurl + `/v2/api/lambda/${this._table}`,
          {
            method: "POST",
            headers: header,
            body: JSON.stringify(payload),
          }
        );
        const jsonGet = await getResult.json();

        if (getResult.status === 200) {
          return jsonGet
          // console.log(jsonGet)
        }
        if (getResult.status === 401) {
          throw new Error(jsonGet.message);
        }

        if (getResult.status === 403) {
          throw new Error(jsonGet.message);
        }

      
        
      case "PAGINATE":
        if (!payload.page) {
          payload.page = 1;
        }
        if (!payload.limit) {
          payload.limit = 10;
        }
        const paginateResult = await fetch(
          this._baseurl + `/v1/api/rest/${this._table}/${method}`,
          {
            method: "POST",
            headers: header,
            body: JSON.stringify(payload),
          }
        );
        const jsonPaginate = await paginateResult.json();

        if (paginateResult.status === 401) {
          throw new Error(jsonPaginate.message);
        }
        if (paginateResult.status === 403) {
          throw new Error(jsonPaginate.message);
        }
        
        console.log(jsonPaginate);
      default:
        break;
    }
  };  

  this.check = async function (role) {
    this.setTable("check")
    const payload={
      "role":role
    }
    const header = {
      "Content-Type": "application/json",
      "x-project": base64Encode,
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    this.callRestAPI(payload, "POST", header)
  };

  return this;
}
