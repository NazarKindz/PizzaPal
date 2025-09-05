

function Categories({categoryId, onClickCategory}) {
  const categories = [
    'Всі',
    'Мясні',
    'Вегетеріанські',
    'Гриль',
    'Гострі',
    'Закриті'
  ];

  const renderCategories = categories.map((category, index) => {
    return (<li
            onClick={() => onClickCategory(index)}
            className={categoryId === index ? 'active' : ''}
            key={index}>
              {category}
            </li>);
  })

  return (
    <div className="categories">
      <ul>
        {renderCategories}
      </ul>
    </div>
  );
}

export default Categories;