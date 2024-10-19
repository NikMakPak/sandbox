import React from "react";
import { useDnD } from "./DnDContext";

const Sidebar = () => {
  const [, setType] = useDnD(); // Получаем функцию для установки типа узла

  const onDragStart = (event, nodeType) => {
    setType(nodeType); // Устанавливаем тип узла для перетаскивания
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside>
      <div className="description">Перетащите узлы в рабочее пространство:</div>
      <div
        className="dndnode input"
        onDragStart={(event) => onDragStart(event, "input")}
        draggable
      >
        Input Node
      </div>
      <div
        className="dndnode input"
        onDragStart={(event) => onDragStart(event, "DefaultNode")}
        draggable
      >
        Two point Node
      </div>
      <div
        className="dndnode output"
        onDragStart={(event) => onDragStart(event, "output")}
        draggable
      >
        Output Node
      </div>
      <div
        className="dndnode mechanism"
        onDragStart={(event) => onDragStart(event, "mechanismNode")} // Добавляем возможность перетаскивать новый узел
        draggable
      >
        Mechanism Node
      </div>
    </aside>
  );
};

export default Sidebar;
