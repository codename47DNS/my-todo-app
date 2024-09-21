import { ChangeEvent, useState } from "react";
import { DataIcon, ImportIcon, ExportIcon } from "./";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { importData as importTodoData, setTheme, TodoType } from "../store/todoSlice";

function DataTray() {
  const [dataTray, setDataTray] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const importData = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files;

    if (!file || file[0].type !== "application/json")
      return;

    const reader = new FileReader();
    reader.readAsText(file[0]);

    reader.onload = () => {
      const data = JSON.parse(reader.result as string) as { todos: TodoType[], theme: string };

      dispatch(importTodoData(data.todos));
      dispatch(setTheme(data.theme));

      setDataTray(false);
    };

  };

  const exportData = () => {
    setDataTray(false);
    const theme = localStorage.getItem("isDark") ?? "system";
    const todos = JSON.parse(localStorage.getItem("todos-app") ?? "[]");

    const data = {
      todos: Array.isArray(todos) ? todos : [],
      theme
    };

    const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "my-todos.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <label className="relative h-10 w-10 ml-auto flex items-center">
      <input type="checkbox" className="cursor-pointer opacity-0 absolute inset-0 peer appearance-none checked:fixed bg-black checked:opacity-30 checked:z-40" checked={dataTray} onChange={() => setDataTray(!dataTray)} />
      <DataIcon className="text-white" />

      <div className="rounded-md h-0 absolute translate-y-full -translate-x-1/3 left-0 overflow-hidden peer-checked:h-fit opacity-0 peer-checked:opacity-100 duration-200 shadow-lg z-50 shadow-gray-500 bg-white font-mono">
        <button className="flex items-center gap-3 pe-3 border-blue-100 border-b hover:bg-blue-100 duration-200 cursor-default relative">
          <ImportIcon height="18px" className="p-2 box-content" /> Import
          <input type="file" className="appearance-none absolute inset-0 opacity-0" accept="application/json" onChange={importData} />
        </button>
        <button className="flex items-center gap-3 pe-3 hover:bg-blue-100 duration-200 cursor-pointer" onClick={exportData}>
          <ExportIcon height="18px" className="p-2 box-content" /> Export
        </button>
      </div>
    </label>
  );
}

export default DataTray;