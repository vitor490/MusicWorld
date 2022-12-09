-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 08-Dez-2022 às 22:00
-- Versão do servidor: 10.4.22-MariaDB
-- versão do PHP: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `musicas`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `artistas`
--

CREATE TABLE `artistas` (
  `id` int(11) NOT NULL,
  `artista` varchar(200) NOT NULL,
  `musicas` varchar(200) NOT NULL,
  `capa` varchar(600) NOT NULL,
  `singles` varchar(200) NOT NULL,
  `genero` varchar(100) NOT NULL
  'feats' varchar(200) NOT NULL 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `musicas`
--

CREATE TABLE `musicas` (
  `id` int(11) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `cantor` varchar(100) NOT NULL,
  `compositor` varchar(100) NOT NULL,
  `capa` varchar(600) NOT NULL,
  `genero` varchar(100) NOT NULL,
  `album` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `musicas`
--

INSERT INTO `musicas` (`id`, `titulo`, `cantor`, `compositor`, `capa`, `genero`, `album`) VALUES
(7, 'matue', 'cantor', 'vampira', 'https://cdn.domestika.org/c_fit,dpr_auto,f_auto,t_base_params,w_820/v1605764675/content-items/006/246/531/pinkfloyd-original.jpg?1605764675', 'trap', '');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `artistas`
--
ALTER TABLE `artistas`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `musicas`
--
ALTER TABLE `musicas`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `artistas`
--
ALTER TABLE `artistas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `musicas`
--
ALTER TABLE `musicas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
