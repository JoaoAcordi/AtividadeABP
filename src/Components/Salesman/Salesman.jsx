import { useState } from 'react';
import { useSales } from './SalesContext';
import './Salesman.css';

function Salesman() {
  const { addToTotalSales } = useSales(); // Usa o contexto de vendas
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
              addToTotalSales(productPrice * productQuantity, { name: productName, quantity: productQuantity }); // Adiciona ao total de vendas e lista de itens vendidos
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

  return (
      <div className="container">
          <div className="header">
              <h1>Sistema de Vendas do Mercado</h1>
          </div>
          <div className="content">
              <div className="form-group-container">
                  <div className="form-group">
                      <label htmlFor="product-name">Nome do Produto</label>
                      <input 
                          type="text" 
                          id="product-name" 
                          placeholder="Nome do Produto" 
                          value={productName} 
                          onChange={(e) => {
                              const value = e.target.value;
                              const filteredValue = value.replace(/[^a-zA-Z\s]/g, ''); // Remove números e caracteres especiais
                              setProductName(filteredValue);
                          }}
                      />
                  </div>
                  <div className="form-group">
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
                  <div className="form-group">
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
              <div className="form-group">
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
                              <td className="action-buttons">
                                  <button className="edit" onClick={() => editProduct(product.id)}>Editar</button>
                                  <button className="delete" onClick={() => deleteProduct(product.id)}>Deletar</button>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </div>
    );
}

export default Salesman;