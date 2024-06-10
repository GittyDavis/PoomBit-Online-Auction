package org.example.project00;

import org.example.project00.repositories.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;


@SpringBootApplication
@ComponentScan(excludeFilters={@ComponentScan.Filter(type= FilterType.ASSIGNABLE_TYPE, value=WebConfig.class)})
public class Project00Application {

    public static void main(String[] args)
    {
        SpringApplication.run(Project00Application.class, args
        );
    }

    @Bean
    public CommandLineRunner run(UserRepository users, AuctionsRepository auctions,
                                 ItemRepository items)
    {
        ApplicationManager manager = new ApplicationManager(auctions, users, items);
        return args -> {};
    }

}
