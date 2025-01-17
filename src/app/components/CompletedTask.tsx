"use client";
import React, { useEffect } from "react";
import { gsap } from "gsap";

interface CompletedTaskProps {
  taskTitle: string;
  taskDescription: string;
  selectedDate: string | null;
  taskId: string;
  handleRestoreTask: (taskId: string) => void;
  handleDeleteTask: (taskId: string) => void;
}

const CompletedTask: React.FC<CompletedTaskProps> = ({
  taskTitle,
  taskDescription,
  selectedDate,
  taskId,
  handleRestoreTask,
  handleDeleteTask,
}) => {
  const handleRestore = () => {
    handleRestoreTask(taskId);
  };

  const handleDelete = () => {
    handleDeleteTask(taskId);
  };

  useEffect(() => {
    const taskElement = document.getElementById(`completed-task-${taskId}`);
    if (taskElement) {
      gsap.fromTo(
        taskElement,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }
      );
    }
  }, [taskId]);

  return (
    <div
      id={`completed-task-${taskId}`}
      className="flex flex-col max-w-[600px] w-full bg-green-500 py-4 px-6 border-b border-gray-300/75 mx-auto"
    >
      <div className="flex flex-col mb-4">
        <div className="w-full">
          <div className="font-montserrat text-xl font-normal task-title break-words">
            <span className="font-montserrat font-semibold">Task:</span>{" "}
            {taskTitle}
          </div>
          <div className="font-montserrat text-base font-light task-desc break-words pt-3">
            <span className="font-montserrat font-semibold">Description:</span>{" "}
            {taskDescription}
          </div>
          <div className="font-montserrat text-base font-light pt-3">
            <span className="font-montserrat font-semibold">Due date:</span>{" "}
            {selectedDate}
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-end gap-2">
        <button
          className="bg-green-600 hover:bg-green-700 border border-white/50 font-montserrat text-white py-1 px-3"
          onClick={handleRestore}
        >
          Restore
        </button>
        <button
          className="bg-green-600 hover:bg-rojoTodoTaskClaro border border-white/50 font-montserrat text-white py-1 px-3"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CompletedTask;
