import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ErrorLog({ refresh }) {
  const [errors, setErrors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  const fetchErrors = async (page = 1) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/errors?page=${page}&limit=${limit}`
      );
      setErrors(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Error fetching errors:", error);
      setErrors([]);
    }
  };

  useEffect(() => {
    fetchErrors(currentPage);
  }, [refresh, currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  return (
    <div>
      <h2 className="mb-2 font-semibold text-gray-700">Recent Sync Failures</h2>
      <table className="min-w-full border rounded text-sm text-left">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="p-2 border">Device ID</th>
            <th className="p-2 border">Error Message</th>
            <th className="p-2 border">Last Attempt</th>
          </tr>
        </thead>
        <tbody>
          {errors.map((error) => (
            <tr key={error.id} className="border-b">
              <td className="p-2 border">{error.id}</td>
              <td className="p-2 border">{error.error}</td>
              <td className="p-2 border">
                {new Date(error.lastSync).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
