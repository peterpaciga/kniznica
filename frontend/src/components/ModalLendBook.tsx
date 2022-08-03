import axios from "axios";
import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { isEmpty } from "lodash";
import { useForm } from "react-hook-form";
interface dataStud {
  rodCislo: string;
  _id: string;
  name: string;
  lastname: string;
  address: string;
  email: string;
}
interface props {
  id: string | undefined;
  idBook: string;
  change: Dispatch<SetStateAction<boolean>>;
}
interface dataForm {
  rodCislo: string;
}
const ModalLendBook = ({ id, idBook, change }: props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    reset();
  };

  const handleShow = () => setShow(true);

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    reset,
  } = useForm<dataForm>({ mode: "onChange" });

  const onSubmit = handleSubmit(async (dataForm) => {
    const rodCislo = dataForm.rodCislo;
    const response = await axios.post(
      `http://localhost:5000/students/studInLib/${id}/${rodCislo}`
    );
    if (!isEmpty(response.data)) {
      const id = response.data.map((item: dataStud) => item._id);
      await axios.post(`http://localhost:5000/books/lendBook/${idBook}/${id}`);
      handleClose();
      reset();
      change(false);
    } else {
      reset();
      alert("Dane rodne cislo nie je priradene tejto kniznici");
    }
  });

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Pozicat
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Pozicat knihu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="lendBookForm" onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Zadaj rodne cislo studenta</Form.Label>
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
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            type="submit"
            form="lendBookForm"
            disabled={!isValid}
          >
            Pozicaj
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalLendBook;
