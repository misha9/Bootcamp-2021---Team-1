import logo from './img/logo.png';
import './App.css';
import {APIService} from './apiService';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';

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
		document.getElementById('resultCard').style.display = 'block';
		document.getElementById('cardOverlay').style.display = 'block';
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
      <div className="main">
			<div className="nav-bar">
				<a href="https://www.tarento.com/"
					><img src={logo} alt="logo" className="logo"
				/></a>
				<ul>
					<li><a href="https://kronos.tarento.com/login">Home</a></li>
					<li><a href="https://www.tarento.com/about">About</a></li>
					<li><a href="https://www.tarento.com/services">Services</a></li>
					<li><a href="https://www.tarento.com/careers">Careers</a></li>
					<li><a href="https://www.tarento.com/contact">Contact</a></li>
				</ul>
			</div>
			<div className="content">
				<h1>Track working time</h1>
				<div>
					<div className="drop-down">
						<label for="employee-select"></label>
						<select name="employee" id="employee-select">
							<option value="">Select an employee</option>
						</select>
					</div>
					<br />
					<div className="date">
						<div className="datePicker">
								<DatePickerComponent 
									id="startDate" 
									cssClass='customCSS' 
									format='dd-mm-yyyy'
									placeholder='Enter start date'  
									onChange={displayDate}>
								</DatePickerComponent>
							</div>
							<div className="datePicker">
								<DatePickerComponent 
									id="endDate" 
									cssClass='customCSS' 
									format='dd-mm-yyyy'
									placeholder='Enter end date' 
									onChange={displayDate}>
								</DatePickerComponent>
							</div>
						</div>
					<br />
					<button type="button" id="btnTrack" className="btn btn-outline-light" onClick={trackHour}>Track</button>
				</div>
			</div>
         <br/>
         <div className="card" style={{width: '18rem', display: 'none'}} id="resultCard">
            <div className="card-body">
              <h5 className="card-title" id="vtName">3 - Misha</h5>
              <p className="card-text" id="vtHours">Total Hours = 10</p>
              <button className="btn btn-primary" id="btnCheck" onClick={reload}>Check Again</button>
            </div>
          </div>
		</div>
		<div className="footer">
			<a
				className="footer-link"
				href="https://www.linkedin.com/company/tarento-group/mycompany/"
				>LinkedIn</a
			>
			<a className="footer-link" href="https://twitter.com/tarentogroup">Twitter</a>
			<a className="footer-link" href="https://www.tarento.com/">Website</a>
			<p className="copyright">All rights reserved © 2021 Tarento Technologies.</p>
		</div>
		<div class="overlay" style={{display: 'none'}} id="cardOverlay"></div>
    </div>
  );
}

export default App;
