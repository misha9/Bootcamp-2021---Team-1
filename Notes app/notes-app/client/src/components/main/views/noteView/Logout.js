import React, { useState } from "react";
import { GoogleLogout } from "react-google-login";

function Logout({ clientId, onSignOutSuccess }) {
  const [logoutStatus, setLogoutStatus] = useState(false);
  return (
    <div>
      <GoogleLogout
        className='google-logout dropdown-item'
        clientId={clientId}
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            onMouseEnter={() => {
              setLogoutStatus(true);
            }}
            onMouseLeave={() => setLogoutStatus(false)}
            style={{
              width: "100%",
              border: "none",
              backgroundColor: "transparent",
            }}
          >
            Sign Out
          </button>
        )}
        buttonText='Sign Out'
        onLogoutSuccess={() => {
          onSignOutSuccess();
        }}
      ></GoogleLogout>
    </div>
  );
}

export default Logout;
