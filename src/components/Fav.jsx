import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { favActions } from "../redux/slices/favSlice";
import { Container, Row, Col } from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { toast } from "react-toastify";

const Fav = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const favItems = useSelector((state) => state.fav.favItems);
  const dispatch = useDispatch();
  const [isDeleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState(null);

  const deleteFavItem = (itemId) => {
    setItemToDelete(itemId);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirmation = () => {
    if (itemToDelete) {
      dispatch(favActions.removeItem(itemToDelete));
      toast.success("Item removed from favorites");
      setDeleteModalOpen(false);
    }
  };

  return (
    <>
      
      <section>
        <Container>
          <Row>
            <Col className='fav-items' lg="12">
            <div style={{textAlign:"center", marginBottom:"20px"}}> <h1>Favourites</h1></div>
              {favItems.length === 0 ? (
                <div className="justify favbox">
                  <h2 className="fs-4 text-center">
                    Nothing seems to be here{" "}
                    <i className="ri-emotion-sad-line"></i>
                  </h2>
                  <p className="text-center mt-5">
                    Create a curated collection of your most cherished finds and
                    let them dance in the realm of your favorites.
                  </p>
                  <Link to="/recipes" className="buy__button button_cs">
                    <div style={{textAlign:"center", textDecoration:"underline",fontSize:"20px",marginTop:"20px"}}>Continue Shopping</div>
                  </Link>
                </div>
              ) : (
                <section className='favorites'>

                  {favItems.map((item, index) => (
                    <FavItem
                      item={item}
                      key={index}
                      deleteFavItem={deleteFavItem}
                    />
                  ))}
                </section>
              )}
            </Col>
          </Row>
        </Container>
      </section>
      {itemToDelete && (
        <Modal isOpen={isDeleteModalOpen} toggle={() => setDeleteModalOpen(false)}>
          <ModalHeader toggle={() => setDeleteModalOpen(false)}>
            Confirm Removal
          </ModalHeader>
          <ModalBody>
            Are you sure you want to remove the item from your favorites?
          </ModalBody>
          <ModalFooter>
            <button className="buy__button btn-move-to-fav-cancel btn-danger" onClick={handleDeleteConfirmation}>
              Yes, Remove
            </button>
            <button className="buy__button btn-secondary" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </button>
          </ModalFooter>
        </Modal>
      )}
    </>
  );
};

const FavItem = ({ item, deleteFavItem }) => {
  return (
    <div className="fav-item">
      <div className="gridding">
        <div className="fav-item-image">
          <Link to={`/recipes/${item.id}`}>
            <img src={item.imgUrl} alt="" />
          </Link>
        </div>
        <div className="fav-item-title">
          <Link to={`/recipes/${item.id}`}>{item.title}</Link>
        </div>
        <div className="fav-item-details">
          <div></div>
          <div className="fav-item-actions">
          <button onClick={() => deleteFavItem(item.id)} class="delete-button">
            <svg viewBox="0 0 448 512" class="delete-svgIcon"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fav;