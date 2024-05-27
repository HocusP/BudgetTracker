import './App.css';
import { Button, Container } from 'react-bootstrap';
import { Stack } from 'react-bootstrap';
import { useState } from 'react';
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from './Context/BudgetsContext';

import BudgetCard from './Components/BudgetCard';
import UncategorizedBudgetCard from './Components/UncategorizedBudgetCard';
import TotalBudgetCard from './Components/TotalBudgetCard';
import AddBudgetModal from './Components/AddBudgetModal';
import AddExpenseModal from './Components/AddExpenseModal';
import ViewExpensesModal from './Components/ViewExpensesModal';


function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [ViewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()
  const [AddExpenseModalBudgetId, setAddExpenseModalBugetId] = useState()
  const { budgets, getBudgetExpenses } = useBudgets()

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true)
    setAddExpenseModalBugetId(budgetId)
  }

  return (
    <>
      <Container className='my-4'>

        <Stack direction="horiozontal" gap="2" className='mb-4'>
          <h1 className='me-auto'> Budget Tracker </h1>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>
            Add Budget
          </Button>
          <Button variant="outline-primary" onClick={() => openAddExpenseModal()}>Add expense</Button>
        </Stack>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1rem',
          alignItems: "flex-start"
        }}>

          {budgets.map(budget => {
            const amount = getBudgetExpenses(budget.id).reduce((total,
              expense) => total + expense.amount, 0) // Gets all expenses add all the different amounts together and return them in the amount variable
            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                onViewExpensesClick={() => setViewExpensesModalBudgetId(budget.id)}
              />
            )
          })}
          <UncategorizedBudgetCard onAddExpenseClick={openAddExpenseModal}
            onViewExpensesClick={() => setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)}
          />
          <TotalBudgetCard />
        </div>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal} handleClose={() =>
          setShowAddBudgetModal(false)}
      />

      <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetId={AddExpenseModalBudgetId}
        handleClose={() => setShowAddExpenseModal(false)}
      />

      <ViewExpensesModal
        budgetId={ViewExpensesModalBudgetId}
        handleClose={() => setViewExpensesModalBudgetId()}
      />
    </>
  )
}

export default App;