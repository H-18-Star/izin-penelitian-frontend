import React, { useState } from 'react';
import axios from 'axios';

const FormIzinPenelitian = () => {
  const [formData, setFormData] = useState({
    namaLengkap: '',
    nim: '',
    email: '',
    alamatKTP: '',
    desa: '',
    kecamatan: '',
    kabupaten: '',
    jurusan: '',
    lokasiPenelitian: '',
    jumlahPeserta: '',
    tanggalMulai: '',
    tanggalSelesai: '',
  });

  const [suratPengantar, setSuratPengantar] = useState(null);
  const [proposal, setProposal] = useState(null);
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'suratPengantar') {
      setSuratPengantar(files[0]);
    } else if (name === 'proposal') {
      setProposal(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Mengirim...');

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (suratPengantar) data.append('suratPengantar', suratPengantar);
    if (proposal) data.append('proposal', proposal);

    try {
      const res = await axios.post('http://localhost:5000/api/izin', data);
      setStatus('Berhasil dikirim!');
    } catch (err) {
      console.error(err);
      setStatus('Gagal mengirim.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white shadow rounded space-y-4">
      {[
        ['Nama Lengkap', 'namaLengkap', 'text'],
        ['NIM', 'nim', 'text'],
        ['Email', 'email', 'email'],
        ['Alamat KTP', 'alamatKTP', 'text'],
        ['Desa', 'desa', 'text'],
        ['Kecamatan', 'kecamatan', 'text'],
        ['Kabupaten', 'kabupaten', 'text'],
        ['Jurusan', 'jurusan', 'text'],
        ['Lokasi Penelitian', 'lokasiPenelitian', 'text'],
        ['Jumlah Peserta', 'jumlahPeserta', 'number'],
        ['Tanggal Mulai', 'tanggalMulai', 'date'],
        ['Tanggal Selesai', 'tanggalSelesai', 'date'],
      ].map(([label, name, type]) => (
        <div key={name}>
          <label className="block text-sm font-semibold">{label}</label>
          <input
            type={type}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            required
          />
        </div>
      ))}

      <div>
        <label className="block text-sm font-semibold">Upload Surat Pengantar (PDF)</label>
        <input type="file" name="suratPengantar" accept="application/pdf" onChange={handleFileChange} required />
      </div>

      <div>
        <label className="block text-sm font-semibold">Upload Proposal (PDF)</label>
        <input type="file" name="proposal" accept="application/pdf" onChange={handleFileChange} required />
      </div>

      <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Kirim
      </button>

      <p className="mt-2 text-sm">{status}</p>
    </form>
  );
};

export default FormIzinPenelitian;
