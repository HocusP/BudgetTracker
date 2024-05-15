import { Modal, Form, Button } from "react-bootstrap";
import { useRef } from "react";
import { useBudgets } from "../Context/BudgetsContext";


export default function AddExpenseModal({ show, handleClose, defaultBudgetId }) {
    const descRef = useRef()
    const amountRef = useRef()
    const budgetIdRef = useRef()
    const { addExpense, budgets } = useBudgets()
    function handleSubmit(e) {
        e.preventDefault()
        addExpense(
            {
                descRef: descRef.current.value,
                amount: parseFloat(amountRef.current.value),
                budgetId: budgetIdRef.current.value,
            })
        //handleClose() !Doesnt work! needs to be a fucntion but idfk how to do dat
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Expense</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            ref={descRef}
                            type="text"
                            required />

                    </Form.Group>
                    <Form.Group className="mb-3" controlId="amount">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                            ref={amountRef}
                            type="number"
                            required
                            min={0}
                            step={0.01}
                        />

                    </Form.Group>
                    <Form.Group className="mb-3" controlId="budgetId">
                        <Form.Label>Budget</Form.Label>
                        <Form.Select
                            defaultValue={defaultBudgetId}
                            ref={budgetIdRef}>
                            {budgets.map(budget => (
                                <option key={budget.id} value={budget.id}>
                                    {budget.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>


                    <div className="d-flex justify-content-end">
                        <Button type="submit" variant="primary">Add</Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    );
}