import { useState } from "react";
import { useDispatch } from "react-redux";
import { editCell } from "../redux/tableSlice";

const TableRow = ({ row }) => {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState({ field: null, value: "" });

  const handleDoubleClick = (field) => {
    setEditing({ field, value: row[field] });
  };

  const handleChange = (e) => {
    setEditing({ ...editing, value: e.target.value });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      dispatch(
        editCell({ id: row.id, field: editing.field, value: editing.value })
      );
      setEditing({ field: null, value: "" });
    } else if (e.key === "Escape") {
      setEditing({ field: null, value: "" });
    }
  };

  return (
    <tr>
      <td>{row.id}</td>
      <td onDoubleClick={() => handleDoubleClick("name")}>
        {editing.field === "name" ? (
          <input
            type="text"
            value={editing.value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          row.name
        )}
      </td>
      <td onDoubleClick={() => handleDoubleClick("email")}>
        {editing.field === "email" ? (
          <input
            type="text"
            value={editing.value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          row.email
        )}
      </td>
    </tr>
  );
};

export default TableRow;
