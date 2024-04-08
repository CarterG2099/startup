import React from "react";

function InstructionModal({ instructionText, setShowInstructions }) {
  return (
    <div className="modal fade text-dark" id="instructionsModal" tabIndex="-1" aria-labelledby="instructionsModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="instructionsModalLabel">Instructions</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowInstructions(false)}></button>
          </div>
          <div className="modal-body">
            {instructionText}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstructionModal
