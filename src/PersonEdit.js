import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function PersonEdit(props) {

    const { personId } = props;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        console.log(personId);
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                edit
            </Button>

            <Modal show={show} onHide={handleClose}
                   size="lg"
                   dialogClassName="modal-90w"
                   aria-labelledby="contained-modal-title-vcenter"
                   centered="true">
                <Modal.Header closeButton>
                    <Modal.Title>Изменение данных о человеке</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Имя</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Иван"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>О человеке</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Сохранить
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Отмена
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );

}

export default PersonEdit