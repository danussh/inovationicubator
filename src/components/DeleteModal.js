import React from "react";

const DeleteModal = ({validateDelete}) => {
  return (
    <div id="deleteEmployeeModal" className="modal fade">
      <div className="modal-dialog">
        <div className="modal-content">
          <form>
            <div className="modal-header">
              <h4 className="modal-title">Delete Employee</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete these Records?</p>
              <p className="text-warning">
                <small>This action cannot be undone.</small>
              </p>
            </div>
            <div className="modal-footer">
              <input
                type="button"
                className="btn btn-default"
                data-dismiss="modal"
                value="Cancel"
              />
              <input
                type="submit"
                className="btn btn-danger"
                data-dismiss="modal"
                value="Delete"
                onClick={(e) => validateDelete(e)}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
