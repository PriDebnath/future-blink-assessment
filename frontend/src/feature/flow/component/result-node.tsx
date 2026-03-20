import React from "react";
import { Handle, Position, type NodeProps } from "reactflow";

interface Props {
  response: string;
}

function ResultNode({ data }: NodeProps<Props>) {
  return (
    <div style={{ padding: 10, background: "#f0f0f0", border: "1px solid #ddd" }}>
      <div style={{ width: "200px", minHeight: "80px" }}>
        {data.response || "AI response will appear here"}
      </div>
      <Handle type="target" position={Position.Left} />
    </div>
  );
}

export default ResultNode