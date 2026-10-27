"use client";

import React from "react";

export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export interface TaskItemProps {
  task: Task;
  onRemove: (id: number) => void;
  onToggle: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onRemove, onToggle }) => {
  return (
    <div className="task-item">
      <input
        type="checkbox"
        className="task-item-checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <span
        className="task-item-text"
        style={{
          textDecoration: task.completed ? "line-through" : "none",
        }}
      >
        {task.text}
      </span>
      <button
        className="task-item-remove-button"
        onClick={() => onRemove(task.id)}
      >
        Remove
      </button>
    </div>
  );
};

export default TaskItem;
