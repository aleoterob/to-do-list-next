"use client";
import React, { useEffect } from "react";
import { gsap } from "gsap";

// Define an interface for the task object
interface Task {
  taskTitle: string;
  taskDescription: string;
  selectedDate: string | null;
  taskId: string;
}

interface TodoTaskProps {
  taskTitle: string;
  taskDescription: string;
  selectedDate: string | null;
  taskId: string;
  className?: string;
  onMarkAsCompleted: (taskId: string) => void;
  onEdit: (task: Task) => void;
}

const TodoTask: React.FC<TodoTaskProps> = ({
  taskTitle,
  taskDescription,
  selectedDate,
  taskId,
  className,
  onMarkAsCompleted,
  onEdit,
}) => {
  const handleComplete = () => {
    const taskElement = document.getElementById(`task-${taskId}`);
    if (taskElement) {
      gsap.to(taskElement, {
        x: 100,
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          onMarkAsCompleted(taskId);
        },
      });
    }
  };

  useEffect(() => {
    const taskElement = document.getElementById(`task-${taskId}`);
    if (taskElement) {
      gsap.fromTo(
        taskElement,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }
      );
    }
  }, [taskId]);

  const handleEditClick = () => {
    onEdit({ taskTitle, taskDescription, selectedDate, taskId });
  };

  return (
    <div
      id={`task-${taskId}`}
      className={`flex flex-col max-w-[600px] w-full bg-rojoTodoTask/85 py-4 px-6 border-b border-gray-500/35 mx-auto ${className}`}
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
          className="bg-rojoTodoTaskClaro font-montserrat font-normal text-white border border-white/50 py-1 px-3 hover:bg-rojoTodoTask transition duration-300"
          onClick={handleComplete}
        >
          Completed
        </button>
        <button
          className="bg-rojoTodoTaskClaro font-montserrat font-normal text-white border border-white/50 py-1 px-3 hover:bg-rojoTodoTask transition duration-300"
          onClick={handleEditClick}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default TodoTask;
