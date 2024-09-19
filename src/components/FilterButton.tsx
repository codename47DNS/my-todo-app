import { useDispatch } from "react-redux";
import { filterTodos, setFilterType, InitialStateType } from "../store/todoSlice";
import { forwardRef, Ref } from "react";

type FilterButtonProps = {
	label: InitialStateType["filterType"];
	active: boolean;
};

const FilterButton = (
	{ label, active }: FilterButtonProps,
	ref: Ref<HTMLButtonElement> | null,
) => {
	const dispatch = useDispatch();

	const handleClickEvent = () => {
		dispatch(setFilterType(label));
		dispatch(filterTodos(label));
	};

	return (
		<button
			className={`uppercase font-bold text-sm font-mono duration-150 text-gray-600 px-4 py-2 ${active ? "dark:text-orange-300 text-violet-600" : "dark:hover:text-blue-400 hover:text-green-600 text-gray-600 dark:text-white"}`}
			onClick={handleClickEvent}
			{...((ref && { ref: ref }) || {})}
		>
			{label}
		</button>
	);
};

export default forwardRef(FilterButton);
