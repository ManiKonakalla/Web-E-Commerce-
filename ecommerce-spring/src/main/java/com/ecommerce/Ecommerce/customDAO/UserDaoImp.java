/*
package com.ecommerce.Ecommerce.customDAO;

import com.ecommerce.Ecommerce.entity.User;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

@Component
public class UserDaoImp implements UserDao {

    private EntityManager entityManager;

    @Autowired
    public UserDaoImp(EntityManager theEntityManager) {
        entityManager = theEntityManager;
    }

    @Override
    @Transactional
    @Bean
    public User credentialCheck( User user) {

        Session currentSession = entityManager.unwrap(Session.class);

        Query<User> theQuery = currentSession.createQuery("select u from User u "
                + "where u.username=:theusername and u.password=:thepassword ");
        theQuery.setParameter("theusername", user.getUsername());
        theQuery.setParameter("thepassword", user.getPassword());

        User theuser = theQuery.getSingleResult();

        return theuser;
    }
}
*/
