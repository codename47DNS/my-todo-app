import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { TodoItem } from "./";
import { load, setFlag, setFlagStatus } from "../store/todoSlice";
import { closestCenter, DndContext, DragEndEvent, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function Items() {
  const currentTodos = useSelector<RootState, RootState["todos"]["current"]>(
    (state) => state.todos.current
  );
  const allTodos = useSelector<RootState, RootState["todos"]["all"]>(
    (state) => state.todos.all
  );
  const flagStatus = useSelector<RootState, RootState["flag"]>(state => state.flag);
  const dispatch = useDispatch();

  function getItemPos(id: string) {
    return allTodos.findIndex((todo) => todo.id === id);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over === null || active.id === over.id)
      return;

    const originalPos = getItemPos(active.id.toString());
    const newPos = getItemPos(over.id.toString());

    dispatch(load(arrayMove(allTodos, originalPos, newPos)));
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const flagItem = (color: string, id: string) => {
    console.log(color);
    dispatch(setFlag({ id: id, flag: color }));
    dispatch(setFlagStatus(
      { id: "", color: "" }
    ));
  }

  const flags = ["rgb(148,163,184)", "rgb(239,68,68)", "rgb(249,115,22)", "rgb(245,158,11)", "rgb(234,179,8)", "rgb(132,204,22)", "rgb(34,197,94)"];

  const labelRef = useRef<HTMLLabelElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);
  const [panelPosition, setPanelPosition] = useState({
    y: 0,
    isNegative: false
  });

  useEffect(() => {
    if (!labelRef.current || !flagStatus.color || !ulRef.current) {
      return;
    }

    const ulElem = ulRef.current;
    const scrollH = ulElem.offsetHeight + ulElem.scrollTop;
    const diff = scrollH - labelRef.current.offsetTop;
    const labelPos = labelRef.current.offsetTop;

    setPanelPosition({
      y: labelPos,
      isNegative: diff < 70
    });

  }, [flagStatus])

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
      sensors={sensors}
    >
      <AnimatePresence>
        <motion.ul
          className="relative mt-3 px-3 grow overflow-auto flex flex-col gap-3 py-2"
          ref={ulRef}
        >
          {flagStatus.color !== "" && <motion.div
            className={`bg-white absolute right-0 ${panelPosition.isNegative ? '-translate-y-10' : 'translate-y-10'} -translate-x-1/2 z-[51] w-fit overflow-hidden px-2 flex items-center gap-2 rounded-lg`}
            style={{ top: `${panelPosition.y}px` }}
            id="popbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {
              flags.map((color) =>
                <button style={{ "--flag-color": color } as any} onClick={() => flagItem(color, flagStatus.id)} key={color} className={`w-4 h-4 my-2 rounded-full duration-100 bg-[--flag-color] ${flagStatus.color === color ? `outline outline-1 outline-offset-2 outline-[--flag-color] shadow-md shadow-[--flag-color]` : ""}`}></button>)
            }
          </motion.div>}

          <SortableContext items={allTodos} strategy={verticalListSortingStrategy}>
            {currentTodos.length ? (
              [...currentTodos].reverse().map(
                (todo) =>

                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    ref={todo.id === flagStatus.id ? labelRef : null}
                  />
              )
            ) : (
              <div className="text-center text-2xl text-gray-700 font-bold dark:text-slate-400">
                <img className="w-60 mx-auto mb-5" src="nothing.gif" alt="Nothing to show" />
                Nothing to show here...
              </div>
            )}
          </SortableContext>
        </motion.ul>
      </AnimatePresence>
    </DndContext>
  );
}

export default Items;