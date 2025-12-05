import { useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef } from 'ag-grid-community';
import data from '../../assets/data.json';
import { StatusCell } from './StatusCell';

const paginationPageSizeSelector = [5, 10, 20];
const commonCellStyles: React.CSSProperties = { display: 'flex', alignItems: 'center', height: '100%' };

function EmployeeWorkDetails() {
    const [rawData] = useState(() => (data as any).employees);

    const [colDefs] = useState<ColDef[]>([
        { field: 'firstName', filter: true, autoHeight: true, wrapText: true },
        { field: 'lastName', filter: true, autoHeight: true, wrapText: true },
        { field: 'position', cellStyle: { ...commonCellStyles } },
        { field: 'department', cellStyle: { ...commonCellStyles } },
        { field: 'manager', cellStyle: { ...commonCellStyles } },
        {
            headerName: 'Status',
            valueGetter: p => p.data?.isActive ? 'Active' : 'Inactive',
            cellRenderer: StatusCell as any,
            cellStyle: { ...commonCellStyles },
            minWidth: 130,
        },
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
        <div className="bg-white">
            <h1 className="text-[42px] font-semibold leading-tight tracking-tight text-gray-900 mb-2">Employee Work</h1>
            <p className="text-sm text-gray-500 mb-6">Current assignments and positions</p>

            <AgGridReact
                rowData={rawData}
                columnDefs={colDefs}
                defaultColDef={defaultColDef}
                ref={gridRef}
                rowHeight={63}
                autoSizeStrategy={autoSizeStrategy}
                rowGroupPanelShow="always"
                pagination
                paginationPageSize={5}
                paginationPageSizeSelector={paginationPageSizeSelector}
                domLayout="autoHeight"
            />
        </div>
    );
}

export default EmployeeWorkDetails;
