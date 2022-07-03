import React, { useState, useEffect, Component } from "react";
import axios from "axios";
import { render } from "@testing-library/react";

const api = axios.create({
  baseURL: `http://localhost:3022/posts`,
});

var myHeaders = new Headers();
myHeaders.append("apikey", "lH7sUBIoD4tqG6HsEWHG8JOrDtRe4YLH");

var requestOptions = {
  method: "GET",
  redirect: "follow",
  headers: myHeaders,
};

class App extends Component {
  state = {
    customers: [],
    _id: "",
    customerName: "",
    customerAddress: "",
    customerMobile: "",

    newName: "",
    newAdrress: "",
    newMobile: "",
    error1: "",
    error2: "",
    error3: "",
  };

  constructor() {
    super();
    this.getCustomers();
  }

  //MOBILE VALIDATION API
  validate = () => {
    fetch(
      "https://api.apilayer.com/number_verification/validate?number=" +
        this.state.customerMobile,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  getCustomers = async () => {
    let data = await api.get("/").then(({ data }) => data);
    this.setState({ customers: data });
  };

  //CREATE CUSTOMER
  //This function is used to create a new customer
  //In this function, 'api.post' function is used to post the data to the backend, where 2 parameters are passed to it
  //The first is the target url, and the second is the customer object
  createCustomer = async (event) => {
    event.preventDefault();

    const { customerName, customerAddress, customerMobile } = this.state;

    const customer = {
      customerName,
      customerAddress,
      customerMobile,
    };

    if (
      customer.customerName.length === 0 ||
      customer.customerAddress.length === 0 ||
      customer.customerMobile.length === 0
    ) {
      this.setState({ error2: "*Please fill out all fields" });
    } else {
      let res = await api.post("/", customer).catch((err) => console.log(err));
      this.getCustomers();
      this.validate();
      alert("Customer Created Successfuly!");
      this.setState({ error2: "" });
    }
  };

  //DELETE CUSTOMER
  //This function is used to delete a customer
  //In this function, an '_id' variable is passed as parameter which will be the id of the customer we want to delte
  //Then the 'api.delete' function is used to delete the customer from the backend, and this function takes one parameter
  //The parameter passed to this function is the url directory with the '_id' variable passed in the 'deleteCustomer' function
  deleteCustomer = async (_id) => {
    if (_id.length === 0) {
      this.setState({ error1: "*Please fill out ID field" });
    }

    let data = await api.delete(`/${_id}`);

    if (data.data["message"] == 0) {
      this.setState({ error1: "*Please Enter a Valid ID" });
    } else {
      this.setState({ error1: "" });
      alert("Customer Deleted Successfully!");
    }
    this.getCustomers();
  };

  //UPDATE CUSTOMER
  //This function is used to update a customer
  //This function takes four parameters; The id of the target customer, and the three values(name-address-mobile) which will be the new data
  //Here, 'api/patch' function is used to update the data in the backend, and it takes two parameters
  //The first is the url directory with the 'id' passed in the 'updateCustomer' function. And the second parameter is an object holding the three new values that will be updated
  updateCustomer = async (id, val1, val2, val3) => {
    if (
      this.state._id.length === 0 ||
      this.state.newName.length === 0 ||
      this.state.newAdrress.length === 0 ||
      this.state.newMobile.length === 0
    ) {
      this.setState({ error3: "*Please fill out all fields" });
    } else {
      let data = await api.patch(`/${id}`, {
        customerName: val1,
        customerAddress: val2,
        customerMobile: val3,
      });

      if (data.data["message"] == 0) {
        this.setState({ error1: "*Please Enter a Valid ID" });
      } else {
        this.setState({ error1: "" });
        alert("Customer Updated Successfully!");
      }

      this.getCustomers();
      this.setState({ error3: "" });
    }
  };

  //GET INPUT DATA
  //This function is used to get the data from the user inputs and save them in two variables(name and value)
  //The name holds the json object element, and the value holds the data coming in from the user input
  getInputData = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div style={{ marginLeft: "15px" }}>
        <div>
          <div>
            <h2>Customers</h2>
            {this.state.customers.map((customer) => (
              <div style={{ display: "flex" }}>
                <p>Name: {customer.customerName}</p>
                <p style={{ marginLeft: "30px" }}>
                  Address: {customer.customerAddress}
                </p>
                <p style={{ marginLeft: "30px" }}>
                  Mobile: {customer.customerMobile}
                </p>
                <button
                  style={{ marginLeft: "30px" }}
                  onClick={() => this.deleteCustomer(customer._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
          <div>
            <br></br>
            <h2>Create a New Customer Here</h2>
            <input
              name="customerName"
              type="text"
              placeholder="Name"
              onChange={this.getInputData}
            ></input>
            <br></br>
            <br></br>
            <input
              type="text"
              placeholder="Address"
              onChange={this.getInputData}
              name="customerAddress"
            ></input>
            <br></br>
            <br></br>
            <input
              type="number"
              placeholder="Mobile Number"
              onChange={this.getInputData}
              name="customerMobile"
            ></input>
            <br></br>
            <br></br>
            <p style={{ marginLeft: "10px", color: "red" }}>
              {this.state.error2}
            </p>
            <button onClick={this.createCustomer}>Create</button>
          </div>

          <div style={{ marginBottom: "30px" }}>
            <br></br>
            <br></br>
            <h2>Update and Delete by ID</h2>
            <div>
              ID:
              <input
                style={{ width: "10%", marginLeft: "10px" }}
                onChange={this.getInputData}
                placeholder="Enter ID"
                name="_id"
                type="text"
              ></input>
              <span style={{ marginLeft: "10px", color: "red" }}>
                {this.state.error1}
              </span>
            </div>
            <br></br>

            <div>
              Name:
              <input
                style={{ width: "10%", marginLeft: "10px" }}
                onChange={this.getInputData}
                placeholder="Enter new name"
                name="newName"
                type="text"
              ></input>
            </div>
            <br></br>

            <div>
              Address:
              <input
                style={{ width: "10%", marginLeft: "10px" }}
                onChange={this.getInputData}
                placeholder="Enter new address"
                name="newAdrress"
                type="text"
              ></input>
            </div>
            <br></br>

            <div>
              Mobile:
              <input
                style={{ width: "10%", marginLeft: "10px" }}
                onChange={this.getInputData}
                placeholder="Enter new mobile number"
                name="newMobile"
                type="number"
              ></input>
            </div>
            <p style={{ marginLeft: "10px", color: "red" }}>
              {this.state.error3}
            </p>

            <br></br>
            <button
              style={{ marginRight: "20px" }}
              onClick={() => this.deleteCustomer(this.state._id)}
            >
              Delete
            </button>
            <button
              onClick={() =>
                this.updateCustomer(
                  this.state._id,
                  this.state.newName,
                  this.state.newAdrress,
                  this.state.newMobile
                )
              }
            >
              Update
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
