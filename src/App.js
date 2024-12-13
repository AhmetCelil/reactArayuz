import React from "react";
import { Container, Row, Col } from "reactstrap";  // Bootstrap Container ve Row, Col bileşenlerini içe aktarıyoruz
import KullaniciListesi from "./components/KullaniciListesi";
import KullaniciIzinListesi from "./components/KullaniciIzinListesi";
import 'bootstrap/dist/css/bootstrap.min.css';  // Bootstrap CSS

function App() {
  return (
    <Container className="App">
      {/* İlk Row, birinci sütun solda, ikinci sütun sağda */}
      <Row>
        {/* Kullanıcı Listesi Solda */}
        <Col sm="6">
          <KullaniciListesi />
        </Col>
        
        {/* Kullanıcı İzin Listesi Sağda */}
        <Col sm="6">
          <KullaniciIzinListesi />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
