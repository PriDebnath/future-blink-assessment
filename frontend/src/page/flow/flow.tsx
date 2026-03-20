 
import "reactflow/dist/style.css";
import React, { useState, useCallback } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import InputNode from "@/feature/flow/component/input-node";
import ResultNode from "@/feature/flow/component/result-node";

const nodeTypes = {
  inputNode: InputNode,
  resultNode: ResultNode,
};

 function Flow() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const nodes = [
    {
      id: "1",
      type: "inputNode",
      position: { x: 100, y: 100 },
      data: { prompt, onChange: setPrompt },
    },
    {
      id: "2",
      type: "resultNode",
      position: { x: 400, y: 100 },
      data: { response },
    },
  ];

  const edges = [
    {
      id: "e1-2",
      source: "1",
      target: "2",
    },
  ];

  const handleRun = async () => {
    console.log("Prompt:", prompt);

    // backend call will be added later
    setResponse("Waiting for backend...");
  };

  return (
    <div style={{ height: "100vh" }}>
      <button
        onClick={handleRun}
        style={{ position: "absolute", zIndex: 10, top: 10, left: 10 }}
      >
        Run Flow
      </button>

      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Flow
