CREATE TABLE tarefas(
	id SERIAL PRIMARY KEY,
	titulo VARCHAR(50),
	concluida VARCHAR(50)			
); 

INSERT INTO tarefas (titulo,concluida) VALUES
('varear a casa', 'Sim'),
('Lavar a louça', 'não'),
('comprar pão', 'Sim');