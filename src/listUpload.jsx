import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./inventory.css";
import "./alert.css";
import companyLogo from "./assets/images/company_logo.jpg";

const UploadExcel = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate(); // Initialize useHistory

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("fileCSV", file);

    try {
      await axios.post(
        "https://99acres.dreamworld.properties/api/importlistdata.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("File uploaded successfully.");
      navigate("/inventory");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file. Please try again.");
    }
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
                99ACRES LISTING MANAGEMENT
                </h4>
              </div>
            </div>
            <div className="border-start ps-3 ms-2 d-flex align-items-center">
             
              <a href="logout.php" className="btn btn-outline-danger btn-sm">
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
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header  text-center py-3 bg-primary border-0">
                  <h2 className=" fs-6  text-center mb-0 text-white">
                  Upload file for 99Acres Listing
                  </h2>
                </div>
                <div className="card-body text-center">
                <div className="my-3">
                      <input
                        type="file"
                        id="txt_uploade_file"
                        className="form-control"
                        
                        onChange={handleChange}
                      />
                    </div>
                    <button
                      className="btn btn-primary mt-3"
                      onClick={handleSubmit}
                    >
                      Upload
                    </button>
                  
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UploadExcel;
