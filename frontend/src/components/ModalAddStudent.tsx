import "../styles.css";
import { Button, Card, Form, Modal } from "react-bootstrap";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

interface props {
  id: string | undefined;
}

interface dataForm {
  rodCislo: string;
  name: string;
  lastname: string;
  address: string;
  email: string;
}

const ModalWindowAddStudent = ({ id }: props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    reset,
  } = useForm<dataForm>({ mode: "onChange" });

  const onSubmit = handleSubmit(async (data) => {
    const rodCislo = data.rodCislo;
    const name = data.name;
    const lastname = data.lastname;
    const address = data.address;
    const email = data.email;
    const body = { rodCislo, name, lastname, address, email };
    axios.post(`http://localhost:5000/students/add/${id}`, body).catch(() => {
      alert("Dane rodne cislo je uz v systeme");
    });
    reset({ rodCislo: "", name: "", lastname: "", address: "", email: "" });
  });

  return (
    <div style={{ width: "20rem", height: "20rem" }}>
      <Card
        onClick={handleShow}
        bg="success"
        key="Success"
        text="dark"
        style={{ width: "18rem", height: "18rem", cursor: "pointer" }}
        className="mb-2"
      >
        <Card.Body>
          <Card.Title style={{ textAlign: "center", marginTop: "1rem" }}>
            Pridat studenta
          </Card.Title>
          <Card.Text style={{ textAlign: "center", marginTop: "3rem" }}>
            Zobrazi formular na pridanie studenta do systemu
          </Card.Text>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Pridat studenta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="addStudForm" onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Rodne cislo</Form.Label>
              <Form.Control
                placeholder="Rodne cislo bez lomitka"
                autoFocus
                {...register("rodCislo", {
                  value: "",
                  required: "Toto je povinne pole",
                  pattern: {
                    value: /^\d+$/,
                    message: "Zadaj v tvare bez lomky.Povolene iba cisla",
                  },
                })}
                style={
                  errors.rodCislo && {
                    borderColor: "red",
                    borderWidth: "0.1rem",
                  }
                }
              />
              {errors.rodCislo && (
                <div style={{ color: "red" }}>{errors.rodCislo.message}</div>
              )}
              <Form.Label>Meno</Form.Label>
              <Form.Control
                placeholder="Meno"
                {...register("name", {
                  value: "",
                  required: "Toto je povinne pole",
                })}
                style={
                  errors.name && {
                    borderColor: "red",
                    borderWidth: "0.1rem",
                  }
                }
              />
              {errors.name && (
                <div style={{ color: "red" }}>{errors.name.message}</div>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Priezvisko</Form.Label>
              <Form.Control
                placeholder="Priezvisko"
                {...register("lastname", {
                  value: "",
                  required: "Toto je povinne pole",
                })}
                style={
                  errors.lastname && {
                    borderColor: "red",
                    borderWidth: "0.1rem",
                  }
                }
              />
              {errors.lastname && (
                <div style={{ color: "red" }}>{errors.lastname.message}</div>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Bydlisko</Form.Label>
              <Form.Control
                placeholder="ulica,mesto"
                {...register("address", {
                  value: "",
                  required: "Toto je povinne pole",
                })}
                style={
                  errors.address && {
                    borderColor: "red",
                    borderWidth: "0.1rem",
                  }
                }
              />
              {errors.address && (
                <div style={{ color: "red" }}>{errors.address.message}</div>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                placeholder="name@example.com"
                {...register("email", {
                  value: "",
                  required: "Toto je povinne pole",
                  pattern: {
                    value: /^\S+[A-Za-z0-9]+@([a-zA-Z]+\.)+[a-zA-Z]/,
                    message: "Nespravny tvar. Zadaj v tvare example@mail.com",
                  },
                })}
                style={
                  errors.email && {
                    borderColor: "red",
                    borderWidth: "0.1rem",
                  }
                }
              />
              {errors.email && (
                <div style={{ color: "red" }}>{errors.email.message}</div>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            type="submit"
            form="addStudForm"
            disabled={!isValid}
          >
            Pridat studenta
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalWindowAddStudent;
