const getBills = "SELECT * FROM Bill";
const addBill = "INSERT INTO Bill (b_date, amount, b_id) VALUES ($1, $2, $3)";


module.exports ={
    getBills,
    addBill,
}