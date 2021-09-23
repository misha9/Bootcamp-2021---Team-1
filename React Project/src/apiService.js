export const APIService = {
    fetchUsers, trackTime
  };

  function fetchUsers(){
    return fetch("http://localhost:5000/api/get-employees")
        .then(handleResponse);
  }

  function trackTime(start,end,eid){
    let data = {start: start, end: end, eid: eid}
    console.log(data)
//    console.log(eid,start,end)
    const requestOptions = {
        method: "PATCH",
        headers: {
            "Content-type": "application/json",
          },
        body: JSON.stringify(data)
      };
    return fetch("http://localhost:5000/api/track-time",requestOptions)
        .then(handleResponse);
    };

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

