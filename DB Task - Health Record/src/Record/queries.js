const getRecords = "SELECT * FROM Record";
const addRecord = "INSERT INTO Record (record_id, p_name, p_id, h_name, doctor_name, consultation, test, amount, h_id, b_id, doctor_id, consultation_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)";


module.exports ={
    getRecords,
    addRecord,
}