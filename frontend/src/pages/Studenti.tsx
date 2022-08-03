import { Table, ButtonGroup, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import ModalEditStud from "../components/ModalEditStud";
import ModalHistory from "../components/ModalHistory";

interface dataStudent {
  rodCislo: string;
  _id: string;
  name: string;
  lastname: string;
  address: string;
  email: string;
}

const Studenti = () => {
  const [data, setData] = useState<dataStudent[]>([]);
  const [loaded, setLoaded] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/students/`)
      .then((response) => setData(response.data));
    setLoaded(true);
  }, [loaded]);

  return (
    <Container fluid>
      <Table hover size="sm" responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Meno</th>
            <th>Preizvisko</th>
            <th>Bydlisko</th>
            <th>E-mail</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: dataStudent, index) => {
            return (
              <tr key={item._id}>
                <td>{item.rodCislo}</td>
                <td>{item.name}</td>
                <td>{item.lastname}</td>
                <td>{item.address}</td>
                <td>{item.email}</td>
                <td>
                  <ButtonGroup aria-label="Basic example">
                    <ModalEditStud id={item._id} change={setLoaded} />
                    <ModalHistory idStud={item._id} />
                  </ButtonGroup>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default Studenti;
