import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Typeahead, withAsync } from 'react-bootstrap-typeahead';

function PersonEdit(props) {

    const { personId } = props;
    const AsyncTypeahead = withAsync(Typeahead);

    const [name, setName] = useState(null);
    const [patronymic, setPatronymic] = useState(null);
    const [surname, setSurname] = useState(null);
    const [lastSurname, setLastSurname] = useState(null);
    const [birthday, setBirthday] = useState(null);
    const [deathday, setDeathday] = useState(null);
    const [genderId, setGenderId] = useState(null);
    const [fatherId, setFatherId] = useState(null);
    const [fatherName, setFatherName] = useState(null);
    const [motherId, setMotherId] = useState(null);
    const [motherName, setMotherName] = useState(null);
    const [about, setAbout] = useState(null);

    const [show, setShow] = useState(false);

    const [options, setOptions] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = async () => {
        setShow(true);
        console.log(personId);
        const res = await fetch("http://localhost:8989/web/person/get-by-id", {
            method: "POST",
            headers: {
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Origin': 'http://localhost:8989',
                'Accept': 'application/json',
                'Content-Type' : 'application/json;charset=UTF-8',
                'X-User-Lang' : 'rus'
            },
            body: JSON.stringify({
                id: personId,
            }),
        });
        const response = await res.json();
        if (res.status === 200) {
            setName(response.name);
            setPatronymic(response.patronymic);
            setSurname(response.surname);
            setLastSurname(response.lastName);
            setBirthday(response.birthday);
            setDeathday(response.deathday);
            setGenderId(response.genderId);
            setFatherId(response.fatherId);
            setFatherName(response.fatherFullName);
            setMotherId(response.motherId);
            setMotherName(response.motherFullName);
            setAbout(response.about);
        } else {
            console.log(response);
        }
    }

    const handleSubmit = async () => {
        try {
            let res = await fetch("http://localhost:8989/web/person/update", {
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
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Form.Label>Отчество</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Отчество"
                                value={patronymic}
                                onChange={(e) => setPatronymic(e.target.value)}
                            />
                            <Form.Label>Фамилия</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Фамилия"
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                            />
                            <Form.Label>Прошлая фамилия</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Прошлая фамилия"
                                value={lastSurname}
                                onChange={(e) => setLastSurname(e.target.value)}
                            />
                            <Form.Label>День рождения</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="День рождения"
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                            />
                            <Form.Label>День смерти</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="День смерти"
                                value={deathday}
                                onChange={(e) => setDeathday(e.target.value)}
                            />
                            <Form.Label>Пол</Form.Label>
                            <Form.Group controlId="gender">
                                <Form.Check
                                    label="муж"
                                    type="radio"
                                    value={1}
                                    aria-label="radio 1"
                                    onChange={(e) => setGenderId(e.target.value)}
                                    checked={genderId === 1}
                                />
                                <Form.Check
                                    label="жен"
                                    type="radio"
                                    value={2}
                                    aria-label="radio 2"
                                    onChange={(e) => setGenderId(e.target.value)}
                                    checked={genderId === 2}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Мама</Form.Label>
                                <AsyncTypeahead
                                    id="basic-example"
                                    labelKey={option => `${option.id}`}
                                    onSearch={(query) => {
                                        fetch("http://localhost:8989/web/autocomplete/get-persons-by-full-name", {
                                                method: "POST",
                                                headers: {
                                                'Access-Control-Allow-Methods': 'POST',
                                                'Access-Control-Allow-Origin': 'http://localhost:8989',
                                                'Accept': 'application/json',
                                                'Content-Type' : 'application/json;charset=UTF-8',
                                                'X-User-Lang' : 'rus'
                                            },
                                                body: JSON.stringify({
                                                name: query,
                                                patronymic: patronymic,
                                                surname: surname
                                            }),
                                            })
                                            .then(response => response.json())
                                            .then(json => setOptions(json))
                                    }}
                                    options={options}
                                    placeholder="Мама">
                                </AsyncTypeahead>
                            </Form.Group>

                            {/*<Form.Select*/}
                            {/*    type="text"*/}
                            {/*    placeholder="Мама"*/}
                            {/*    value={motherId}*/}
                            {/*    onChange={(e) => setMotherId(e.target.value)}*/}
                            {/*/>*/}
                            <Form.Label>Папа</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Папа"
                                value={fatherId}
                                aria-label={fatherName}
                                onChange={(e) => setFatherId(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>О человеке</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={about}
                                onChange={(e) => setAbout(e.target.value)} />
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

export default PersonEdit