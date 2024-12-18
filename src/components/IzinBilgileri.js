import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function IzinBilgileri() {
  const { kullaniciId } = useParams(); // URL parametresini al
  const [izinler, setIzinler] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8088/izin/listele?kullaniciId=${kullaniciId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Hatası! Durum: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setIzinler(data))
      .catch((error) => console.error("İzin bilgileri alınamadı:", error));
  }, [kullaniciId]);

  return (
    <div className="container mt-4">
      <h3>Kullanıcı {kullaniciId} İzin Bilgileri</h3>

      {izinler.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Adı</th>
              <th>Soyadı</th>
              <th>İzin Başlangıç Tarihi</th>
              <th>İzin Bitiş Tarihi</th>
            </tr>
          </thead>
          <tbody>
            {izinler.map((izin, index) => (
              <tr key={index}>
                <td>{izin.adi}</td>
                <td>{izin.soyadi}</td>
                <td>{izin.izinBaslangicTarihi}</td>
                <td>{izin.izinBitisTarihi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>İzin bilgisi bulunamadı.</p>
      )}
    </div>
  );
}

export default IzinBilgileri;
