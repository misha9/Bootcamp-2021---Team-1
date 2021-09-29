const getRecords = "SELECT * FROM Record";
const addRecord = "INSERT INTO Record (p_id, h_id, doctor_id, service_id, amount, consultation_date) VALUES ($1, $2, $3, $4, $5, $6)";


module.exports ={
    getRecords,
    addRecord,
}