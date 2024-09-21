import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";

export type TodoType = {
	id: string;
	title: string;
	active: boolean;
	star: boolean;
	flag: string;
};

export type InitialStateType = {
	todos: {
		current: TodoType[];
		all: TodoType[];
	};
	update: Pick<TodoType, "id" | "title">;
	filterType: "all" | "active" | "completed" | "starred" | null;
	theme: string;
	flag: {
		color: string,
		id: string
	}
};

const initialState: InitialStateType = {
	todos: {
		current: [],
		all: [],
	},
	update: {
		id: "",
		title: "",
	},
	filterType: null,
	theme: "light",
	flag: {
		color: "",
		id: ""
	}
};

const todoSlice = createSlice({
	name: "todo",
	initialState,
	reducers: {
		addTodo: (state, action: PayloadAction<string>) => {
			const todo: TodoType = {
				id: nanoid(),
				title: action.payload,
				active: false,
				star: false,
				flag: "rgb(148,163,184)",
			};
			state.todos.all.push(todo);
		},
		removeTodo: (state, action: PayloadAction<string>) => {
			state.todos.all = state.todos.all.filter(
				(todo) => todo.id !== action.payload,
			);
		},
		updateTodo: (state, action: PayloadAction<InitialStateType["update"]>) => {
			state.todos.all = state.todos.all.map((todo) =>
				todo.id === action.payload.id
					? { ...todo, title: action.payload.title }
					: todo,
			);
		},
		load: (state, action: PayloadAction<TodoType[]>) => {
			state.todos.all = action.payload;
		},
		toggleActive: (state, action: PayloadAction<string>) => {
			state.todos.all = state.todos.all.map((todo) =>
				todo.id === action.payload ? { ...todo, active: !todo.active } : todo,
			);
		},
		setUpdate: (state, action: PayloadAction<InitialStateType["update"]>) => {
			state.update = action.payload;
		},
		filterTodos: (
			state,
			action: PayloadAction<InitialStateType["filterType"]>,
		) => {
			switch (action.payload) {
				case "active":
					state.todos.current = state.todos.all.filter((todo) => !todo.active);
					break;
				case "completed":
					state.todos.current = state.todos.all.filter((todo) => todo.active);
					break;
				case "starred":
					state.todos.current = state.todos.all.filter((todo) => todo.star);
					break;
				default:
					state.todos.current = state.todos.all;
					break;
			}
		},
		setFilterType: (state, action: PayloadAction<InitialStateType["filterType"]>) => {
			state.filterType = action.payload;
		},
		setTheme: (state, action: PayloadAction<string>) => {
			state.theme = action.payload;
		},
		toggleStar: (state, action: PayloadAction<string>) => {
			state.todos.all = state.todos.all.map((todo) =>
				todo.id === action.payload ? { ...todo, star: !todo.star } : todo,
			);
		},
		setFlag: (state, action: PayloadAction<Pick<TodoType, "id" | "flag">>) => {
			state.todos.all = state.todos.all.map((todo) =>
				todo.id === action.payload.id ? { ...todo, flag: action.payload.flag } : todo
			)
		},
		setFlagStatus: (state, action: PayloadAction<{ color: string, id: string }>) => {
			state.flag = {
				color: action.payload.color,
				id: action.payload.id
			}
		},
		importData: (state, action: PayloadAction<TodoType[]>) => {
			const data = action.payload.filter(todo => {
				let status = true;

				for (let x of state.todos.all) {
					if (x.id === todo.id) {
						status = false;
						break;
					}
				}

				return status;
			});

			state.todos.all = state.todos.all.concat(data);
		},
	},
});

const {
	addTodo,
	removeTodo,
	updateTodo,
	load,
	toggleActive,
	setUpdate,
	filterTodos,
	setFilterType,
	setTheme,
	toggleStar,
	setFlag,
	setFlagStatus,
	importData
} = todoSlice.actions;

export default todoSlice.reducer;
export {
	addTodo,
	removeTodo,
	updateTodo,
	load,
	toggleActive,
	setUpdate,
	filterTodos,
	setFilterType,
	setTheme,
	toggleStar,
	setFlag,
	setFlagStatus,
	importData
};
