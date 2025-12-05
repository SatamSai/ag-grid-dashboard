import type { CustomCellRendererProps } from "ag-grid-react";
import { type FunctionComponent } from "react";

export const StatusCell: FunctionComponent<
    CustomCellRendererProps
> = ({ data: { isActive } }) => (
    <div className="h-full flex items-center">
        <div className={`w-24 h-8 flex items-center justify-center rounded-full justify-center gap-2 text-md border-2 ${isActive ? "text-[#039754] border-[#03975433]" : "text-[#888] border-[#88888833]"}`}>
            <div className={`mt-[2px] h-[6px] w-[6px] rounded-full ${isActive ? "bg-[#039754]" : "bg-[#ccc]"}`}></div>{isActive ? "Active" : "In Active"}
        </div>
    </div>
);