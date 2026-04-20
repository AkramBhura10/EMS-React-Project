import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const NewTask = ({ data, empId, taskIndex }) => {

    const [userData, setUserData] = useContext(AuthContext)

    const acceptTask = () => {

        const updated = userData.map(emp => {

            if (emp.id === empId) {

                const task = emp.tasks[taskIndex]

                // update task state
                task.active = true
                task.newTask = false
                task.completed = false
                task.failed = false

                // update counts
                emp.taskCounts.active += 1
                emp.taskCounts.newTask -= 1
            }

            return emp
        })

        // update UI instantly
        setUserData(updated)

        // persist data
        localStorage.setItem('employees', JSON.stringify(updated))
    }

    return (
        <div className='flex-shrink-0 h-full w-[300px] p-5 bg-green-400 rounded-xl'>
            
            <div className='flex justify-between items-center'>
                <h3 className='bg-red-600 text-sm px-3 py-1 rounded'>
                    {data.category}
                </h3>
                <h4 className='text-sm'>
                    {data.taskDate}
                </h4>
            </div>

            <h2 className='mt-5 text-2xl font-semibold'>
                {data.taskTitle}
            </h2>

            <p className='text-sm mt-2'>
                {data.taskDescription}
            </p>

            <div className='mt-6'>
                <button 
                    onClick={acceptTask}
                    className='bg-blue-500 rounded font-medium py-1 px-2 text-xs'
                >
                    Accept Task
                </button>
            </div>

        </div>
    )
}

export default NewTask