import { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '../redux/store';
import { fetchPizzas, selectPizza } from '../redux/slices/Pizza/pizzaSlice';
import {
  setFilters,
  setCategoryId,
  setCurrentPage,
  selectSort,
} from '../redux/slices/filter/filterSlice';
import { list } from '../components/Sort';

import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from 'components/PizzaBlock/Skeleton';
import Pagination from 'components/Pagination/Pagination';

const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sortType, currentPage, searchValue } = useSelector(selectSort);
  const { pizzas, status } = useSelector(selectPizza);

  const onClickCategory = useCallback(
    (id: number) => {
      dispatch(setCategoryId(id));
    },
    [categoryId],
  );

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
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

      const sort = list.find((obj) => obj.sort === params.sort) || list[0];

      dispatch(
        setFilters({
          searchValue: (params.searchValue as string) || '',
          categoryId: Number(params.categoryId) || 0,
          currentPage: Number(params.currentPage) || 1,
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
    Array.isArray(pizzas) && pizzas.map((pizza) => <PizzaBlock {...pizza} key={pizza.id} />);
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
