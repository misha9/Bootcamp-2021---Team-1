export const APIService = {
    fetchUsers
  };

  function fetchUsers(){
    return fetch("http://localhost:5000/api/get-employees")
        .then(handleResponse);
  }

  function handleResponse(response) {
    console.log(response);
     return response.text().then((text) => {
       const data = text && JSON.parse(text);
       // if (!response.ok) {
       //   const error =
       //     "Oops! Something went wrong there, Please try again." ||
       //     (data && data.message) ||
       //     response.status;
       //   return Promise.reject(new Error(error));
       // }
       return data;
     });
   }

