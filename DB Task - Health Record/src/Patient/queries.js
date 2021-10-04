
const getPatients = "SELECT * FROM Patient";
const getPatientById = "SELECT * FROM Patient WHERE p_id = $1";
const addPatient = "INSERT INTO Patient (p_name, user_id, age, blood_group, p_address, p_id) VALUES ($1, $2, $3, $4, $5, $6)";

module.exports ={
    getPatients,
    getPatientById,
    addPatient,
}