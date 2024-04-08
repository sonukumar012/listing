import "./inventory.css";
import "./alert.css";
import axios from "axios";
import companyLogo from "./assets/images/company_logo.jpg";
import { useEffect, useRef, useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import $ from "jquery";
import "datatables.net-dt";
import ReactDOMServer from "react-dom/server";
import Papa from "papaparse";

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [searchText, setSearchText] = useState(""); // State for search text
  const propertyTableRef = useRef(null);


  useEffect(() => {
    // Function to fetch inventory
    const fetchInventory = async () => {
      // alert(searchText);
      try {
        // const response = await axios.get("https://99acres.dreamworld.properties/inventory");
        const response = await axios.get(
          "http://localhost/99acres_api/api/apicommon.php?rentResale=" +
            filterType +
            "&searchString=" +
            searchText,
          {
            params: { rentResale: filterType, searchText: searchText },
          }
        );
        // Update state with fetched inventory
        setInventory(response.data);
        // Destroy the DataTable if it's already initialized
        if ($.fn.DataTable.isDataTable(propertyTableRef.current)) {
          $(propertyTableRef.current).DataTable().destroy();
        }
        $(propertyTableRef.current).DataTable({
          pageLength: 10,
          data: response.data,
          searching: false,
          ordering: true,
          // scrollX: true,
          // scrollX: true,
          columns: [
            {
              data: "title",
              // width: "50px",
              className: "text-center align-middle",
              render: function (data, type, row) {
                if (type === "display" && data) {
                  const titleElement = (
                    <p
                      className="text-truncate d-inline-block"
                      rel="noopener noreferrer"
                      style={{
                        color: "black",
                        maxWidth: "100px",
                      }}
                      data-bs-toggle="tooltip"
                      title={data}
                      data-bs-original-title={data}
                    >
                      {data}
                    </p>
                  );
                  return ReactDOMServer.renderToString(titleElement);
                }
                return data;
              },
            },
            {
              data: "property_type", // Define as Status
              render: function (data, type) {
                // Check if data is available and render accordingly
                if (type === "display" && data) {
                  return ReactDOMServer.renderToString(
                    <div className="text-center">{data}</div>
                  );
                }
                return "N/A";
              },
              className: "text-center align-middle ",
            },
            {
              data: "link",
              className: "link-style text-center align-middle",
              render: function (data, type) {
                if (type === "display" && data) {
                  return ReactDOMServer.renderToString(
                    <a
                      className="text-center"
                      href={data}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", color: "blue" }}
                    >
                      View
                    </a>
                  );
                }
                return data;
              },
            },
            {
              data: "location",
              className: "text-center align-middle  ",
              render: function (data, type) {
                if (type === "display" && data) {
                  const title = (
                    <p
                      className="text-truncate d-inline-block"
                      rel="noopener noreferrer"
                      style={{
                        textDecoration: "none",
                        color: "black",
                        maxWidth: "80px",
                      }}
                      data-bs-toggle="tooltip"
                      title={data}
                      data-bs-original-title={data}
                    >
                      {data}
                    </p>
                  );
                  return ReactDOMServer.renderToString(title);
                }
                return data;
              },
            },
            {
              data: "flat_type",
              className: "text-center align-middle",
              render: function (data, type, row) {
                if (type === "display" && data) {
                  const titleElement = (
                    <p
                      className="text-truncate d-inline-block"
                      rel="noopener noreferrer"
                      style={{
                        textDecoration: "none",
                        color: "black",
                        maxWidth: "60px",
                      }}
                      data-bs-toggle="tooltip"
                      title={data}
                      data-bs-original-title={data}
                    >
                      {data}
                    </p>
                  );
                  return ReactDOMServer.renderToString(titleElement);
                }
                return data;
              },
            },
            {
              data: "price",
              width: "80px",
              render: function (data, type) {
                // Check if the data is being rendered for display
                if (type === "display" && data) {
                  // Extract the numeric value from the data
                  const matches = data.match(/₹\s*([\d,.]+)\s*(Lac|Cr)?/);
                  if (matches) {
                    let price = parseFloat(matches[1].replace(/,/g, ""));
                    let unit = matches[2];
                    let formattedPrice = "";

                    // Convert the price to appropriate format
                    if (unit === "Cr") {
                      price *= 10000000;
                    } else if (unit === "Lac") {
                      price *= 100000;
                    }

                    if (price >= 10000) {
                      if (price >= 10000000) {
                        // If price is in Crores (Cr)
                        formattedPrice = (price / 10000000).toFixed(1) + " Cr";
                      } else if (price >= 100000) {
                        // If price is in Lakhs (Lac)
                        formattedPrice = (price / 100000).toFixed(2) + " L";
                      } else {
                        // If price is in thousands (k)
                        formattedPrice = (price / 1000).toFixed(2) + " K";
                      }
                    } else {
                      // Display the price as it is if less than 10000
                      formattedPrice = price.toFixed(2);
                    }

                    // Remove any trailing zeroes after formatting
                    formattedPrice = formattedPrice.replace(
                      /(\.0+)(\D|$)/,
                      "$2"
                    );

                    return ReactDOMServer.renderToString(
                      <span
                        className="badge bg-success"
                        style={{ fontSize: "14px", fontWeight: "600" }}
                      >
                        {formattedPrice}
                      </span>
                    );
                  }
                }
                return data;
              },
              className: "text-center align-middle",
            },
            {
              data: "price_sqft",
              width: "80px",
              render: function (data, type) {
                // Check if data is available and render accordingly
                if (type === "display" && data) {
                  data = data.replace("₹", "").replace("/sqft", "");
                  return ReactDOMServer.renderToString(
                    <span
                      className="badge bg-secondary"
                      style={{ fontSize: "14px", fontWeight: "600" }}
                    >
                      {data}
                    </span>
                    // <div className="text-center">{data}</div>
                  );
                }
                return "N/A";
              },
              className: "text-center align-middle",
            },
            {
              data: "total_area",
              className: "text-center align-middle",
              render: function (data, type) {
                if (type === "display" && data) {
                  const title = (
                    <p
                      className="text-truncate d-inline-block"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        textDecoration: "none",
                        color: "black",
                        maxWidth: "50px",
                      }}
                      data-bs-toggle="tooltip"
                      title={data}
                      data-bs-original-title={data}
                    >
                      {data}
                    </p>
                  );
                  return ReactDOMServer.renderToString(title);
                }
                return data;
              },
            },
            {
              data: "area_type",
              className: "text-center align-middle text-nowrap ",
              render: function (data, type) {
                if (type === "display" && data) {
                  const title = (
                    <p
                      className="text-truncate d-inline-block"
                      // target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        textDecoration: "none",
                        color: "black",
                        maxWidth: "60px",
                      }}
                      data-bs-toggle="tooltip"
                      title={data}
                      data-bs-original-title={data}
                    >
                      {data}
                    </p>
                  );
                  return ReactDOMServer.renderToString(title);
                }
                return data;
              },
            },
            {
              data: "bathroom",
              render: function (data, type) {
                // Check if data is available and render accordingly
                if (type === "display" && data) {
                  return ReactDOMServer.renderToString(
                    <div className="text-center">{data}</div>
                  );
                }
                return "N/A";
              },
              className: "text-center align-middle",
            },
            {
              data: "description",
              className: "text-center align-middle",
              render: function (data, type) {
                if (type === "display" && data) {
                  const title = (
                    <p
                      className="text-truncate d-inline-block"
                      rel="noopener noreferrer"
                      style={{
                        textDecoration: "none",
                        color: "black",
                        maxWidth: "100px",
                      }}
                      data-bs-toggle="tooltip"
                      title={data}
                      data-bs-original-title={data}
                    >
                      {data}
                    </p>
                  );
                  return ReactDOMServer.renderToString(title);
                }
                return data;
              },
            },
            {
              data: "possession_by",
              render: function (data, type) {
                // Check if data is available and render accordingly
                if (type === "display" && data) {
                  const title = (
                    <p
                      className="text-truncate d-inline-block"
                      rel="noopener noreferrer"
                      style={{
                        textDecoration: "none",
                        color: "black",
                        maxWidth: "80px",
                      }}
                      data-bs-toggle="tooltip"
                      title={data}
                      data-bs-original-title={data}
                    >
                      {data}
                    </p>
                  );
                  return ReactDOMServer.renderToString(title);
                }
                return data;
              },
              className: "text-center align-middle",
            },
            {
              data: "plot_facing",
              className: "text-center align-middle",
              render: function (data, type) {
                if (type === "display" && data) {
                  const title = (
                    <p
                      className="text-truncate d-inline-block"
                      rel="noopener noreferrer"
                      style={{
                        textDecoration: "none",
                        color: "black",
                        maxWidth: "80px",
                      }}
                      data-bs-toggle="tooltip"
                      title={data}
                      data-bs-original-title={data}
                    >
                      {data}
                    </p>
                  );
                  return ReactDOMServer.renderToString(title);
                }
                return data;
              },
            },
            {
              data: "viewed",
              className: "text-center align-middle",
              render: function (data, type) {
                if (type === "display" && data) {
                  const title = (
                    <p
                      className="text-truncate d-inline-block"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        textDecoration: "none",
                        color: "black",
                        maxWidth: "20px",
                      }}
                      data-bs-toggle="tooltip"
                      title={data}
                      data-bs-original-title={data}
                    >
                      {data}
                    </p>
                  );
                  return ReactDOMServer.renderToString(title);
                }
                return data;
              },
            },
            {
              data: "posted_time",
              className: "text-center align-middle",
              render: function (data, type) {
                if (type === "display" && data) {
                  const title = (
                    <p
                      className="text-truncate d-inline-block"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        textDecoration: "none",
                        color: "black",
                        maxWidth: "70px",
                      }}
                      data-bs-toggle="tooltip"
                      title={data}
                      data-bs-original-title={data}
                    >
                      {data}
                    </p>
                  );
                  return ReactDOMServer.renderToString(title);
                }
                return data;
              },
            },
            {
              data: "posted_by",
              className: "text-center align-middle",
              render: function (data, type) {
                if (type === "display" && data) {
                  const title = (
                    <p
                      className="text-truncate d-inline-block"
                      rel="noopener noreferrer"
                      style={{
                        textDecoration: "none",
                        color: "black",
                        maxWidth: "70px",
                      }}
                      data-bs-toggle="tooltip"
                      title={data}
                      data-bs-original-title={data}
                    >
                      {data}
                    </p>
                  );
                  return ReactDOMServer.renderToString(title);
                } else if (type === "display" && !data) {
                  return "Dealer";
                }
                return data;
              },
            },
            {
              data: "dealer_type",
              render: function (data, type) {
                // Check if data is available and render accordingly
                if (type === "display" && data) {
                  const title = (
                    <p
                      className="text-truncate d-inline-block"
                      rel="noopener noreferrer"
                      style={{
                        textDecoration: "none",
                        color: "white",
                        maxWidth: "70px",
                      }}
                      data-bs-toggle="tooltip"
                      title={data}
                      data-bs-original-title={data}
                    >
                      {data}
                    </p>
                  );
                  return ReactDOMServer.renderToString(
                    <span className="badge bg-primary">{title}</span>
                  );
                }
                return data;
              },
              className: "text-center align-middle",
            },
          ],
          drawCallback: function () {
            // Reinitialize Bootstrap 5 tooltips after DataTable updates its content
            var tooltipTriggerList = [].slice.call(
              document.querySelectorAll('[data-bs-toggle="tooltip"]')
            );
            var tooltipList = tooltipTriggerList.map(function (
              tooltipTriggerEl
            ) {
              return new bootstrap.Tooltip(tooltipTriggerEl);
            });
          },
        });
      } catch (error) {
        console.error("There was an error fetching the Inventory", error);
      }
    };
    // Call the fetchinventory function on component mount
    fetchInventory();
  }, [filterType, searchText]);

  const handleRentAndResaleButton = (e) => {
    // setFilterType(e.target.value);
    const value = e.target.value;
    if (value === "Resale") {
      // Toggle the selection
      setFilterType(filterType === "Resale" ? "" : "Resale");
    } else if (value === "Rent") {
      // Toggle the selection
      setFilterType(filterType === "Rent" ? "" : "Rent");
    }
    // const selectedValue = e.target.value;
    // // Now you have the value of the selected radio button
    // console.log(selectedValue);
    // alert('Button clicked');
  };

  const handleSearch = (e) => {
    setSearchText($("#txtSearch").val());
  };

  const handleClearFilters = () => {
    // Clear all filters
    setFilterType("");
    setSearchText("");
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  const handleDownload = () => {
    // Get the filtered data from the DataTable
    const table = $(propertyTableRef.current).DataTable();
    const filteredData = table.rows({ search: "applied" }).data().toArray();

    // Modify the data to format the price properly
    const formattedData = filteredData.map((row) => {
      // Clone the row to avoid modifying the original data
      const newRow = { ...row };

      // Format the price field
      if (newRow.price) {
        newRow.price = formatPrice(row.price);
      }

      // Format the price/sqft field
      if (newRow.price_sqft) {
        newRow.price_sqft = formatPriceSqft(row.price_sqft);
      }

      return newRow;
    });

    // Convert the modified data to CSV format using PapaParse
    const csv = Papa.unparse(formattedData);

    // Create a Blob from the CSV data
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

    // Create a temporary anchor element to trigger the download
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "Inventory_filtered_data.csv");
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const formatPriceSqft = (priceSqft) => {
    // Check if the priceSqft is valid and not null or undefined
    if (priceSqft !== null && priceSqft !== undefined) {
      // Extract the numeric value from the priceSqft string
      const numericPriceSqft = parseFloat(priceSqft.replace(/[^\d.]/g, ""));

      // Check if the numeric value is valid
      if (!isNaN(numericPriceSqft)) {
        return numericPriceSqft.toFixed(2); // Format the numeric value to 2 decimal places
      }
    }
    return priceSqft; // Return the original priceSqft if formatting fails or priceSqft is null/undefined
  };


  const formatPrice = (price) => {
    // Check if the price is valid and not null or undefined
    if (price !== null && price !== undefined) {
      // Extract the numeric value from the price string
      const matches = price.match(/₹\s*([\d,.]+)\s*(Lac|Cr)?/);
      if (matches) {
        let numericPrice = parseFloat(matches[1].replace(/,/g, ""));
        let unit = matches[2];
        let formattedPrice = "";

        // Convert the price to appropriate format
        if (unit === "Cr") {
          numericPrice *= 10000000;
        } else if (unit === "Lac") {
          numericPrice *= 100000;
        }

        if (numericPrice >= 10000) {
          if (numericPrice >= 10000000) {
            // If price is in Crores (Cr)
            formattedPrice = (numericPrice / 10000000).toFixed(1) + " Cr";
          } else if (numericPrice >= 100000) {
            // If price is in Lakhs (Lac)
            formattedPrice = (numericPrice / 100000).toFixed(2) + " L";
          } else {
            // If price is in thousands (K)
            formattedPrice = (numericPrice / 1000).toFixed(2) + " K";
          }
        } else {
          // Display the price as it is if less than 10000
          formattedPrice = numericPrice.toFixed(2);
        }

        // Remove any trailing zeroes after formatting
        formattedPrice = formattedPrice.replace(/(\.0+)(\D|$)/, "$2");

        return formattedPrice;
      }
    }
    return price; // Return the original price if formatting fails or price is null/undefined
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
                  99Acres Inventory
                </h4>
              </div>
            </div>
            <div className="border-start ps-3 ms-2 d-flex align-items-center">
              <a href="/dashboard" className="btn btn-outline-danger btn-sm">
                <span className="me-2">
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                </span>{" "}
                Logout
              </a>
            </div>
          </div>
        </div>
      </header>
      <nav aria-label="breadcrumb">
        <ol
          className="breadcrumb my-2 text-center small justify-content-center"
          id="breadcrumb2"
        >
          <li className="breadcrumb-item">
            <a href="/dashboard" className="text-capitalize">
              {" "}
              <span>
                <i className="fa-solid fa-house"></i>{" "}
              </span>{" "}
              {"dashboard"}
            </a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <a href="#" className="text-capitalize">
              {" "}
              99Acres Inventory
            </a>
          </li>
        </ol>
      </nav>
      <div className="container-fluid px-md-5 mt-4">
        <main>
          <div className="card">
            <div className="card-header bg-transparent text-start">
              <div className="d-flex justify-content-between align-items-center flex-md-row flex-column">
                <div className="d-flex gap-2 search_wrapper ">
                  <div className="search-input">
                    <span className="icon">
                      <i className="fas fa-search"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="txtSearch"
                      name="txtSearch"
                      placeholder="search"
                      onKeyDown={handleEnterKeyPress}
                    />
                  </div>
                  <button
                    className="btn btn-primary btnSearch btn-sm"
                    onClick={handleSearch}
                  >
                    <span className="me-2">
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </span>
                    Search
                  </button>
                  <button
                    className="btn btn-outline-danger mt-md-0 mt-2"
                    onClick={handleClearFilters}
                  >
                    Clear all Filter
                  </button>
                </div>
                {/* File Operation */}
                <div className="d-flex gap-2 align-items-center">
                  <div class="dropdown">
                    <button
                      class="btn btn-primary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span>
                        <i className="fa-solid fa-cloud-download"></i>
                      </span>{" "}
                      Get Template
                    </button>
                    <ul
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <a class="dropdown-item" href="Buy(Resale)_template.xlsx">
                          Buy
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="Rent_template.xlsx">
                          Rent
                        </a>
                      </li>
                    </ul>
                  </div>
                  {/* <a
                    href="Template_99acres.xltx"
                    download="Template-Inventory.csv"
                    className="btn btn-primary"
                    id="downlaod-btn"
                  >
                    <span>
                      <i className="fa-solid fa-cloud-download"></i>
                    </span>{" "}
                    Get Template
                  </a> */}
                  <a href="/uploadExcel" className="btn btn-outline-primary ">
                    <span>
                      <i className="fa-solid fa-file-arrow-up"></i>
                    </span>{" "}
                    Upload File
                  </a>
                  {/* className="d-flex justify-content-end mt-3" */}
                  <button
                    className="btn btn-outline-primary"
                    onClick={handleDownload}
                  >
                    <span>
                      <i className="fa fa-file-export"></i>
                    </span>{" "}
                    Export
                  </button>
                </div>
              </div>
            </div>
            <div className="card-body ">
              <div className="top_filter  py-3 px-3 d-flex flex-column gap-2">
                <div className="d-flex justify-content-md-start justify-content-start flex-wrap gap-2">
                  <div className="ms-md-3 d-flex gap-2 align-items-center flex-wrap">
                    <label className="small">Room</label>
                    <div className="d-flex gap-2">
                      <div className="d-inline">
                        <input
                          className="form-check-input rd_chip_input"
                          type="checkbox"
                          name="chk_room_type"
                          id="rdbhk_1"
                          value="Resale"
                          checked={filterType === "Resale"}
                          hidden
                          onChange={handleRentAndResaleButton}
                        />
                        <label className="rd_chip_tag" htmlFor="rdbhk_1">
                          Resale
                        </label>
                      </div>
                      <div className="d-inline">
                        <input
                          className="form-check-input rd_chip_input"
                          type="checkbox"
                          name="chk_room_type"
                          id="rdbhk_2"
                          value="Rent"
                          checked={filterType === "Rent"}
                          hidden
                          onChange={handleRentAndResaleButton}
                        />
                        <label className="rd_chip_tag" htmlFor="rdbhk_2">
                          Rent
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex gap-2 flex-column flex-md-row mt-4">
                <div className="table-responsive  flex-10 table_wrapper">
                  <table
                    className="table table-hover border mb-0 small cell-border display w-100"
                    id="propertyTable"
                    ref={propertyTableRef}
                  >
                    <thead className="bg-light ">
                      <tr>
                        <th scope="col" style={{ width: "150px" }}>
                          Title
                        </th>
                        <th
                          scope="col"
                          data-bs-toggle="tooltip"
                          title="Property Type"
                          data-bs-original-title="Property Type"
                        >
                          P.Type
                        </th>
                        <th scope="col">Link</th>
                        <th scope="col">Location</th>
                        <th scope="col">Flat Type</th>
                        <th scope="col">Price</th>
                        <th scope="col">Price/Sqft</th>
                        <th scope="col" style={{ width: "150px" }}>
                          Total Area
                        </th>
                        <th scope="col">Area Type</th>
                        <th scope="col">Bathroom</th>
                        <th scope="col">Description</th>
                        <th scope="col">Status</th>
                        <th scope="col">Facing</th>
                        <th scope="col">Viewed</th>
                        <th
                          scope="col"
                          data-bs-toggle="tooltip"
                          title="Posted on"
                          data-bs-original-title="Posted on"
                        >
                          Time
                        </th>
                        <th scope="col">Posted By</th>
                        <th scope="col">Dealer</th>
                        {/* <th scope="col">Created Date</th>
                        <th scope="col">Modified Date</th> */}
                      </tr>
                    </thead>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Inventory;
