import { Table, Button, ButtonGroup, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ModalEditStud from "../components/ModalEditStud";

interface dataStudent {
  _id: string;
  rodCislo: string;
  name: string;
  lastname: string;
  address: string;
  email: string;
}

const addStudToLibrary = (idStud: string, id: string | undefined) => {
  axios.post(
    `${process.env.REACT_APP_API_URL}/students/addToLib/${id}/${idStud}`
  );
};

const NovyStudent = () => {
  const { id } = useParams();
  const [data, setData] = useState<dataStudent[]>([]);
  const [loaded, setLoaded] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/students/getStudOutOfLib/${id}`)
      .then((response) => setData(response.data));
    setLoaded(true);
  }, [loaded]);

  return (
    <Container fluid>
      <Table striped>
        <thead>
          <tr>
            <th>Rodne cislo</th>
            <th>Meno</th>
            <th>Prizvisko</th>
            <th>Bydlisko</th>
            <th>E-mail</th>
            <th>Moznosti</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: dataStudent) => {
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
                    <Button
                      variant="success"
                      onClick={() => {
                        addStudToLibrary(item._id, id);
                        setLoaded(false);
                      }}
                    >
                      Pridat do kniznice
                    </Button>
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

export default NovyStudent;
