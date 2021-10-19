
export const APIService = {
    fetchNotes
  };

  function fetchNotes(){
    console.log("fetch")
    return fetch("http://localhost:5000/api/get-notes")
        .then(handleResponse);
  }

//   function trackTime(start,end,eid){
//     let data = {start: start, end: end, eid: eid}
//     console.log(data)
// //    console.log(eid,start,end)
//     const requestOptions = {
//         method: "PATCH",
//         headers: {
//             "Content-type": "application/json",
//           },
//         body: JSON.stringify(data)
//       };
//     return post("http://localhost:5000/api/track-time",requestOptions)
//         .then(handleResponse);
//     };

  function handleResponse(response) {
    console.log(response);
     return response.text().then((text) => {
       const data = text && JSON.parse(text);
       return data;
     });
     
   }

