import React from "react";

export function InstructionModal({ instructionText, setShowInstructions }) {
  return (
    <div className="modal" id="instructionsModal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Instructions</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => setShowInstructions(false)}
            ></button>
          </div>
          <div className="modal-body">
            <p>{instructionText}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
