import React, { useState, useEffect } from "react";

function KullaniciListesi() {
  const [kullanicilar, setKullanicilar] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8088/api/kullanici-bilgi/tüm-kullanici-bilgilerini-getirir")
      .then((response) => response.json())
      .then((data) => setKullanicilar(data))
      .catch((error) => console.error("Veri alma hatası:", error));
  }, []);

  return (
    <div>
      <h1>Kullanıcı Listesi</h1>
      <table>
        <thead>
          <tr>
            <th>Adı</th>
            <th>Soyadı</th>
            <th>Email</th>
            <th>Telefon</th>
            <th>Adres</th>
            <th>Şifre</th>
            <th>Kayıt Tarihi</th>
          </tr>
        </thead>
        <tbody>
          {kullanicilar.map((kullanici) => (
            <tr key={kullanici.id}>
              <td>{kullanici.adi}</td>
              <td>{kullanici.soyadi}</td>
              <td>{kullanici.email}</td>
              <td>{kullanici.kisiselTelefon}</td>
              <td>{kullanici.adres}</td>
              <td>{kullanici.kullaniciSifre}</td>
              <td>{kullanici.kayitTarihi}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default KullaniciListesi;
