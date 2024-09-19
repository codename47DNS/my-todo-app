import { ForwardedRef, forwardRef, useId } from "react";
import { AppDispatch, RootState } from "../store/store";
import {
	TodoType,
	toggleActive
} from "../store/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import { DragIcon, IconButton, TodoItemToolbar, CheckIcon } from "./";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";

type TodoItemType = {
	todo: TodoType;
};

function TodoItem({ todo }: TodoItemType, ref: ForwardedRef<HTMLLabelElement>) {
	const dispatch = useDispatch<AppDispatch>();
	const updateId = useSelector<RootState, RootState["update"]["id"]>(
		(state) => state.update.id,
	);
	const id = useId();
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
		id: todo.id
	});

	const activeTodoHandler = () => {
		dispatch(toggleActive(todo.id));
	};

	const style = {
		transform: CSS.Translate.toString(transform),
		transition
	};

	return (
		<motion.li
			ref={setNodeRef}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			style={{
				...style,
				"--flag-color": todo.flag,
				zIndex: isDragging ? 2 : undefined,
			} as any}
			className={`${todo.id === updateId ? "duration-200 bg-orange-100 dark:bg-slate-800" : "dark:bg-black/10 bg-gray-100"} flex gap-1 rounded-md group touch-none ${isDragging ? "bg-blue-100 dark:bg-slate-800 shadow-blue-100 dark:shadow-slate-500 shadow-md" : ""} p-3 ps-0 border-l-8 border-[--flag-color]`}
		>
			<IconButton
				className="dark:text-gray-200 focus:dark:text-gray-300 text-gray-400 text-center cursor-move group-hover:opacity-100 duration-200 opacity-0 focus:text-gray-500 h-fit w-fit"
				{...attributes}
				{...listeners}
			>
				<DragIcon width="30px" height="30px" />
			</IconButton>

			<div className="w-7 h-7 relative rounded-lg border border-[--flag-color]">
				<input
					className="absolute inset-x-0 inset-y-0 cursor-pointer peer z-10 opacity-0"
					type="checkbox"
					checked={todo.active}
					onChange={activeTodoHandler}
					id={id}
				/>
				<CheckIcon className="rounded-lg block duration-200 peer-checked:text-[--flag-color] text-black/0 relative -top-2 right-0" width="36px" height="36px" />
			</div>

			<label
				htmlFor={id}
				className={`text-lg grow ${todo.active ? "line-through dark:text-red-300 text-gray-500" : "dark:text-white"} duration-200 select-none -ms-8 indent-11 leading-8 break-words text-justify overflow-auto font-medium -translate-y-[2px]`}
				ref={ref}
			>
				{todo.title}
			</label>

			<TodoItemToolbar todo={todo} updateId={updateId} />
		</motion.li>
	);
};

export default forwardRef(TodoItem);
