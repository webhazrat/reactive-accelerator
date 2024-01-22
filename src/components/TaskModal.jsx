import { useState } from "react";
import { toast } from "react-toastify";

export default function TaskModal({
  onShow,
  onAddTask,
  taskToUpdate,
  onUpdateTask,
}) {
  const initialTask = {
    title: "",
    description: "",
    tags: [],
    priority: "",
    isFavorite: false,
  };
  const [task, setTask] = useState(taskToUpdate || initialTask);

  const [isAdd, setIsAdd] = useState(Object.is(taskToUpdate, null));

  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === "tags") value = value.split(",");
    setTask({
      ...task,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title.trim()) {
      toast.error("Title is required");
    } else if (!task.description.trim()) {
      toast.error("Description is required");
    } else if (task.tags.length < 1) {
      toast.error("Tags is required");
    } else if (!task.priority.trim()) {
      toast.error("Priority is required");
    } else {
      if (isAdd) {
        onAddTask(task);
      } else {
        onUpdateTask(task);
        setIsAdd(true);
      }
      onShow();
    }
  };

  return (
    <>
      <div
        className="fixed left-0 top-0 z-10 h-screen w-full bg-black bg-opacity-70"
        onClick={onShow}
      ></div>
      <form
        onSubmit={handleSubmit}
        className="fixed left-1/2 top-1/2 z-10 mx-auto my-10 w-full max-w-[740px] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:my-20 lg:p-11"
      >
        <h2 className="mb-9 text-center text-2xl font-bold text-white lg:mb-11 lg:text-[28px]">
          {isAdd ? "Add New Task" : "Edit Task"}
        </h2>

        <div className="space-y-9 text-white lg:space-y-10">
          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="title">Title</label>
            <input
              className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
              type="text"
              name="title"
              id="title"
              value={task.title}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="description">Description</label>
            <textarea
              className="block min-h-[120px] w-full rounded-md bg-[#2D323F] px-3 py-2.5 lg:min-h-[180px]"
              type="text"
              name="description"
              value={task.description}
              onChange={handleChange}
              id="description"
            ></textarea>
          </div>
          <div className="grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20">
            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="tags">Tags</label>
              <input
                className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                type="text"
                name="tags"
                value={task.tags}
                onChange={handleChange}
                id="tags"
              />
            </div>
            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="priority">Priority</label>
              <select
                className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5"
                name="priority"
                value={task.priority}
                onChange={handleChange}
                id="priority"
              >
                <option value="">Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
        </div>
        <div className="mt-16 flex justify-center lg:mt-20">
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80"
          >
            {isAdd ? "Create new Task" : "Update Task"}
          </button>
        </div>
      </form>
    </>
  );
}
