USE `mysql`

CREATE TABLE IF NOT EXISTS `users` (   
    `id` int(10) AUTO_INCREMENT PRIMARY KEY,  
    `email` varchar(100) NOT NULL  ,
    `password` varchar(20) NOT NULL
     );


