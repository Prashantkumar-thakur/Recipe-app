import React , {useState} from 'react';
import './RecipeCard.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function RecipeCard({ recipeData }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
        <div className='card me-4 mb-4'>
            <img src={recipeData['recipe']['image']} className="card-img-top" alt='Recipe' />
            <div className="card-body">
                <h5 className="card-title">{recipeData['recipe']['label']}</h5>
                <p className="card-text"><b>mealType :</b> {recipeData['recipe']['mealType']} <br/>
                <b>calories : </b> {recipeData['recipe']['calories']}
                <br/><b>Source :</b> {recipeData['recipe']['source']}
                </p>  
                <Button variant="outline-secondary" onClick={handleShow}>
                  Check Ingredients
                </Button>

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Ingredients</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {recipeData['recipe']['ingredientLines'].map(recipeIngredients => {
                      return <p>{recipeIngredients}</p>
                    })}
                  </Modal.Body>
                </Modal> 
                <br/><br/>
                <a href={recipeData['recipe']['shareAs']} target="_blank"  rel="noopener noreferrer">Know More</a>  
            </div>
        </div>
    </>
    
  );
}
