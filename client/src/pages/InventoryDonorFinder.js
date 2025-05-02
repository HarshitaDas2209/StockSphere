


// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function InventoryDonorFinder() {
//   const [storeId, setStoreId] = useState("");
//   const [inventoryData, setInventoryData] = useState([]);
//   const [storeProducts, setStoreProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Fetch all inventory data when component mounts
//   useEffect(() => {
//     const fetchInventoryData = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get('http://127.0.0.1:5000/check_inventory');
//         // const response = await axios.get('https://donorwarehouse.onrender.com/check_inventory');
//         setInventoryData(response.data);
//       } catch (error) {
//         console.error('Error fetching inventory data:', error);
//         setError("Failed to load inventory data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInventoryData();
//   }, []);

//   // Find all products for a store when search button is clicked
//   const handleSearch = () => {
//     if (!storeId.trim()) {
//       setError("Please enter a Store ID");
//       setStoreProducts([]);
//       return;
//     }

//     // Find all products for the store ID
//     const foundProducts = inventoryData.filter(item => item.store_id === storeId);
    
//     if (foundProducts && foundProducts.length > 0) {
//       setStoreProducts(foundProducts);
//       setError("");
//     } else {
//       setError(`No data found for Store ID: ${storeId}`);
//       setStoreProducts([]);
//     }
//   };

//   return (
//     <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
//       <h2 style={{ marginBottom: "20px" }}>Search for Potential Donors</h2>
//       <div style={{ display: "flex", marginBottom: "20px" }}>
//         <input
//           type="text"
//           placeholder="Enter Store ID (e.g., NYC-001)"
//           value={storeId}
//           onChange={(e) => setStoreId(e.target.value)}
//           style={{ marginRight: "10px", padding: "8px", flexGrow: 1 }}
//         />
//         <button 
//           onClick={handleSearch} 
//           style={{ 
//             padding: "8px 16px", 
//             backgroundColor: "#4CAF50", 
//             color: "white", 
//             border: "none", 
//             borderRadius: "4px",
//             cursor: "pointer"
//           }}
//         >
//           Search Warehouses
//         </button>
//       </div>

//       {loading && <p>Loading inventory data...</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {storeProducts.length > 0 && (
//         <div style={{ backgroundColor: "#f9f9f9", padding: "15px", borderRadius: "5px" }}>
//           <h3>Products Low on Stock at {storeId}:</h3>
          
