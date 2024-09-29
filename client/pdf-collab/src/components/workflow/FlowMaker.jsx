// FlowMaker.jsx

import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { v4 as uuidv4 } from 'uuid';
import { HiTrash } from 'react-icons/hi';

const FlowMaker = () => {
  const [elements, setElements] = useState([]);

  const addElement = (type) => {
    setElements([...elements, { type, id: uuidv4() }]);
  };

  const deleteElement = (id) => {
    setElements(elements.filter(element => element.id !== id));
  };

  const handleSubmit = () => {
    console.log(elements);
    alert(JSON.stringify(elements));
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-center p-4 bg-gray-100 border-b border-gray-300">
        <button
          onClick={() => addElement('step')}
          className="px-4 py-2 mx-2 bg-green-500 text-white rounded"
        >
          Add Step
        </button>
        <button
          onClick={() => addElement('condition')}
          className="px-4 py-2 mx-2 bg-yellow-500 text-white rounded"
        >
          Add Condition
        </button>
        <button
          onClick={() => addElement('arrow')}
          className="px-4 py-2 mx-2 bg-blue-500 text-white rounded"
        >
          Add Arrow
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 mx-2 bg-purple-500 text-white rounded"
        >
          Submit Workflow
        </button>
      </div>
      <div className="flex-grow relative bg-white overflow-auto">
        {elements.map((element) => (
          <Draggable key={element.id}>
            <div
              className={`element p-2 border rounded cursor-grab relative ${
                element.type === 'step'
                  ? 'bg-green-200'
                  : element.type === 'condition'
                  ? 'bg-yellow-200'
                  : 'bg-blue-200'
              }`}
            >
              <button
                onClick={() => deleteElement(element.id)}
                className="absolute top-0 right-0 p-1 text-red-600"
              >
                <HiTrash />
              </button>
              {element.type === 'step' && <div>Step</div>}
              {element.type === 'condition' && <div>Condition</div>}
              {element.type === 'arrow' && <div className="text-3xl">→</div>}
            </div>
          </Draggable>
        ))}
      </div>
    </div>
  );
};

export default FlowMaker;
