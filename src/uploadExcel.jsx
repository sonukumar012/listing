import { useState } from "react";
import axios from "axios";
import "./inventory.css";
import "./alert.css";
import companyLogo from "./assets/images/company_logo.jpg";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const FileUploadComponent = () => {
  const [file, setFile] = useState(null);
  const [option, setOption] = useState("");
  const navigate = useNavigate(); // Initialize useHistory

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleOptionChange = (e) => {
    setOption(e.target.value);
  };

  const handleUpload = async () => {
    if (!file || !option) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select a file and an option.",
      });
      return;
    }

    document.querySelector(".vl_loader-wrapper").classList.remove("d-none");

    const formData = new FormData();
    formData.append("fileCSV", file);
    formData.append("option", option);

    try {
      const response = await axios.post(
        "http://localhost/99acres_api/api/import-data.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response:", response.data);
      if (response.data.code == 200) {
        document.querySelector(".vl_loader-wrapper").classList.add("d-none");
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.success,
        });
      } else {
        document.querySelector(".vl_loader-wrapper").classList.add("d-none");
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response.data.error,
        });
      }

      navigate("/inventory");
    } catch (error) {
      document.querySelector(".vl_loader-wrapper").classList.add("d-none");
      console.error("Error uploading file:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred while uploading the file.",
      });
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
                  inventory management
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
          <div className="row justify-content-center">
            <div className="col-md-6">
              
              <div className="card">
              <div className="card-header  text-center py-3 bg-primary border-0">
                  <h2 className=" fs-6  text-center mb-0 text-white">
                    Upload Inventory File
                  </h2>
                </div>
                <div className="card-body text-center">
                  <div>
                    {/* <input type="file" onChange={handleFileChange} /  > */}

                    <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                      <input
                          type="radio"
                          value="Buy"
                          className="btn-check"
                          checked={option === "Buy"}
                          onChange={handleOptionChange}
                          id="chkBuy"
                        />
                      <label className="btn btn-outline-secondary" htmlFor="chkBuy">Buy</label>

                      <input
                          type="radio"
                          value="Rent"
                          className="btn-check"
                          checked={option === "Rent"}
                          onChange={handleOptionChange}
                          id="chkRent"
                        />
                      <label className="btn btn-outline-secondary" htmlFor="chkRent">Rent</label>
                    </div>

                    <div className=" my-3">
                      <input
                        type="file"
                        id="txt_uploade_file"
                        className="form-control"
                        onChange={handleFileChange}
                      />
                    </div>
                    
                    <button
                      className="btn btn-primary mt-3"
                      onClick={handleUpload}
                    >
                      Upload
                    </button>
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

export default FileUploadComponent;
