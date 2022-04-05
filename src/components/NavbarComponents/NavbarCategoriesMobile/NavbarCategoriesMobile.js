import React from "react";
import { connect } from "react-redux";
import classes from "./NavbarCategoriesMobile.module.css";
import { setSelectedCategory } from "../../../features/categoriesSlice";
import { CSSTransition } from "react-transition-group";
import "./transitions.css";

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
  };
};

const mapDispatchToProps = {
  setSelectedCategory,
};

class NavbarCategoriesMobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      selected: "",
      show: false,
    };
    this.wrapperRef = React.createRef();
    this.menuRef = React.createRef();
  }

  fetchStates = (mount) => {
    const categories = this.props.categories;
    if (mount) {
      this.setState({
        ...this.state,
        categories: categories.data,
        selected: categories.selected,
        show: true,
      });
    } else {
      this.setState({
        ...this.state,
        categories: categories.data,
        selected: categories.selected,
      });
    }
  };

  componentDidMount() {
    this.fetchStates(true);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.categories.selected !== this.props.categories.selected) {
      this.fetchStates(false);
    }
  }
  closeHandler = () => {
    this.setState({ ...this.state, show: false });
    setTimeout(() => {
      this.props.close();
    }, 350);
  };

  clickHandler = (category) => {
    this.setState({ ...this.state, selected: category });
    this.props.setSelectedCategory(category);
    this.closeHandler();
  };

  wrapperClickHandler = (e) => {
    e.stopPropagation();
    if (!this.menuRef.current.contains(e.target)) {
      this.closeHandler();
    }
  };

  render() {
    console.log(this.state.show);
    return (
      <div
        className={classes.NavbarCategoriesMobile}
        ref={this.wrapperRef}
        onClick={this.wrapperClickHandler}
      >
        <CSSTransition
          classNames="cat-menu-transition"
          timeout={1000000}
          in={this.state.show === true}
        >
          <div className={classes.menu} ref={this.menuRef}>
            <h3 className={classes.title}>Categories</h3>
            <div className={classes.categoriesList}>
              {this.state.categories.map((category) => (
                <div
                  className={[
                    classes.category,
                    this.state.selected === category.name && classes.selected,
                  ].join(" ")}
                  key={category.name}
                  onClick={() => this.clickHandler(category.name)}
                >
                  <p>{category.name}</p>
                </div>
              ))}
            </div>
          </div>
        </CSSTransition>
        <div className={classes.overlay}></div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavbarCategoriesMobile);
