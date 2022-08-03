import { Table, Button, ButtonGroup, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import ModalWindowAddLibrary from "../components/ModalAddLibrary";
import ModalWindowEditLibrary from "../components/ModalEditLibrary";
import { Link } from "react-router-dom";

interface dataLibraries {
  _id: string;
  name: string;
  address: string;
}

const deleteLibrary = (id: string) => {
  axios.post(`${process.env.REACT_APP_API_URL}/libraries/delete/${id}`);
};

const deleteLibraryFromUsers = (id: string) => {
  axios.post(`${process.env.REACT_APP_API_URL}/students/libDeleted/${id}`);
};

const Kniznice = () => {
  const [data, setData] = useState<dataLibraries[]>([]);
  const [loaded, setLoaded] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/libraries/`)
      .then((response) => setData(response.data));
    setLoaded(true);
  }, [loaded]);

  return (
    <Container fluid>
      <div>
        <ModalWindowAddLibrary change={setLoaded} />
        <Table striped style={{ alignContent: "center" }}>
          <thead>
            <tr>
              <th>Nazov</th>
              <th>Adresa</th>
              <th>Moznosti</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: dataLibraries) => {
              return (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.address}</td>
                  <td>
                    <ButtonGroup aria-label="Basic example">
                      <Link to={`/kniznica/${item._id}`}>
                        <Button variant="info">Do kniznice</Button>
                      </Link>
                      <ModalWindowEditLibrary
                        id={item._id}
                        change={setLoaded}
                      />
                      <Button
                        variant="danger"
                        onClick={() => {
                          deleteLibrary(item._id);
                          setLoaded(false);
                          deleteLibraryFromUsers(item._id);
                        }}
                      >
                        Vymazat kniznicu
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};
export default Kniznice;
