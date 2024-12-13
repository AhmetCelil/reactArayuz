import React from "react";
import KullaniciListesi from "./components/KullaniciListesi";
import KullaniciIzinListesi from "./components/KullaniciIzinListesi";  // Bileşeni içe aktardık

function App() {
  return (
    <div className="App">
      <KullaniciListesi />
      <KullaniciIzinListesi />

    </div>
  );
}

export default App;
