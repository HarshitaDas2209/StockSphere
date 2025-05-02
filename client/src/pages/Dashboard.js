






import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import InventoryDonorFinder from './InventoryDonorFinder';
// import Chatty from './Chatty';
import '../App.css';


function Dashboard() {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'table'
  const [showLowStockDropdown, setShowLowStockDropdown] = useState(false);
  const [otherWarehouseProducts, setOtherWarehouseProducts] = useState([]);
  const [potentialDonors, setPotentialDonors] = useState({});
  const [showChatbot, setShowChatbot] = useState(false);
  const manager = JSON.parse(localStorage.getItem("manager"));
  const navigate = useNavigate();

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // const token = localStorage.getItem("token");
        const token = localStorage.getItem("token");
        const res = await axios.get("https://nodeserver-xv9g.onrender.com/api/products/my-products", {
        // const res = await axios.get("http://localhost:5000/api/products/my-products", {
        headers: { Authorization: token },
        });
        
        console.log("Fetched products:", res.data);
        setAllProducts(res.data);
        setProducts(res.data);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(res.data.map(product => product.category))];
        setCategories(uniqueCategories);
        
        // Calculate low stock products directly from fetched data as a backup
        const lowStock = res.data.filter(product => product.current_stock <= product.thresholdValue);
        if (lowStock.length > 0) {
          console.log("Low stock products calculated from all products:", lowStock);
          setLowStockProducts(lowStock);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  // Fetch specifically low stock products
  useEffect(() => {
    const fetchLowStock = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Fetching low stock products...");
        
        const res = await axios.get("https://nodeserver-xv9g.onrender.com/api/products/low-stock", {
        // const res = await axios.get("http://localhost:5000/api/products/low-stock", {
          headers: { Authorization: token },
        });
        
        console.log("Low stock API response:", res.data);
        
        if (res.data && Array.isArray(res.data)) {
          setLowStockProducts(prevState => {
            // Only update if we received some data and it's different from what we already have
            if (res.data.length > 0) {
              return res.data;
            }
            return prevState;
          });
          
          if (res.data.length > 0) {
            alert("⚠️ Some items are low on stock! Please restock.");
          }
        } else {
          console.warn("Low stock API did not return an array:", res.data);
        }
      } catch (err) {
        console.error("Error fetching low stock:", err);
        // If the API fails, calculate low stock from all products
        const lowStock = allProducts.filter(product => product.current_stock <= product.thresholdValue);
        if (lowStock.length > 0) {
          console.log("Using calculated low stock as fallback:", lowStock);
          setLowStockProducts(lowStock);
        }
      }
    };

    fetchLowStock();
  }, [allProducts]); // Also run when allProducts changes as a fallback

  // Fetch products from other warehouses
  useEffect(() => {
    const fetchOtherWarehouseProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://nodeserver-xv9g.onrender.com/api/products/other-warehouses", {
        // const res = await axios.get("http://localhost:5000/api/products/other-warehouses", {
          headers: { Authorization: token },
        });
        
        console.log("Other warehouse products:", res.data);
        setOtherWarehouseProducts(res.data);
      } catch (err) {
        console.error("Error fetching other warehouse products:", err);
      }
    };

    fetchOtherWarehouseProducts();
  }, []);

  // Find potential donor warehouses when low stock products are identified
  useEffect(() => {
// Replace the identifyPotentialDonors function in your useEffect with this:
// Replace the identifyPotentialDonors function in your useEffect
const identifyPotentialDonors = () => {
  if (lowStockProducts.length > 0 && otherWarehouseProducts.length > 0) {
    const donors = {};
    
    // For each low stock product
    lowStockProducts.forEach(lowStockProduct => {
      // Just match by product name, nothing else
      const matches = otherWarehouseProducts.filter(
        otherProduct => otherProduct.product_name === lowStockProduct.product_name
      );
      
      // Very simple criteria: if they have stock, they can donate
      const potentialDonorWarehouses = matches
        .map(match => ({
          warehouseId: match.warehouseId,
          warehouseName: match.warehouseName,
          current_stock: match.current_stock,
          thresholdValue: match.thresholdValue,
          possibleDonation: match.current_stock > 0 ? 1 : 0 // Can donate at least 1 if they have stock
        }))
        .filter(warehouse => warehouse.possibleDonation > 0);
      
      // If we found any warehouses, add them to the donors object
      if (potentialDonorWarehouses.length > 0) {
        donors[lowStockProduct._id] = {
          product: lowStockProduct,
          donorWarehouses: potentialDonorWarehouses
        };
      }
    });
    
    setPotentialDonors(donors);
  }
};

    identifyPotentialDonors();
  }, [lowStockProducts, otherWarehouseProducts]);

  useEffect(() => {
    // Filter products based on both category and search term
    let filteredProducts = [...allProducts];
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      filteredProducts = filteredProducts.filter(product => 
        product.category === selectedCategory
      );
    }
    
    // Apply search filter
    if (searchTerm.trim() !== '') {
      const searchLower = searchTerm.toLowerCase();
      filteredProducts = filteredProducts.filter(product => 
        product.product_name.toLowerCase().includes(searchLower)
      );
    }
    
    setProducts(filteredProducts);
  }, [selectedCategory, searchTerm, allProducts]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  }

  const getStockStatusClass = (current, threshold) => {
    if (current <= threshold) return "bg-danger text-white";
    if (current <= threshold * 1.5) return "bg-warning";
    return "bg-success text-white";
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("manager");
    navigate("/login");
  }

  const toggleLowStockDropdown = () => {
    setShowLowStockDropdown(!showLowStockDropdown);
  }

  // Function to manually check if a product is low on stock
  const isLowStock = (product) => {
    return product.current_stock <= product.thresholdValue;
  }

  // Compute low stock products if API didn't work
  const computedLowStockProducts = lowStockProducts.length > 0 
    ? lowStockProducts 
    : allProducts.filter(isLowStock);

  // Function to view only low stock products
  const viewLowStockOnly = () => {
    setSelectedCategory('all');
    setSearchTerm('');
    setProducts(computedLowStockProducts);
    setShowLowStockDropdown(false);
  }

 
  const productsWithDonors = Object.keys(potentialDonors).length;

  return (
    <div className="container-fluid py-4">
      <div className="row align-items-center mb-4">
        <div className="col-md-8">
          <h2 className="mb-1">Welcome, {manager?.name}</h2>
          <h5 className="text-muted">Warehouse: {manager?.warehouseName}</h5>
          <h5 className="text-muted">Email: {manager?.email}</h5>
        </div>
        <div className="col-md-4 text-md-end">
          <div className="dropdown d-inline-block me-2">
            <button 
              className="btn btn-warning position-relative" 
              type="button" 
              onClick={toggleLowStockDropdown}
              aria-expanded={showLowStockDropdown}
            >
              <i className="bi bi-exclamation-triangle me-1"></i> Low Stock Items 
              {computedLowStockProducts.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {computedLowStockProducts.length}
                </span>
              )}
              {productsWithDonors > 0 && (
                <span className="position-absolute top-0 end-0 translate-middle badge rounded-pill bg-success">
                  {productsWithDonors} <i className="bi bi-truck"></i>
                </span>
              )}
            </button>
            <div 
              className={`dropdown-menu dropdown-menu-end shadow ${showLowStockDropdown ? 'show' : ''}`} 
              style={{
                minWidth: '350px',
                display: showLowStockDropdown ? 'block' : 'none'
              }}
            >
              <h6 className="dropdown-header text-danger">Products Below Threshold</h6>
              {computedLowStockProducts.length === 0 ? (
                <div className="dropdown-item text-muted">No low stock items</div>
              ) : (
                <>
                  <div className="dropdown-item-text p-2" style={{maxHeight: '400px', overflowY: 'auto'}}>
                    <div className="list-group list-group-flush">
                      {computedLowStockProducts.map(product => (
                        <div key={product._id} className="list-group-item p-2 border-bottom">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <div>
                              <h6 className="mb-0">{product.product_name}</h6>
                              <small className="text-muted">{product.category} | {product.product_company}</small>
                            </div>
                            <span className="badge bg-danger">
                              {product.current_stock}/{product.thresholdValue}
                            </span>
                          </div>
                          
                
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <div className="dropdown-item-text d-grid">
                    <button 
                      className="btn btn-outline-warning btn-sm" 
                      onClick={viewLowStockOnly}
                    >
                      View All Low Stock Items
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
          <button className="btn btn-primary me-2" onClick={() => navigate("/add-product")}>
            <i className="bi bi-plus-circle me-1"></i> Add Product
          </button>
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right me-1"></i> Logout
          </button>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <div className="card-header bg-light">
          <div className="row align-items-center mb-3">
            <div className="col-md-4">
              <h4 className="mb-0">Product Inventory</h4>
            </div>
            <div className="col-md-8 text-md-end">
              <div className="btn-group" role="group">
                <button 
                  className={`btn ${viewMode === 'cards' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setViewMode('cards')}
                >
                  <i className="bi bi-grid"></i> Cards
                </button>
                <button 
                  className={`btn ${viewMode === 'table' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setViewMode('table')}
                >
                  <i className="bi bi-table"></i> Table
                </button>
              </div>
            </div>
          </div>
          
          <div className="row g-2">
          
              <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-search"></i>
                </span>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Search by product name..." 
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                {searchTerm && (
                  <button 
                    className="btn btn-outline-secondary" 
                    type="button" 
                    onClick={() => setSearchTerm('')}
                  >
                    <i className="bi bi-x"></i>
                  </button>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <select 
                className="form-select" 
                value={selectedCategory} 
                onChange={handleCategoryChange}
                aria-label="Filter products by category"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <div className="card-body">
          <div className="mb-3 d-flex justify-content-between align-items-center">
            <div className="text-muted">
              {products.length === 0 ? (
                <span>No products found</span>
              ) : (
                <span>Showing {products.length} of {allProducts.length} products</span>
              )}
            </div>
            {products === computedLowStockProducts && products.length > 0 && (
              <div>
                <span className="badge bg-danger me-2">Currently showing low stock items only</span>
                <button 
                  className="btn btn-sm btn-outline-secondary" 
                  onClick={() => {
                    setProducts(allProducts);
                  }}
                >
                  Show All Products
                </button>
              </div>
            )}
          </div>
          
          {products.length === 0 ? (
            <div className="alert alert-info">
              No products found matching your search criteria. Try adjusting your filters.
            </div>
          ) : viewMode === 'cards' ? (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {products.map(prod => (
                <div className="col" key={prod._id}>
                  <div className={`card h-100 shadow-sm border-0 ${isLowStock(prod) ? 'border border-danger' : ''}`}>
                    <div className="card-header bg-primary text-white">
                      <h5 className="card-title mb-0">{prod.product_name}</h5>
                      <small className="text-white-50">ID: {prod.product_id}</small>
                    </div>
                    <div className="card-body">
                      <div className="mb-3">
                        <span className="badge bg-info me-2">{prod.category}</span>
                        <span className="badge bg-secondary">{prod.product_company}</span>
                        {potentialDonors[prod._id] && (
                          <span className="badge bg-success ms-2">
                            <i className="bi bi-truck me-1"></i>
                            Donor Available
                          </span>
                        )}
                      </div>
                      
                      <div className="row mb-2">
                        <div className="col-6">
                          <small className="text-muted d-block">Entry Date</small>
                          <p className="mb-0">{formatDate(prod.entryDate)}</p>
                        </div>
                        <div className="col-6">
                          <small className="text-muted d-block">Expiry Date</small>
                          <p className="mb-0">{formatDate(prod.expiryDate)}</p>
                        </div>
                      </div>
                      
                      <div className="row mb-2">
                        <div className="col-6">
                          <small className="text-muted d-block">Rate (₹)</small>
                          <p className="mb-0">{prod.productRate}</p>
                        </div>
                        <div className="col-6">
                          <small className="text-muted d-block">Total Rate (₹)</small>
                          <p className="mb-0">{prod.totalRate}</p>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <small className="text-muted d-block">Threshold: {prod.thresholdValue}</small>
                        </div>
                        <div className={`stock-badge badge ${getStockStatusClass(prod.current_stock, prod.thresholdValue)}`}>
                          Stock: {prod.current_stock}
                        </div>
                      </div>
                      {potentialDonors[prod._id] && (
                        <div className="mt-2 pt-2 border-top">
                          <small className="text-success">
                            <i className="bi bi-info-circle me-1"></i>
                            Available from {potentialDonors[prod._id].donorWarehouses.length} warehouse(s)
                          </small>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead className="bg-light">
                  <tr>
                    <th>Product ID</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Company</th>
                    <th>Stock</th>
                    <th>Entry Date</th>
                    <th>Expiry Date</th>
                    <th>Rate (₹)</th>
                    <th>Total Rate (₹)</th>
                    <th>Threshold</th>
                    <th>Donor Status</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(prod => (
                    <tr key={prod._id} className={isLowStock(prod) ? 'table-danger' : ''}>
                      <td>{prod.product_id}</td>
                      <td>{prod.product_name}</td>
                      <td>{prod.category}</td>
                      <td>{prod.product_company}</td>
                      <td>
                        <span className={`badge ${getStockStatusClass(prod.current_stock, prod.thresholdValue)}`}>
                          {prod.current_stock}
                        </span>
                      </td>
                      <td>{formatDate(prod.entryDate)}</td>
                      <td>{formatDate(prod.expiryDate)}</td>
                      <td>{prod.productRate}</td>
                      <td>{prod.totalRate}</td>
                      <td>{prod.thresholdValue}</td>
                      <td>
 
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <InventoryDonorFinder />
    
    
























    
 
    </div>


    {/* <iframe 
  src="https://inventra-chatbot.onrender.com/frontend/"
  style={{
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    width: '350px',
    height: '450px',
    border: 'none',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    zIndex: 9999,
  }}
  title="Inventra Chatbot"
/>















{/* Chatbot Toggle and Iframe */}
<div>
  {/* Toggle Button */}
  <button 
    onClick={() => setShowChatbot(!showChatbot)} 
    className="btn btn-primary rounded-circle shadow" 
    style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '60px',
      height: '60px',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '24px'
    }}
  >
    {showChatbot ? '×' : '💬'}
  </button>

  {/* Chatbot Iframe */}
  {showChatbot && (
    <div 
      style={{
        position: 'fixed',
        bottom: '90px',
        right: '20px',
        width: '400px', // Bigger width
        height: '500px', // Bigger height
        border: '1px solid #ccc',
        borderRadius: '10px',
        overflow: 'hidden',
        zIndex: 999
      }}
      className="shadow"
    >
      <iframe 
        src="https://inventra-chatbot.onrender.com/frontend/" 
        title="Inventra Chatbot" 
        style={{
          width: '100%',
          height: '100%',
          border: 'none'
        }}
      />
    </div>
  )}
</div>












     
    </div>
  );
}

export default Dashboard;