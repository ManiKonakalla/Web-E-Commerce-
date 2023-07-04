package com.ecommerce.Ecommerce.repository;

import com.ecommerce.Ecommerce.entity.Cart;
import com.ecommerce.Ecommerce.entity.UserAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserAddressRepo extends JpaRepository<UserAddress, Integer> {

    @Query("select a from UserAddress a where a.userId=:userid")
    public List<UserAddress> useraddressesByUserid(@Param("userid") int userid );

    @Modifying
    @Query("update UserAddress a set a.name=:name, a.hno=:hno, a.street=:street, a.city=:city, a.state=:state, a.pincode=:pincode, a.phonenumber=:phonenumber, a.country=:country where a.addId=:addId")
    public void updateUserAddress( @Param("addId") int addId, @Param("name") String name, @Param("hno") String hno, @Param("street") String street, @Param("city") String city, @Param("state") String state, @Param("pincode") String pincode, @Param("phonenumber") String phonenumber, @Param("country") String country ) ;

}
