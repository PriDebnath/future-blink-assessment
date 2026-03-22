import "reactflow/dist/style.css";
import React, { useState } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import InputNode from "@/feature/flow/component/input-node";
import ResultNode from "@/feature/flow/component/result-node";
import { useAskAi } from "@/hook/use-ask-ai";
import { useSaveFlow } from "@/hook/use-save-flow";
import { useGetSaveFlow } from "@/hook/use-get-save-flow";

const nodeTypes = {
  inputNode: InputNode,
  resultNode: ResultNode,
};

function Flow() {
  const { askAi } = useAskAi();
  const { saveFlow } = useSaveFlow();
  const { data: savedFlows, isLoading:  isLoadingSavedFlows} = useGetSaveFlow();

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
    const res = await askAi(prompt);
    let message = res?.response || res?.error;
    setResponse(message);
  };
console.log({savedFlows});

  const handleSaveFlow = async () => {
    if (!prompt || !response) return;
    const res = await saveFlow({ prompt, response });
    console.log({ res });
  };

  return (
    <div className="h-screen grid grid-cols-12 gap-2 p-2">
      
      {/* LEFT PANEL */}
      <div className="col-span-10 flex flex-col border-4 rounded-2xl overflow-hidden">
        
        {/* TOP BAR */}
        <div className="flex gap-2 p-2 border-b bg-gray-200 ">
          <button
            onClick={handleRunFlow}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Run Flow
          </button>
          <button
            onClick={handleSaveFlow}
            className="px-3 py-1 bg-green-500 text-white rounded"
          >
            Save Flow
          </button>
        </div>

        {/* FLOW AREA */}
        <div className="flex-1">
          <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes}>
            <Background />
            <Controls />
          </ReactFlow>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="col-span-2 border-4 rounded-2xl ">
        <h2 className="font-semibold m-0 bg-gray-200 p-2">Saved Flows</h2>
        <div className="p-2">
          


  {/* Loader */}
  {isLoadingSavedFlows && (
    <div className="flex items-center justify-center flex-1">
      <div className="animate-spin h-6 w-6 border-2 border-gray-400 border-t-transparent rounded-full" />
    </div>
  )}

  {/* Empty state */}
  {!isLoadingSavedFlows && savedFlows?.length === 0 && (
    <div className="text-sm text-gray-500 text-center mt-4">
      No flows saved
    </div>
  )}

  {/* List */}
  {!isLoadingSavedFlows && savedFlows &&  savedFlows?.length! > 0 && (
    <div className="flex flex-col gap-2 overflow-y-auto">
      {savedFlows.map((flow) => (
        <div
          key={flow._id}
          className="p-2 border rounded hover:bg-gray-50 cursor-pointer transition"
        >
          <div className="text-sm font-medium truncate">
            {flow.prompt}
          </div>
         {/*   <div className="text-xs text-gray-500 truncate">
           {flow.response}
          </div> */}
        </div>
      ))}
    </div>
  )}

        </div>
      </div>

    </div>
  );
}

export default Flow;