import { UpdateDisableIcon, UpdateIcon, DeleteIcon, CopyIcon, StarIcon, CheckIcon, IconButton, BookmarkIcon } from "./";
import useCopy from "../hooks/useCopy";
import { useDispatch, useSelector } from "react-redux";
import {
  removeTodo,
  setUpdate,
  TodoType,
  toggleStar,
  setFlagStatus
} from "../store/todoSlice";
import { AppDispatch, RootState } from "../store/store";
import { ChangeEvent } from "react";

type TodoItemToolbarType = {
  todo: TodoType;
  updateId: string;
}

function TodoItemToolbar({ todo, updateId }: TodoItemToolbarType) {
  const dispatch = useDispatch<AppDispatch>();

  const [copyStatus, copy] = useCopy(1000);
  const flagId = useSelector<RootState, RootState["flag"]["id"]>(state => state.flag.id);

  const deleteButtonHandler = () => {
    dispatch(removeTodo(todo.id));
  };

  const starTodoHandler = () => {
    dispatch(toggleStar(todo.id));
  };
  const flagButtonHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFlagStatus(
      e.target.checked ? { id: todo.id, color: todo.flag } :
        { id: "", color: "" }
    ));
  }

  const updateButtonHandler = () => {
    if (updateId) {
      dispatch(setUpdate({ id: "", title: "" }));
      return;
    }
    dispatch(
      setUpdate({
        id: todo.id,
        title: todo.title,
      }),
    );
  };

  return (
    <div className="flex items-end pb-1">
      <IconButton className="px-1 relative overflow-hidden" onClick={() => { copy(todo.title); }}>
        <CheckIcon className={`text-green-400 dark:text-yellow-300 duration-300 absolute ${copyStatus ? "opacity-100 scale-100 rotate-0 " : "opacity-0 scale-[2] rotate-[-50deg]"}`}></CheckIcon>
        <CopyIcon className={`z-10 opacity-0 ${copyStatus ? "" : "group-hover:opacity-100"} duration-300 text-blue-400`}></CopyIcon>
      </IconButton>

      {!todo.active && (
        <IconButton
          className="px-1"
          onClick={updateButtonHandler}
          isMotion={true}

        >
          {todo.id === updateId ? (
            <UpdateDisableIcon className="text-lime-400 duration-100" />
          ) : (
            <UpdateIcon className="text-rose-400 opacity-0 group-hover:opacity-100 duration-100" />
          )}
        </IconButton>
      )}

      <IconButton className="px-1 relative">
        <input type="checkbox" className={`${flagId === todo.id ? "fixed bg-black/20 opacity-100 z-50" : "absolute"} appearance-none top-0 left-0 right-0 bottom-0 opacity-0 peer/bookmark cursor-pointer`} checked={flagId === todo.id} onChange={flagButtonHandler} />
        <BookmarkIcon className="stroke-[--flag-color] stroke-[70px] text-transparent duration-100 opacity-0 peer-checked/bookmark:opacity-100 group-hover:opacity-100"></BookmarkIcon>
      </IconButton>

      <IconButton className="px-1 relative">
        <input type="checkbox" className="absolute top-0 left-0 right-0 bottom-0 opacity-0 peer/star cursor-pointer" onChange={starTodoHandler} checked={todo.star} />
        <StarIcon className="dark:stroke-orange-300 stroke-orange-400 peer-checked/star:text-orange-400 stroke-[70px] text-transparent peer-checked/star:dark:text-orange-300 duration-100 opacity-0 peer-checked/star:opacity-100 group-hover:opacity-100"></StarIcon>
      </IconButton>

      {todo.id !== updateId && (
        <IconButton
          className="px-1 text-red-400 duration-100 opacity-0 group-hover:opacity-100"
          onClick={deleteButtonHandler}
        >
          <DeleteIcon />
        </IconButton>
      )}
    </div>
  );
}

export default TodoItemToolbar;