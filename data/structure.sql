<<<<<<< HEAD
CREATE TABLE IF NOT EXISTS recipes 
=======
CREATE TABLE IF NOT EXISTS birthdays 
>>>>>>> 6debc845ab2ade0ee4d639887c926c44b47c1e1c
(
  id INT NOT NULL AUTO_INCREMENT,
  name text NOT NULL,
  contact TEXT NOT NULL,
  age TEXT NOT NULL,
  url TEXT NOT NULL,
  dob TEXT NOT NULL,
  PRIMARY KEY (id)
) ENGINE = InnoDB;