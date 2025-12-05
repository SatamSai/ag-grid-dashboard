import type { CustomCellRendererProps } from "ag-grid-react";
import { type FunctionComponent } from "react";


function getRandomColor() {
    const colors = [
        "#DCFCE7", // light green
        "#E0F2FE", // light blue
        "#FEF9C3", // light yellow
        "#FCE7F3", // light pink
        "#EDE9FE", // light purple
        "#FFE4E6", // light red
        "#F3E8FF", // light violet
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}


export const SkillCell: FunctionComponent<
    CustomCellRendererProps
> = ({ data: { skills } }: { data: { skills: string[] } }) => (
    <div className="h-full flex items-center gap-2">
        {
            skills.map(skill => {
                return <div style={{ background: getRandomColor() }} className="px-6 h-7 leading-none flex items-center rounded-md">{skill}</div>
            })
        }
    </div>
);