import React, { useState } from "react";
import DeviceTable from "./components/DeviceTable";
import ErrorLog from "./components/ErrorLog";

export default function App() {
  const [activeTab, setActiveTab] = useState("devices");
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="text-white bg-red-800 p-4 rounded-t-md font-bold text-lg">
        PiSync Admin Dashboard
      </div>

      <div className="bg-white shadow p-4 rounded-b-md">
        <div className="flex border-b mb-4">
          <div className="flex-grow">
            <button
              className={`px-4 py-2 ${
                activeTab === "devices"
                  ? "border-b-2 border-red-600 font-semibold"
                  : ""
              }`}
              onClick={() => setActiveTab("devices")}
            >
              Device Management
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "errors"
                  ? "border-b-2 border-red-600 font-semibold"
                  : ""
              }`}
              onClick={() => setActiveTab("errors")}
            >
              Recent Errors
            </button>
          </div>
          <button
            onClick={handleRefresh}
            className="text-white hover:bg-blue-600 bg-blue-500 px-2 py-1 rounded mb-4"
          >
            Refresh
          </button>
        </div>

        {activeTab === "devices" ? (
          <DeviceTable refresh={refresh} />
        ) : (
          <ErrorLog refresh={refresh} />
        )}
      </div>
    </div>
  );
}
