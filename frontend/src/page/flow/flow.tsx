
import "reactflow/dist/style.css";
import React, { useState, useCallback } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import InputNode from "@/feature/flow/component/input-node";
import ResultNode from "@/feature/flow/component/result-node";
import { useAskAi } from "@/hook/use-ask-ai";
import { useSaveFlow } from "@/hook/use-save-flow";

const nodeTypes = {
  inputNode: InputNode,
  resultNode: ResultNode,
};

function Flow() {

  const { askAi } = useAskAi();
  const { saveFlow } = useSaveFlow();
  const [prompt, setPrompt] = useState("What is the capital of India?");
  const [response, setResponse] = useState("del");

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

  const handleRunFlow = async () => {
    const res = await askAi(prompt)
    let message = res?.response || res?.error

    setResponse(message);
  };

  const handleSaveFlow = async () => {
    if (!prompt) return
    if (!response) return
    const res = await saveFlow({ prompt, response })
    console.log({ res });

  };

  return (
    <div style={{ height: "100vh" }}>
      <button
        onClick={handleRunFlow}
        style={{ position: "absolute", zIndex: 10, top: 10, left: 10 }}
      >
        Run Flow
      </button>
      <button
        onClick={handleSaveFlow}
        style={{ position: "absolute", zIndex: 10, top: 10, left: 100 }}
      >
        Save Flow
      </button>

      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Flow
