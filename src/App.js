import axios from 'axios';
import { useState } from 'react';
import './App.css';
import RecipeCard from './RecipeCard';
import ReactPaginate from 'react-paginate';

function App() {
  const[query , setquery] = useState(""); 
  const [recipe, setrecipe] = useState([]);
  const[pageNumber , setpageNumber] = useState(0);
  const YOUR_APP_ID = `e3748fd8`;
  const YOUR_APP_KEY = "838753513e57ad6d74c732ddf0dd61f0";
  const url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`;


  async function getRecipe(){
    setrecipe("");
    setpageNumber(0);
    var res = await axios.get(url+`&from=0&to=9`);
    setrecipe(res.data.hits);
    console.log(res.data);
  };

  const handlePageClick = async (event) => {
    var currentPage = (event.selected)*10;
    console.log(currentPage);
    console.log(url+`&from=${currentPage}&to=${currentPage+9}`);
    setrecipe("");
    setpageNumber(event.selected);
    var res = await axios.get(url+`&from=${currentPage}&to=${currentPage+9}`);
    setrecipe(res.data.hits);
    console.log(res.data);
  }
  
  return (
    <div className="App">
      <h1>Food Recipe App <i className="bi bi-egg-fried"></i></h1> 

      <div className="row g-3 mt-3 justify-content-center">
        <div className="col-auto">
          <input type="text" className="form-control" id="ingredients" placeholder='Enter Ingredients' value={query} onChange={(e) => setquery(e.target.value)} />
        </div>
        <div className="col-auto text-center">
          <button type="submit" className="btn btn-info" onClick={getRecipe}>Search</button>
        </div>
      </div>

      { recipe.length > 0 && 
        <div className='container justify-content-center row mt-4'>
          {recipe.map(recipeData => {
                      return <RecipeCard recipeData={recipeData}/>
                  })}      
        </div>
      }
{ recipe.length > 0 && 
      <ReactPaginate
        previousLabel={'<<'}
        nextLabel={'>>'}
        pageCount={10}
        forcePage={pageNumber}
        onPageChange={handlePageClick}
        containerClassName={'pagination mt-3'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        breakClassName={'page-item'}
        breakLinkClassName={'page-link'}
        activeClassName={'active'}
      />
}
      

    </div>
  );
}

export default App;
