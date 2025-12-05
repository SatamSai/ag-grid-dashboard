import './App.css'
import SummaryCards from './src/components/SummaryCards';
import EmployeeSummaryTable from './src/components/EmployeeSummaryTable';
import EmployeePerformanceTable from './src/components/EmployeePerformance';
import EmployeeWorkdDetails from './src/components/EmployeeWorkDetails';


function App() {

  return (
    <div className='bg-white h-[100vh] px-10'>
      <SummaryCards />
      <div className='flex w-full gap-8 my-20 max-xl:flex-col'>
        <div className='w-[45%] md:w-full'>
          <EmployeePerformanceTable />
        </div>
        <div className='w-[60%]  md:w-full'>
          <EmployeeWorkdDetails />
        </div>
      </div>
      <EmployeeSummaryTable />
    </div>
  )
}

export default App
