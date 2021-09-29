// const getQuery = "select SUM(amount) from Bill WHERE b_date = '2002-02-27'";
// const getQuery = "select service_id, service_name from Service ORDER BY service_name;";
const getQuery = "SELECT DISTINCT Doctor.doctor_name, Doctor.specialisation FROM Doctor INNER JOIN Record ON Doctor.doctor_id = Record.doctor_id WHERE consultation_date = '2021-02-01 '";
// const getQuery = "SELECT Hospital.h_name, Hospital.h_address FROM Hospital INNER JOIN Patient ON Hospital.h_id = Patient.h_id WHERE Patient.age < 25";
// const getQuery = "SELECT Users.mail, Users.contact FROM Users INNER JOIN Patient ON Users.user_id = Patient.user_id WHERE Patient.blood_group = 'O+ve'";

module.exports ={
    getQuery,
}