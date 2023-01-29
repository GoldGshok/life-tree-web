import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function PersonEdit(props) {

    const { personId } = props;

    const [name, setName] = useState(null);
    const [patronymic, setPatronymic] = useState(null);
    const [surname, setSurname] = useState(null);
    const [lastSurname, setLastSurname] = useState(null);
    const [birthday, setBirthday] = useState(null);
    const [deathday, setDeathday] = useState(null);
    const [genderId, setGenderId] = useState(null);
    const [fatherId, setFatherId] = useState(null);
    const [motherId, setMotherId] = useState(null);
    const [about, setAbout] = useState(null);

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
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Form.Label>Отчество</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Отчество"
                                onChange={(e) => setPatronymic(e.target.value)}
                            />
                            <Form.Label>Фамилия</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Фамилия"
                                onChange={(e) => setSurname(e.target.value)}
                            />
                            <Form.Label>Прошлая фамилия</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Фамилия"
                                onChange={(e) => setLastSurname(e.target.value)}
                            />
                            <Form.Label>День рождения</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="День рождения"
                                onChange={(e) => setBirthday(e.target.value)}
                            />
                            <Form.Label>День смерти</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="День смерти"
                                onChange={(e) => setDeathday(e.target.value)}
                            />
                            <Form.Label>Пол</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Пол"
                                onChange={(e) => setGenderId(e.target.value)}
                            />
                            <Form.Label>Мама</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Мама"
                                onChange={(e) => setMotherId(e.target.value)}
                            />
                            <Form.Label>Папа</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Папа"
                                onChange={(e) => setFatherId(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>О человеке</Form.Label>
                            <Form.Control as="textarea" rows={3} onChange={(e) => setAbout(e.target.value)} />
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