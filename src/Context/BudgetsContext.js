import React, { useContext, useState } from "react"
import { v4 as uuidV4 } from "uuid"

const BudgetsContext = React.createContext()


export function useBudgets() {
    return useContext(BudgetsContext)

}

export const BudgetsProvider = ({ children }) => {
    const [budgets, setBudgets] = useState([])
    const [expenses, setExpenses] = useState([])

    function getBudgetExpenses (budgetId) {
        return expenses.filter(expense => expense.budgetId === budgetId)
    }
   function addExpense({amount, description, budgetId}) {
    setExpenses(prevExpenses => {

        return [...prevExpenses, { id: uuidV4(), amount, description, budgetId }]
    })
   }
   function addBudget({name, max}){
    setBudgets(prevBudgets => {
        if (prevBudgets.find(budget => budget.name === name)) {
            return prevBudgets
        }
        return [...prevBudgets, { id: uuidV4(), name, max }]
    })
   }
   function deleteBudget({id}){

    // !!make sure when you delete a field you don't delete the expenses but move them instead!!
    setBudgets (prevBudgets => {
        return prevBudgets.filter(budget => budget.id !== id)
    })
   }
   function deleteExpenses({id}){
    setExpenses (prevExpenses => {
        return prevExpenses.filter(expenses => expenses.id !== id)
   })


    return <BudgetsContext.Provider value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpenses
    }}> {children} </BudgetsContext.Provider>
}