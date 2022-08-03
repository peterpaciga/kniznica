import "../styles.css";
import { Button, Card, Form, Modal } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

interface props {
  idlib: string | undefined;
}

interface dataForm {
  nameBook: string;
  author: string;
}

const ModalWindowAddBook = ({ idlib }: props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    reset,
  } = useForm<dataForm>({ mode: "onChange" });

  const onSubmit = handleSubmit((data) => {
    const name = data.nameBook;
    const author = data.author;
    const body = { name, author };
    axios.post("http://localhost:5000/books/addBook/" + idlib, body);
    reset({ nameBook: "", author: "" });
  });

  return (
    <>
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
              Pridat knihu
            </Card.Title>
            <Card.Text style={{ textAlign: "center", marginTop: "3rem" }}>
              Zobrazi formular na pridanie knihy do systemu kniznice
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Pridat knihu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="addBookForm" onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nazov knihy</Form.Label>
              <Form.Control
                {...register("nameBook", {
                  value: "",
                  required: "Toto je povinne pole",
                  pattern: {
                    value: /^\S+[A-Za-z0-9]+/,
                    message: "Nespravny typ",
                  },
                })}
                style={
                  errors.nameBook && {
                    borderColor: "red",
                    borderWidth: "0.1rem",
                  }
                }
              />
              {errors.nameBook && (
                <div style={{ color: "red" }}>{errors.nameBook.message}</div>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Autor knihy</Form.Label>
              <Form.Control
                {...register("author", {
                  value: "",
                  required: "Toto je povinne pole",
                  pattern: {
                    value: /^\S+[a-zA-Z]+/,
                    message: "Nespravny typ. Povolene len velke male pismena",
                  },
                })}
                style={
                  errors.author && {
                    borderColor: "red",
                    borderWidth: "0.1rem",
                  }
                }
              />
              {errors.author && (
                <div style={{ color: "red" }}>{errors.author.message}</div>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            variant="primary"
            form="addBookForm"
            disabled={!isValid}
          >
            Pridat knihu
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalWindowAddBook;
