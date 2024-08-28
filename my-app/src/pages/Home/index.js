import React, { Component, createRef } from 'react'
import Header from '../../components'
import { Badge, Button, Card, Col, Container, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { BarcodeDetector } from "barcode-detector";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";
import Helmet from "react-helmet";
import Notification from '../../RestAPI/Notification';
import Example from '../../components/modal'

export default class Home extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            barcode: '',
            order: [],
            totalPrice: 0
        }
        
        this.videoRef = createRef();
        this.canvasRef = createRef();
        this.intervalid = null;
    }
    

    openCamera = () => {
        navigator.mediaDevices.getUserMedia({ video: { width: 800, height: 500 } }).then(MediaStream => {
            this.videoRef.current.srcObject = MediaStream;
            this.videoRef.current.play();

            const canvas = this.canvasRef.current;
            const ctx = canvas.getContext("2d");

            const barcode = new BarcodeDetector({ formats: ["qr_code", "ean_13"] });

            this.intervalid = setInterval(() => {
                canvas.width = this.videoRef.current.videoWidth / 1.35;
                canvas.height = this.videoRef.current.videoHeight;

                ctx.drawImage(this.videoRef.current, 0, 0, this.videoRef.current.videoWidth, this.videoRef.current.videoHeight);
                barcode.detect(canvas).then(([data]) => {
                    if (data) {
                        this.setState({
                            barcode: data.rawValue
                        })
                    }
                })
            }, 100);

        })
    }

    componentWillUnmount() {
        this.stopCamera();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.barcode !== this.state.barcode && this.state.barcode !== '') {
            this.addOrder();
        }
    }

    addOrder = () => {
        const { barcode, order, totalPrice } = this.state;

        RestClient.postRequest(AppUrl.product, {
            barcode
        }).then((res) => {
            const status = res.status;
            const result = res.data;

            if (status === 200) {
                let newOrder = [...order, {
                    pd_barcode: result.data.pd_barcode,
                    pd_name: result.data.pd_name,
                    pd_price: result.data.pd_price
                }];
                let newPrice = totalPrice + result.data.pd_price;

                this.setState({
                    order: newOrder,
                    totalPrice: newPrice
                })
            } else {
                console.log("1");
                Notification.error({
                    title: result.title,
                    text: result.message
                });
            }
        }).catch((err) => {
            Notification.error({
                title: "Hata",
                text: "Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz"
            });
        })
    }

    stopCamera = () => {
        if (this.videoRef.current && this.videoRef.current.srcObject) {
            const stream = this.videoRef.current.srcObject;
            const tracks = stream.getTracks();
            tracks.forEach(tracks => tracks.stop());
            this.videoRef.current.srcObject = null;
        }
        if(this.intervalid){
            clearInterval(this.clearInterval);
            this.intervalid = null;
            this.setState({
                barcode: "",
                order: []
            })
        }
        const canvas = this.canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }


    render() {
        const { barcode, order, totalPrice } = this.state;

      return (
        <>
            <Header />
            
            <Helmet>
                <meta charSet="utf-8" />
                <title>My Title</title>
                <link rel="canonical" href="http://mysite.com/example" />
              </Helmet>

              <Container className={'container mt-3'}>
                <Example/>
                <Button variant={'success ms-2'} onClick={() => this.openCamera()}>Kamera Aç</Button>
                <Button variant={'danger ms-2'} onClick={()=>this.stopCamera()}>Kamera Kapat</Button>
                <br />
                <Row className={'mt-3'}>
                    <Col md={7}>
                        <Card>
                            <Card.Header>Barcode</Card.Header>
                            <Card.Body>
                                  <video ref={this.videoRef} muted playsInline hidden />
                                  <canvas ref={this.canvasRef} />
                                  <br />
                                  {(barcode) && (
                                      <div>
                                          Bulunan Barcode : {barcode}
                                      </div>
                                  )}
                            </Card.Body>
                        </Card>                    
                      </Col>
                      {(order.length > 0) &&
                          <Col md={5}>
                              <Card>
                                  <Card.Header>Sepet</Card.Header>
                                  <Card.Body>
                                      <ListGroup>
                                          {order.map((item, index) => {
                                              return (
                                                <ListGroupItem key={index} className={'d-flex justify-content-between align-items-center'}>
                                                    {item.pd_name} x   1
                                                    <Badge pill bg={'success'} className={'text-white'}>{item.pd_price} ₺</Badge>
                                                </ListGroupItem>
                                              )
                                          })}                                          
                                      </ListGroup>
                                  </Card.Body>
                                  <Card.Footer>
                                      Total Ücret: {totalPrice} ₺
                                  </Card.Footer>
                              </Card>
                          </Col>
                      }
                </Row>
            </Container>
        </>
    )
  }
}
