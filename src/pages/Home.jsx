import { useEffect, useState, useContext } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Pagination from '../components/Pagination/Pagination';
import { SearchContext } from '../App';

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState({
    name: 'популярності (DESC)',
    sort: 'rating',
  });
  const {searchValue} = useContext(SearchContext);

  useEffect(() => {
    setIsLoading(true);

    const order = sortType.sort.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.sort.replace('-', '');
    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    fetch(
      `https://68b6c5c273b3ec66cec2a52e.mockapi.io/products?page=${currentPage}&limit=4${category}${search}&sortBy=${sortBy}&order=${order}`,
    )
      .then((res) => res.json())
      .then((resJSON) => {
        setPizzas(resJSON);
        setIsLoading(false);
      })
      .catch((err) => console.error(err.message));
    window.scrollTo(0, 0);
  }, [categoryId, sortType.sort, searchValue, currentPage]);

  const pizza = Array.isArray(pizzas) && pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);
  const skeletons = [...new Array(8)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onClickCategory={setCategoryId} />
        <Sort sortType={sortType} onClickSort={setSortType} />
      </div>
      <h2 className="content__title">Всі піци</h2>
      <div className="content__items">
        {isLoading ? skeletons : Array.isArray(pizzas) ? pizza : <div>Товарів не знайдено</div>}
      </div>
      <Pagination onChangePage={number => setCurrentPage(number)}/>
    </div>
  );
};

export default Home;
