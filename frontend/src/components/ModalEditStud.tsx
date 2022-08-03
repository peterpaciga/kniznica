import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

interface props {
  id: string;
  change: Dispatch<SetStateAction<boolean>>;
}

interface dataStud {
  rodCislo: string;
  _id: string;
  name: string;
  lastname: string;
  address: string;
  email: string;
}

const ModalEditStud = ({ id, change }: props) => {
  const [data, setData] = useState<dataStud>({
    rodCislo: "",
    _id: "",
    name: "",
    lastname: "",
    address: "",
    email: "",
  });

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    change(false);
  };

  const handleShow = () => setShow(true);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<dataStud>({
    defaultValues: data,
  });

  useEffect(() => {
    axios.get("http://localhost:5000/students/getOne/" + id).then((res) => {
      setData(res.data);
      reset(res.data);
    });
  }, [reset, id]);

  const onSubmit = handleSubmit((dataForm) => {
    const rodCislo = dataForm.rodCislo;
    const name = dataForm.name;
    const lastname = dataForm.lastname;
    const address = dataForm.address;
    const email = dataForm.email;
    const body = { id, rodCislo, name, lastname, address, email };
    if (
      rodCislo !== data.rodCislo ||
      name !== data.name ||
      lastname !== data.lastname ||
      address !== data.address ||
      email !== data.email
    ) {
      axios
        .post(`http://localhost:5000/students/updateStud`, body)
        .catch(() => {
          reset();
          alert("Zadane rodne cislo ma priradene iny student");
        });
    }
    handleClose();
  });

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Editovat udaje
      </Button>

      <Modal show={show} onHide={handleClose} onExit={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editacia udajov studenta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="editStudForm" onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Rodne cislo</Form.Label>
              <Form.Control
                autoFocus
                {...register("rodCislo", {
                  required: "Povinne",
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
                {...register("name", { required: "Povinne" })}
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
                {...register("lastname", { required: "Povinne" })}
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
                {...register("address", { required: "Povinne" })}
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
                {...register("email", {
                  required: "Povinne",
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
          <Button variant="primary" type="submit" form="editStudForm">
            Save Changes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEditStud;
