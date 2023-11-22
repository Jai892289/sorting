import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllData } from './redux/action';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket, faHeart } from '@fortawesome/free-solid-svg-icons';


// const FileUploadPage = ({ ondata }) => {
//   const navigate = useNavigate()
//   const dispatch = useDispatch();
//   const datas = useSelector(state => state.getAllData.data)
//   console.log("datas", datas)
//   const [data, setData] = useState("0")
//   const [sortOrder, setSortOrder] = useState('lowToHigh');
//   const [priceFilter, setPriceFilter] = useState('all');
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [searchInput, setSearchInput] = useState('');

//   useEffect(() => {

//     dispatch(fetchAllData())

//   }, [])

//   const handleClick = () => {
//     // navigate("/cart")
//     setData(data + 1)
//   }

//   const handleSelect = (e) => {
//     setSortOrder(e.target.value)
//     console.log("select", sortOrder)

//   }

//   const selectHandle = (e) =>{
//     setSelectedCategories(e.target.value)
//     console.log(selectedCategories)
//   }

//   const filterBySearch = (product) => {
//     return product.title.toLowerCase().includes(searchInput.toLowerCase());
//   }

//   const filterByPriceRange = (product) => {
//     if (priceFilter === 'all') {
//       return true;
//     } else if (priceFilter === '0-10') {
//       return product.price > 0 && product.price <= 10;
//     } else if (priceFilter === '10-20') {
//       return product.price > 10 && product.price <= 20;
//     } else if (priceFilter === '20-30') {
//       return product.price > 20 && product.price <= 30;
//     }
//   }

//   const sortedDatas = [...datas].filter(filterByPriceRange).filter(filterBySearch).sort((a, b) => {
//     if (sortOrder === 'lowToHigh') {
//       return a.price - b.price;
//     } else {
//       console.log("hight to low")
//       return b.price - a.price;
//     }
//   });

//   const handlePriceFilter = (e) => {

//     setPriceFilter(e.target.value)
//   }

//   return (
//     <div>
//       <div>
//         <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
//           {data}
//           <FontAwesomeIcon icon={faShoppingBasket} /><br></br><br></br>

//           <input type="text" placeholder='search here...' onChange={selectHandle}/><br></br>
//           <select onChange={handleSelect}>
//             <option>select below data</option>
//             <option value="lowToHigh">Low to High</option>
//             <option value="highToLow">High to Low</option>
//           </select>

//           <select onChange={handlePriceFilter}>
//             <option value="all">All Prices</option>
//             <option value="0-10">$0 - $10</option>
//             <option value="10-20">$10 - $20</option>
//             <option value="20-30">$20 - $30</option>
//           </select>
//         </div>

//         <div className="card-container">
//           {sortedDatas.map((i, index) => (
//             <div key={index} className="card">
//               <img className="card-img-top" src={i.image} alt="Card image cap" />
//               <div className="card-body">
//                 <h5 className="card-title">{i.title.slice(0, 20)}</h5>
//                 <p className="card-text">{i.description.slice(0, 25)}...</p>
//                 <p className="card-text">${i.price}</p>
//                 <button className="btn btn-primary" onClick={handleClick}>
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default FileUploadPage

const FileUploadPage = ({ ondata }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const datas = useSelector(state => state.getAllData.data);
  console.log("datas", datas);
  const [data, setData] = useState("0");
  const [sortOrder, setSortOrder] = useState('lowToHigh');
  const [priceFilter, setPriceFilter] = useState('all');
  const [searchInput, setSearchInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  useEffect(() => {
    dispatch(fetchAllData());
  }, []);

  const filterByPriceRange = (product) => {
    if (priceFilter === 'all') {
      return true;
    } else if (priceFilter === '0-10') {
      return product.price > 0 && product.price <= 10;
    } else if (priceFilter === '10-20') {
      return product.price > 10 && product.price <= 20;
    } else if (priceFilter === '20-30') {
      return product.price > 20 && product.price <= 30;
    }
  }

  const filterBySearch = (product) => {
    return product.title.toLowerCase().includes(searchInput.toLowerCase()) ||
      product.description.toLowerCase().includes(searchInput.toLowerCase());
  }

  // Move the declaration of sortedDatas below its dependencies
  const sortedDatas = [...datas]
    .filter(filterByPriceRange)
    .filter(filterBySearch)
    .sort((a, b) => {
      if (sortOrder === 'lowToHigh') {
        return a.price - b.price;
      } else {
        console.log("high to low");
        return b.price - a.price;
      }
    });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedDatas.slice(indexOfFirstItem, indexOfLastItem);

  const handleClick = () => {
    // navigate("/cart")
    setData(data + 1);
  }

  const handleSelect = (e) => {
    setSortOrder(e.target.value);
    console.log("select", sortOrder);
  }

  const handlePriceFilter = (e) => {
    setPriceFilter(e.target.value);
  }

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  }

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
      <div>
        <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
          {data}
          <FontAwesomeIcon icon={faShoppingBasket} /><br></br><br></br>

          <input type="text" placeholder='search here...' onChange={handleSearchInputChange} /><br></br>
          <select onChange={handleSelect}>
            <option>select below data</option>
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </select>

          <select onChange={handlePriceFilter}>
            <option value="all">All Prices</option>
            <option value="0-10">$0 - $10</option>
            <option value="10-20">$10 - $20</option>
            <option value="20-30">$20 - $30</option>
          </select>
        </div>

        <div className="card-container">
          {currentItems.map((i, index) => (
            <div key={index} className="card">
              <img className="card-img-top" src={i.image} alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title">{i.title.slice(0, 20)}</h5>
                <p className="card-text">{i.description.slice(0, 25)}...</p>
                <p className="card-text">${i.price}</p>
                <button className="btn btn-primary" onClick={handleClick}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pagination">
        {Array.from({ length: Math.ceil(sortedDatas.length / itemsPerPage) }, (_, i) => (
          <button key={i + 1} onClick={() => paginate(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}


export default FileUploadPage;

