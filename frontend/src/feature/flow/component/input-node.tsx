import React from "react";
import { Handle, Position, type NodeProps } from "reactflow";

interface Props {
    prompt: string;
    onChange: (param: string) => void
}

function InputNode({ data }: NodeProps<Props>) {
    return (
        <div style={{ padding: 10, background: "#fff", border: "1px solid #ddd" }}>
            <textarea
                placeholder="Enter your prompt..."
                value={data.prompt}
                onChange={(e) => data.onChange(e.target.value)}
                style={{ width: "200px", height: "80px" }}
            />
            <Handle type="source" position={Position.Right} />
        </div>
    );
}

export default InputNode