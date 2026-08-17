CREATE TABLE filmes (
    id       SERIAL PRIMARY KEY,
    titulo   VARCHAR(150) NOT NULL,
    diretor  VARCHAR(100) NOT NULL,
    ano      INTEGER,
    nota     DECIMAL(3,1),
    duracao  INTEGER
);

INSERT INTO filmes (titulo, diretor, ano, nota, duracao) VALUES
    ('Interestelar',          'Christopher Nolan', 2014, 9.5, 169),
    ('Parasita',              'Bong Joon-ho',      2019, 9.0, 132),
    ('O Poderoso Chefão',     'Francis Ford',      1972, 9.7, 175),
    ('Coringa',               'Todd Phillips',     2019, 8.5, 122),
    ('Duna',                  'Denis Villeneuve',  2021, 8.0, 155),
    ('Matrix',                'Wachowski',         1999, 9.2, 136);