import "reactflow/dist/style.css";
import React, { useEffect, useState } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import InputNode from "@/feature/flow/component/input-node";
import ResultNode from "@/feature/flow/component/result-node";
import { useAskAi } from "@/hook/use-ask-ai";
import { useSaveFlow } from "@/hook/use-save-flow";
import { useGetFlows, type SavedFlow } from "@/hook/use-get-flows";
import DeleteFlow from "@/feature/flow/component/delete-flow";
import { Button } from "@/components/ui/button";
import { File, Loader2, PlayIcon } from "lucide-react";

const nodeTypes = {
  inputNode: InputNode,
  resultNode: ResultNode,
};

function Flow() {
  const { askAi, isPending: isLoadingAiResponse } = useAskAi();
  const { saveFlow, isPending: isLoadingSaveFlow } = useSaveFlow();
  const { data: savedFlows, isLoading: isLoadingSavedFlows, error: errorSavedFlows } = useGetFlows();
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

  const handleRunFlow = async () => {
    setResponse("Thinking...");
    const res = await askAi(prompt);
    let message = res?.response || res?.error;
    setTimeout(() => {
      setResponse(message);
    }, 10);
  };

  const handleClickFlow = async (data: SavedFlow) => {
    setPrompt(data.prompt);
    setResponse(data.response);
  };

  const handleSaveFlow = async () => {
    if (!prompt || !response) return;
    const res = await saveFlow({ prompt, response });
  };


  const [showSlowLoader, setShowSlowLoader] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>

    if (isLoadingSavedFlows) {
      timer = setTimeout(() => {
        setShowSlowLoader(true);
      }, 3000) // 3 seconds
    } else {
      setShowSlowLoader(false);
    }

    return () => clearTimeout(timer);
  }, [isLoadingSavedFlows]);

  return (
    <div className="h-screen  flex flex-col">
      <h1 className="p-2 bg-gray-200">FutureBlink Assessment (MERN app)</h1>
      <div className="flex-1 min-h-0 grid grid-cols-12 gap-2 p-2">
        {/* LEFT PANEL */}
        <div className="col-span-10 flex flex-col border-4 rounded-2xl overflow-hidden">

          {/* TOP BAR */}
          <div className="flex justify-end gap-2 p-2 border-b bg-gray-200 ">

            <Button
              onClick={handleSaveFlow}
              disabled={isLoadingSaveFlow}
              className="px-3 py-1 bg-blue-500  text-white rounded"
            >
              {isLoadingSaveFlow ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <File className="h-4 w-4" />
                  Save Flow
                </>
              )}
            </Button>
            <Button
              onClick={handleRunFlow}
              disabled={isLoadingAiResponse}
              className="px-3 py-1 bg-green-500  text-white rounded-xl"
            >
              {isLoadingAiResponse ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Running...
                </>
              ) : (
                <>
                  <PlayIcon className="h-4 w-4" />
                  Run Flow
                </>
              )}
            </Button>
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
        <div className=" col-span-2 border-4 rounded-2xl  flex flex-col min-h-0">
          <h2 className="font-semibold m-0 bg-gray-200 p-2">Saved Flows</h2>
          <div className="p-2  flex-1 min-h-0 flex flex-col">
            {/* Loader */}
            {isLoadingSavedFlows && (
              <div className="flex flex-col   flex-1">
                {/* <div className="animate-spin h-6 w-6 border-2 border-gray-400 border-t-transparent rounded-full" /> */}
                <div className="h-4 w-3/4 bg-gray-300 rounded mb-3 animate-pulse  delay-500" />
                <div className="h-4 w-full bg-gray-300 rounded mb-2 animate-pulse delay-1000" />
                <div className="h-4 w-5/6 bg-gray-300 rounded mb-4 animate-pulse delay-200" />
                {
                  showSlowLoader && (
                    <div className="bg-gray-300 rounded mb-4  px-1">
                      This is taking a bit longer than usual, Hold tight (50sec)...
                    </div>
                  )
                }
              </div>
            )}

            {/* Empty state */}
            {!isLoadingSavedFlows && savedFlows?.length === 0 && (
              <div className="text-sm text-gray-500 text-center mt-4">
                No flows saved
              </div>
            )}

            {/* List */}
            {!isLoadingSavedFlows && savedFlows && savedFlows?.length! > 0 && (
              <div className="flex-1 flex flex-col gap-2 overflow-y-auto">
                {savedFlows.map((flow) => (
                  <div
                    key={flow._id}
                    onClick={() => { handleClickFlow(flow) }}
                    className="  p-2 border rounded hover:bg-gray-50 cursor-pointer transition flex items-center justify-between"
                  >
                    <span className="text-sm font-medium truncate">
                      {flow.prompt}
                    </span>
                    <DeleteFlow data={flow} />
                    {/*   <div className="text-xs text-gray-500 truncate">
           {flow.response}
          </div> */}
                  </div>
                ))}
              </div>
            )}
            {
              errorSavedFlows && (
                <div>
                  {errorSavedFlows.message}
                </div>
              )
            }

          </div>
        </div>

      </div>
    </div>
  );
}

export default Flow;