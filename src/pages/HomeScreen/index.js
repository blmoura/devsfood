import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Container,
  CategoryArea,
  CategoryList,
  ProductArea,
  ProductList,
} from './styled';

import ReactTooltip from 'react-tooltip';

import api from '../../services/api';

import Header from '../../components/Header';
import CategoryItem from '../../components/CategoryItem';
import ProductItem from '../../components/ProductItem';

export default () => {
  const history = useHistory();

  const [headerSearch, setHeaderSearch] = useState('');
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [activeCategory, setActiveCategory] = useState(0);

  const getProducts = async () => {
    const prods = await api.getProducts();
    if (prods.error === '') {
      setProducts(prods.result.data);
    }
  };

  useEffect(() => {
    const getCategories = async () => {
      const cat = await api.getCategories();
      if (cat.error === '') {
        setCategories(cat.result);
      }
      ReactTooltip.rebuild();
    };

    getCategories();
  }, []);

  useEffect(() => {
    getProducts();
  }, [activeCategory]);

  return (
    <Container>
      <Header search={headerSearch} onSearch={setHeaderSearch} />

      {categories && (
        <>
          <CategoryArea>
            Selecione uma categoria ({activeCategory})
            <CategoryList>
              <CategoryItem
                data={{
                  id: 0,
                  name: 'Todas as categorias',
                  image: '/assets/food-and-restaurant.png',
                }}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
              />
              {categories.map((item, key) => (
                <CategoryItem
                  key={key}
                  data={item}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                />
              ))}
            </CategoryList>
          </CategoryArea>
        </>
      )}

      {products && (
        <ProductArea>
          <ProductList>
            {products.map((item, key) => (
              <ProductItem key={key} data={item} />
            ))}
          </ProductList>
        </ProductArea>
      )}
    </Container>
  );
};
