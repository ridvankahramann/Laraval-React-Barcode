import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';
import RestClient from '../RestAPI/RestClient';
import AppUrl from '../RestAPI/AppUrl';

function Example() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [numberVal, setNumberValue, nameVal, barcodeVal] = useState('');
  
  function numberFun(e) {
    setNumberValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const data = {
      pd_barcode : e.target[0].value,
      pd_name : e.target[1].value,
      pd_price: e.target[2].value,
      deleted_at: null,
      pd_created_at: null,
      pd_updated_at: null
    };


    RestClient.postRequest(AppUrl.newBarcode, {
      data
    }).then((res) => {
      if (res.status === 200) {
        Notification.success({
          title: res.data.title,
          text: res.data.text
        });
        handleClose(true);
      }).catch((err) => {
        Notification.error({
          title: "Hata",
          text: "Hata"
        });
      })
    }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Yeni Barkod Yükle
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Yeni Barkod</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Barcode</Form.Label>
              <Form.Control
                type="text"
                value={barcodeVal}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ürün İsmi</Form.Label>
              <Form.Control
                type='text'
                value={nameVal}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ürün Fiyat</Form.Label>
                <InputGroup>
                <Form.Control
                  type='text'
                  value={numberVal}
                  onChange={numberFun}
                />
                {(numberVal.length > 0) && <InputGroup.Text>{numberVal}</InputGroup.Text> }
                <InputGroup.Text>₺</InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Modal.Footer>
          <Button type="submit" variant="primary">
            Kaydet
          </Button>
        </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Example;
