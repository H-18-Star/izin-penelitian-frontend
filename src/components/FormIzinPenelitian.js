import React, { useState } from "react";

function FormIzinPenelitian() {
  const [formData, setFormData] = useState({
    nama: "",
    instansi: "",
    judul: "",
    surat: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("nama", formData.nama);
    data.append("instansi", formData.instansi);
    data.append("judul", formData.judul);
    data.append("surat", formData.surat);

    try {
      const response = await fetch("https://your-backend-url/api/izin", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        alert("Surat berhasil dikirim!");
      } else {
        alert("Gagal mengirim surat.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Formulir Permohonan Izin Penelitian</h2>
      <input
        type="text"
        name="nama"
        placeholder="Nama"
        value={formData.nama}
        onChange={handleChange}
        className="block w-full p-2 border mb-2"
        required
      />
      <input
        type="text"
        name="instansi"
        placeholder="Instansi"
        value={formData.instansi}
        onChange={handleChange}
        className="block w-full p-2 border mb-2"
        required
      />
      <input
        type="text"
        name="judul"
        placeholder="Judul Penelitian"
        value={formData.judul}
        onChange={handleChange}
        className="block w-full p-2 border mb-2"
        required
      />
      <input
        type="file"
        name="surat"
        onChange={handleChange}
        className="block w-full p-2 border mb-4"
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Kirim
      </button>
    </form>
  );
}

export default FormIzinPenelitian;
