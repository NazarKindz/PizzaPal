import { FC, memo } from 'react';
// import { useWhyDidYouUpdate } from 'ahooks';

interface ICategoriesProps {
  categoryId: number,
  onClickCategory: (id: number) => void;
};

const categories = ['Всі', 'М’ясні', 'Вегетеріанські', 'Гриль', 'Гострі', 'Закриті'];

const Categories: FC<ICategoriesProps> = memo(({ categoryId, onClickCategory }) => {
  // useWhyDidYouUpdate('Categories', { categoryId, onClickCategory });
  
  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            onClick={() => onClickCategory(index)}
            className={categoryId === index ? 'active' : ''}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;