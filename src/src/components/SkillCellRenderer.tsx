import type { CustomCellRendererProps } from "ag-grid-react";
import { type FunctionComponent } from "react";


function getRandomColor() {
    const colors = [
        "#DCFCE7",
        "#E0F2FE",
        "#FEF9C3",
        "#FCE7F3",
        "#EDE9FE",
        "#FFE4E6",
        "#F3E8FF",
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