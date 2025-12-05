export interface TEmployeeRaw {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    department: string;
    position: string;
    salary: number;
    hireDate: string;
    age: number;
    location: string;
    performanceRating: number;
    projectsCompleted: number;
    isActive: boolean;
    skills: string[];
    manager: string | null;
}

export interface TEmployee extends TEmployeeRaw {
    heirarchy: string[]
}