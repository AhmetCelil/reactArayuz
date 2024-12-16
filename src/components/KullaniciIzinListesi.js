import React, { useState, useEffect } from "react";

function KullaniciIzinListesi() {
  const [izinler, setIzinler] = useState([]);

  // Veriyi API'den alma
  useEffect(() => {
    fetch("http://localhost:8088/izin/tum-kullanici-izin-listele")
      .then((response) => response.json())
      .then((data) => setIzinler(data))
      .catch((error) => console.error("Veri alma hatası:", error));
  }, []);

  return (
    <div className="container mt-4">
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Adı</th>
            <th>Soyadı</th>
            <th>İzin Başlangıç Tarihi</th>
            <th>İzin Bitiş Tarihi</th>
          </tr>
        </thead>
        <tbody>
          {izinler.length > 0 ? (
            izinler.map((izin, index) => (
              <tr key={index}>
                <td>{izin.adi}</td>
                <td>{izin.soyadi}</td>
                <td>{izin.izinBaslangicTarihi}</td>
                <td>{izin.izinBitisTarihi}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                Veri bulunamadı.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default KullaniciIzinListesi;
