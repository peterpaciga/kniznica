import "../styles.css";
import { Dispatch, SetStateAction } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

interface props {
  change: Dispatch<SetStateAction<boolean>>;
}

interface dataForm {
  nameLib: string;
  address: string;
}

const ModalWindowAddLibrary = ({ change }: props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    change(false);
  };

  const handleShow = () => setShow(true);

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    reset,
  } = useForm<dataForm>({ mode: "onChange" });

  const onSubmit = handleSubmit((data) => {
    const name = data.nameLib;
    const address = data.address;
    const body = { name, address };
    axios.post("http://localhost:5000/libraries/add", body);
    reset({ nameLib: "", address: "" });
  });
  return (
    <>
      <div
        className="d-grid gap-2"
        style={{ padding: "2px", paddingBottom: "5px" }}
      >
        <Button variant="primary" size="lg" onClick={handleShow}>
          Pridat kniznicu
        </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Pridat studenta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="addLibraryForm" onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nazov kniznice</Form.Label>
              <Form.Control
                autoFocus
                {...register("nameLib", {
                  value: "",
                  required: "Toto je povinne pole",
                  pattern: {
                    value: /^\S+[A-Za-z0-9]+/,
                    message: "Nespravny typ",
                  },
                })}
                style={
                  errors.nameLib && {
                    borderColor: "red",
                    borderWidth: "0.1rem",
                  }
                }
              />
              {errors.nameLib && (
                <div style={{ color: "red" }}>{errors.nameLib.message}</div>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
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
          <Button
            variant="primary"
            type="submit"
            form="addLibraryForm"
            disabled={!isValid}
          >
            Pridat kniznicu
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalWindowAddLibrary;
