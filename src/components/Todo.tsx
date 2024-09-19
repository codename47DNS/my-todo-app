import { RootState, AppDispatch } from "../store/store";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { load, filterTodos, setFilterType } from "../store/todoSlice";
import { FilterButton, Header, Items } from "./";


function Todo() {
	// FIXME: Optimize code contains allTodos etc
	const allTodos = useSelector<RootState, RootState["todos"]["all"]>(
		(state) => state.todos.all
	);
	const currentTodos = useSelector<RootState, RootState["todos"]["current"]>(
		(state) => state.todos.current
	);

	const filterType = useSelector<RootState, RootState["filterType"]>(
		(state) => state.filterType
	);

	type FilterButtonType = typeof filterType;
	const hasMounted = useRef(false);
	const [tabActive, setTabActive] = useState({
		pos: 0,
		width: 0,
	});
	const filterButton = useRef<HTMLButtonElement | null>(null);

	const dispatch = useDispatch<AppDispatch>();
	const filterButtons: (NonNullable<FilterButtonType>)[] = ["all", "active", "completed", "starred"];

	useEffect(() => {
		if (!hasMounted.current) {
			hasMounted.current = true;

			const data = JSON.parse(localStorage.getItem("todos-app") ?? "[]");

			if (Array.isArray(data) && data.length) dispatch(load(data));
		}

	}, [allTodos]);

	useEffect(() => {
		let filter = filterType ?? "all";

		if (!filterType) {
			const data: FilterButtonType | "null" = localStorage.getItem("filterType") as FilterButtonType | "null" ?? "all";

			if (data !== "null")
				filter = data;

			dispatch(setFilterType(filter));
		}

		else
			localStorage.setItem("filterType", filter);
	}, [filterType]);

	useEffect(() => {
		localStorage.setItem("todos-app", JSON.stringify(allTodos));

		if (filterType)
			dispatch(filterTodos(filterType));
	}, [allTodos]);

	useEffect(() => {
		if (!filterButton.current) return;

		setTabActive({
			width: filterButton.current.clientWidth,
			pos: filterButton.current.offsetLeft,
		});
	}, [filterType]);

	return (
		<div className="min-w-[375px] flex h-full flex-col gap-5 bg-white dark:bg-slate-700">
			<Header />

			<div className="w-full max-w-4xl grow flex flex-col min-w-[240px] shadow-2xl mx-auto rounded-md overflow-hidden mb-3 min-h-96">
				<Items />

				<div className="flex flex-wrap items-center w-full dark:bg-slate-600 bg-gray-200 rounded-t-lg mt-2">
					<div
						style={
							{
								"--pos": `${tabActive.pos}px`,
								"--width": `${tabActive.width}px`,
							} as any
						}
						className={`before:duration-200 before:content-[''] before:absolute before:border-b-2 before:border-violet-600 dark:before:border-orange-300 before:bottom-0 before:w-6 relative ${tabActive ? `before:left-[--pos] before:w-[--width]` : ""
							} `}
					>
						{filterButtons.map((filter) => (
							<FilterButton
								key={filter}
								label={filter}
								ref={filter === filterType ? filterButton : null}
								active={filterType === filter}
							/>
						))}
					</div>

					<span className="capitalize ms-auto px-3 py-3 dark:text-white text-gray-600 w-full sm:w-fit text-center">
						{filterType === "all" ? "items" : filterType} : {currentTodos.length}
					</span>
				</div>

				<div className={`mt-5 px-4 py-3 dark:border-slate-600 border-slate-300 border-t mx-auto w-fit text-center text-sm text-gray-400 ${currentTodos.length > 1 ? "opacity-100" : "opacity-0"}`}>
					Drag and drop to reorder list
				</div>
			</div>


		</div>
	);
}

export default Todo;
