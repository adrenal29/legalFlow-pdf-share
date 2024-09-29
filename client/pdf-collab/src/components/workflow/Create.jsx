// Flow.jsx

import React, { useCallback, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import { HiTrash } from "react-icons/hi";
import CustomNode from "./CustomNode";
import { Handle } from "reactflow";
import { Button } from "../ui/button";
import axios from "axios";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "../ui/select";

const initialNodes = [
  {
    id: "1",
    type: "custom",
    position: { x: 0, y: 0 },
    data: {
      label: "Node 1",
      onClick: () => alert("Button in Node 1 clicked"),
      completed: false,
    },
  },
  {
    id: "2",
    type: "custom",
    position: { x: 0, y: 100 },
    data: {
      label: "Node 2",
      onClick: () => alert("Button in Node 2 clicked"),
      completed: false,
    },
  },
];

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

const nodeTypes = { custom: CustomNode };

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [additionalOptions, setAdditionalOptions] = useState({ city: "" });
  const [workflow, setWorkflow] = useState("");
  const [loading, setLoading] = useState(false);

  const generateITRWorkflow = () => {
    const steps = [
      "Gather all necessary documents",
      "Login to the income tax e-filing portal",
      "Select the ITR form applicable",
      "Fill in the required details",
      "Verify your ITR",
      "Submit the ITR form",
      "E-verify the return",
    ];

    setWorkflow(steps.join("\n"));
    parseWorkflow(steps.join("\n"));
  };

  const handleGenerateWorkflow = async () => {
    setLoading(true);
    try {
      setTimeout(() => {
        // Simulate delay for workflow generation
        // const response = await axios.post("http://localhost:3001/api/generate-workflow", {
        //   category,
        //   subCategory,
        //   additionalOptions,
        // });
        // setWorkflow(response.data.workflow);
        // parseWorkflow(response.data.workflow);
        generateITRWorkflow();
        setLoading(false);
      }, 2000); // 2 seconds delay
    } catch (error) {
      console.error("Error generating workflow:", error);
      setLoading(false);
    }
  };

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const parseWorkflow = (workflow) => {
    const steps = workflow.split("\n").filter((step) => step.trim() !== "");
    const newNodes = steps.map((step, index) => ({
      id: (index + 1).toString(),
      type: "custom",
      position: { x: 0, y: index * 100 },
      data: { label: step, completed: false },
    }));
    const newEdges = newNodes.slice(1).map((node, index) => ({
      id: `e${index}-${index + 1}`,
      source: (index + 1).toString(),
      target: (index + 2).toString(),
    }));
    setNodes(newNodes);
    setEdges(newEdges);
  };

  const addNode = () => {
    const newNode = {
      id: (nodes.length + 1).toString(),
      type: "custom",
      position: { x: Math.random() * 250, y: Math.random() * 250 },
      data: {
        label: `Node ${nodes.length + 1}`,
        onClick: () => alert(`Button in Node ${nodes.length + 1} clicked`),
        completed: false,
      },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  const deleteNode = (id) => {
    const updatedNodes = nodes.filter((node) => node.id !== id);
    const updatedEdges = edges.filter(
      (edge) => edge.source !== id && edge.target !== id
    );
    setNodes(updatedNodes);
    setEdges(updatedEdges);
  };

  const updateNodeLabel = (id, label) => {
    const updatedNodes = nodes.map((node) =>
      node.id === id ? { ...node, data: { ...node.data, label } } : node
    );
    setNodes(updatedNodes);
  };

  const markNodeCompleted = (id) => {
    const nodeIndex = nodes.findIndex((node) => node.id === id);
    if (nodeIndex === 0 || (nodes[nodeIndex - 1] && nodes[nodeIndex - 1].data.completed)) {
      const updatedNodes = nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, completed: true } } : node
      );
      setNodes(updatedNodes);
    } else {
      alert("Complete the previous step first!");
    }
  };
  const handleSubmit = () => {
    console.log("Nodes:", nodes);
    console.log("Edges:", edges);
    alert(`Nodes: ${JSON.stringify(nodes)}\nEdges: ${JSON.stringify(edges)}`);
  };

  const CustomNodeComponent = ({ data, id }) => (
    <div className={`p-4 bg-white border rounded shadow-md w-[30vw] my-8 ${data.completed ? 'bg-green-100' : ''}`}>
      <button
        onClick={() => deleteNode(id)}
        className="absolute top-0 right-0 p-1 text-red-600"
      >
        <HiTrash />
      </button>
      <input
        type="text"
        value={data.label}
        onChange={(e) => updateNodeLabel(id, e.target.value)}
        className="w-full px-2 py-1  outline-none"
      />
      <button
        onClick={() => markNodeCompleted(id)}
        className="px-2 py-2 mt-2 mt-2 text-white bg-gray-900 rounded"
        disabled={data.completed}
      >
        {data.completed ? "Completed" : "Complete Step"}
      </button>
      <Handle type="source" position="right" />
      <Handle type="target" position="left" />
    </div>
  );

  nodeTypes.custom = CustomNodeComponent;

  return (
    <div className="h-screen w-full">
      <div className="w-1/3 p-4">
        <Select
          onValueChange={(value) => setCategory(value)}
          className="my-2 outline-none"
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="ITR filing">ITR filing</SelectItem>
              <SelectItem value="Company registration">
                Company registration
              </SelectItem>
              <SelectItem value="Passport making">Passport making</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {category && (
          <div className="mb-4 mt-4">
            <Select
              onValueChange={(value) => setSubCategory(value)}
              className="my-2 outline-none"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Sub-Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {category === "ITR filing" && (
                    <>
                      <SelectItem value="Individual">Individual</SelectItem>
                      <SelectItem value="Company">Company</SelectItem>
                    </>
                  )}
                  {category === "Company registration" && (
                    <>
                      <SelectItem value="Small">Small</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Large">Large</SelectItem>
                    </>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}

        {subCategory && (
          <div className="mb-4 mt-4">
            <input
              type="text"
              placeholder="City"
              value={additionalOptions.city}
              onChange={(e) =>
                setAdditionalOptions({
                  ...additionalOptions,
                  city: e.target.value,
                })
              }
              className="w-full px-4 py-2 border rounded"
            />
          </div>
        )}

        <Button onClick={handleGenerateWorkflow} className="mb-4 mt-4">
          Generate Workflow
        </Button>
      </div>
      <div className="p-4 flex space-x-4">
        <Button onClick={addNode} className="px-4 py-2  rounded">
          Add Node
        </Button>
        <Button onClick={handleSubmit} className="px-4 py-2   rounded">
          Submit Workflow
        </Button>
      </div>
      <div className="h-full w-full">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <img
              src="https://media.giphy.com/media/sSgvbe1m3n93G/giphy.gif"
              alt="Loading..."
              className="w-16 h-16"
            />
          </div>
        ) : (
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
          >
            <MiniMap />
            <Controls />
            <Background />
          </ReactFlow>
        )}
      </div>
    </div>
  );
}

export default Flow;
