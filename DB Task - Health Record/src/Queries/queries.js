const getQuery = "SELECT DISTINCT Doctor.doctor_name, Doctor.specialisation FROM Doctor INNER JOIN Record ON Doctor.doctor_id = Record.doctor_id WHERE consultation_date = '2021-02-01 '";

module.exports ={
    getQuery,
}