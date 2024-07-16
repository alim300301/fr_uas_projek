import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

const TambahBarang = () => {
    const [nama, setNama] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [harga, setHarga] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newBarang = { nama, deskripsi, harga: Number(harga) };

        try {
            const response = await fetch("http://localhost:3000/barang", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newBarang),
            });
            if (response.ok) {
                window.location.href = "/"; // Redirect secara langsung
            } else {
                console.error("Failed to add barang");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <Container className="mt-5">
            <h2>Tambah Barang</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="nama">
                    <Form.Label>Nama</Form.Label>
                    <Form.Control
                        type="text"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="deskripsi" className="mt-3">
                    <Form.Label>Deskripsi</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={deskripsi}
                        onChange={(e) => setDeskripsi(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="harga" className="mt-3">
                    <Form.Label>Harga</Form.Label>
                    <Form.Control
                        type="number"
                        value={harga}
                        onChange={(e) => setHarga(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                    Tambah
                </Button>
            </Form>
        </Container>
    );
};


export default TambahBarang; // Tambahkan kembali export default jika diperlukan
