import { useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef } from 'ag-grid-community';
import { EmployeeCellRenderer } from './EmployeeCell';
import data from '../../assets/data.json';
import { SkillCell } from './SkillCellRenderer';
import { formatter } from '../utils/currencyFormatter';
import { StatusCell } from './StatusCell';

const TOGGLE_OPTIONS = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'inactive', label: 'Inactive' },
] as const;
type ToggleKey = (typeof TOGGLE_OPTIONS)[number]['key'];

const paginationPageSizeSelector = [5, 10, 20];

const commonCellStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
};

function EmployeeSummaryTable() {
    const [active, setActive] = useState<ToggleKey>('all');
    const [rawData] = useState(() => (data as any).employees);

    const [colDefs] = useState<ColDef[]>([
        {
            field: 'firstName',
            headerName: 'Employee',
            filter: true,
            cellRenderer: EmployeeCellRenderer as any,
            autoHeight: true,
            wrapText: true,
            minWidth: 200,
            cellStyle: { ...commonCellStyles },
        },
        { field: 'email', filter: true, cellStyle: { ...commonCellStyles }, minWidth: 240 },
        { field: 'department', cellStyle: { ...commonCellStyles } },
        { field: 'skills', width: 500, cellRenderer: SkillCell as any, cellStyle: { ...commonCellStyles } },
        {
            field: 'salary',
            valueFormatter: (p: any) => formatter.format(p.value),
            filter: false,
            cellStyle: { ...commonCellStyles, justifyContent: 'flex-end' },
            minWidth: 140,
        },
        { field: 'age', filter: false, width: 90, cellStyle: { ...commonCellStyles, justifyContent: 'center' } },
        { field: 'manager', cellStyle: { ...commonCellStyles } },
        { field: 'location', cellStyle: { ...commonCellStyles } },
        { field: 'hireDate' },
        {
            headerName: 'Status',
            valueGetter: (p) => (p.data?.isActive ? 'Active' : 'Inactive'),
            cellRenderer: StatusCell as any,
            cellStyle: { ...commonCellStyles, justifyContent: 'center' },
            minWidth: 120,
        },
    ]);

    const gridRef = useRef<AgGridReact>(null);

    const autoSizeStrategy = useMemo(
        () => ({ type: 'fitGridWidth' as const, defaultMinWidth: 150 }),
        []
    );

    const defaultColDef = useMemo<ColDef>(
        () => ({
            flex: 1,
            filter: true,
            enableRowGroup: true,
            enableValue: true,
        }),
        []
    );

    const processedData = useMemo(() => {
        return rawData.filter((emp: any) => {
            switch (active) {
                case 'active': return emp.isActive;
                case 'inactive': return !emp.isActive;
                case 'all': default: return true;
            }
        });
    }, [rawData, active]);

    return (
        <div className="bg-white mb-20">
            <h1 className="text-[42px] font-semibold leading-tight tracking-tight text-gray-900 mb-2">
                Employee Summary
            </h1>
            <p className="text-sm text-gray-500 mb-6 px-2 md:px-0">
                Detailed employee data with filters
            </p>

            <div className="p-4">
                <div className="inline-flex rounded-lg shadow-sm overflow-hidden border border-gray-200">
                    {TOGGLE_OPTIONS.map(({ key, label }) => {
                        const isActive = active === key;
                        return (
                            <button
                                key={key}
                                onClick={() => setActive(key)}
                                className={[
                                    'px-4 py-2 text-sm font-medium focus:outline-none transition-colors',
                                    isActive ? 'bg-white text-gray-900' : 'bg-gray-100 hover:bg-gray-200 text-gray-700',
                                ].join(' ')}
                            >
                                {label}
                            </button>
                        );
                    })}
                </div>
            </div>

            <AgGridReact
                rowData={processedData}
                defaultColDef={defaultColDef}
                columnDefs={colDefs}
                ref={gridRef}
                autoSizeStrategy={autoSizeStrategy}
                rowGroupPanelShow="always"
                pagination
                paginationPageSize={10}
                paginationPageSizeSelector={paginationPageSizeSelector}
                domLayout="autoHeight"
            />
        </div>
    );
}

export default EmployeeSummaryTable;
