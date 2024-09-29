// CustomNode.jsx

import React, { useState } from 'react';
import { Handle } from 'reactflow';
import { HiTrash } from 'react-icons/hi';

const CustomNode = ({ id, data, onNodeChange ,deleteNode}) => {
  const [label, setLabel] = useState(data.label);

  const handleChange = (event) => {
    setLabel(event.target.value);
    onNodeChange(id, event.target.value);
  };
  const onDelete=(id)=>{
    deleteNode(id)
  }

  return (
    <div className="p-4 bg-white border rounded shadow-md">
         <button
        onClick={() => onDelete(id)}
        className="absolute top-0 right-0 p-1 text-red-600"
      >
        <HiTrash />
      </button>
      <input
        type="text"
        value={label}
        onChange={handleChange}
        className="w-full px-2 py-1  outline-none"
      />
      <Handle type="source" position="right" />
      <Handle type="target" position="left" />
    </div>
  );
};

export default CustomNode;
