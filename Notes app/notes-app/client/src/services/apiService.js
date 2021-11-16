
export const APIService = {
    fetchNotes, handleResponse, fetchNotebooks, fetchWorkspace
  };

  function fetchNotes(id){
    console.log("fetch")
    const requestOptions = {
      method: "PATCH",
      headers: {
          "Content-type": "application/json",
        },
      body: JSON.stringify({notebook_id: id})
    };
    return fetch("http://localhost:5000/api/get-notes", requestOptions)
        .then(handleResponse);
  }

  function fetchNotebooks(wsID){
    console.log("fetch")
    const requestOptions = {
      method: "PATCH",
      headers: {
          "Content-type": "application/json",
        },
      body: JSON.stringify({ws_id: wsID})
    };
    return fetch("http://localhost:5000/api/get-notebooks", requestOptions)
        .then(handleResponse);
  }


  function fetchWorkspace(){
    console.log("fetching notebooks")
    return fetch("http://localhost:5000/api/get-workspace")
        .then(handleResponse);
  }


  function handleResponse(response) {
    console.log(response);
     return response.text().then((text) => {
       const data = text && JSON.parse(text);
       console.log(data);
       return data;
     });
  }

