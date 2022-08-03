import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

interface dataLibrary {
  name: string;
  address: string;
}

interface props {
  id: string;
  change: Dispatch<SetStateAction<boolean>>;
}

const ModalWindowEditLibrary = ({ id, change }: props) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState<dataLibrary>({
    name: "",
    address: "",
  });

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
  } = useForm<dataLibrary>({
    defaultValues: data,
  });

  useEffect(() => {
    axios.get("http://localhost:5000/libraries/getOne/" + id).then((res) => {
      setData(res.data);
      reset(res.data);
    });
  }, [reset, id]);

  const onSubmit = handleSubmit((dataForm) => {
    const name = dataForm.name;
    const address = dataForm.address;
    const body = { id, name, address };
    axios.post(`http://localhost:5000/libraries/update`, body);
    handleClose();
  });

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Editovat udaje
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editacia udajov kniznice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="editLibraryForm" onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nazov kniznice</Form.Label>
              <Form.Control
                autoFocus
                {...register("name", {
                  value: "",
                  required: "Toto je povinne pole",
                  pattern: {
                    value: /^\S+[A-Za-z0-9]+/,
                    message: "Nespravny typ",
                  },
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
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Adresa kniznice</Form.Label>
              <Form.Control
                {...register("address", {
                  value: "",
                  required: "Toto je povinne pole",
                  pattern: {
                    value: /^\S+[A-Za-z0-9]+/,
                    message: "Nespravny typ",
                  },
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" variant="primary" form="editLibraryForm">
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

export default ModalWindowEditLibrary;
