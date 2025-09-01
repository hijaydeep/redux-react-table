import { useSelector } from "react-redux";
import TableRow from "./TableRow";
import UndoRedoButtons from "./UndoRedoButtons";
import HistoryLog from "./HistoryLog"; // Import the new component

const EditableTable = () => {
  const { history, currentIndex } = useSelector((state) => state.table);
  const tableData = history[currentIndex];

  return (
    // Use flexbox for a side-by-side layout
    <div style={{ padding: "20px", display: "flex", alignItems: 'flex-start', gap: "40px" }}>
      <div>
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
          <tbody>
            {tableData.map((row) => (
              <TableRow key={row.id} row={row} />
            ))}
          </tbody>
        </table>
      </div>
      <HistoryLog /> {/* Render the history log component */}
    </div>
  );
};

export default EditableTable;