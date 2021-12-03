import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Navbar from "./Navbar";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { ToastContainer, toast } from "react-toastify";
import Tooltip from "@material-ui/core/Tooltip";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import SearchBar from "material-ui-search-bar";
import DeleteModal from "./DeleteModal";
import AddModal from "./AddModal";

const Dashboard = () => {
  const [response, Setresponse] = useState([]);
  const [open, setOpen] = useState(true);
  const [deleteId, setDeleteId] = useState("");
  const [editId, setEditId] = useState({
    _id: "",
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const [modal, setmodal] = useState(false);
  const [editModal, setEditmodal] = useState(false);
  const [search, setsearch] = useState("");
  const history = useHistory();

  const token = JSON.parse(sessionStorage.getItem("accesToken"));
  //To prevent Going back once loggedin
  window.addEventListener("popstate", () => {
    history.push("/dashboard");
    window.location.replace("/dashboard");
  });
  window.addEventListener("popstate", () => {
    history.push("/dashboard");
    window.location.replace("/dashboard");
  });

  //Delete a Single Data
  const validateDelete = (e) => {
    e.preventDefault();
    setOpen(true);
    axios
      .delete(
        `https://employeebackendjwt.herokuapp.com/delete-user/${deleteId}`,
        { headers: { "auth-token": `${token}` } }
      )
      .then((res) => {
        if (res.data == "Access Denied") {
          toast.error("Access Denied", {
            position: "top-right",
            autoClose: 2000,
          });
          setOpen(false);
        }
        if (res.data.message === "employess-details deleted") {
          toast.error("Deleted Sucessfully", {
            position: "top-right",
            autoClose: 2000,
          });
          const Filterdata = response.filter((val) => {
            return deleteId !== val._id;
          });
          Setresponse(Filterdata);
          setOpen(false);
        } else {
          toast.error("Something Went Wrong", {
            position: "top-right",
            autoClose: 2000,
          });
          setOpen(false);
        }
      })
      .catch((err) => {
        console.log(err.message);
        setOpen(false);
      });
  };

  // Add a New Employee
  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(true);
    const data = new FormData(e.currentTarget);
    const body = {
      email: data.get("email"),
      name: data.get("name"),
      address: data.get("address"),
      phone: data.get("phone"),
    };
    axios
      .post(" https://employeebackendjwt.herokuapp.com/add-employee", body, {
        headers: { "auth-token": `${token}` },
      })
      .then((res) => {
        if (res.data == "Access Denied") {
          toast.error("Access Denied", {
            position: "top-right",
            autoClose: 2000,
          });
          setOpen(false);
        }
        if (res.data.message == "Employee created") {
          Setresponse([...response, body]);
          toast.success("Employee Added", {
            position: "top-right",
            autoClose: 2000,
          });
          setOpen(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setOpen(false);
      });
    setmodal(false);
  };

  //Edit a particular Data
  const validateSave = (e) => {
    e.preventDefault();
    setOpen(true);
    setEditmodal(false);
    axios
      .put(
        `https://employeebackendjwt.herokuapp.com/edit-employee/${editId._id}`,
        {
          name: editId.name,
          phone: editId.phone,
          email: editId.email,
          address: editId.address,
        },
        { headers: { "auth-token": `${token}` } }
      )
      .then((res) => {
        if (res.data == "Access Denied") {
          toast.error("Access Denied", {
            position: "top-right",
            autoClose: 2000,
          });
          setEditmodal(false);
          setOpen(false);
        }
        if (res.data.message == "Employee updated") {
          const Matchdata = response.map((val) => {
            return editId._id == val._id ? editId : val;
          });
          Setresponse(Matchdata);
          setEditmodal(false);
          setOpen(false);
          toast.success("Employee Detail Updated", {
            position: "top-right",
            autoClose: 2000,
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
        setOpen(false);
        setEditmodal(false);
      });
  };

  //show Employee Table
  useEffect(() => {
    const api = "https://employeebackendjwt.herokuapp.com/employess";
    axios
      .get(api, { headers: { "auth-token": `${token}` } })
      .then((res) => {
        Setresponse(res.data);
        setOpen(false);
      })
      .catch((err) => {
        setOpen(false);
        toast.error("Try Again Later", {
          position: "top-center",
          autoClose: 3000,
        });
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (search) {
      const api = `https://employeebackendjwt.herokuapp.com/search/${search}`;
      axios
        .get(api, { headers: { "auth-token": `${token}` } })
        .then((res) => {
          console.log(res);
          Setresponse(res.data);
          // setOpen(false);
        })
        .catch((err) => {
          // setOpen(false);
          toast.error("Try Again Later", {
            position: "top-center",
            autoClose: 3000,
          });
          console.log(err);
        });
    } else {
      const api = "https://employeebackendjwt.herokuapp.com/employess";
      axios
        .get(api, { headers: { "auth-token": `${token}` } })
        .then((res) => {
          Setresponse(res.data);
          setOpen(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [search]);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="table-responsive">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col-xs-6">
                  <h2>
                    Manage <b>Employees</b>
                  </h2>
                </div>
                <div className="col-xs-6">
                  <SearchBar
                    value={search}
                    onChange={(val) => setsearch(val)}
                  />
                  <a
                    href="#addEmployeeModal"
                    className="btn btn-success"
                    data-toggle="modal"
                    onClick={() => setmodal(true)}
                  >
                    <i className="material-icons">&#xE147;</i>
                    <span>Add New Employee</span>
                  </a>
                </div>
              </div>
            </div>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>
                    <span className="custom-Id">
                      ID
                      <label for="selectAll"></label>
                    </span>
                  </th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {response.map((val, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <span className="custom-Id">
                          <td>{index + 1}</td>
                        </span>
                      </td>
                      <td>{val.name}</td>
                      <td>{val.email}</td>
                      <td>{val.address}</td>
                      <td>{val.phone}</td>
                      <td>
                        <Tooltip title="Edit" placement="top">
                          <a
                            href="#editEmployeeModal"
                            className="edit"
                            data-toggle="modal"
                            onClick={() => {
                              setEditmodal(true);
                              setEditId(val);
                            }}
                          >
                            <i
                              className="material-icons"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Edit"
                            >
                              &#xE254;
                            </i>
                          </a>
                        </Tooltip>
                        <Tooltip title="Delete" placement="top">
                          <a
                            href="#deleteEmployeeModal"
                            className="delete"
                            data-toggle="modal"
                            onClick={() => setDeleteId(val._id)}
                          >
                            <i className="material-icons">&#xE872;</i>
                          </a>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add modal */}
      <AddModal modal={modal} handleSubmit={handleSubmit} setmodal={setmodal} />
      {/* Add modal */}

      {/* Edit Modal HTML  */}
      <Modal
        open={editModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <Box
              component="form"
              onSubmit={validateSave}
              validate
              sx={{ mt: 1 }}
            >
              <div className="modal-header">
                <h4 className="modal-title">Edit Employee</h4>
                <button
                  type="button"
                  className="close"
                  onClick={() => setEditmodal(false)}
                  aria-hidden="true"
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    defaultValue={editId.name}
                    onChange={(e) =>
                      setEditId({ ...editId, name: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    required
                    defaultValue={editId.email}
                    onChange={(e) =>
                      setEditId({ ...editId, email: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <textarea
                    className="form-control"
                    required
                    defaultValue={editId.address}
                    onChange={(e) =>
                      setEditId({ ...editId, address: e.target.value })
                    }
                  ></textarea>
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    defaultValue={editId.phone}
                    onChange={(e) =>
                      setEditId({ ...editId, phone: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="modal-footer">
                <input
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                  value="Cancel"
                  onClick={() => setEditmodal(false)}
                />
                <input
                  type="submit"
                  className="btn btn-info"
                  data-dismiss="modal"
                  value="Save"
                />
              </div>
            </Box>
          </div>
        </div>
      </Modal>
      {/* Edit Modal HTML  */}

      {/* <!-- Delete Modal HTML --> */}
      <DeleteModal validateDelete={validateDelete} />
      {/* <!-- Delete Modal HTML --> */}

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <ToastContainer />
    </>
  );
};

export default Dashboard;
