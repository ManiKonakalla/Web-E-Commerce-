package com.ecommerce.Ecommerce.controller;


import com.ecommerce.Ecommerce.entity.Category;
import com.ecommerce.Ecommerce.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/ecommerce")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/categories")
    public List<Category> getCategories() {
        return categoryService.findAllCategories();
    }

    @GetMapping("/categories/{categoryId}")
    public Optional<Category> getCategoryById(@PathVariable int categoryId ) {
        return categoryService.findCategoryById(categoryId);
    }

    @PostMapping("/categories")
    public Category saveCategory(@RequestBody Category thecategory) {
        return categoryService.saveCategory(thecategory);
    }

    @PutMapping("/categories")
    public Category updateCategory(@RequestBody Category thecategory) {
        return categoryService.saveCategory(thecategory) ;
    }

    @DeleteMapping("/categories/{categoryId}")
    public void deleteCategory(@PathVariable int categoryId) {
        categoryService.deleteCategoryById(categoryId);
    }

}
