import './App.css';
import { Button, Container } from 'react-bootstrap';
import { Stack } from 'react-bootstrap';
import BudgetCard from './Components/BudgetCard';
import AddBudgetModal from './Components/AddBudgetModal';

function App() {
  return (
  <>
  <Container className='my-4'>

    <Stack direction="horiozontal" gap="2" className='mb-4'>
      <h1 className='me-auto'> Budget Tracker </h1>
      <Button variant="primary">Add Budget</Button>
      <Button variant="outline-primary">Add expense</Button>
    </Stack>
    
    <div style={{
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '1rem', 
      alignItems: "flex-start"
    }}>
      <BudgetCard 
      name="Entertainment" 
      gray 
      amount={250} 
      max={1000}
      ></BudgetCard>
    </div>

  </Container>
  <AddBudgetModal show/>
  </>
  )
}

export default App;