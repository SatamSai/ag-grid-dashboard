import { useMemo } from "react";
import SummaryCard from "./SummaryCard";
import { formatter } from "../utils/currencyFormatter";
import data from '../../assets/data.json'

const pastel = {
    blue: "#E0F2FE",
    green: "#DCFCE7",
    purple: "#EDE9FE",
    yellow: "#FEF9C3",
    pink: "#FCE7F3",
};

const SummaryCards = () => {
    const employees = data.employees;

    const {
        totalEmployees,
        activeEmployees,
        avgSalary,
        avgRating,
        totalProjects,
    } = useMemo(() => {
        const totalEmployees = employees.length;
        const activeEmployees = employees.filter((e) => e.isActive).length;

        const salarySum = employees.reduce((sum, e) => sum + (e.salary || 0), 0);
        const avgSalary = totalEmployees ? salarySum / totalEmployees : 0;

        const ratingSum = employees.reduce(
            (sum, e) => sum + (e.performanceRating || 0),
            0
        );
        const avgRating = totalEmployees ? ratingSum / totalEmployees : 0;

        const totalProjects = employees.reduce(
            (sum, e) => sum + (e.projectsCompleted || 0),
            0
        );

        return {
            totalEmployees,
            activeEmployees,
            avgSalary,
            avgRating,
            totalProjects,
        };
    }, [employees]);

    return (
        <div className="mx-auto p-6">
            {/* header */}
            <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900">
                        KPIs
                    </h1>
                    <p className="mt-1 text-sm text-gray-600">
                        Snapshot of team performance at a glance
                    </p>
                </div>
            </div>

            {/* cards */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
                <SummaryCard
                    title="Total Employees"
                    value={totalEmployees}
                    color={pastel.blue}
                    subtitle="Company-wide headcount"
                />
                <SummaryCard
                    title="Active Employees"
                    value={activeEmployees}
                    color={pastel.green}
                    subtitle="Currently active"
                />
                <SummaryCard
                    title="Average Salary"
                    value={formatter.format(avgSalary)}
                    color={pastel.purple}
                    subtitle="Across all departments"
                />
                <SummaryCard
                    title="Average Rating"
                    value={avgRating.toFixed(1)}
                    color={pastel.yellow}
                    subtitle="Performance score"
                />
                <SummaryCard
                    title="Projects Completed"
                    value={totalProjects}
                    color={pastel.pink}
                    subtitle="Cumulative"
                />
            </div>
        </div>
    );
};

export default SummaryCards;
