import React, { useEffect, useState } from "react";
import axios from "axios";

const statusIcons = {
  Success: "✅",
  Failed: "❌",
  Pending: "⏳",
};

export default function DeviceTable({ refresh }) {
  const [devices, setDevices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const devicesPerPage = 5;

  const fetchDevices = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/devices?page=${currentPage}&limit=${devicesPerPage}`
      );
      setDevices(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Error fetching devices", error);
    }
  };

  const handleSync = async (id) => {
    try {
      await axios.post("http://localhost:5000/api/sync", { id });
      setTimeout(() => {
        fetchDevices();
      }, 5500);
    } catch (error) {
      console.error("Sync failed", error);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, [refresh, currentPage]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border rounded text-sm text-left">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="p-2 border">Device ID</th>
            <th className="p-2 border">Last Sync Time</th>
            <th className="p-2 border">Sync Status</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device) => (
            <tr key={device.id} className="border-b">
              <td className="p-2 border">{device.id}</td>
              <td className="p-2 border">
                {new Date(device.lastSync).toLocaleString()}
              </td>
              <td className="p-2 border">
                {statusIcons[device.status]} {device.status}
              </td>
              <td className="p-2 border">
                <button
                  onClick={() => handleSync(device.id)}
                  className="text-white hover:bg-blue-600 bg-blue-500 px-2 py-1 rounded"
                >
                  Sync Now
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
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
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
