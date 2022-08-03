import axios from "axios";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import moment from "moment";

interface books {
  _id: string;
  name: string;
  author: string;
  history: {
    idStud: string;
    date_burrow: string;
    last_date_to_return: string;
    date_return: string;
  };
}

interface props {
  idStud: string;
}

const ModalHistory = ({ idStud }: props) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState<books[]>([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getHistories = () => {
    axios
      .get(`http://localhost:5000/books/getStudHistory/${idStud}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        Historia
      </Button>

      <Modal
        size="lg"
        scrollable
        show={show}
        onHide={handleClose}
        onEnter={getHistories}
      >
        <Modal.Header closeButton>
          <Modal.Title>Historia</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container fluid>
            <div>
              <Table striped>
                <thead>
                  <tr>
                    <th>Nazov Knihy</th>
                    <th>Autor</th>
                    <th>Datum pozicania</th>
                    <th>Expiracia pozicania</th>
                    <th>Datum vratenia</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => {
                    return (
                      <tr
                        key={item._id}
                        style={
                          item.history.date_return === "notReturned" &&
                          moment(
                            item.history.last_date_to_return
                          ).isSameOrBefore(moment(new Date()))
                            ? { backgroundColor: "red" }
                            : {}
                        }
                      >
                        <td>{item.name}</td>
                        <td>{item.author}</td>
                        <td>{item.history.date_burrow}</td>
                        <td>{item.history.last_date_to_return}</td>
                        <td>{item.history.date_return}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalHistory;
