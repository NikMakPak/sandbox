import React, { useState, memo } from "react";
import {
  Handle,
  Position,
  useHandleConnections,
  useNodesData,
} from "@xyflow/react";

const Button = ({ onClick, children }) => (
  <button
    onClick={onClick}
    style={{
      padding: "5px 10px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: 4,
      cursor: "pointer",
    }}
  >
    {children}
  </button>
);

const MechanismNode = () => {
  const [isOpen, setIsOpen] = useState(false); // Состояние для управления отображением таблицы
  const connections = useHandleConnections({
    type: "target",
  });
  const nodesData = useNodesData(
    connections.map((connection) => connection.source)
  );

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div
      style={{
        background: "#eee",
        color: "#222",
        padding: 10,
        fontSize: 12,
        borderRadius: 10,
        minWidth: 200,
      }}
    >
      <Handle type="target" position={Position.Left} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <strong>МЕХАНИЗМ</strong>
        <Button onClick={toggleOpen}>{isOpen ? "Скрыть" : "Раскрыть"}</Button>
      </div>
      {isOpen && (
        <table
          style={{ marginTop: 10, width: "100%", borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid #ccc", padding: "5px" }}>
                Источник
              </th>
              <th style={{ border: "1px solid #ccc", padding: "5px" }}>
                Значение
              </th>
            </tr>
          </thead>
          <tbody>
            {nodesData.map((node, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid #ccc", padding: "5px" }}>
                  {node.id}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "5px" }}>
                  {node.data?.value || "N/A"}
                </td>
              </tr>
            ))}
            {nodesData.length === 0 && (
              <tr>
                <td
                  colSpan={2}
                  style={{ border: "1px solid #ccc", padding: "5px" }}
                >
                  Нет данных
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default memo(MechanismNode);
