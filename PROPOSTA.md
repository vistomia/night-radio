# Sistema de Cardápio Inteligente para Restaurantes

Também poderá gerenciar as receitas e calcular a margem de lucro de cada prato de acordo com o preço dos igredientes. O sistema deve possuir um bom sistema de busca para fazer

## Membros da equipe

**567680** - Victor Farias da Silva / Sistemas de informação

## Objetivo Geral

Centralizar os serviços de um restaurante.

- sistema de cardápio
- sistema de receitas

## Público-Alvo

Grandes Restaurantes.

## Impacto Esperado



## Papéis ou tipos de usuário da aplicação

- Usuário não logado e todos os usuários
- Administrador - tem todos os privilegios
- Moderador - tem privilegios de organização e disponibilidade
- Cozinheiro
- Cozinheiro2
- Designer - tem privilegios de organização e estilos

## Principais funcionalidades da aplicação

### Usuário não logado e todos os usuários

- ver itens do cardápio

### Moderator


### Administrador

- criar itens do cardápio
- atualizar itens do cardápio
- remover itens do cardápio

- Imprimir cardápio
- Exportar cardápio

## Entidades ou tabelas do sistema

Liste as principais entidades do sistema.

Usuário`User` com uma coluna de tipo para atribuir papéis
Cardápio`Menu`
Item do Cardápio `MenuItem`
Tabela Associativa `Menu_MenuItem` contendo o preço, posição e categoria do item
Receita`Recipe`
Igredientes`Igredients`
Estilo do cardápio`MenuStyle` para o designer alterar a fonte e as cores
Tags`Tags`

![alt text](erd.png)