import { useCallback, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { TEmployee, TEmployeeRaw } from '../types';
import { EmployeeCellRenderer } from './EmployeeCell';
import data from '../../assets/data.json'
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

function EmployeeSummaryTable() {

    const [active, setActive] = useState<ToggleKey>('all');

    const [rawData, setRawData] = useState(data.employees);

    const [colDefs, setColDefs] = useState([
        {
            field: "firstName",
            filter: true,
            cellRenderer: EmployeeCellRenderer,
            autoHeight: true,
            wrapText: true,
        },
        {
            field: "email",
            filter: true,
            cellStyle: { ...commonCellStyles }
        },
        {
            field: "department",
            cellStyle: { ...commonCellStyles },
        },
        {
            field: "skills",
            width: 500,
            cellRenderer: SkillCell,
            cellStyle: { ...commonCellStyles }
        },
        {
            field: "salary",
            valueFormatter: (params: { value: number }) => formatter.format(params.value),
            cellStyle: { ...commonCellStyles },
            filter: false
        },
        {
            field: "age",
            cellStyle: { ...commonCellStyles },
            filter: false
        },
        {
            field: "manager",
            cellStyle: { ...commonCellStyles },
        },
        {
            field: "location",
            cellStyle: { ...commonCellStyles }
        },
        {
            field: "hireDate",
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

    const processedData = useMemo(() => {
        return rawData.filter(emp => {
            switch (active) {
                case "active": return emp.isActive
                case "inactive": return !emp.isActive;
                case "all": return true
            }
        })
    }, [data, active])

    return (
        <div className='bg-white h-[100vh]'>
            <h1 className="text-[42px] font-semibold leading-tight tracking-tight text-gray-900 mb-2">                Employee Summary
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
                getDataPath={getDataPath}
                ref={gridRef}
                autoSizeStrategy={autoSizeStrategy}
                rowGroupPanelShow='always'
                pagination
                paginationPageSize={10}
                paginationPageSizeSelector={paginationPageSizeSelector}
                domLayout="autoHeight"
            />

        </div>
    )
}

export default EmployeeSummaryTable
