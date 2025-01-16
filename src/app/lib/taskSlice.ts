import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task {
  id: string;
  taskTitle: string;
  taskDescription: string;
  selectedDate: string | null;
  isChecked: boolean;
}

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, "id" | "isChecked">>) => {
      const newTask: Task = {
        ...action.payload,
        id: `${Date.now()}`,
        isChecked: false,
      };
      state.tasks.push(newTask);
    },
    updateTask: (
      state,
      action: PayloadAction<{
        taskId: string;
        taskTitle: string;
        taskDescription: string;
        selectedDate: string | null;
      }>
    ) => {
      const { taskId, taskTitle, taskDescription, selectedDate } =
        action.payload;
      const existingTask = state.tasks.find((task) => task.id === taskId);
      if (existingTask) {
        existingTask.taskTitle = taskTitle;
        existingTask.taskDescription = taskDescription;
        existingTask.selectedDate = selectedDate;
      }
    },
    toggleCheckbox: (
      state,
      action: PayloadAction<{ id: string; isChecked: boolean }>
    ) => {
      const task = state.tasks.find((task) => task.id === action.payload.id);
      if (task) {
        task.isChecked = action.payload.isChecked;
      }
    },
    restoreTask: (state, action: PayloadAction<{ id: string }>) => {
      const task = state.tasks.find((task) => task.id === action.payload.id);
      if (task) {
        task.isChecked = false;
      }
    },
    deleteTask: (state, action: PayloadAction<{ id: string }>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
    },
    clearAllTasks: (state) => {
      state.tasks = [];
    },
  },
});

export const {
  addTask,
  updateTask,
  toggleCheckbox,
  restoreTask,
  deleteTask,
  clearAllTasks,
} = taskSlice.actions;

export default taskSlice.reducer;
