import React, { useState } from "react";

function KullaniciGuncelle() {
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState(null);

  // Arama fonksiyonu
  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:8088/api/kullanici-bilgi/ara?email=${email}`);
      if (response.ok) {
        const data = await response.json();
        setFormData(data);
      } else {
        alert("Kullanıcı bulunamadı.");
      }
    } catch (error) {
      console.error("Hata:", error);
      alert("Sunucuya bağlanılamadı!");
    }
  };

  // Form değişiklikleri
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Güncelleme işlemi
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8088/api/kullanici-bilgi/guncelle?id=${formData.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Kullanıcı başarıyla güncellendi!");
      } else {
        alert("Güncelleme işlemi başarısız!");
      }
    } catch (error) {
      console.error("Hata:", error);
      alert("Sunucuya bağlanılamadı!");
    }
  };

  return (
    <div>
      <h2>Kullanıcı Güncelle</h2>
      <label>Email ile Ara:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button onClick={handleSearch}>Ara</button>

      {formData && (
        <form onSubmit={handleSubmit}>
          <label>Adı:</label>
          <input
            type="text"
            name="adi"
            value={formData.adi}
            onChange={handleChange}
            required
          />

          <label>Soyadı:</label>
          <input
            type="text"
            name="soyadi"
            value={formData.soyadi}
            onChange={handleChange}
            required
          />

          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Telefon:</label>
          <input
            type="tel"
            name="kisiselTelefon"
            value={formData.kisiselTelefon}
            onChange={handleChange}
            required
          />

          <label>Adres:</label>
          <input
            type="text"
            name="adres"
            value={formData.adres}
            onChange={handleChange}
            required
          />

          <button type="submit">Güncelle</button>
        </form>
      )}
    </div>
  );
}

export default KullaniciGuncelle;
