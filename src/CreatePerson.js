import { useState } from "react";

export function CreatePerson() {

    const [name, setName] = useState("");
    const [patronymic, setPatronymic] = useState("");
    const [surname, setSurname] = useState("");
    const [lastSurname, setLastSurname] = useState("");
    const [birthday, setBirthday] = useState("");
    const [deathday, setDeathday] = useState("");
    const [genderId, setGenderId] = useState("");
    const [fatherId, setFatherId] = useState("");
    const [motherId, setMotherId] = useState("");
    const [about, setAbout] = useState("");
    const [message, setMessage] = useState("");


    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch("http://localhost:8989/web/person/create", {
                method: "POST",
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
            await res.json();
            if (res.status === 200) {
                this.setName("");
                this.setPatronymic("");
                this.setSurname("");
                this.setLastSurname("");
                this.setBirthday("");
                this.setDeathday("");
                this.setGenderId("");
                this.setFatherId("");
                this.setMotherId("");
                this.setAbout("");
                setMessage("User created successfully");
            } else {
                setMessage("Some error occured");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={name}
                placeholder="Имя"
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                value={patronymic}
                placeholder="Отчество"
                onChange={(e) => this.setPatronymic(e.target.value)}
            />
            <input
                type="text"
                value={surname}
                placeholder="Фамилия"
                onChange={(e) => this.setSurname(e.target.value)}
            />
            <input
                type="text"
                value={lastSurname}
                placeholder="Предыдущая фамилия"
                onChange={(e) => this.setLastSurname(e.target.value)}
            />
            <input
                type="date"
                value={birthday}
                placeholder="Дата рождения"
                onChange={(e) => this.setBirthday(e.target.value)}
            />
            <input
                type="date"
                value={deathday}
                placeholder="Дата смерти"
                onChange={(e) => this.setDeathday(e.target.value)}
            />
            <input
                type="text"
                value={genderId}
                placeholder="Пол"
                onChange={(e) => this.setGenderId(e.target.value)}
            />
            <input
                type="text"
                value={fatherId}
                placeholder="Папа"
                onChange={(e) => this.setFatherId(e.target.value)}
            />
            <input
                type="text"
                value={motherId}
                placeholder="Мама"
                onChange={(e) => this.setMotherId(e.target.value)}
            />
            <input
                type="text"
                value={about}
                placeholder="О человеке"
                onChange={(e) => this.setAbout(e.target.value)}
            />

            <button type="submit">Create</button>
            <div className="message">{message ? <p>{message}</p> : null}</div>
        </form>
    );

}