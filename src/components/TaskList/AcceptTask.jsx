import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const AcceptTask = ({ data, empId, taskIndex }) => {

    const [userData, setUserData] = useContext(AuthContext)

    const updateTask = (type) => {

        const updated = userData.map(emp => {

            if (emp.id === empId) {

                const updatedTasks = emp.tasks.map((task, index) => {

                    if (index === taskIndex) {

                        // reset all states
                        let newTask = {
                            ...task,
                            active: false,
                            newTask: false,
                            completed: false,
                            failed: false
                        }

                        if (type === "completed") {
                            newTask.completed = true
                        }

                        if (type === "failed") {
                            newTask.failed = true
                        }

                        return newTask
                    }

                    return task
                })

                return {
                    ...emp,
                    tasks: updatedTasks,
                    taskCounts: {
                        ...emp.taskCounts,
                        active: emp.taskCounts.active - 1,
                        completed: type === "completed"
                            ? emp.taskCounts.completed + 1
                            : emp.taskCounts.completed,
                        failed: type === "failed"
                            ? emp.taskCounts.failed + 1
                            : emp.taskCounts.failed
                    }
                }
            }

            return emp
        })

        // update UI
        setUserData(updated)

        // save to localStorage
        localStorage.setItem('employees', JSON.stringify(updated))
    }

    return (
        <div className='flex-shrink-0 h-full w-[300px] p-5 bg-red-400 rounded-xl'>
            
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

            <div className='flex justify-between mt-6'>
                
                <button 
                    onClick={() => updateTask("completed")}
                    className='bg-green-500 rounded font-medium py-1 px-2 text-xs'
                >
                    Mark as Completed
                </button>

                <button 
                    onClick={() => updateTask("failed")}
                    className='bg-red-500 rounded font-medium py-1 px-2 text-xs'
                >
                    Mark as Failed
                </button>

            </div>
        </div>
    )
}

export default AcceptTask