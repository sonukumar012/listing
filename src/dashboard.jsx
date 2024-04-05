// import React from 'react';
import { useNavigate } from "react-router-dom";
import "./DashboardPage.css"; // Inside your DashboardPage.js
import companyLogo from "./assets/images/company_logo.jpg";


const DashboardPage = () => {
  const history = useNavigate();

  const handleLogout = () => {
    // Clear session and handle logout
    sessionStorage.removeItem("userSession");
    history.push("/login");
  };

  return (


    <div className="list_page full_page">
      <div className="vl_loader-wrapper d-none loaderHideShow">
        <div className="vl_loader"></div>
      </div>
      <header className="shadow-sm py-3 mb-4 border-bottom">
        <div className="container-fluid px-md-5">
          <div className="d-flex flex-column flex-md-row align-items-center justify-content-between">
            <a
              href="dashboard"
              className="d-flex align-items-center text-dark text-decoration-none"
            >
              <img
                src={companyLogo}
                width="120"
                className="img-fluid"
                alt="logo"
              />
            </a>
            <div className="d-flex align-items-center justify-content-center flex-grow-1 header_title">
              <div className="d-flex align-items-center gap-2">
                <h4 className="text-uppercase fs-6 text-center fw-bold mb-0">
                  99Acres management
                </h4>
              </div>
            </div>
            <div className="border-start ps-3 ms-2 d-flex align-items-center">

              <a href="/" className="btn btn-outline-danger btn-sm">
                <span className="me-2">
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                </span>{" "}
                Logout
              </a>
            </div>
          </div>
        </div>
      </header>
      <div className="container-fluid px-md-5 mt-4 pb-5">
        <main>
          <div className="row justify-content-center g-4">
           <div className="col-md-6">
            <div className="row g-4">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header  text-center py-3 bg-primary border-0">
                  <h2 className=" fs-6  text-center mb-0 text-white">
                    Manage 99Acres Listing
                  </h2>
                </div>
                <div className="card-body text-center">
                  <div className="d-flex  gap-2">
                    <div class="d-flex flex-5 align-items-center position-relative border border-1 rounded p-2 border-success">
                      <div class="flex-shrink-0">
                        <span className="view_listing"><i class="fa-solid fa-eye"></i></span>
                      </div>
                      <div class="flex-grow-1 ms-3 text-start">
                        <a href="/listing" className="fs-6 fw-600 stretched-link text-decoration-none text-dark">View Listing</a>
                        <p className="small text-muted">View and Manage 99Acres Listing</p>
                      </div>
                    </div>
                    <div class="d-flex flex-5 align-items-center position-relative border border-1 rounded p-2 border-primary">
                      <div class="flex-shrink-0">
                        <span className="Upload_listing"><i class="fa-solid fa-cloud-arrow-up"></i></span>
                      </div>
                      <div class="flex-grow-1 ms-3 text-start">
                        <a href="/listUpload" className="fs-6 fw-600 stretched-link text-decoration-none text-dark">Upload file</a>
                        <p className="small text-muted">Upload file for 99Acres Listing</p>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="card">
              <div className="card-header  text-center py-3 bg-info border-0">
                  <h2 className=" fs-6  text-center mb-0 ">
                    Manage 99Acres Inventory
                  </h2>
                </div>
                <div className="card-body text-center">
                  <div className="d-flex gap-2">
                    <div class="d-flex align-items-center flex-5 position-relative border border-1 rounded p-2 border-success">
                      <div class="flex-shrink-0">
                        <span className="view_listing"><i class="fa-solid fa-eye"></i></span>
                      </div>
                      <div class="flex-grow-1 ms-3 text-start">
                        <a href="/inventory" className="fs-6 fw-600 stretched-link text-decoration-none text-dark">View Inventory</a>
                        <p className="small text-muted">View and Manage 99Acres Inventory</p>

                      </div>
                    </div>
                    <div class="d-flex align-items-center position-relative flex-5 border border-1 rounded p-2 border-primary">
                      <div class="flex-shrink-0">
                        <span className="Upload_listing"><i class="fa-solid fa-cloud-arrow-up"></i></span>
                      </div>
                      <div class="flex-grow-1 ms-3 text-start">
                        <a href="/uploadExcel" className="fs-6 fw-600 stretched-link text-decoration-none text-dark">Upload file</a>
                        <p className="small text-muted">Upload file for 99Acres Inventory</p>

                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
            </div>
           </div>
      
          </div>
        </main>
      </div>

    </div>

  );
};

export default DashboardPage;
