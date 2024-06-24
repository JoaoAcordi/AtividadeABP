import { useState } from 'react';
import { useSales } from './SalesContext';
import './Sales.css';

function Sales() {
  const { addToTotalSales } = useSales();
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [editId, setEditId] = useState(null);

  const addProduct = () => {
      if (productName && productPrice && productQuantity) {
          const newProduct = { 
              id: editId ? editId : Date.now(), 
              name: productName, 
              price: parseFloat(productPrice).toFixed(2),
              quantity: parseInt(productQuantity, 10)
          };

          if (editId) {
              setProducts(products.map(p => (p.id === editId ? newProduct : p)));
              setEditId(null);
          } else {
              setProducts([...products, newProduct]);
          }

          setProductName('');
          setProductPrice('');
          setProductQuantity('');
      }
  };

  const editProduct = id => {
      const product = products.find(p => p.id === id);
      setProductName(product.name);
      setProductPrice(product.price);
      setProductQuantity(product.quantity);
      setEditId(id);
  };

  const deleteProduct = id => {
      setProducts(products.filter(product => product.id !== id));
  };

  const finalizeSale = () => {
    products.forEach(product => {
      addToTotalSales(product.price * product.quantity, { name: product.name, quantity: product.quantity });
    });
    setProducts([]);
  };

  return (
      <div className="container-sales">
          <div className="header-sales">
              <h1>Vendas</h1>
          </div>
          <div className="content-sales">
              <div className="form-group-container-sales">
                  <div className="form-group-sales">
                      <label htmlFor="product-name">Nome do Produto</label>
                      <input 
                          type="text" 
                          id="product-name" 
                          placeholder="Nome do Produto" 
                          value={productName} 
                          onChange={(e) => {
                              const value = e.target.value;
                              const filteredValue = value.replace(/[^a-zA-Z\u00C0-\u017F\s]/g, '');
                              setProductName(filteredValue);
                          }}
                      />
                  </div>
                  <div className="form-group-sales">
                      <label htmlFor="product-quantity">Quantidade do Produto</label>
                      <input 
                          type="number" 
                          id="product-quantity" 
                          placeholder="Quantidade do Produto" 
                          value={productQuantity} 
                          onChange={(e) => {
                              const value = e.target.value;
                              if (value < 0) {
                                  setProductQuantity(0);
                              } else {
                                  setProductQuantity(value);
                              }
                          }}
                      />
                  </div>
                  <div className="form-group-sales">
                      <label htmlFor="product-price">Preço do Produto</label>
                      <input 
                          type="number" 
                          id="product-price" 
                          placeholder="Preço do Produto" 
                          value={productPrice} 
                          onChange={(e) => {
                              const value = e.target.value;
                              if (value < 0) {
                                  setProductPrice(0);
                              } else {
                                  setProductPrice(value);
                              }
                          }}
                      />
                  </div>
              </div>
              <div className="form-group-sales">
                  <button onClick={addProduct}>
                      {editId ? 'Atualizar Produto' : 'Adicionar Produto'}
                  </button>
              </div>
              <table>
                  <thead>
                      <tr>
                          <th>Nome</th>
                          <th>Preço</th>
                          <th>Quantidade</th>
                          <th>Ações</th>
                      </tr>
                  </thead>
                  <tbody>
                      {products.map(product => (
                          <tr key={product.id}>
                              <td>{product.name}</td>
                              <td>R$ {product.price}</td>
                              <td>{product.quantity}</td>
                              <td className="action-buttons-sales">
                                  <button className="edit" onClick={() => editProduct(product.id)}>Editar</button>
                                  <button className="delete" onClick={() => deleteProduct(product.id)}>Deletar</button>
                              </td>
                          </tr>
                      ))}
                  </tbody>
                </table>
                <div className="form-group-sales">
                    <button className="finalize-button" onClick={finalizeSale}>
                        Finalizar Venda
                    </button>
                </div>
          </div>
      </div>
    );
}

export default Sales;