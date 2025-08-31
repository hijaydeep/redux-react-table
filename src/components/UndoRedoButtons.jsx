import { useDispatch, useSelector } from "react-redux";
import { undo, redo } from "../redux/tableSlice";

const UndoRedoButtons = () => {
  const dispatch = useDispatch();
  const { currentIndex, history } = useSelector((state) => state.table);

  return (
    <div style={{ marginBottom: "10px" }}>
      <button onClick={() => dispatch(undo())} disabled={currentIndex === 0}>
        Undo
      </button>
      <button
        onClick={() => dispatch(redo())}
        disabled={currentIndex === history.length - 1}
      >
        Redo
      </button>
    </div>
  );
};

export default UndoRedoButtons;
