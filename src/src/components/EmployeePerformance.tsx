import { useCallback, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { TEmployee, TEmployeeRaw } from '../types';
import { EmployeeCellRenderer } from './EmployeeCell';
import data from '../../assets/data.json'
import { SkillCell } from './SkillCellRenderer';
import { formatter } from '../utils/currencyFormatter';
import { StatusCell } from './StatusCell';
import { RatingCell } from './RatingCell';

const TOGGLE_OPTIONS = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'inactive', label: 'Inactive' },
] as const;

type ToggleKey = (typeof TOGGLE_OPTIONS)[number]['key'];

const paginationPageSizeSelector = [5, 10, 20];

const commonCellStyles = {
    display: "flex",
    alignItems: "center",
    height: "100%",
}


function EmployeePerformanceTable() {

    const [colDefs, setColDefs] = useState([
        {
            field: "firstName",
            filter: true,
            cellRenderer: EmployeeCellRenderer,
            autoHeight: true,
            wrapText: true,
        },
        {
            field: "department",
            cellStyle: { ...commonCellStyles },
        },
        {
            field: "projectsCompleted",
            cellStyle: { ...commonCellStyles },
        },
        {
            field: "performanceRating",
            cellStyle: { ...commonCellStyles },
            cellRenderer: RatingCell,
        }
    ]);

    const gridRef = useRef<AgGridReact>(null)

    const getDataPath = useCallback((data: TEmployee) => data.heirarchy, []);

    const autoSizeStrategy = useMemo(() => {
        return {
            type: 'fitGridWidth',
            defaultMinWidth: 150,
        };
    }, []);

    const defaultColDef = useMemo(
        () => ({
            flex: 1,
            filter: true,
            enableRowGroup: true,
            enableValue: true,
        }),
        []
    );

    return (
        <div className='bg-white'>
            <h1 className="text-[42px] font-semibold leading-tight tracking-tight text-gray-900 mb-2">
                Employee Performance
            </h1>
            <p className="text-sm text-gray-500 mb-6">
                Key performance indicators across teams
            </p>

            <AgGridReact
                rowData={data.employees}
                defaultColDef={defaultColDef}
                columnDefs={colDefs}
                getDataPath={getDataPath}
                ref={gridRef}
                autoSizeStrategy={autoSizeStrategy}
                rowGroupPanelShow='always'
                pagination
                paginationPageSize={5}
                paginationPageSizeSelector={paginationPageSizeSelector}
                domLayout="autoHeight"
            />

        </div>
    )
}

export default EmployeePerformanceTable
