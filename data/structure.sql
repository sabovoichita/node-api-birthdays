CREATE TABLE IF NOT EXISTS birthdays 
(
  id INT NOT NULL AUTO_INCREMENT,
  name text NOT NULL,
  contact TEXT NOT NULL,
  age TEXT NOT NULL,
  url TEXT NOT NULL,
  dob TEXT NOT NULL,
  PRIMARY KEY (id)
) ENGINE = InnoDB;