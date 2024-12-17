import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function KullaniciListesi() {
  const [kullanicilar, setKullanicilar] = useState([]);
  const [detaylar, setDetaylar] = useState({});

  useEffect(() => {
    fetch("http://localhost:8088/api/kullanici-bilgi/tüm-kullanici-bilgilerini-getirir")
      .then((response) => response.json())
      .then((data) => setKullanicilar(data))
      .catch((error) => console.error("Veri alma hatası:", error));
  }, []);

  const bilgiGetir = async (email, kullaniciId, tur) => {
    let endpoint = "";
    switch (tur) {
      case "veli":
        endpoint = `/api/kullanici-bilgi/veli-bilgileri?email=${email}&kullaniciId=${kullaniciId}`;
        break;
      case "izin":
        endpoint = `/api/kullanici-bilgi/izin-bilgileri?email=${email}&kullaniciId=${kullaniciId}`;
        break;
      case "konum":
        endpoint = `/api/konum-bilgi/getir?email=${email}`;
        break;
      default:
        return;
    }
  
    try {
      const response = await fetch(`http://localhost:8088${endpoint}`);
      const data = await response.json();
      setDetaylar((prev) => ({
        ...prev,
        [email]: { ...prev[email], [tur]: data },
      }));
    } catch (error) {
      console.error(`${tur} bilgileri alınamadı:`, error);
    }
  };
  

  return (
    <div className="container mt-4">
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Adı</th>
            <th>Soyadı</th>
            <th>Email</th>
            <th>Telefon</th>
            <th>Adres</th>
            <th>Şifre</th>
            <th>Kayıt Tarihi</th>
            <th>Çıkış Tarihi</th>
            <th>İşlemler</th>
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
              <td>{kullanici.cikisTarihi}</td>
              <td>
                <button
                  className="btn btn-info btn-sm me-2"
                  onClick={() => bilgiGetir(kullanici.id, "veli")}
                >
                  Veli Bilgileri
                </button>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => bilgiGetir(kullanici.id, "izin")}
                >
                  İzin Bilgileri
                </button>
                <button className="btn btn-success btn-sm">
                <Link to={`/konum/${kullanici.email}`} className="text-white text-decoration-none">
                  Konum Bilgileri
                </Link>
              </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        {Object.entries(detaylar).map(([kullaniciId, bilgiler]) => (
          <div key={kullaniciId} className="card mb-3">
            <div className="card-header">{kullaniciId} için Detaylar</div>
            <div className="card-body">
              {Object.entries(bilgiler).map(([tur, veri]) => (
                <div key={tur} className="mb-2">
                  <h5>{tur.toUpperCase()} Bilgileri:</h5>
                  <pre>{JSON.stringify(veri, null, 2)}</pre>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default KullaniciListesi;
