import React from "react";
import { Handle, Position, type NodeProps } from "reactflow";

interface Props {
  response: string;
}

function ResultNode({ data }: NodeProps<Props>) {
  return (
    <div className="p-2 border-2 rounded-xl border-gray-300 bg-gray-200">
      <div style={{ width: "200px", minHeight: "80px" }}>
        {data.response || "AI response will appear here"}
      </div>
      <Handle type="target" position={Position.Left} />
    </div>
  );
}

export default ResultNode