const express = require('express');
const cors = require('cors');
const dbService = require('./dbService');

const app = express();

app.use(cors());
app.use(express.json());

const formatDate = (timestamp) => {
	var d = new Date(timestamp),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return [year, month, day].join('-');
};

app.get('/api/get-employees', async (req, res) => {
	const db = dbService.getDbServiceInstance();

	let employees;
	try {
		employees = await db.getAllEmployees();
	} catch (error) {
		res.status(500).json({
			error: error,
		});
	}

	res.status(200).json({
		employees,
	});
});

app.patch('/api/track-time', async (req, res) => {
	// const { eid, start, end } = req.query;
	console.log("In backend");
	console.log(req.body);

	const {start, end, eid} = req.body;
	const db = dbService.getDbServiceInstance();

	const formattedStart = formatDate(Number(start));
	const formattedEnd = formatDate(Number(end));

	let worklog;
	try {
		worklog = await db.getEmployeeWork(eid, formattedStart, formattedEnd);
	} catch (error) {
		res.status(500).json({
			error: error,
		});
	}

	const hoursJsonData = JSON.parse(JSON.stringify(worklog));

	let employees;
	try {
		employees = await db.getEmployeeByEid(eid);
	} catch (error) {
		res.status(500).json({
			error: error,
		});
	}

    const employeeJsonData = JSON.parse(JSON.stringify(employees));

	res.status(200).json({
		hours: hoursJsonData[0].hours,
        employee: employeeJsonData[0]
	});
});

app.listen(5000, () => {
	console.log('server started running on port 5000');
});