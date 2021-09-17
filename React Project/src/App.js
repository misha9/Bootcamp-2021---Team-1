import logo from './img/logo.png';
import './App.css';

function App() {
  return (
    <div className="App">
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
						<label for="start">Start date:</label>
						<input
							type="date"
							id="ipStartDate"
							name="trip-start"
							value="2021-08-16"
							min="2010-09-16"
							max="2022-12-31"
						/>
						<label for="end">End date:</label>
						<input
							type="date"
							id="ipEndDate"
							name="trip-start"
							value="2021-08-16"
							min="2010-09-16"
							max="2022-12-31"
						/>
					</div>
					<br />
					<button type="button" id="btnTrack" className="btn btn-outline-light">Track</button>
				</div>
			</div>
         <br/>
         <div className="card" style={{width: '18rem', display: 'none'}} id="resultCard">
            <div className="card-body">
              <h5 className="card-title" id="vtName">3 - Misha</h5>
              <p className="card-text" id="vtHours">Total Hours = 10</p>
              <button className="btn btn-primary" id="btnCheck">Check Again</button>
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
