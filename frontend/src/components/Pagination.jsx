import React, { useState, useContext } from 'react';
import { ProductContext } from '../App';

function Pagination({length  , itemsPerPage , handlePagination}) {
 const totalPages = Math.ceil(length / itemsPerPage);

  const paginationNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationNumbers.push(i);
  }
  return (
      <div className="flex justify-center mt-3">
    <ul class="flex items-center -space-x-px h-8 text-sm">
    {paginationNumbers.map((pageNumber) => (
        <li key={pageNumber}> <a class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer" onClick={() => handlePagination(pageNumber)} >
        {pageNumber}
      </a>
    </li>
    ))}

    </ul>

      </div>
 
  );
}

export default Pagination;
