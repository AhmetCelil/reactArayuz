import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";
import KullaniciListesi from "./components/KullaniciListesi";
import KullaniciIzinListesi from "./components/KullaniciIzinListesi";
import KullaniciEkle from "./components/KullaniciEkle";  // Yeni bileşeni içe aktardık
import KullaniciGuncelle from "./components/KullaniciGuncelle";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<KullaniciListesi />} />
        <Route path="/kullanici-ekle" element={<KullaniciEkle />} />
        <Route path="/kullanici-guncelle" element={<KullaniciGuncelle />} />
        <Route path="/kullanici-verileri" element={<KullaniciListesi />} />
      </Routes>
    </Router>
  );
}

export default App;
