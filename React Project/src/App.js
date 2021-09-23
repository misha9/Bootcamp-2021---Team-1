import './App.css';
import {APIService} from './apiService';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import Header from './components/Header';

function apiCall(){
	console.log("Selected")
	APIService.fetchUsers().then((res)=>{
		console.log("hy")
		const { employees } = res;
			let optionsMarkup = '<option value="">Select an employee</option>';
			for (let i = 0; i < employees.length; i++) {
				const employee = employees[i];
				optionsMarkup += `<option value="${employee.eid}">${employee.eid} - ${employee.name}</option>`;
			}
			document.getElementById('employee-select').innerHTML = optionsMarkup;
	})
}

function trackHour(){
	console.log("qaz")
	const start = Number(new Date(document.getElementById('startDate').value));
	const end = Number(new Date(document.getElementById('endDate').value));
    const eid = document.getElementById('employee-select').value;
	APIService.trackTime(start,end,eid).then((res)=>{
		console.log("tracking")
		if (res.hours === undefined) {
			alert("", res.message || 'something went wrong', "error");
			return;
		}
		document.getElementById('vtName').innerText = res.employee.eid + ' - ' + res.employee.name;
		document.getElementById('vtHours').innerText = res.hours + ' Hours';
		// document.getElementById('mainCard').style.display = 'none';
		// document.getElementById('cardOverlay').style.display = 'block';
		document.getElementById('resultCard').style.display = 'block';
	})
}

function displayDate(){
	console.log(document.getElementById('startDate').value);
	console.log(document.getElementById('endDate').value);
}

function reload(){
	window.location.reload();
}


function App() {

  return (
    <div className="App" onLoad={apiCall}>
		
		<section className='main'>
			<Header/>
			<div className="container">
				<div className="mainSection">
					<div className="content pt-5">
						<div class="card col-md-4 m-auto text-center" id="mainCard">
							<div class="card-header card-title">
								<h5 className='text-uppercase pt-2'>Track working time</h5>
							</div>
							<div class="card-body p-4">
								<div className="dropDown">
									<select class="form-select form-select-sm" id="employee-select" aria-label=".form-select-sm example">
										<option selected>Select an employee</option>
										<option value=""></option>
									</select>
								</div>
								<br />
								<div className="date">
									<div className="datePicker mt-1">
										<DatePickerComponent 
											id="startDate" 
											cssClass='customCSS' 
											placeholder='Select the start date'  
											onChange={displayDate}>
										</DatePickerComponent>
									</div>
									<div className="datePicker mt-1">
										<DatePickerComponent 
											id="endDate" 
											cssClass='customCSS' 
											placeholder='Select the end date' 
											onChange={displayDate}>
										</DatePickerComponent>
									</div>
								</div>
								<br />
								<button type="button" id="btnTrack" className="btn btn-outline-dark" onClick={trackHour}>Track</button>
								<div className="card popUpCard mt-4" style={{width: '18rem', display: 'none'}} id="resultCard">
									<div className="card-body">
										<h5 className="card-title" id="vtName">3 - Misha</h5>
										<p className="card-text" id="vtHours">Total Hours = 10</p>
										<button className="btn btn-secondary" id="btnCheck" onClick={reload}>Check Again</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<br/>
					{/* <div className="card popUpCard" style={{width: '18rem', display: 'none'}} id="resultCard">
						<div className="card-body">
						<h5 className="card-title" id="vtName">3 - Misha</h5>
						<p className="card-text" id="vtHours">Total Hours = 10</p>
						<button className="btn btn-secondary" id="btnCheck" onClick={reload}>Check Again</button>
						</div>
					</div> */}
				</div>
			</div>
		</section>
		<footer className="footer bg-dark p-4 text-center">
			<div className="container">
				<div className="footer-link">
					<a href="https://www.linkedin.com/company/tarento-group/mycompany/">LinkedIn</a>
					<a href="https://twitter.com/tarentogroup">Twitter</a>
					<a href="https://www.tarento.com/">Website</a>
				</div>
				<p className="copyright mt-2">All rights reserved © 2021 Tarento Technologies.</p>
			</div>
		</footer>
		<div class="overlay" style={{display: 'none'}} id="cardOverlay"></div>
    </div>
  );
}

export default App;