//           <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
//             <thead>
//               <tr style={{ backgroundColor: "#eee" }}>
//                 <th style={{ padding: "8px", textAlign: "left", border: "1px solid #ddd" }}>Product</th>
//                 <th style={{ padding: "8px", textAlign: "left", border: "1px solid #ddd" }}>Company</th>
//                 <th style={{ padding: "8px", textAlign: "left", border: "1px solid #ddd" }}>Current Stock</th>
//                 <th style={{ padding: "8px", textAlign: "left", border: "1px solid #ddd" }}>Threshold</th>
//                 <th style={{ padding: "8px", textAlign: "left", border: "1px solid #ddd" }}>Potential Donors</th>
//               </tr>
//             </thead>
//             <tbody>
//               {storeProducts.map((product, index) => (
//                 <tr key={index} style={{ backgroundColor: product.current_stock < product.threshold_value ? "#fff8e6" : "white" }}>
//                   <td style={{ padding: "8px", border: "1px solid #ddd" }}>{product.product_name}</td>
//                   <td style={{ padding: "8px", border: "1px solid #ddd" }}>{product.product_company}</td>
//                   <td style={{ padding: "8px", border: "1px solid #ddd", color: product.current_stock < product.threshold_value ? "#d32f2f" : "inherit" }}>
//                     {product.current_stock}
//                   </td>
//                   <td style={{ padding: "8px", border: "1px solid #ddd" }}>{product.threshold_value}</td>
//                   <td style={{ padding: "8px", border: "1px solid #ddd" }}>
//                     {product.replenish_from.length > 0 ? (
//                       <div>
//                         <select style={{ padding: "4px", width: "100%" }}>
//                           <option value="">Select donor warehouse</option>
//                           {product.replenish_from.map((donor, i) => (
//                             <option key={i} value={donor.store_id}>
//                               {donor.store_id} - {donor.current_stock} units available (th:{donor.threshold_value})
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                     ) : (
//                       <span style={{ color: "#d32f2f" }}>No donors available</span>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
          
//           <div style={{ marginTop: "20px" }}>
//             <h4>Replenishment Summary:</h4>
//             <p>Total products below threshold: {storeProducts.filter(p => p.current_stock < p.threshold_value).length} out of {storeProducts.length}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default InventoryDonorFinder;







// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function InventoryDonorFinder() {
//   const [storeId, setStoreId] = useState("");
//   const [inventoryData, setInventoryData] = useState([]);
//   const [storeProducts, setStoreProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Fetch all inventory data when component mounts
//   useEffect(() => {
//     const fetchInventoryData = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get('http://127.0.0.1:5000/check_inventory');
//         // const response = await axios.get('https://donorwarehouse.onrender.com/check_inventory');
//         setInventoryData(response.data);
//       } catch (error) {
//         console.error('Error fetching inventory data:', error);
//         setError("Failed to load inventory data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInventoryData();
//   }, []);

//   // Find all products for a store when search button is clicked
//   const handleSearch = () => {
//     if (!storeId.trim()) {
//       setError("Please enter a Store ID");
//       setStoreProducts([]);
//       return;
//     }

//     // Find all products for the store ID
//     const foundProducts = inventoryData.filter(item => item.store_id === storeId);
    
//     if (foundProducts && foundProducts.length > 0) {
//       setStoreProducts(foundProducts);
//       setError("");
//     } else {
//       setError(`No data found for Store ID: ${storeId}`);
//       setStoreProducts([]);
//     }
//   };

//   return (
//     <div style={{ padding: "20px", maxWidth: "1070px", margin: "0 auto" }}>
//       <h2 style={{ marginBottom: "20px" }}>Search for Potential Donors</h2>
//       <div style={{ display: "flex", marginBottom: "20px" }}>
//         <input
//           type="text"
//           placeholder="Enter Store ID (e.g., NYC-001)"
//           value={storeId}
//           onChange={(e) => setStoreId(e.target.value)}
//           style={{ marginRight: "10px", padding: "8px", flexGrow: 1 }}
//         />
//         <button 
//           onClick={handleSearch} 
//           style={{ 
//             padding: "8px 16px", 
//             backgroundColor: "#4CAF50", 
//             color: "white", 
//             border: "none", 
//             borderRadius: "4px",
//             cursor: "pointer"
//           }}
//         >
//           Search Warehouses
//         </button>
//       </div>

//       {loading && <p>Loading inventory data...</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {storeProducts.length > 0 && (
//         <div style={{ backgroundColor: "#f9f9f9", padding: "15px", borderRadius: "5px" }}>
//           <h3>Products Low on Stock at {storeId}:</h3>
          
//           <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
//             <thead>
//               <tr style={{ backgroundColor: "#eee" }}>
//                 <th style={{ padding: "8px", textAlign: "left", border: "1px solid #ddd" }}>Product</th>
//                 <th style={{ padding: "8px", textAlign: "left", border: "1px solid #ddd" }}>Company</th>
//                 <th style={{ padding: "8px", textAlign: "left", border: "1px solid #ddd" }}>Current Stock</th>
//                 <th style={{ padding: "8px", textAlign: "left", border: "1px solid #ddd" }}>Threshold</th>
//                 <th style={{ padding: "8px", textAlign: "left", border: "1px solid #ddd" }}>Potential Donors</th>
//               </tr>
//             </thead>
//             <tbody>
//               {storeProducts.map((product, index) => (
//                 <tr key={index} style={{ backgroundColor: product.current_stock < product.threshold_value ? "#fff8e6" : "white" }}>
//                   <td style={{ padding: "8px", border: "1px solid #ddd" }}>{product.product_name}</td>
//                   <td style={{ padding: "8px", border: "1px solid #ddd" }}>{product.product_company}</td>
//                   <td style={{ padding: "8px", border: "1px solid #ddd", color: product.current_stock < product.threshold_value ? "#d32f2f" : "inherit" }}>
//                     {product.current_stock}
//                   </td>
//                   <td style={{ padding: "8px", border: "1px solid #ddd" }}>{product.threshold_value}</td>
//                   <td style={{ padding: "8px", border: "1px solid #ddd" }}>
//                     {product.replenish_from.length > 0 ? (
//                       <div>
//                         <select 
//                           style={{ padding: "4px", width: "100%" }}
//                           onChange={(e) => {
//                             // You can add handling for selected donor here if needed
//                           }}
//                         >
//                           <option value="">Select donor warehouse</option>
//                           {product.replenish_from.map((donor, i) => (
//                             <option key={i} value={donor.store_id}>
//                               {donor.store_id} - {donor.current_stock} (th:{donor.threshold_value}) units available 
//                               {donor.manager_email ? ` - ${donor.manager_email}` : ''}
//                             </option>
//                           ))}
//                         </select>
                        
//                         {/* Display contact information for the first donor */}
//                         {/* {product.replenish_from.length > 0 && product.replenish_from[0].manager_email && (
//                           <div style={{ 
//                             marginTop: "8px", 
//                             padding: "6px", 
//                             backgroundColor: "#e8f5e9", 
//                             borderRadius: "4px",
//                             fontSize: "0.9em" 
//                           }}>
//                             <strong>Contact:</strong> {product.replenish_from[0].manager_email}
//                           </div>
//                         )} */}
//                       </div>
//                     ) : (
//                       <span style={{ color: "#d32f2f" }}>No donors available</span>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
          
//           <div style={{ marginTop: "20px" }}>
//             <h4>Replenishment Summary:</h4>
//             <p>Total products below threshold: {storeProducts.filter(p => p.current_stock < p.threshold_value).length} out of {storeProducts.length}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default InventoryDonorFinder;




// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function InventoryDonorFinder() {
//   const [storeId, setStoreId] = useState("");
//   const [inventoryData, setInventoryData] = useState([]);
//   const [storeProducts, setStoreProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [currentManager, setCurrentManager] = useState(null);

//   // Fetch all inventory data when component mounts
//   useEffect(() => {
//     const fetchInventoryData = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get('http://127.0.0.1:5000/check_inventory');
//         // const response = await axios.get('https://donorwarehouse.onrender.com/check_inventory');
//         setInventoryData(response.data);
//       } catch (error) {
//         console.error('Error fetching inventory data:', error);
//         setError("Failed to load inventory data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInventoryData();
    
//     // Get current manager info from localStorage
//     const manager = JSON.parse(localStorage.getItem("manager"));
//     if (manager) {
//       setCurrentManager(manager);
//     }
//   }, []);

//   // Find all products for a store when search button is clicked
//   const handleSearch = () => {
//     if (!storeId.trim()) {
//       setError("Please enter a Store ID");
//       setStoreProducts([]);
//       return;
//     }

//     // Find all products for the store ID
//     const foundProducts = inventoryData.filter(item => item.store_id === storeId);
    
//     if (foundProducts && foundProducts.length > 0) {
//       setStoreProducts(foundProducts);
//       setError("");
//     } else {
//       setError(`No data found for Store ID: ${storeId}`);
//       setStoreProducts([]);
//     }
//   };

//   // Generate email link with pre-populated fields
//   const generateEmailLink = (donorEmail, productName, currentStock, thresholdValue) => {
//     const subject = `Request for Inventory Transfer: ${productName}`;
//     const body = `Dear Warehouse Manager,

// I hope this email finds you well. I am writing from ${currentManager?.warehouseName || "our warehouse"} where we are currently experiencing a shortage of ${productName}.

// Current Details:
// - Product: ${productName}
// - Current Stock: ${currentStock}
// - Threshold Value: ${thresholdValue}
// - Needed Amount: ${thresholdValue - currentStock + 5} units (to reach threshold + 5 unit buffer)

// Our system indicates that your warehouse may have surplus inventory of this item. Would it be possible to arrange a transfer to help us meet our inventory requirements?

// Please let me know if this is feasible and what process we should follow to facilitate the transfer.

// Thank you for your assistance.

// Best regards,
// ${currentManager?.name || "Warehouse Manager"}
// ${currentManager?.email || ""}
// ${currentManager?.warehouseName || ""}`;

//     return `mailto:${donorEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
//   };

//   return (
//     <div style={{ padding: "20px", maxWidth: "1070px", margin: "0 auto" }}>
//       <h2 style={{ marginBottom: "20px" }}>Search for Potential Donors</h2>
//       <div style={{ display: "flex", marginBottom: "20px" }}>
//         <input
//           type="text"
//           placeholder="Enter Store ID (e.g., NYC-001)"
//           value={storeId}
//           onChange={(e) => setStoreId(e.target.value)}
//           style={{ marginRight: "10px", padding: "8px", flexGrow: 1 }}
//         />
//         <button 
//           onClick={handleSearch} 
//           style={{ 
//             padding: "8px 16px", 
//             backgroundColor: "#4CAF50", 
//             color: "white", 
//             border: "none", 
//             borderRadius: "4px",
//             cursor: "pointer"
//           }}
//         >
//           Search Warehouses
//         </button>
//       </div>

//       {loading && <p>Loading inventory data...</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {storeProducts.length > 0 && (
//         <div style={{ backgroundColor: "#f9f9f9", padding: "15px", borderRadius: "5px" }}>
//           <h3>Products Low on Stock at {storeId}:</h3>
          
//           <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
//             <thead>
//               <tr style={{ backgroundColor: "#eee" }}>
//                 <th style={{ padding: "8px", textAlign: "left", border: "1px solid #ddd" }}>Product</th>
//                 <th style={{ padding: "8px", textAlign: "left", border: "1px solid #ddd" }}>Company</th>
//                 <th style={{ padding: "8px", textAlign: "left", border: "1px solid #ddd" }}>Current Stock</th>
//                 <th style={{ padding: "8px", textAlign: "left", border: "1px solid #ddd" }}>Threshold</th>
//                 <th style={{ padding: "8px", textAlign: "left", border: "1px solid #ddd" }}>Potential Donors</th>
//                 <th style={{ padding: "8px", textAlign: "left", border: "1px solid #ddd" }}>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {storeProducts.map((product, index) => (
//                 <tr key={index} style={{ backgroundColor: product.current_stock < product.threshold_value ? "#fff8e6" : "white" }}>
//                   <td style={{ padding: "8px", border: "1px solid #ddd" }}>{product.product_name}</td>
//                   <td style={{ padding: "8px", border: "1px solid #ddd" }}>{product.product_company}</td>
//                   <td style={{ padding: "8px", border: "1px solid #ddd", color: product.current_stock < product.threshold_value ? "#d32f2f" : "inherit" }}>
//                     {product.current_stock}
//                   </td>
//                   <td style={{ padding: "8px", border: "1px solid #ddd" }}>{product.threshold_value}</td>
//                   <td style={{ padding: "8px", border: "1px solid #ddd" }}>
//                     {product.replenish_from.length > 0 ? (
//                       <div>
//                         <select 
//                           id={`donor-select-${index}`}
//                           style={{ padding: "4px", width: "100%" }}
//                         >
//                           <option value="">Select donor warehouse</option>
//                           {product.replenish_from.map((donor, i) => (
//                             <option key={i} value={donor.store_id} data-email={donor.manager_email}>
//                               {donor.store_id} - {donor.current_stock} (th:{donor.threshold_value}) units available 
//                               {donor.manager_email ? ` - ${donor.manager_email}` : ''}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                     ) : (
//                       <span style={{ color: "#d32f2f" }}>No donors available</span>
//                     )}
//                   </td>
//                   <td style={{ padding: "8px", border: "1px solid #ddd" }}>
//                     {product.replenish_from.length > 0 && (
//                       <button
//                         onClick={() => {
//                           const selectElement = document.getElementById(`donor-select-${index}`);
//                           const selectedOption = selectElement.options[selectElement.selectedIndex];
//                           const donorEmail = selectedOption.getAttribute('data-email');
                          
//                           if (donorEmail && donorEmail !== "Email not found" && donorEmail !== "Error retrieving email") {
//                             window.location.href = generateEmailLink(
//                               donorEmail,
//                               product.product_name,
//                               product.current_stock,
//                               product.threshold_value
//                             );
//                           } else {
//                             alert("Please select a donor with a valid email address");
//                           }
//                         }}
//                         style={{
//                           padding: "6px 12px",
//                           backgroundColor: "#1976d2",
//                           color: "white",
//                           border: "none",
//                           borderRadius: "4px",
//                           cursor: "pointer",
//                           fontSize: "0.9em"
//                         }}
//                       >
//                         <span role="img" aria-label="Email" style={{ marginRight: "4px" }}>✉️</span> 
//                         Send Email
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
          
//           <div style={{ marginTop: "20px" }}>
//             <h4>Replenishment Summary:</h4>
//             <p>Total products below threshold: {storeProducts.filter(p => p.current_stock < p.threshold_value).length} out of {storeProducts.length}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default InventoryDonorFinder;


import React, { useState, useEffect } from "react";
import axios from "axios";

function InventoryDonorFinder() {
  const [storeId, setStoreId] = useState("");
  const [inventoryData, setInventoryData] = useState([]);
  const [storeProducts, setStoreProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentManager, setCurrentManager] = useState(null);
  const [selectedDonors, setSelectedDonors] = useState({});

  // Fetch all inventory data when component mounts
  useEffect(() => {
    const fetchInventoryData = async () => {
      setLoading(true);
      try {
        // const response = await axios.get('http://127.0.0.1:5000/check_inventory');
        const response = await axios.get('https://donor-jzdh.onrender.com/check_inventory');
        setInventoryData(response.data);
      } catch (error) {
        console.error('Error fetching inventory data:', error);
        setError("Failed to load inventory data");
      } finally {
        setLoading(false);
      }
    };

    fetchInventoryData();
    
    // Get current manager info from localStorage
    const manager = JSON.parse(localStorage.getItem("manager"));
    if (manager) {
      setCurrentManager(manager);
    }
  }, []);

  // Find all products for a store when search button is clicked
  const handleSearch = () => {
    if (!storeId.trim()) {
      setError("Please enter a Store ID");
      setStoreProducts([]);
      return;
    }

    // Find all products for the store ID
    const foundProducts = inventoryData.filter(item => item.store_id === storeId);
    
    if (foundProducts && foundProducts.length > 0) {
      setStoreProducts(foundProducts);
      setError("");
      
      // Initialize selected donors object
      const initialSelectedDonors = {};
      foundProducts.forEach((product, index) => {
        initialSelectedDonors[index] = "";
      });
      setSelectedDonors(initialSelectedDonors);
    } else {
      setError(`No data found for Store ID: ${storeId}`);
      setStoreProducts([]);
    }
  };

  // Handle donor selection change
  const handleDonorChange = (productIndex, value) => {
    setSelectedDonors(prev => ({
      ...prev,
      [productIndex]: value
    }));
  };

  // Generate Gmail compose URL with pre-populated fields
  const generateGmailComposeLink = (donorEmail, productName, productCompany, currentStock, thresholdValue) => {
    const subject = `Request for Inventory Transfer: ${productName}`;
    const body = `Dear Warehouse Manager,

I hope this email finds you well. I am writing from ${currentManager?.warehouseName || "our warehouse"} where we are currently experiencing a shortage of ${productName}.

Current Details:
- Product: ${productName}
-Company:${productCompany}
- Current Stock: ${currentStock}
- Threshold Value: ${thresholdValue}
- Needed Amount: ${thresholdValue - currentStock + 5} units (to reach threshold + 5 unit buffer)

Our system indicates that your warehouse may have surplus inventory of this item. Would it be possible to arrange a transfer to help us meet our inventory requirements?

Please let me know if this is feasible and what process we should follow to facilitate the transfer.

Thank you for your assistance.

Best regards,
${currentManager?.name || "Warehouse Manager"}
${currentManager?.email || ""}
${currentManager?.warehouseName || ""}`;

    // Create a Gmail compose URL
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(donorEmail)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  // Open Gmail compose window
  const openEmailComposer = (productIndex, product) => {
    const donorSelect = document.getElementById(`donor-select-${productIndex}`);
    if (!donorSelect) {
      alert("Could not find donor selection");
      return;
    }
    
    const selectedIndex = donorSelect.selectedIndex;
    if (selectedIndex <= 0) { // 0 is the placeholder option
      alert("Please select a donor warehouse first");
      return;
    }
    
    const selectedOption = donorSelect.options[selectedIndex];
    const donorEmail = selectedOption.getAttribute('data-email');
    
    if (!donorEmail || donorEmail === "Email not found" || donorEmail === "Error retrieving email") {
      alert("Selected donor does not have a valid email address");
      return;
    }
    
    // Create Gmail compose URL
    const gmailComposeUrl = generateGmailComposeLink(
      donorEmail,
      product.product_name,
      product.product_company,
      product.current_stock,
      product.threshold_value
    );
    
    // Open Gmail compose window in a new tab
    window.open(gmailComposeUrl, '_blank');
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1070px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "20px" }}>Search for Potential Donors</h2>
      <div style={{ display: "flex", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter Store ID (e.g., NYC-001)"
          value={storeId}
          onChange={(e) => setStoreId(e.target.value)}
          style={{ marginRight: "10px", padding: "8px", flexGrow: 1 }}
        />
        <button 
          onClick={handleSearch} 
          style={{ 
            padding: "8px 16px", 
            backgroundColor: "#4CAF50", 
            color: "white", 
            border: "none", 
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Search Warehouses
        </button>
      </div>

      {loading && <p>Loading inventory data...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {storeProducts.length > 0 && (
        <div style={{ backgroundColor: "#f9f9f9", padding: "15px", borderRadius: "5px" }}>
          <h3>Products Low on Stock at {storeId}:</h3>
          
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
            <thead>
              <tr style={{ backgroundColor: "#eee" }}>
                <th style={{ padding: "8px", textAlign: "left", border: "1px solid #ddd" }}>Product</th>
                <th style={{ padding: "8px", textAlign: "left", border: "1px solid #ddd" }}>Company</th>
                <th style={{ padding: "8px", textAlign: "left", border: "1px solid #ddd" }}>Current Stock</th>
                <th style={{ padding: "8px", textAlign: "left", border: "1px solid #ddd" }}>Threshold</th>
                <th style={{ padding: "8px", textAlign: "left", border: "1px solid #ddd" }}>Potential Donors</th>
                <th style={{ padding: "8px", textAlign: "left", border: "1px solid #ddd" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {storeProducts.map((product, index) => (
                <tr key={index} style={{ backgroundColor: product.current_stock < product.threshold_value ? "#fff8e6" : "white" }}>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>{product.product_name}</td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>{product.product_company}</td>
                  <td style={{ padding: "8px", border: "1px solid #ddd", color: product.current_stock < product.threshold_value ? "#d32f2f" : "inherit" }}>
                    {product.current_stock}
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>{product.threshold_value}</td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                    {product.replenish_from.length > 0 ? (
                      <div>
                        <select 
                          id={`donor-select-${index}`}
                          style={{ padding: "4px", width: "100%" }}
                          value={selectedDonors[index] || ""}
                          onChange={(e) => handleDonorChange(index, e.target.value)}
                        >
                          <option value="">Select donor warehouse</option>
                          {product.replenish_from.map((donor, i) => (
                            <option 
                              key={i} 
                              value={donor.store_id} 
                              data-email={donor.manager_email}
                            >
                              {donor.store_id} - {donor.current_stock} units available 
                              {donor.manager_email ? ` - ${donor.manager_email}` : ''}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <span style={{ color: "#d32f2f" }}>No donors available</span>
                    )}
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                    {product.replenish_from.length > 0 && (
                      <div style={{ display: "flex", gap: "5px" }}>
                        <button
                          onClick={() => openEmailComposer(index, product)}
                          style={{
                            padding: "6px 12px",
                            backgroundColor: "#DB4437",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "0.9em",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                          title="Opens Gmail compose with a pre-filled message"
                        >
                          <span role="img" aria-label="Gmail" style={{ marginRight: "4px" }}>📧</span> 
                          Gmail
                        </button>
                        
                        <button
                          onClick={() => {
                            const donorSelect = document.getElementById(`donor-select-${index}`);
                            if (!donorSelect || donorSelect.selectedIndex <= 0) {
                              alert("Please select a donor warehouse first");
                              return;
                            }
                            
                            const selectedOption = donorSelect.options[donorSelect.selectedIndex];
                            const donorEmail = selectedOption.getAttribute('data-email');
                            
                            if (!donorEmail || donorEmail === "Email not found") {
                              alert("Selected donor does not have a valid email address");
                              return;
                            }
                            
                            // Copy email to clipboard
                            navigator.clipboard.writeText(donorEmail)
                              .then(() => alert(`Email address copied to clipboard: ${donorEmail}`))
                              .catch(err => alert("Could not copy email address: " + err));
                          }}
                          style={{
                            padding: "6px 12px",
                            backgroundColor: "#4285F4",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "0.9em",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                          title="Copy donor email address to clipboard"
                        >
                          <span role="img" aria-label="Copy" style={{ marginRight: "4px" }}>📋</span> 
                          Copy Email
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div style={{ marginTop: "20px" }}>
            <h4>Replenishment Summary:</h4>
            <p>Total products below threshold: {storeProducts.filter(p => p.current_stock < p.threshold_value).length} out of {storeProducts.length}</p>
          </div>
          
          <div style={{ marginTop: "15px", padding: "10px", backgroundColor: "#e8f4f8", borderRadius: "4px", fontSize: "0.9em" }}>
            <p><strong>Gmail button:</strong> Opens Gmail in your browser with a pre-filled message to the selected donor warehouse manager.</p>
            <p><strong>Copy Email button:</strong> Copies the donor's email address to your clipboard so you can paste it into any email client.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default InventoryDonorFinder;