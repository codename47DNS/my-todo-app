import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { setTheme } from "../store/todoSlice";
import { motion, AnimatePresence } from "framer-motion";

type ThemeStatusType = "dark" | "light" | "system";

function ThemeButton() {
	const [status, setStatus] = useState<ThemeStatusType>(
		(localStorage.getItem("isDark") ?? "system") as ThemeStatusType,
	);
	const dispatch = useDispatch<AppDispatch>();

	const handleBtn = () => {
		setStatus((prev) => {
			switch (prev) {
				case "dark":
					return "light";
				case "light":
					return "system";
				case "system":
					return "dark";
			}
		});
	};

	useEffect(() => {
		const html = document.querySelector("html")!;
		localStorage.setItem("isDark", status);
		let theme = "dark";

		if (
			status === "dark" ||
			(status === "system" &&
				window.matchMedia("(prefers-color-scheme: dark)").matches)
		)
			html.classList.add("dark");
		else {
			theme = "light";
			html.classList.remove("dark");
		}

		dispatch(setTheme(theme));
	}, [status]);

	return (
		<AnimatePresence>
			<button onClick={handleBtn} className="overflow-hidden h-10 w-10">
				<motion.img
					className="w-6"
					initial={{ opacity: 0, y: -300 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 300 }}
					key={status}
					{...((status === "dark" && {
						src: "icon-sun.svg",
						alt: "switch to light mode",
					}) ||
						(status === "light" && {
							src: "icon-computer.svg",
							alt: "switch to default system theme mode",
						}) ||
						(status === "system" && {
							src: "icon-moon.svg",
							alt: "switch to dark mode",
						}))}
				/>
			</button>
		</AnimatePresence>
	);
}

export default ThemeButton;
