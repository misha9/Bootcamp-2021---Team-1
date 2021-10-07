const getQuery1 = "SELECT Users.mail AS Mail, Users.contact AS Contact FROM Users INNER JOIN Patient ON Users.user_id = Patient.user_id WHERE Patient.blood_group = 'O+ve'";
const getQuery2 = "SELECT DISTINCT d.doctor_name AS Doctor, d.specialisation AS Specialisation FROM Doctor AS d INNER JOIN Record AS r ON d.doctor_id = r.doctor_id WHERE consultation_date = '2010-02-26'";
const getQuery3 = "SELECT DISTINCT h.h_name AS Hospital, h.h_address AS Address FROM Record AS r INNER JOIN  Hospital AS h ON h.h_id = r.h_id INNER JOIN  Patient AS p ON p.p_id= r.p_id WHERE p.age < 30";
const getQuery4 = "SELECT service_id AS ID, service_name AS Service FROM Service";
const getQuery5 = "SELECT COUNT(DISTINCT p_id ) AS Total_people FROM Record AS r INNER JOIN Service AS s ON r.service_id = s.service_id WHERE s.service_name = 'Vaccination'";

module.exports ={
    getQuery1, getQuery2, getQuery3, getQuery4, getQuery5
}