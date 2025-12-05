import type { TEmployee, TEmployeeRaw } from "../types";

export function buildLeadershipHierarchyMemo(employees: TEmployeeRaw[]) {
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