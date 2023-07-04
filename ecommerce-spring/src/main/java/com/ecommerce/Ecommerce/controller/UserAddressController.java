package com.ecommerce.Ecommerce.controller;

import com.ecommerce.Ecommerce.entity.UserAddress;
import com.ecommerce.Ecommerce.service.OrderService;
import com.ecommerce.Ecommerce.service.UserAddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/ecommerce")
public class UserAddressController {

    @Autowired
    private UserAddressService userAddressService;

    @Autowired
    private OrderService orderService;

    @GetMapping("/useraddress")
    public List<UserAddress> getUseraddresses() {
        return userAddressService.findAllUserAddresses();
    }

    @GetMapping("/useraddress/{userAddressId}")
    public Optional<UserAddress> getUserAddressById(@PathVariable int userAddressId ) {
        return userAddressService.findUserAddressById(userAddressId);
    }

    @PostMapping("/useraddress")
    public UserAddress saveUserAddress(@RequestBody UserAddress theUserAddress) {
        //System.out.println(theUserAddress.getCountry());
        List<UserAddress> addlist = userAddressService.useraddressesByUserid(theUserAddress.getUserId());
        if( addlist.size() == 0 ) {
            theUserAddress.setBill(true);
        }
        else {
            theUserAddress.setBill(false);
        }
        return userAddressService.saveUserAddress(theUserAddress);
    }

    @PutMapping("/useraddress")
    public UserAddress updateUserAddress(@RequestBody UserAddress theUserAddress) {
        return userAddressService.saveUserAddress(theUserAddress) ;
    }

    @DeleteMapping("/useraddress/{userAddressId}")
    public void deleteUserAddress(@PathVariable int userAddressId) {
        userAddressService.deleteUserAddressById(userAddressId);
    }

    @GetMapping("/useraddressesbyuserid/{userid}")
    public List<UserAddress> useraddressesByUserid(@PathVariable("userid") int userid ) {
        return userAddressService.useraddressesByUserid(userid) ;
    }

    @PutMapping("/updateUserAddress")
    public void updateUserAddress(@RequestParam("addId") int addId,
                                  @RequestParam("name") String name,
                                  @RequestParam("hno") String hno,
                                  @RequestParam("street") String street,
                                  @RequestParam("city") String city,
                                  @RequestParam("state") String state,
                                  @RequestParam("pincode") String pincode,
                                  @RequestParam("phonenumber") String phonenumber,
                                  @RequestParam("country") String country) {
        userAddressService.updateUserAddress( addId, name, hno, street, city, state, pincode, phonenumber, country );
    }

    @PutMapping("/userAddressOrderCheck")
    public int userAddressOrderCheck( @RequestParam("addId") int addId ) {
        return orderService.userAddressOrderCheck(addId);
    }

}
