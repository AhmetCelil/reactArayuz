import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function KonumBilgileri() {
  const { email } = useParams();
  const [konumBilgileri, setKonumBilgileri] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:8088/api/konum-bilgi/getir?email=${email}`);
        if (!response.ok) {
          throw new Error("API isteği başarısız oldu!");
        }
        const data = await response.json();
        console.log("Gelen Veri:", data);
  
        if (data && data.konumBilgileri) {
          const enrichedData = await Promise.all(
            data.konumBilgileri.map(async (konum) => {
              const address = await getReverseGeocoding(konum.enlem, konum.boylam);
              return { ...konum, address };
            })
          );
          setKonumBilgileri(enrichedData);
        } else {
          console.error("Beklenen veri yapısı yok.");
        }
      } catch (error) {
        console.error("Konum bilgileri alınamadı:", error);
      }
    }
  
    fetchData();
  }, [email]);
  
  
  // OpenStreetMap Reverse Geocoding API'den adres verisini alan fonksiyon
  async function getReverseGeocoding(lat, lon) {
    const apiUrl = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
  
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("API isteği başarısız oldu!");
      }
      const data = await response.json();
      return data.display_name || "Adres bulunamadı";
    } catch (error) {
      console.error("Reverse Geocoding hatası:", error);
      return "Adres alınamadı";
    }
  }
  
  
  

  return (
    <div className="container mt-4">
      <h2>{email} için Konum Bilgileri</h2>
      {konumBilgileri.length > 0 ? (
        <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Enlem</th>
            <th>Boylam</th>
            <th>Adres</th>
          </tr>
        </thead>
        <tbody>
          {konumBilgileri.length > 0 ? (
            konumBilgileri.map((konum, index) => (
              <tr key={index}>
                <td>{konum.enlem || "Bilinmiyor"}</td>
                <td>{konum.boylam || "Bilinmiyor"}</td>
                <td>{konum.address || "Adres Yok"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Veri bulunamadı</td>
            </tr>
          )}
        </tbody>
      </table>
      
      
      ) : (
        <p>Konum bilgisi bulunamadı.</p>
      )}
    </div>
  );
}

export default KonumBilgileri;
