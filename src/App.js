import './App.css';
import { Button, Container } from 'react-bootstrap';
import { Stack } from 'react-bootstrap';
import BudgetCard from './Components/BudgetCard';
import AddBudgetModal from './Components/AddBudgetModal';
import { useState } from 'react';
import { BudgetsProvider, useBudgets } from './Context/BudgetsContext';

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const { budgets, getBudgetExpenses } = useBudgets()


  return (
    <>
      <Container className='my-4'>

        <Stack direction="horiozontal" gap="2" className='mb-4'>
          <h1 className='me-auto'> Budget Tracker </h1>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>
            Add Budget
          </Button>
          <Button variant="outline-primary">Add expense</Button>
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
                max={budget.max} />
            )
          })}
        </div>
      </Container>
      <AddBudgetModal show={showAddBudgetModal} handleClose={() =>
        setShowAddBudgetModal(false)}
      />

    </>
  )
}

export default App;