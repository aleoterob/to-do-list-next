import { useSelector, useDispatch } from "react-redux";
import { HiBookmarkAlt } from "react-icons/hi";
import NewTask from "./NewTask";
import EditTask from "./EditTask";
import TodoTask from "./TodoTask";
import CompletedTask from "./CompletedTask";
import { RootState } from "../reduxStore";
import { persistor } from "../reduxPersist";
import {
  addTask,
  updateTask,
  toggleCheckbox,
  restoreTask,
  clearAllTasks,
  deleteTask,
} from "../lib/taskSlice";
import React, { useState, useEffect } from "react";

// Define an interface for the task object
interface Task {
  taskTitle: string;
  taskDescription: string;
  selectedDate: string | null;
  taskId: string;
}

const TodoList: React.FC = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isEditPopupVisible, setEditPopupVisible] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();

  const [todoCount, setTodoCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    const todoTasks = tasks.filter((task) => !task.isChecked).length;
    const completedTasks = tasks.filter((task) => task.isChecked).length;
    setTodoCount(todoTasks);
    setCompletedCount(completedTasks);
  }, [tasks]);

  const handleAddTaskClick = () => setPopupVisible(true);
  const handleClosePopup = () => {
    setPopupVisible(false);
    setEditPopupVisible(false);
  };

  const handleSaveTask = (
    taskTitle: string,
    taskDescription: string,
    selectedDate: string | null
  ) => {
    dispatch(addTask({ taskTitle, taskDescription, selectedDate }));
    setPopupVisible(false);
  };

  const handleEdit = (task: Task) => {
    setTaskToEdit(task);
    setEditPopupVisible(true);
  };

  const handleUpdateTask = (
    taskId: string,
    taskTitle: string,
    taskDescription: string,
    selectedDate: string | null
  ) => {
    dispatch(updateTask({ taskId, taskTitle, taskDescription, selectedDate }));
    setEditPopupVisible(false);
  };

  const handleMarkAsCompleted = (taskId: string) => {
    dispatch(toggleCheckbox({ id: taskId, isChecked: true }));
  };

  const handleRestoreTask = (taskId: string) => {
    dispatch(restoreTask({ id: taskId }));
  };

  const handleDeleteTask = (taskId: string) => {
    dispatch(deleteTask({ id: taskId }));
  };

  const handleClearPersistedData = () => {
    persistor.purge();
    dispatch(clearAllTasks());
  };

  return (
    <div className="flex flex-col max-w-[600px] w-full mx-auto justify-center items-center bg-transparent overflow-x-hidden mb-6  border rounded-xl border-gray-500/45 overflow-y-auto h-full">
      <div className="flex flex-row w-full justify-between items-center bg-azulJuztina py-4 px-6 overflow-y-auto ">
        <HiBookmarkAlt className="w-8 h-8 text-verdeAle" />
        <p className="font-montserrat pl-8 text-2xl font-light">Today</p>
        <div className="flex flex-row gap-4">
          <div className="flex justify-center items-center border border-red-500 py-1 px-3 text-red-500 count-todo">
            {todoCount}
          </div>
          <div className="flex justify-center items-center border border-green-600 py-1 px-3 text-green-600 count-completed">
            {completedCount}
          </div>
          <button
            className="bg-verdeAle/85 text-white font-bold py-2 px-4 rounded-full hover:bg-verdeAle/55 transition duration-300"
            onClick={handleAddTaskClick}
          >
            Add task
          </button>
        </div>
      </div>
      <div className="flex flex-row w-full justify-start bg-rojoTodoTask py-4 px-6 border-b border-gray-300/35">
        <p className="font-montserrat pl-2 text-2xl font-normal">To do tasks</p>
      </div>
      <div className="flex flex-col w-full  overflow-x-hidden max-h-[520px] md:max-h-[600px] lg:max-h-[600px] xl:max-h-[500px] overflow-y-visible scrollable-container">
        <NewTask
          isVisible={isPopupVisible}
          onClose={handleClosePopup}
          onSave={handleSaveTask}
        />

        <EditTask
          isVisible={isEditPopupVisible}
          onClose={handleClosePopup}
          onSave={handleUpdateTask}
          task={taskToEdit}
        />

        <div className="w-full">
          {tasks
            .filter((task) => !task.isChecked)
            .map((task) => (
              <TodoTask
                key={task.id}
                taskTitle={task.taskTitle}
                taskDescription={task.taskDescription}
                selectedDate={task.selectedDate}
                taskId={task.id}
                onMarkAsCompleted={handleMarkAsCompleted}
                onEdit={handleEdit}
              />
            ))}
        </div>
        <div className="flex flex-col w-full justify-start bg-green-600 border-b border-gray-300/75">
          <p className="font-montserrat pl-8 pb-4 pt-4 text-2xl font-normal border-b border-t border-gray-300/75 completed-tasks">
            Completed tasks
          </p>
          <div className="w-full">
            {tasks
              .filter((task) => task.isChecked)
              .map((task) => (
                <CompletedTask
                  key={task.id}
                  taskTitle={task.taskTitle}
                  taskDescription={task.taskDescription}
                  selectedDate={task.selectedDate}
                  taskId={task.id}
                  handleRestoreTask={handleRestoreTask}
                  handleDeleteTask={handleDeleteTask}
                />
              ))}
          </div>
        </div>
      </div>
      <div className="flex flex-row w-full justify-center py-4">
        <button
          onClick={handleClearPersistedData}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 font-montserrat font-normal"
        >
          Clear all persisted Data
        </button>
      </div>
    </div>
  );
};

export default TodoList;
