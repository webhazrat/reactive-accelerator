import { useState } from "react";
import NoTaskFound from "./NoTaskFound";
import TaskActions from "./TaskActions";
import TaskItem from "./TaskItem";
import TaskList from "./TaskList";
import TaskSearch from "./TaskSearch";
import TaskModal from "./TaskModal";

const initialTasks = [
  {
    id: crypto.randomUUID(),
    title: "Integration API",
    description:
      "Connect an existing API to a third-party database using secure methods and handle data exchange efficiently.",
    tags: ["Web", "API", "Python"],
    priority: "High",
    isFavorite: true,
  },
  {
    id: crypto.randomUUID(),
    title: "API Data Synchronization with Python",
    description:
      "Implement a Python solution to synchronize data between an API and a third-party database securely, optimizing data exchange",
    tags: ["Python", "API", "Data Synchronization"],
    priority: "High",
    isFavorite: false,
  },
  {
    id: crypto.randomUUID(),
    title: "Efficient Web API Connectivity in Python",
    description:
      "Develop a Python-based solution for connecting an API to a third-party database securely, focusing on efficient data handling and exchange.",
    tags: ["Web", "API", "Python"],
    priority: "High",
    isFavorite: false,
  },
  {
    id: crypto.randomUUID(),
    title: "Data Handling",
    description:
      "Integrate a web API with a third-party database using secure methods, focusing on seamless data exchange and data integrity.",
    tags: ["Web", "Security", "Python"],
    priority: "High",
    isFavorite: false,
  },
];

export default function TaskBoard() {
  const [tasks, setTasks] = useState(initialTasks);
  const [showModal, setShowModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  const handleAddTask = (task) => {
    setTasks([
      ...tasks,
      {
        id: crypto.randomUUID(),
        ...task,
      },
    ]);
  };

  const handleEditTask = (task) => {
    setTaskToUpdate(task);
    setShowModal(true);
  };

  const handleUpdateTask = (newTask) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === newTask.id) {
          return newTask;
        }
        return task;
      })
    );
  };

  const handleDeleteTask = (taskId) => {
    if (confirm("Are you sure to remove?")) {
      const nextTasks = tasks.filter((t) => t.id !== taskId);
      setTasks(nextTasks);
    }
  };

  const handleDeleteAllTask = () => {
    if (confirm("Are you sure to remove?")) {
      tasks.length = 0;
      setTasks([...tasks]);
    }
  };

  const handleSearch = (keyword) => {
    const filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(keyword.toLowerCase())
    );
    setTasks(filtered);
  };

  return (
    <section className="mb-20" id="tasks">
      <div className="container">
        <TaskSearch onSearch={handleSearch} />

        {showModal && (
          <TaskModal
            onShow={() => {
              setShowModal(!showModal);
              setTaskToUpdate(null);
            }}
            onAddTask={handleAddTask}
            taskToUpdate={taskToUpdate}
            onUpdateTask={handleUpdateTask}
          />
        )}

        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskActions
            onShow={() => setShowModal(!showModal)}
            onDeleteAll={handleDeleteAllTask}
          />
          <TaskList>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onEdit={() => handleEditTask(task)}
                  onUpdate={() =>
                    handleUpdateTask({ ...task, isFavorite: !task.isFavorite })
                  }
                  onDelete={() => handleDeleteTask(task.id)}
                />
              ))
            ) : (
              <NoTaskFound />
            )}
          </TaskList>
        </div>
      </div>
    </section>
  );
}
