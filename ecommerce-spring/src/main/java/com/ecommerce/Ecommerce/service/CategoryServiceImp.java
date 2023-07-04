package com.ecommerce.Ecommerce.service;

import com.ecommerce.Ecommerce.entity.Category;
import com.ecommerce.Ecommerce.repository.CategoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImp implements CategoryService {

    @Autowired
    private CategoryRepo categoryRepo;

    @Override
    @Transactional
    public List<Category> findAllCategories() {
        return categoryRepo.findAll();
    }

    @Override
    @Transactional
    public Optional<Category> findCategoryById(int theId) {
        return categoryRepo.findById(theId);
    }

    @Override
    @Transactional
    public Category saveCategory(Category theCategory) {
        return categoryRepo.save(theCategory);
    }

    @Override
    @Transactional
    public void deleteCategoryById(int theId) {
        categoryRepo.deleteById(theId);
    }
}
