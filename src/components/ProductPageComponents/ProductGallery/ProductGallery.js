import React from "react";
import classes from "./ProductGallery.module.css";

class ProductGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      mainImage: "",
    };
  }

  setImages = () => {
    this.setState({
      ...this.state,
      images: this.props.images,
      mainImage: this.props.images[0],
    });
  };

  componentDidMount() {
    this.setImages();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.images !== this.props.images) {
      this.setImages();
    }
  }

  imageClickHandler = (image) => {
    this.setState({ ...this.state, mainImage: image });
  };

  render() {
    return (
      <div className={classes.ProductGallery}>
        <div className={classes.imagesContainer}>
          {this.state.images.map((image, index) => (
            <img
              src={image}
              alt={`product_${index + 1}`}
              key={index}
              onClick={() => this.imageClickHandler(image)}
            />
          ))}
        </div>
        <div className={classes.mainImage}>
          <img src={this.state.mainImage} alt="main" />
        </div>
      </div>
    );
  }
}

export default ProductGallery;
