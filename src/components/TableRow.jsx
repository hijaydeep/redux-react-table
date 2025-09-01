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
  
  // Function to commit the change
  const saveEdit = () => {
    // Only dispatch if the value has actually changed
    if (editing.value !== row[editing.field]) {
       dispatch(
        editCell({ id: row.id, field: editing.field, value: editing.value })
      );
    }
    setEditing({ field: null, value: "" });
  };


  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      saveEdit();
    } else if (e.key === "Escape") {
      setEditing({ field: null, value: "" });
    }
  };

  // NEW: Handle saving when the input loses focus
  const handleBlur = () => {
    saveEdit();
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
            onBlur={handleBlur} // Add this event handler
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
            onBlur={handleBlur} // Add this event handler
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