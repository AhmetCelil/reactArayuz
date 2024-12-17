import React, { useState } from "react";

function KullaniciGuncelle() {
  const [adi, setAdi] = useState("");
  const [soyadi, setSoyadi] = useState("");
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState(null);

  // Arama fonksiyonu
  const handleSearch = async () => {
    try {
      // URL'i güncelledik, tüm parametreleri kullanarak arama yapacak
      const response = await fetch(
        `http://localhost:8088/api/kullanici-bilgi/arama?adi=${adi || ''}&soyadi=${soyadi || ''}&email=${email || ''}`
      );
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
    console.log(e.target.adi.value);
    
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8088/api/kullanici-bilgi/guncelle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({adi:e.target.adi.value,soyadi:e.target.soyadi.value,adres:e.target.adres.value }),
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

  console.log(formData);
  

  return (
    <div>
      <h2>Kullanıcı Güncelle</h2>
      <label>Adı ile Ara:</label>
      <input
        type="text"
        value={adi}
        onChange={(e) => setAdi(e.target.value)}
      />
      <label>Soyadı ile Ara:</label>
      <input
        type="text"
        value={soyadi}
        onChange={(e) => setSoyadi(e.target.value)}
      />
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
          {formData.map((element)=>(
            <>
               <label>Adı:</label>
               <input
                 type="text"
                 name="adi"
                 value={element.adi}
                 onChange={handleChange}
                 required
               />
     
               <label>Soyadı:</label>
               <input
                 type="text"
                 name="soyadi"
                 value={element.soyadi}
                 onChange={handleChange}
                 required
               />
     
               <label>Email:</label>
               <input
                 type="email"
                 name="email"
                 value={element.email}
                 onChange={handleChange}
                 required
               />
     
               <label>Telefon:</label>
               <input
                 type="tel"
                 name="kisiselTelefon"
                 value={element.kisiselTelefon}
                 onChange={handleChange}
                 required
               />
     
               <label>Adres:</label>
               <input
                 type="text"
                 name="adres"
                 value={element.adres}
                 onChange={handleChange}
                 required
               />
     
               <button type="submit">Güncelle</button>
               </>
          ))}
       
        </form>
      )}
    </div>
  );
}

export default KullaniciGuncelle;
