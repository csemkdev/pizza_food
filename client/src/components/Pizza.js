import React, { useState } from 'react';
import { Modal } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import AOS from 'aos'
import 'aos/dist/aos.css'
import { addToCart } from '../redux/actions'

const Pizza = ({ pizza }) => {

    AOS.init({
        
    })

    const [quantity, setquantity] = useState(1)
    const [varient, setvarient] = useState('small')
    const [show, setShow] = useState(false);

    const dispatch = useDispatch()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function btnAddToCart() {
        dispatch(addToCart(pizza, quantity, varient))
    }

    return (
        <div>
            <div
                data-aos='zoom-in'
                className='shadow-lg p-3 mb-5 bg-white rounded'
                key={pizza._id}
            >
                <div onClick={handleShow}>

                    <h1>{pizza.name}</h1>
                    <img src={pizza.image} className="img-fluid" style={{ height: '200px' }} />

                </div>
                <div className='flex-container'>

                    <div className='w-100 m-1'>
                        <p>Varients</p>
                        <select className='form-control' value={varient} onChange={(e) => { setvarient(e.target.value) }} >
                            {pizza.varients.map(varient => {
                                return <option value={varient}>{varient}</option>
                            })}
                        </select>
                    </div>

                    <div className='w-100 m-1'>
                        <p>Quantity</p>
                        <select className='form-control' value={quantity} onChange={(e) => { setquantity(e.target.value) }} >
                            {[...Array(10).keys()].map((x, i) => {
                                return <option value={i + 1}>{i + 1}</option>
                            })}
                        </select>
                    </div>
                </div>

                <div className='flex-container'>
                    <div className=' m-1 w-100'>
                        <h1 className=' mt-1 '>Price : {pizza.prices[0][varient] * quantity}</h1>
                    </div>
                    <div className='m-1 w-100'>
                        <button className='btn btn-danger' onClick={btnAddToCart} >ADD TO CART</button>
                    </div>
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{pizza.name}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}><img src={pizza.image} className="img-fluid" style={{ height: '400px' }} /></div>
                        <div><p>{pizza.description}</p></div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <button className="btn btn-danger " onClick={handleClose}>Close</button>
                </Modal.Footer>
            </Modal>

        </div>
    );
};

export default Pizza;