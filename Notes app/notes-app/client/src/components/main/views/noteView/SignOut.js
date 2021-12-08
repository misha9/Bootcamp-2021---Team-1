import React, { useState } from "react";
import { GoogleLogout } from "react-google-login";
function SignOut({ dp, userName, mail, clientId, onSignOutSuccess }) {
  const [logoutStatus, setLogoutStatus] = useState(false);
  return (
    <div className='sign-out text-end mb-3'>
      <div className='btn-group'>
        <button
          type='button'
          className='btn shadow-none p-0'
          // style={{ borderRadius: "100px", borderColor: "black" }}
          data-bs-toggle='dropdown'
          aria-expanded='false'
          onMouseEnter={() => setLogoutStatus(false)}
        >
          <img
            className='rounded-circle m-0'
            style={{ maxWidth: "32px", height: "auto" }}
            src={dp}
            alt='profile_photo'
          />
        </button>
        <ul className='dropdown-menu p-0 mt-1'>
          <li className='p-2'>
            <div className='p-3 text-center'>
              <div className='p-2'>
                <img
                  src={dp}
                  className='rounded-circle m-0'
                  alt='profile_photo'
                />
              </div>
              <div>{userName}</div>
              <div className='small text-secondary p'>{mail}</div>
              <div className='pt-3'>
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
                        fontSize: "0.875rem",
                        padding: "0.375rem 0",
                        border: "1px solid #545151",
                        borderRadius: "10px",
                        color: logoutStatus ? "white" : "black",
                        backgroundColor: logoutStatus
                          ? "#545151"
                          : "transparent",
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
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SignOut;
