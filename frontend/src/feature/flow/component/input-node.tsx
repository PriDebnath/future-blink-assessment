import React from "react";
import { Handle, Position, type NodeProps } from "reactflow";

interface Props {
    prompt: string;
    onChange: (param: string) => void
}

function InputNode({ data }: NodeProps<Props>) {
    return (
        <div className="p-2 border-2 border-gray-300 rounded-xl bg-white"
        >
            <textarea
                placeholder="Enter your prompt..."
                value={data.prompt}
                onChange={(e) => data.onChange(e.target.value)}
                className="border border-gray-200 rounded p-1 m-0"
                style={{ width: "200px", height: "80px" }}
            />
            <Handle type="source" position={Position.Right} />
        </div>
    );
}

export default InputNode