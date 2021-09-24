import './App.css';
import {APIService} from './apiService';
import Header from './components/Header';
import Main from './components/Main';

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


function App() {

  return (
    <div className="App" onLoad={apiCall}>
		
		<section className='main'>
			<Header/>
			<div className="container">
				<div className="mainSection">
					<div className="content pt-5">
						<Main/>
					</div>
					<br/>
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
		{/* <div class="overlay" style={{display: 'none'}} id="cardOverlay"></div> */}
    </div>
  );
}

export default App;
