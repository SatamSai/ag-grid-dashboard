import { useCallback, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { TEmployee, TEmployeeRaw } from '../types';
import data from '../../assets/data.json'
import { StatusCell } from './StatusCell';

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

function buildLeadershipHierarchyMemo(employees: TEmployeeRaw[]) {
    const fullName = (e: TEmployeeRaw) => `${e.firstName} ${e.lastName}`;

    const byName = new Map(employees.map(e => [fullName(e), e]));

    const memo = new Map();

    function getChain(name: string, seen = new Set()): string[] {

        if (!name) return [];
        if (seen.has(name)) return [name];
        if (memo.has(name)) return memo.get(name);

        const emp = byName.get(name);

        if (!emp) {
            const chain = [name];
            memo.set(name, chain);
            return chain;
        }

        if (!emp.manager || emp.manager === name) {
            const chain = [name];
            memo.set(name, chain);
            return chain;
        }

        seen.add(name);
        const chain = [name, ...getChain(emp.manager, seen)];
        seen.delete(name);

        memo.set(name, chain);
        return chain;
    }

    const newData: TEmployee[] = employees.map(emp => {
        const name = emp.firstName + " " + emp.lastName
        return {
            ...emp,
            heirarchy: getChain(name)
        }
    })
    return newData;

}

function EmployeeWorkdDetails() {

    const [rawData, setRawData] = useState(data.employees);

    const [colDefs, setColDefs] = useState([
        {
            field: "firstName",
            filter: true,
            autoHeight: true,
            wrapText: true,
        },
        {
            field: "lastName",
            filter: true,
            autoHeight: true,
            wrapText: true,
        },
        {
            field: "position",
            cellStyle: { ...commonCellStyles },
        },
        {
            field: "department",
            cellStyle: { ...commonCellStyles },
        },
        {
            field: "manager",
            cellStyle: { ...commonCellStyles },
        },
        {
            field: "Status",
            cellRenderer: StatusCell,
            cellStyle: { ...commonCellStyles }
        },
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
            <h1 className="text-[42px] font-semibold leading-tight tracking-tight text-gray-900 mb-2">                Employee Work
            </h1>
            <p className="text-sm text-gray-500 mb-6 px-2 md:px-0">
                Current assignments and positions
            </p>

            <AgGridReact
                rowData={rawData}
                defaultColDef={defaultColDef}
                columnDefs={colDefs}
                getDataPath={getDataPath}
                ref={gridRef}
                rowHeight={63}
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

export default EmployeeWorkdDetails
