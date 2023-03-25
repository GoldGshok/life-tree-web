import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {AsyncTypeahead} from "react-bootstrap-typeahead";

export function CreatePerson({onJournalUpdate}) {

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

    const [options, setOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => setShow(true);

    const handleSearch = (query, genderId) => {
        setIsLoading(true);

        const fio = query.split(" ");

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
                name: fio[1],
                patronymic: fio[2],
                surname: fio[0],
                genderId : genderId
            }),
        })
            .then(response => response.json())
            .then(json => {
                const persons = json.items.map(item => ({
                    id: item.id,
                    name: item.surname + ' ' + item.name + ' ' + item.patronymic
                }));
                setOptions(persons);
                setIsLoading(false);
            })
            .catch(e => {
                console.error(e);
                setIsLoading(false);
            });
    };

    const handleSubmit = async () => {
        try {
            let response = await fetch("http://localhost:8989/web/person/create", {
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
            if (response.status === 200) {
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
                onJournalUpdate();
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
                            <AsyncTypeahead
                                id="mother-autocomplete"
                                isLoading={isLoading}
                                filterBy={() => true}
                                labelKey="name"
                                minLength={3}
                                onSearch={query => handleSearch(query, 2)}
                                options={options}
                                onChange={selected => {
                                    const selectedMother = selected[0];
                                    if (selectedMother) {
                                        setMotherId(selectedMother.id);
                                    } else {
                                        setMotherId(null);
                                    }
                                }}
                                placeholder="Фамилия Имя Отчество">
                            </AsyncTypeahead>
                            <Form.Label>Папа</Form.Label>
                            <AsyncTypeahead
                                id="father-autocomplete"
                                isLoading={isLoading}
                                filterBy={() => true}
                                labelKey="name"
                                minLength={3}
                                onSearch={query => handleSearch(query, 1)}
                                options={options}
                                onChange={selected => {
                                    const selectedFather = selected[0];
                                    if (selectedFather) {
                                        setFatherId(selectedFather.id);
                                    } else {
                                        setFatherId(null);
                                    }
                                }}
                                placeholder="Фамилия Имя Отчество"
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