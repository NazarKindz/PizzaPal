import { useEffect, useState, useContext, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';

import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Pagination from '../components/Pagination/Pagination';
import { SearchContext } from '../App';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const categoryId = useSelector(state => state.filter.categoryId);
  const sortType = useSelector(state => state.filter.sortType);
  const currentPage = useSelector(state => state.filter.currentPage);

  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { searchValue } = useContext(SearchContext);
  
  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const fetchPizzas = () => {
    setIsLoading(true);

    const order = sortType.sort && sortType.sort.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.sort && sortType.sort.replace('-', '');
    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    axios
      .get(
        `https://68b6c5c273b3ec66cec2a52e.mockapi.io/products?page=${currentPage}&limit=4${category}${search}&sortBy=${sortBy}&order=${order}`,
      )
      .then((res) => {
        setPizzas(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err.message);
        setPizzas([]);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = list.find((obj) => obj.sort === params.sort) || list[0];
      
      dispatch(setFilters({
        ...params,
        sortType: sort
      }));
      isSearch.current = true;
    }
  }, [])

  useEffect(() => {
    if (!isSearch.current) {
      fetchPizzas();
    };

    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sort: sortType.sort,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    };

    isMounted.current = true;
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizza = Array.isArray(pizzas) && pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);
  const skeletons = [...new Array(8)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Всі піци</h2>
      <div className="content__items">
        {isLoading ? skeletons : Array.isArray(pizzas) ? pizza : <div>Товарів не знайдено</div>}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
