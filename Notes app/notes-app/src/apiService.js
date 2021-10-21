
export const APIService = {
    fetchNotes, handleResponse
  };

  function fetchNotes(){
    console.log("fetch")
    return fetch("http://localhost:5000/api/get-notes")
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

