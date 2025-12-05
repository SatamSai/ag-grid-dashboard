import type { CustomCellRendererProps } from "ag-grid-react";
import { type FunctionComponent } from "react";

import styles from "./EmployeeCell.module.css";

export const EmployeeCellRenderer: FunctionComponent<
    CustomCellRendererProps
> = ({ data: { firstName, lastName, position } }) => (
    <div className={styles.employeeCell}>
        <div className={styles.employeeData}>
            <span>{firstName} {lastName}</span>
            <span className={styles.description}>{position}</span>
        </div>
    </div>
);