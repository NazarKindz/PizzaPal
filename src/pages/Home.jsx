import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import qs from 'qs';
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';

import { fetchPizzas } from "../redux/slices/pizzaSlice";
import { setFilters, setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import { list } from '../components/Sort';

import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from 'components/PizzaBlock/Skeleton';
import Pagination from 'components/Pagination/Pagination';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sortType);
  const currentPage = useSelector((state) => state.filter.currentPage);
  const pizzas = useSelector((state) => state.pizza.items);
  const status = useSelector((state) => state.pizza.status);
  const searchValue = useSelector((state) => state.filter.searchValue);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = () => {
    const order = sortType.sort && sortType.sort.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.sort && sortType.sort.replace('-', '');
    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        currentPage,
      }),
    );

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = list.find((obj) => obj.sort === params.sort);

      dispatch(
        setFilters({
          ...params,
          sortType: sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }

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
    }

    isMounted.current = true;
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizza =
    Array.isArray(pizzas) &&
    pizzas.map((pizza) => (
      <Link to={`/pizza/${pizza.id}`} key={pizza.id}>
        <PizzaBlock {...pizza} />
      </Link>
    ));
  const skeletons = [...new Array(8)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Всі піци</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Ой лишенько, сталася помилка 😧</h2>
          <p>Не вдалося отримати піци. Спробуйте пізніше</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizza}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
