const getBills = "SELECT * FROM Bill";
const addBill = "INSERT INTO Bill (amount, b_date) VALUES ($1, $2)";


module.exports ={
    getBills,
    addBill,
}