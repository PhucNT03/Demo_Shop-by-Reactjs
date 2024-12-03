import React from 'react'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
export const SectionCart = ({ cart, updateQuantity, removeFromCart, clearCart, calculateTotal, handleShow }) => {
  return (
    <>
      <section
        style={{
          backgroundColor: '#eee',
          height: '100px',
          marginBottom: '20px',
          marginTop: '120px',
        }}
      >
        <div className='container'>
          <h2 className='text-center'>Shopping cart</h2>
        </div>
      </section>
      <section className='section-content padding-y'>
        <div className='container'>
          <div className='row'>
            <main className='col-md-9'>
              {cart.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <div className='card'>
                  <table className='table table-borderless table-shopping-cart'>
                    <thead className='text-muted'>
                      <tr className='small text-uppercase'>
                        <th scope='col'>Product</th>
                        <th scope='col'>Name</th>
                        <th scope='col' width='120'>
                          Quantity
                        </th>
                        <th scope='col' width='200'>
                          Price
                        </th>
                        <th scope='col' className='text-right' width='100'>
                          {' '}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <figure className='itemside'>
                              <div className='aside'>
                                <img
                                  src={`/images/${item.images[0].name}`}
                                  className='img-sm'
                                  width={100}
                                  height={100}
                                  alt={item.name}
                                />
                                {}
                              </div>
                            </figure>
                          </td>
                          <td>
                            <p className='title text-dark'>{item.name}</p>
                          </td>
                          <td>
                            <input
                              type='number'
                              className='form-control'
                              value={item.quantity}
                              onChange={(e) =>
                                updateQuantity(
                                  item.id,
                                  parseInt(e.target.value)
                                )
                              }
                            />
                          </td>
                          <td>
                            <div className='price-wrap'>
                              <var className='price'>
                                {(item.price * item.quantity).toLocaleString(
                                  'vi-VN'
                                )}{' '}
                                VNĐ
                              </var>
                              <br />
                              <small className='text-muted'>
                                {' '}
                                {item.price.toLocaleString('vi-VN')} VNĐ
                              </small>
                            </div>
                          </td>
                          <td className='text-right'>
                            <button
                              href=''
                              className='btn btn-danger'
                              onClick={() => removeFromCart(item.id)}
                            >
                              {' '}
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className='card-body border-top'>
                    <button
                      className='btn btn-danger float-md-right'
                      onClick={clearCart}
                    >
                      {' '}
                      Clear Cart
                    </button>
                  </div>
                </div>
              )}
              <Link to='/' className='btn btn-light'>
                {' '}
                <i className='fa fa-chevron-left'></i> Continue shopping{' '}
              </Link>
              <div className='alert alert-success mt-3'>
                <p className='icontext'>
                  <i className='icon text-success fa fa-truck'></i> Free
                  Delivery within 1-2 weeks
                </p>
              </div>
            </main>
            <aside className='col-md-3'>
              <div className='card'>
                <div className='card-body'>
                  <dl className='d-flex justify-content-between'>
                    <dt>Total price:</dt>
                    <dd className=''>
                      {calculateTotal().toLocaleString('vi-VN')} VNĐ
                    </dd>
                  </dl>
                  <dl className='d-flex justify-content-between'>
                    <dt>Total:</dt>
                    <dd className='text-right h5'>
                      <strong>
                        {calculateTotal().toLocaleString('vi-VN')} VNĐ
                      </strong>
                    </dd>
                  </dl>
                  <hr />

                  <Button
                    variant='primary'
                    onClick={handleShow}
                    disabled={cart.length === 0}
                  >
                    Check out
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}


