import { FC, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const FullPizza: FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string,
    title: string,
    description: string,
    price: number
  }>();
  const { pizzaId } = useParams();
  const navigate = useNavigate();

  const fetchPizza = async () => {
    try {
      const response = await axios.get(
        `https://68b6c5c273b3ec66cec2a52e.mockapi.io/products/?id=${pizzaId}`,
      );
      setPizza(response.data[0]);
    } catch (error) {
        navigate('/');
        if (error instanceof Error) {
          throw new Error(error.message);
        }
    }
  };

  useEffect(() => {
    fetchPizza();
  }, [pizzaId]);

  if (!pizza) {
    return <div className='container'>Завантаження...</div>
  };

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="Pizza" />
      <h2>{pizza.title}</h2>
      <p>{pizza.description}</p>
      <h4>{pizza.price} ₴</h4>
      <Link to='/' className="button button--outline button--add">
        <span>Назад</span>
      </Link>
    </div>
  );
};

export default FullPizza;
