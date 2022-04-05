import React from "react";
import classes from "./CurrenciesDropMenu.module.css";
import { connect } from "react-redux";
import { setSelectedCurrency } from "../../../features/currenciesSlice";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const mapStateToProps = (state) => {
  return {
    currencies: state.currencies,
  };
};

const mapDispatchToProps = {
  setSelectedCurrency,
};

class CurrenciesDropMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
      showMenu: false,
      selected: {},
    };
    this.menuRef = React.createRef();
    this.iconRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (
      !this.menuRef.current.contains(event.target) &&
      !this.iconRef.current.contains(event.target)
    ) {
      this.setState({ ...this.state, showMenu: false });
    }
  };

  dropdownClickHandler = (e) => {
    e.stopPropagation();
    this.setState({ ...this.state, showMenu: !this.state.showMenu });
  };

  currencyClickHandler = (e, currency) => {
    e.stopPropagation();
    this.props.setSelectedCurrency({ ...currency });
    this.setState({ ...this.state, showMenu: false });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.currencies.data !== this.props.currencies.data) {
      this.setState({
        ...this.state,
        currencies: this.props.currencies.data,
        selected: { ...this.props.currencies.selected },
      });
    }
  }

  render() {
    return (
      <div className={classes.CurrenciesDropMenu}>
        <div
          className={classes.header}
          onClick={this.dropdownClickHandler}
          ref={this.iconRef}
        >
          <p className={classes.symbol}>
            {this.props.currencies.selected.symbol}
          </p>
          <span className={classes.arrowIcon}>
            {this.state.showMenu ? <FiChevronUp /> : <FiChevronDown />}
          </span>
        </div>
        <div className={classes.menu} ref={this.menuRef}>
          {this.state.showMenu &&
            this.props.currencies &&
            this.props.currencies.data.map((currency, index) => (
              <div
                key={index}
                className={classes.currencyContainer}
                onClick={(e) => this.currencyClickHandler(e, currency)}
              >
                <p className={classes.symbol}>{currency.symbol}</p>
                <p className={classes.label}>{currency.label}</p>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrenciesDropMenu);
