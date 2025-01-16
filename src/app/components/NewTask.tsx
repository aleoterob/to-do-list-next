"use client";
import React, { useState, useEffect } from "react";

interface NewTaskProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: (
    taskTitle: string,
    taskDescription: string,
    selectedDate: string | null
  ) => void;
}

const NewTask: React.FC<NewTaskProps> = ({ isVisible, onClose, onSave }) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!isVisible) {
      // Reset fields when the popup is closed
      setTaskTitle("");
      setTaskDescription("");
      setSelectedDate(null);
      setError("");
    }
  }, [isVisible]);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const handleCancel = () => {
    onClose();
  };

  const handleSave = () => {
    if (taskTitle.trim() === "") {
      setError("Task name cannot be empty");
      return;
    }
    onSave(taskTitle, taskDescription, selectedDate);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 transform transition-opacity duration-300 opacity-100">
        <h2 className="text-xl font-semibold mb-4 text-gray-600">
          Add a New Task
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Task name"
          className="w-full p-2 border rounded mb-4 text-gray-600"
          value={taskTitle}
          onChange={(e) => {
            setTaskTitle(e.target.value);
            setError(""); // Reset error message when the user starts typing
          }}
        />
        <textarea
          placeholder="Task description"
          className="w-full p-2 border rounded mb-4 text-gray-600"
          rows={4}
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        ></textarea>
        <div className="mb-4">
          <button
            className="bg-transparent text-black py-2 transition font-montserrat font-normal"
            onClick={() => setSelectedDate(null)}
          >
            {selectedDate ? `Change Date: ${selectedDate}` : "Select due date"}
          </button>
          <input
            type="date"
            className="mt-2 block w-full p-2 border rounded text-gray-600"
            value={selectedDate || ""}
            onChange={handleDateChange}
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="bg-verdeAle text-white py-2 px-4 rounded hover:bg-verdeAle/75 transition"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewTask;
