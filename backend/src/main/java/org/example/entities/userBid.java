package org.example.project00.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class userBid
{

    @Id
    @GeneratedValue
    private Long id;
    private Long userFK;
    private Long bidFK;

    public Long getId() {
        return id;
    }

    public Long getUserFK() {
        return userFK;
    }

    public Long getBidFK() {
        return bidFK;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUserFK(Long userFK) {
        this.userFK = userFK;
    }

    public void setBidFK(Long bidFK) {
        this.bidFK = bidFK;
    }
}
