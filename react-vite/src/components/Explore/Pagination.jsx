import { useState } from "react";

const Pagination = ({ itemsPerPage, totalItems, onPageChange }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
      onPageChange(pageNumber);
    };

    return (
      <div className="pagination-container">
        <ul className="pagination">
          <li className={currentPage === 1 ? 'disabled' : ''} disabled={currentPage === 1 ? true : false}>
            <button onClick={() => handlePageChange(currentPage - 1)}>
              Previous
            </button>
          </li>
          {pageNumbers.map((number) => (
            <li key={number} className={currentPage === number ? 'active' : ''}>
              <button onClick={() => handlePageChange(number)}>
                {number}
              </button>
            </li>
          ))}
          <li className={currentPage === pageNumbers.length ? 'disabled' : ''} disabled={currentPage === pageNumbers.length ? true : false}>
            <button onClick={() => handlePageChange(currentPage + 1)}>
              Next
            </button>
          </li>
        </ul>
      </div>
    );
  };

export default Pagination;