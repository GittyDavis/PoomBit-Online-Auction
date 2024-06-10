package org.example.project00.entities;

import jakarta.persistence.*;

@Entity
public class AuctionUser {

    @Id
    @GeneratedValue
    private Long id;
    @Column(unique = true)
    private String userName;
    private String password;
    private String email;
    private String phone;
    private Boolean loggedIn;

    public AuctionUser(String userName, String password, String email, String phone) {
        this.userName = userName;
        this.password = password;
        this.email = email;
        this.phone = phone;
        loggedIn = false;
    }

    public AuctionUser() {

    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getUserName() {
        return userName;
    }

    public String getPhone() {
        return phone;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Boolean getLoggedIn() {
        return loggedIn;
    }

    public void setLoggedIn(Boolean loggedIn) {
        this.loggedIn = loggedIn;
    }
}
