import React from 'react'
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import {APIService} from '../apiService';

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

function Main() {

    return (
        <div>
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
    )
}

export default Main
