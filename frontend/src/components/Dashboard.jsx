import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Row, Col, Table, Button, Modal, Form } from "react-bootstrap";

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [updateData, setUpdateData] = useState({
        nama: "",
        deskripsi: "",
        harga: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3000/barang");
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const results = await response.json();
                setData(results);
            } catch (error) {
                console.error("Error Menampilkan data", error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3000/barang/${selectedItem._id}`, {
                method: "DELETE"
            });
            if (response.ok) {
                const updatedData = data.filter(barang => barang._id !== selectedItem._id);
                setData(updatedData);
                handleCloseDeleteModal();
            } else {
                console.error("Failed to delete barang");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleShowDeleteModal = (barang) => {
        setSelectedItem(barang);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setSelectedItem(null);
        setShowDeleteModal(false);
    };

    const handleShowUpdateModal = (barang) => {
        setSelectedItem(barang);
        setUpdateData({
            nama: barang.nama,
            deskripsi: barang.deskripsi,
            harga: barang.harga
        });
        setShowUpdateModal(true);
    };

    const handleCloseUpdateModal = () => {
        setSelectedItem(null);
        setUpdateData({
            nama: "",
            deskripsi: "",
            harga: ""
        });
        setShowUpdateModal(false);
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:3000/barang/${selectedItem.nama}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updateData)
            });
            if (response.ok) {
                const updatedData = data.map(barang => {
                    if (barang.nama === selectedItem.nama) {
                        return {
                            ...barang,
                            deskripsi: updateData.deskripsi,
                            harga: updateData.harga
                        };
                    }
                    return barang;
                });
                setData(updatedData);
                handleCloseUpdateModal();
            } else {
                console.error("Failed to update barang");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <Navbar bg="primary" variant="dark" expand="lg">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                            <Nav.Link as={Link} to="/about">About</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container className="mt-5">
                <Row className="mb-3">
                    <Col className="d-flex justify-content-between align-items-center">
                        <h2>Daftar Barang</h2>
                        <Link to="/TambahBarang">
                            <Button variant="primary">Tambah Barang</Button>
                        </Link>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nama</th>
                                    <th>Deskripsi</th>
                                    <th>Harga</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((barang) => (
                                    <tr key={barang._id}>
                                        <td>{barang._id}</td>
                                        <td>{barang.nama}</td>
                                        <td>{barang.deskripsi}</td>
                                        <td>Rp{barang.harga.toLocaleString()}</td>
                                        <td>
                                            <Button variant="info" className="me-2" onClick={() => handleShowUpdateModal(barang)}>Update</Button>
                                            <Button variant="danger" onClick={() => handleShowDeleteModal(barang)}>Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
            <footer className="bg-primary text-white text-center py-3 mt-5">
                <Container>
                    <p>&copy; 2024 Toko Bangunan. All rights reserved.</p>
                </Container>
            </footer>

            {/* Delete Modal */}
            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Konfirmasi Hapus Barang</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Apakah Anda yakin ingin menghapus barang ini?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>
                        Batal
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Hapus
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Update Modal */}
            <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Barang</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="deskripsiUpdate">
                            <Form.Label>Deskripsi</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={updateData.deskripsi}
                                onChange={(e) => setUpdateData({ ...updateData, deskripsi: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="hargaUpdate">
                            <Form.Label>Harga</Form.Label>
                            <Form.Control
                                type="number"
                                value={updateData.harga}
                                onChange={(e) => setUpdateData({ ...updateData, harga: e.target.value })}
                                required
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseUpdateModal}>
                        Batal
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Dashboard;
