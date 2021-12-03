import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const AddModal = ({modal,handleSubmit,setmodal}) => {
  return (
    <Modal
      open={modal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <Box component="form" onSubmit={handleSubmit} validate sx={{ mt: 1 }}>
            <div className="modal-header">
              <h4 className="modal-title">Add Employee</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
                onClick={() => setmodal(false)}
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
                  name="name"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  required
                  name="email"
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <textarea
                  className="form-control"
                  required
                  name="address"
                ></textarea>
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="number"
                  className="form-control"
                  required
                  name="phone"
                />
              </div>
            </div>
            <div className="modal-footer">
              <input
                type="button"
                className="btn btn-default"
                data-dismiss="modal"
                value="Cancel"
                onClick={() => setmodal(false)}
              />
              <input type="submit" className="btn btn-success" value="Add" />
            </div>
          </Box>
        </div>
      </div>
    </Modal>
  );
};

export default AddModal;
