import React, { useState } from "react";

function KullaniciGuncelle() {
  const [adi, setAdi] = useState("");
  const [soyadi, setSoyadi] = useState("");
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState(null);

  // Arama fonksiyonu
  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:8088/api/kullanici-bilgi/arama?adi=${adi || ""}&soyadi=${soyadi || ""}&email=${email || ""}`
      );
      if (response.ok) {
        const data = await response.json();
        setFormData(data); // Gelen veriyi state'e at
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
    e.preventDefault(); // Formun varsayılan davranışını engelle

    try {
      const response = await fetch(`http://localhost:8088/api/kullanici-bilgi/kullanici-guncelle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Tüm form verilerini gönder
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

  const containerStyle = {
    width: "80%",
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const headerStyle = {
    textAlign: "center",
    fontSize: "24px",
    color: "#333",
  };

  const labelStyle = {
    display: "block",
    fontWeight: "bold",
    marginTop: "10px",
    color: "#555",
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    marginTop: "5px",
    marginBottom: "15px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "16px",
  };

  const buttonStyle = {
    padding: "10px 20px",
    fontSize: "16px",
    color: "white",
    backgroundColor: "#28a745",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  };

  const buttonHoverStyle = {
    backgroundColor: "#218838",
  };

  const searchButtonStyle = {
    width: "100%",
    backgroundColor: "#007bff",
  };

  const searchButtonHoverStyle = {
    backgroundColor: "#0056b3",
  };

  const formContainerStyle = {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "20px",
  };

  const h3Style = {
    fontSize: "18px",
    marginTop: "30px",
    color: "#333",
    textAlign: "center",
  };

  const submitButtonStyle = {
    backgroundColor: "#007bff",
    width: "100%",
  };

  const submitButtonHoverStyle = {
    backgroundColor: "#0056b3",
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Kullanıcı Güncelle</h2>
      <div>
        <label style={labelStyle}>Adı ile Ara:</label>
        <input
          style={inputStyle}
          type="text"
          value={adi}
          onChange={(e) => setAdi(e.target.value)}
          placeholder="Adı girin"
        />
        <label style={labelStyle}>Soyadı ile Ara:</label>
        <input
          style={inputStyle}
          type="text"
          value={soyadi}
          onChange={(e) => setSoyadi(e.target.value)}
          placeholder="Soyadı girin"
        />
        <label style={labelStyle}>Email ile Ara:</label>
        <input
          style={inputStyle}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email girin"
          required
        />
        <button
          style={searchButtonStyle}
          onMouseEnter={(e) => e.target.style.backgroundColor = searchButtonHoverStyle.backgroundColor}
          onMouseLeave={(e) => e.target.style.backgroundColor = searchButtonStyle.backgroundColor}
          onClick={handleSearch}
        >
          Ara
        </button>
      </div>

      {formData && (
        <form style={formContainerStyle} onSubmit={handleSubmit}>
          <label style={labelStyle}>Adı:</label>
          <input
            style={inputStyle}
            type="text"
            name="adi"
            value={formData.adi || ""}
            onChange={handleChange}
            placeholder="Adı girin"
            required
          />

          <label style={labelStyle}>Soyadı:</label>
          <input
            style={inputStyle}
            type="text"
            name="soyadi"
            value={formData.soyadi || ""}
            onChange={handleChange}
            placeholder="Soyadı girin"
            required
          />

          <label style={labelStyle}>Email:</label>
          <input
            style={inputStyle}
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            placeholder="Email girin"
            required
          />

          <label style={labelStyle}>Telefon:</label>
          <input
            style={inputStyle}
            type="tel"
            name="kisiselTelefon"
            value={formData.kisiselTelefon || ""}
            onChange={handleChange}
            placeholder="Telefon numarası girin"
            required
          />

          <label style={labelStyle}>Adres:</label>
          <input
            style={inputStyle}
            type="text"
            name="adres"
            value={formData.adres || ""}
            onChange={handleChange}
            placeholder="Adres girin"
            required
          />

          <h3 style={h3Style}>Veli Bilgileri</h3>
          <label style={labelStyle}>Veli Adı:</label>
          <input
            style={inputStyle}
            type="text"
            name="veliAdi"
            value={formData.veliBilgileriDTO?.veliAdi || ""}
            readOnly
            placeholder="Veli adı"
          />

          <label style={labelStyle}>Veli Soyadı:</label>
          <input
            style={inputStyle}
            type="text"
            name="veliSoyadi"
            value={formData.veliBilgileriDTO?.veliSoyadi || ""}
            readOnly
            placeholder="Veli soyadı"
          />

          <label style={labelStyle}>Veli Telefon:</label>
          <input
            style={inputStyle}
            type="tel"
            name="veliTelefon"
            value={formData.veliBilgileriDTO?.veliTelefon || ""}
            readOnly
            placeholder="Veli telefonu"
          />

          <label style={labelStyle}>Veli Notu:</label>
          <input
            style={inputStyle}
            type="text"
            name="veliNotu"
            value={formData.veliBilgileriDTO?.veliNotu || ""}
            readOnly
            placeholder="Veli notu"
          />

          <button
            style={submitButtonStyle}
            onMouseEnter={(e) => e.target.style.backgroundColor = submitButtonHoverStyle.backgroundColor}
            onMouseLeave={(e) => e.target.style.backgroundColor = submitButtonStyle.backgroundColor}
            type="submit"
          >
            Güncelle
          </button>
        </form>
      )}
    </div>
  );
}

export default KullaniciGuncelle;
