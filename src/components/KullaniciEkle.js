import React, { useState } from "react";
import { Container, Form, Row, Col, Button, FormGroup, Label, Input, FormText } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function KullaniciEkle() {
  const [formData, setFormData] = useState({
    adi: "",
    soyadi: "",
    adres: "",
    kullaniciMuvcutMu: false,
    email: "",
    kisiselTelefon: "",
    kayitTarihi: "",
    cikisTarihi: "",
    kullaniciSifre: "",
    veliBilgileriDTO: {
      veliAdi: "",
      veliSoyadi: "",
      veliTelefon: "",
      veliNotu: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("veli")) {
      setFormData({
        ...formData,
        veliBilgileriDTO: {
          ...formData.veliBilgileriDTO,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8088/api/kullanici-bilgi/kullanici-ekle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Kullanıcı başarıyla eklendi!");
      } else {
        alert("Kullanıcı ekleme işlemi başarısız!");
      }
    } catch (error) {
      console.error("Hata:", error);
      alert("Sunucuya bağlanılamadı!");
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Kullanıcı Ekle</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label>Adı</Label>
              <Input type="text" name="adi" value={formData.adi} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <Label>Soyadı</Label>
              <Input type="text" name="soyadi" value={formData.soyadi} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <Label>Email</Label>
              <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <Label>Telefon</Label>
              <Input type="tel" name="kisiselTelefon" value={formData.kisiselTelefon} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <Label>Adres</Label>
              <Input type="text" name="adres" value={formData.adres} onChange={handleChange} required />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Label>Şifre</Label>
              <Input type="password" name="kullaniciSifre" value={formData.kullaniciSifre} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <Label>Kayıt Tarihi</Label>
              <Input type="date" name="kayitTarihi" value={formData.kayitTarihi} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <Label>Çıkış Tarihi</Label>
              <Input type="date" name="cikisTarihi" value={formData.cikisTarihi} onChange={handleChange} />
            </FormGroup>

            <h4 className="mt-4">Veli Bilgileri</h4>
            <FormGroup>
              <Label>Veli Adı</Label>
              <Input type="text" name="veliAdi" value={formData.veliBilgileriDTO.veliAdi} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <Label>Veli Soyadı</Label>
              <Input type="text" name="veliSoyadi" value={formData.veliBilgileriDTO.veliSoyadi} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <Label>Veli Telefon</Label>
              <Input type="tel" name="veliTelefon" value={formData.veliBilgileriDTO.veliTelefon} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <Label>Veli Notu</Label>
              <Input type="textarea" name="veliNotu" value={formData.veliBilgileriDTO.veliNotu} onChange={handleChange} required />
            </FormGroup>
          </Col>
        </Row>

        <Button color="primary" type="submit" className="mt-3">Kullanıcı Ekle</Button>
      </Form>
    </Container>
  );
}

export default KullaniciEkle;
