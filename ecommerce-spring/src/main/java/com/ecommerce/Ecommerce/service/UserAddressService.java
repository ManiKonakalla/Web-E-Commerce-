package com.ecommerce.Ecommerce.service;

import com.ecommerce.Ecommerce.entity.UserAddress;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserAddressService {

    public List<UserAddress> findAllUserAddresses() ;

    public Optional<UserAddress> findUserAddressById(int theId) ;

    public UserAddress saveUserAddress(UserAddress theUserAddress) ;

    public void deleteUserAddressById(int theId) ;

    public List<UserAddress> useraddressesByUserid( int userid );

    public void updateUserAddress( int addId, String name, String hno, String street, String city, String state, String pincode, String phonenumber, String country ) ;

}
