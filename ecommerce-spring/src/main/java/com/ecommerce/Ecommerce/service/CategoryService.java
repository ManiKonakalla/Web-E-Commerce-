package com.ecommerce.Ecommerce.service;

import com.ecommerce.Ecommerce.entity.Category;

import java.util.List;
import java.util.Optional;

public interface CategoryService {

    public List<Category> findAllCategories() ;

    public Optional<Category> findCategoryById(int theId) ;

    public Category saveCategory(Category theCategory) ;

    public void deleteCategoryById(int theId) ;
}
