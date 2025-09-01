import { useSelector } from "react-redux";

const HistoryLog = () => {
  const { actions, currentIndex } = useSelector((state) => state.table);

  // We only want to show the actions that have led to the currently visible table state
  const displayedActions = actions.slice(0, currentIndex);

  return (
    <div
      style={{
        marginTop: "30px",
        textAlign: "left",
        border: "1px solid #ccc",
        padding: "15px",
        width: "400px",
        height: "fit-content",
      }}
    >
      <h3>Action History</h3>
      {displayedActions.length === 0 ? (
        <p>No actions have been performed yet.</p>
      ) : (
        <ol style={{ paddingLeft: "20px", margin: 0, listStyleType: "decimal" }}>
          {displayedActions.map((action, index) => (
            <li key={index} style={{ marginBottom: "5px" }}>
              {action}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default HistoryLog;