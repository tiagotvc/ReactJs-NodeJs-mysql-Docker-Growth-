USE `mysql`

CREATE TABLE IF NOT EXISTS `favorites` (   
    `id`int(10) AUTO_INCREMENT PRIMARY KEY,  
    `title` varchar(100) NOT NULL  ,
    `imgUrl` varchar(20) NOT NULL ,
    `userId` int(10) NOT NULL
     );

