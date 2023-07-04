package com.ecommerce.Ecommerce.service;

import com.ecommerce.Ecommerce.entity.UserAddress;
import com.ecommerce.Ecommerce.repository.UserAddressRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UserAddressServiceImp implements UserAddressService {

    @Autowired
    private UserAddressRepo userAddressRepo;

    @Override
    @Transactional
    public List<UserAddress> findAllUserAddresses() {
        return userAddressRepo.findAll();
    }

    @Override
    @Transactional
    public Optional<UserAddress> findUserAddressById(int theId) {
        return userAddressRepo.findById(theId);
    }

    @Override
    @Transactional
    public UserAddress saveUserAddress(UserAddress theUserAddress) {
        return userAddressRepo.save(theUserAddress);
    }

    @Override
    @Transactional
    public void deleteUserAddressById(int theId) {
        userAddressRepo.deleteById(theId);
    }

    @Override
    @Transactional
    public List<UserAddress> useraddressesByUserid( int userid ) {
        return userAddressRepo.useraddressesByUserid(userid);
    }

    @Override
    @Transactional
    public void updateUserAddress(int addId, String name, String hno, String street, String city, String state, String pincode, String phonenumber, String country) {
        userAddressRepo.updateUserAddress( addId, name, hno, street, city, state, pincode, phonenumber, country );
    }
}
