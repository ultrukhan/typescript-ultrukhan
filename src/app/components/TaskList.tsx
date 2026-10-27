"use client";

import React, { useState, useEffect } from "react";
import TaskItem, { Task } from "./TaskItem";

export interface TaskListProps {
  tasks?: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const [taskList, setTaskList] = useState<Task[]>(() => {
    if (tasks && tasks.length > 0) {
      return tasks;
    }
    if (typeof window !== "undefined") {
      const storedTasks = window.localStorage.getItem("tasks");
      if (storedTasks) {
        try {
          return JSON.parse(storedTasks) as Task[];
        } catch {
          return [];
        }
      }
    }
    return tasks ?? [];
  });

  const [newTaskText, setNewTaskText] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("tasks", JSON.stringify(taskList));
    }
  }, [taskList]);

  const handleAddTask = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!newTaskText.trim()) {
      return;
    }
    const newTask: Task = {
      id: Date.now(),
      text: newTaskText.trim(),
      completed: false,
    };
    setTaskList((prevTasks) => [...prevTasks, newTask]);
    setNewTaskText("");
  };

  const handleRemoveTask = (id: number): void => {
    setTaskList((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleToggleTask = (id: number): void => {
    setTaskList((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="task-list">
      <h1 className="task-list-title">Task List</h1>
      {taskList.length === 0 ? (
        <p className="task-list-empty">No tasks to display</p>
      ) : (
        taskList.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onRemove={handleRemoveTask}
            onToggle={handleToggleTask}
          />
        ))
      )}
      <form className="add-task-form" onSubmit={handleAddTask}>
        <input
          type="text"
          className="add-task-input"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Add a new task"
        />
        <button type="submit" className="add-task-button">
          Add
        </button>
      </form>
    </div>
  );
};

export default TaskList;
