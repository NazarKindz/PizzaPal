import { Link } from "react-router-dom";

import CartEmptyImg from "../assets/empty-cart.png"

const CartEmpty = () => {
  return (
    <div className="content">
      <div className="container container--cart">
        <div className="cart cart--empty">
          <h2>
            Кошик пустий 😕
          </h2>
          <p>
            Скоріш за все, Ви не замовили ще піцу.
            <br />
            Для того, щоб замовити піцу, перейдіть на головну сторінку.
          </p>
          <img src={CartEmptyImg} alt="Пустий кошик" />
          <Link to="/" className="button button--black">
            <span>Повернутись на головну</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartEmpty;