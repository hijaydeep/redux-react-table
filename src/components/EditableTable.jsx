import { useSelector } from "react-redux";
import TableRow from "./TableRow";
import UndoRedoButtons from "./UndoRedoButtons";

const EditableTable = () => {
  const { history, currentIndex } = useSelector((state) => state.table);
  const tableData = history[currentIndex];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Editable Redux Table (Undo / Redo)</h2>
      <UndoRedoButtons />
      <table
        border="1"
        cellPadding="10"
        style={{ borderCollapse: "collapse", marginTop: "10px" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name (Double Click to Edit)</th>
            <th>Email (Double Click to Edit)</th>
          </tr>
        </thead>
        {/* <tbody>
          {tableData.map((row) => (
            <TableRow key={row.id} row={row} />
          ))}
        </tbody> */}
      </table>
    </div>
  );
};

export default EditableTable;
