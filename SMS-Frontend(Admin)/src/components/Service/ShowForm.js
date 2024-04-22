import React from "react";

function ShowForm() {
  return (
    <form onSubmit={handleFormSubmit} className="formContainer">
      <div className="gridContainer" style={{ width: "100%" }}>
        <div>
          <label htmlFor="serviceName" className="inputLabel">
            Service Name
          </label>
          <input
            type="text"
            name="serviceName"
            value={serviceName}
            placeholder="Service Name"
            className="inputstyle"
            onChange={(e) => setServiceName(e.target.value)}
          />
          {serviceNameError && (
            <p style={{ color: "red" }}>{serviceNameError}</p>
          )}
        </div>
        <div>
          <label htmlFor="serviceDescription" className="inputLabel">
            Service Description
          </label>
          <input
            placeholder="Describe the service"
            className="inputstyle"
            name="serviceDesc"
            type="text"
            value={serviceDesc}
            onChange={(e) => setServiceDesc(e.target.value)}
          />
          {serviceDescError && (
            <p style={{ color: "red" }}>{serviceDescError}</p>
          )}
        </div>
        <div>
          <label htmlFor="servicePrice" className="inputLabel">
            Service Price
          </label>
          <input
            type="number"
            name="servicePrice"
            value={servicePrice}
            placeholder="Price"
            className="inputstyle"
            onChange={(e) => setServicePrice(e.target.value)}
          />
          {servicePriceError && (
            <p style={{ color: "red" }}>{servicePriceError}</p>
          )}
        </div>
      </div>
      <div className="gridContainer" style={{ width: "100%" }}>
        <div>
          <label htmlFor="serviceAddDate" className="inputLabel">
            Service Added date
          </label>
          <input
            type="Date"
            name="serviceDate"
            value={serviceDate}
            placeholder="Price"
            className="inputstyle"
            onChange={(e) => setServiceDate(e.target.value)}
          />
          {serviceDateError && (
            <p style={{ color: "red" }}>{serviceDateError}</p>
          )}
        </div>
        <div>
          <label htmlFor="serviceState" className="inputLabel">
            Service State
          </label>
          <select
            id="service_state"
            name="serviceState"
            className="inputstyle"
            onChange={(e) => setServiceState(e.target.value)}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          {serviceStateError && (
            <p style={{ color: "red" }}>{serviceStateError}</p>
          )}
        </div>
      </div>
      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="submitButton"
          onClick={(e) => saveService(e)}
        >
          Submit
        </button>
        {/* Cancel Button */}
        <button type="cancel" className="cancelButton" onClick={clearService}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default ShowForm;
