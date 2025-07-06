import React from "react";
import spinnerimg from "../../assets/img/loading-gif.gif";

const Spinner = () => {
  return (
    <div>
      <img
        src={spinnerimg}
        className="d-block mx-auto"
        style={{ width: 50, height: 50 }}
      />
    </div>
  );
};

export default Spinner;
