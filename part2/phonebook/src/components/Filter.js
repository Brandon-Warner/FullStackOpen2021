import React from "react";

const Filter = ({ newSearch, handleSearch }) => {
  return (
    <div>
      search: <input value={newSearch} onChange={handleSearch} />
    </div>
  );
};

export default Filter;
