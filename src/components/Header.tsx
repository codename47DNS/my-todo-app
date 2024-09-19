import { ChangeEvent, KeyboardEvent, useRef } from "react";
import { ThemeButton } from "./";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { AppDispatch, RootState } from "../store/store";
import { updateTodo, addTodo, setUpdate } from "../store/todoSlice";

function Header() {
	const [title, setTitle] = useState<string>("");
	const dispatch = useDispatch<AppDispatch>();
	const update = useSelector<RootState, RootState["update"]>(
		(state) => state.update,
	);
	const prevTitle = useRef("");
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (update.id && update.title) {
			prevTitle.current = title;

			inputRef.current && inputRef.current.focus();
		}

		setTitle(update.id && update.title ? update.title : prevTitle.current);
	}, [update]);

	const handleInput = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key.match(/enter/i)) {
			if (update.id && update.title) {
				dispatch(
					updateTodo({
						id: update.id,
						title: title || update.title,
					}),
				);

				dispatch(
					setUpdate({
						id: "",
						title: "",
					}),
				);
			} else title.length && dispatch(addTodo(title)) && setTitle("");
		}

		else if (e.key.match(/esc/i)) {
			dispatch(
				setUpdate({
					id: "",
					title: "",
				}),
			);
			prevTitle.current = prevTitle.current || "";
		}
	};

	return (
		<header className="flex w-full justify-center bg-[url('bg-desktop-light.jpg')] dark:bg-[url('bg-desktop-dark.jpg')] bg-cover bg-no-repeat py-12">
			<div className="w-full min-w-[240px] px-8 max-w-2xl py-5">
				<div className="mb-8 flex justify-between">
					<h1 className="text-4xl font-semibold text-white">TODO</h1>
					<ThemeButton />
				</div>

				<div className="flex">
					<div
						className={
							"p-2 text-white " +
							(update.id && update.title ? "bg-green-400" : "bg-red-400")
						}
					>
						{update.id && update.title ? "UPDATE" : "ADD"}
					</div>
					<input
						type="text"
						value={title}
						ref={inputRef}
						autoFocus={update.id !== ""}
						onInput={(e: ChangeEvent<HTMLInputElement>) => {
							setTitle(e.currentTarget.value);
						}}
						onKeyUp={handleInput}
						className={`w-full border-2 px-2 text-gray-500 duration-150 focus:outline-violet-500 ${update.id && update.title ? "border-green-400" : "border-red-400"}`}
						placeholder="TODO"
					/>
				</div>
			</div>
		</header>
	);
}

export default Header;
