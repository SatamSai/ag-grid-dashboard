import { useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef } from 'ag-grid-community';
import { EmployeeCellRenderer } from './EmployeeCell';
import { RatingCell } from './RatingCell';
import data from '../../assets/data.json';

const paginationPageSizeSelector = [5, 10, 20];
const commonCellStyles: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    height: "100%",
};

function EmployeePerformanceTable() {
    const [colDefs] = useState<ColDef[]>([
        {
            field: "firstName",
            filter: true,
            cellRenderer: EmployeeCellRenderer as any,
            autoHeight: true,
            wrapText: true,
        },
        { field: "department", cellStyle: { ...commonCellStyles } },
        { field: "projectsCompleted", cellStyle: { ...commonCellStyles } },
        { field: "performanceRating", cellStyle: { ...commonCellStyles }, cellRenderer: RatingCell as any },
    ]);

    const gridRef = useRef<AgGridReact>(null);

    const autoSizeStrategy = useMemo(() => ({
        type: 'fitGridWidth' as const,
        defaultMinWidth: 150,
    }), []);

    const defaultColDef = useMemo<ColDef>(() => ({
        flex: 1,
        filter: true,
        enableRowGroup: true,
        enableValue: true,
    }), []);

    return (
        <div className='bg-white'>
            <h1 className="text-[42px] font-semibold leading-tight tracking-tight text-gray-900 mb-2">
                Employee Performance
            </h1>
            <p className="text-sm text-gray-500 mb-6">
                Key performance indicators across teams
            </p>

            <AgGridReact
                rowData={(data as any).employees}
                defaultColDef={defaultColDef}
                columnDefs={colDefs}
                ref={gridRef}
                autoSizeStrategy={autoSizeStrategy}
                rowGroupPanelShow='always'
                pagination
                paginationPageSize={5}
                paginationPageSizeSelector={paginationPageSizeSelector}
                domLayout="autoHeight"
            />
        </div>
    );
}

export default EmployeePerformanceTable;
