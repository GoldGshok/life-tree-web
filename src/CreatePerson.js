import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export function CreatePerson() {

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
    const handleShow = () => setShow(true);


    const handleSubmit = async () => {
        try {
            let res = await fetch("http://localhost:8989/web/person/create", {
                method: "POST",
                headers: {
                    'Access-Control-Allow-Methods': 'POST',
                    'Access-Control-Allow-Origin': 'http://localhost:8989',
                    'Accept': 'application/json',
                    'Content-Type' : 'application/json;charset=UTF-8',
                    'X-User-Lang' : 'rus'
                },
                body: JSON.stringify({
                    name: name,
                    patronymic: patronymic,
                    surname: surname,
                    lastSurname: lastSurname,
                    birthday: birthday,
                    deathday: deathday,
                    genderId: genderId,
                    fatherId: fatherId,
                    motherId: motherId,
                    about: about
                }),
            });
            const response = await res.json();
            if (res.status === 200) {
                setName(null);
                setPatronymic(null);
                setSurname(null);
                setLastSurname(null);
                setBirthday(null);
                setDeathday(null);
                setGenderId(null);
                setFatherId(null);
                setMotherId(null);
                setAbout(null);
                handleClose();
            } else {
                console.log(response);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Создать
            </Button>

            <Modal show={show} onHide={handleClose}
                   size="lg"
                   dialogClassName="modal-90w"
                   aria-labelledby="contained-modal-title-vcenter"
                   centered="true">
                <Modal.Header closeButton>
                    <Modal.Title>Создание человека</Modal.Title>
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
                            <Form.Group controlId="gender">
                                <Form.Check
                                    label="муж"
                                    type="radio"
                                    value={1}
                                    aria-label="radio 1"
                                    defaultChecked={true}
                                    onChange={(e) => setGenderId(e.target.value)}
                                    checked={genderId === "1"}
                                />
                                <Form.Check
                                    label="жен"
                                    type="radio"
                                    value={2}
                                    aria-label="radio 2"
                                    onChange={(e) => setGenderId(e.target.value)}
                                    checked={genderId === "2"}
                                />
                            </Form.Group>
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
                    <Button variant="primary" onClick={handleSubmit}>
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