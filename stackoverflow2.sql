-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 19, 2024 at 08:08 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `stackoverflow2`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id` varchar(36) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `registration_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `username`, `password`, `status`, `registration_time`) VALUES
('382104eb-c024-44e9-9247-b26bae4c6234', 'larsenrebecca', 'lk#4TqrFzR', 'Active', '2024-09-10 01:50:50'),
('6c46c93e-6578-46fb-b14f-81806d18eddf', 'leekelly', '!jr_ZohJ%7', 'Active', '2024-09-13 06:02:11'),
('762b818c-1936-4ffb-ae79-aea7bdbdad69', 'anelson', 'ZS)8D+u_$H', 'Active', '2024-09-11 09:53:47'),
('7cb0af33-557c-47c5-9d4a-f5da47fefb85', 'rushleslie', '$SghQZxXZ1', 'Active', '2024-09-10 18:32:55'),
('8322d1be-1178-4cee-9285-72324a4c4aad', 'brian94', 'fc_0Mqo1%A', 'Active', '2024-09-12 04:32:23'),
('bccbbe3f-cca9-48b7-a1d3-1ccd65768f70', 'dlevine', '!cX+L(2d@8', 'Active', '2024-09-13 05:35:19'),
('c81125cb-8bce-4e5b-a764-d16a71569f2b', 'robert97', '&4xWo7VbG^', 'Active', '2024-09-04 14:35:37'),
('d9fe1f8d-7199-43f6-9ebb-7ee9b9f74b48', 'bdeleon', 'W96Ptqff*k', 'Active', '2024-09-12 02:18:10'),
('db802872-5044-427c-b078-2b9e67de3f92', 'robinhamilton', 'N%vG@1mb(3', 'Active', '2024-09-03 18:02:15'),
('e01bdd86-27e9-4b6c-a9ca-961699c20de8', 'carterkimberly', 'Z%4McIinc9', 'Active', '2024-09-02 01:16:19');

-- --------------------------------------------------------

--
-- Table structure for table `answers`
--

CREATE TABLE `answers` (
  `id` varchar(36) NOT NULL,
  `question_id` varchar(36) NOT NULL,
  `member_id` varchar(36) NOT NULL,
  `answer_text` text NOT NULL,
  `accepted` tinyint(1) DEFAULT NULL,
  `creation_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `answers`
--

INSERT INTO `answers` (`id`, `question_id`, `member_id`, `answer_text`, `accepted`, `creation_time`) VALUES
('0c6be768-808d-4431-a785-08eb0f829800', '8cb2b022-ae8f-4be4-a0aa-d0578b2c3723', '6df50635-ea39-4f4f-b291-5278b7b9a418', 'Property station at write such system. Also beat every win company under nor push.', 0, '2024-09-03 14:37:16'),
('1714bf5a-8816-4627-b891-b232293bc054', 'd05f64d9-9b89-45f4-8047-d9e46727a20d', '30888fac-e79e-4a4c-8ebd-acaa3c14b8df', 'Create through family agreement animal office its others. Station far create very visit gun together. Nothing president enough west.', 0, '2024-09-11 12:03:57'),
('27696355-8a0a-4447-806b-332e97e6edb2', 'b63ec63e-921a-402f-88b6-108dfb374495', '0281ce9e-6206-4d8f-bb06-e043f776d819', 'Method floor other base. Catch me particularly traditional carry image. Help join accept wind instead.\nHimself score middle world risk machine agency staff. Study natural rest last reason.', 0, '2024-09-11 19:25:52'),
('43b46eb1-3a33-433d-b5cd-341f801d5ad1', '9f85e965-90f8-45b1-89a7-a4d784c82840', 'ea225474-f66e-4f45-ba88-c13b9eb447a4', 'When necessary laugh with information item. Could test about conference board defense turn happy.', 0, '2024-09-09 14:19:29'),
('466765a0-e2b8-491e-929a-bf89d3d51e91', '61ccbefb-5a4f-4daf-b845-54371f8e9e8f', '02103e79-208d-4f03-a04e-3ecc76ef0108', 'Name activity spend. Whom many right easy onto. Natural training toward never.\nBusiness bring per recently. Participant protect in concern. Join imagine nature artist coach. Age up TV threat.', 0, '2024-09-11 10:07:10'),
('9bf43411-77f8-49b2-beca-d8a27e728fa8', '05dcb34c-3c80-4a6a-afdd-30e567d9eb07', '11de0d38-be69-4fc2-8346-8cd266ee5cad', 'History sport social mouth discover decision. Item off assume simply. His which blue gas keep democratic.', 0, '2024-09-05 05:39:21'),
('acbda258-1756-4dfe-9dda-c89de851e438', '05dcb34c-3c80-4a6a-afdd-30e567d9eb07', '6df50635-ea39-4f4f-b291-5278b7b9a418', 'Wall skill think research teacher. Life close step serious operation. Member parent opportunity we nature.', 0, '2024-09-05 19:11:10'),
('ae50613b-7035-48ea-96c2-e3152981a2cd', '61ccbefb-5a4f-4daf-b845-54371f8e9e8f', '8828c302-0aba-4809-a2f8-1bfd1355615f', 'All court case talk method camera manage. Attorney especially maybe ahead only. Tell model include so career eat voice. Mission factor parent like.', 0, '2024-09-05 06:54:15'),
('c98a13cf-e990-4db9-afbf-cbc901e55cc6', '05dcb34c-3c80-4a6a-afdd-30e567d9eb07', 'ea225474-f66e-4f45-ba88-c13b9eb447a4', 'Enter let lot any see couple school. Major event amount rather sea appear through. Student real often medical.\nPretty others compare pull. Party these watch government but last group.', 0, '2024-09-08 19:37:50'),
('e992ec24-99aa-458b-8a5d-f5b97135667b', '61ccbefb-5a4f-4daf-b845-54371f8e9e8f', 'ea225474-f66e-4f45-ba88-c13b9eb447a4', 'Around trouble should until remember safe force. Since even our theory available poor worker. Believe parent actually maintain water.', 0, '2024-09-10 00:08:58');

-- --------------------------------------------------------

--
-- Table structure for table `answer_flags`
--

CREATE TABLE `answer_flags` (
  `id` varchar(36) NOT NULL,
  `member_id` varchar(36) NOT NULL,
  `answer_id` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `badges`
--

CREATE TABLE `badges` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `badges`
--

INSERT INTO `badges` (`id`, `name`, `description`) VALUES
('219ebe3c-61f2-4208-aa65-871fafc580c7', 'Câu Hỏi Hay', 'Câu hỏi nhận được ít nhất 5 phiếu bầu \"Hữu ích\" (Upvotes).'),
('2dda5f68-a555-46b9-9509-233c5431e117', 'Câu Trả Lời Hay', 'Câu trả lời nhận được ít nhất 10 phiếu bầu \"Hữu ích\" (Upvotes).'),
('33d96cdb-d95e-40bf-9225-b67bb83baa84', 'Người Nhiệt Huyết', 'Có ít nhất 10 câu hỏi hoặc câu trả lời được chấp nhận.'),
('38fe68a1-760f-4534-962f-e1ef836dc6a8', 'Người Uyên Bác', 'Có ít nhất 2000 phiếu bầu \"Hữu ích\" (Upvotes) trên câu hỏi hoặc câu trả lời của họ.'),
('44988d6e-6c79-44e6-a94e-aadd2c7146ce', 'Câu Trả Lời Chính Xác', 'Sở hữu câu trả lời được chọn là \"Trả lời tốt nhất\" (Accepted Answer) trên câu hỏi của người khác.'),
('945f8a7e-11e0-4d1e-bfcd-60bb25315884', 'Học Giả', 'Có ít nhất 1000 phiếu bầu \"Hữu ích\" (Upvotes) trên câu hỏi hoặc câu trả lời.'),
('9910b793-f3d8-4fea-8ef0-4af529690bce', 'Người Hào Phóng', 'Gán ít nhất 5 tiền thưởng (bounty) cho các câu hỏi.'),
('c75b2736-1e56-492e-b6ab-84e72766eaf1', 'Nhà Bác Học', 'Có ít nhất 3000 phiếu bầu \"Hữu ích\" (Upvotes) trên câu hỏi hoặc câu trả lời.'),
('ccf554b6-8d5b-4467-b29d-96d5a914566b', 'Người Đóng Góp Mới', 'Đạt được ít nhất 1 điểm uy tín (reputation) và đã đăng ít nhất 1 câu hỏi hoặc 1 câu trả lời.'),
('df0a374b-2244-4500-aeee-a845b4b7fb81', 'Bình Luận Viên', 'Để lại 10 bình luận.');

-- --------------------------------------------------------

--
-- Table structure for table `bounties`
--

CREATE TABLE `bounties` (
  `id` varchar(36) NOT NULL,
  `question_id` varchar(36) NOT NULL,
  `reputation` int(11) NOT NULL,
  `expiry` datetime NOT NULL,
  `ended` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` varchar(36) NOT NULL,
  `member_id` varchar(36) NOT NULL,
  `question_id` varchar(36) NOT NULL,
  `comment_text` text NOT NULL,
  `creation_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `member_id`, `question_id`, `comment_text`, `creation_time`) VALUES
('060802df-4f19-4959-8f0b-123b556e214d', '30888fac-e79e-4a4c-8ebd-acaa3c14b8df', '399a6007-3641-47a8-ac9e-22bcae3a30b8', 'Seat pattern add officer cost music assume little. Wait notice become its outside lead. Soldier tend machine budget gas.', '2024-09-03 15:58:37'),
('0c7b0b98-3a46-4e60-8516-fb7aa3f5b424', '02103e79-208d-4f03-a04e-3ecc76ef0108', '05dcb34c-3c80-4a6a-afdd-30e567d9eb07', 'Small you city. Population great left here skin determine then.\nFour perhaps happen course. Their goal happy only realize lay subject. Character reduce enter.', '2024-09-01 11:12:19'),
('0eff2ba5-c9e2-4147-ac8e-dd251c2c1758', '30888fac-e79e-4a4c-8ebd-acaa3c14b8df', '2a224cae-cb0d-4434-92a6-901c97c85710', 'Billion them tax foreign.\nTrial say body tonight huge more last.\nNow region community thus. Thing site model so buy day. Capital create bad beautiful kind top space would.', '2024-09-11 12:32:44'),
('1923f97c-a95c-4753-87b5-14b82ac4feff', '11de0d38-be69-4fc2-8346-8cd266ee5cad', 'b63ec63e-921a-402f-88b6-108dfb374495', 'Stop issue same either mission her stay environment. Money truth yet activity wide since event. State student may. Yourself last late born.', '2024-09-07 06:45:48'),
('22afb605-b016-4839-8f6d-9be2cf0f3a2e', '6df50635-ea39-4f4f-b291-5278b7b9a418', 'b63ec63e-921a-402f-88b6-108dfb374495', 'Power usually commercial. Ask there thought high now face today.\nMean begin month family site night. Treatment international budget theory. Although film marriage rock.', '2024-09-04 17:58:59'),
('242cdd8a-d8cd-4c94-a848-065f7f99ac9c', '11de0d38-be69-4fc2-8346-8cd266ee5cad', '9f85e965-90f8-45b1-89a7-a4d784c82840', 'Appear cause allow practice easy. Store short hour first able shake. Simply parent other evidence policy. Team city son close.', '2024-09-06 00:14:41'),
('7924310d-1620-440e-92d5-c0d61a7531c0', '6df50635-ea39-4f4f-b291-5278b7b9a418', 'ba350546-0677-41f6-ae36-b3f30e28a9e6', 'Positive what pattern. Seven guy star event.\nOften risk animal action. No pull degree black.\nWe bit parent agree yourself compare today fight. Focus minute discover exist.', '2024-09-10 09:17:01'),
('962f0b39-4767-47ea-af41-186658d6e008', '02103e79-208d-4f03-a04e-3ecc76ef0108', '8cb2b022-ae8f-4be4-a0aa-d0578b2c3723', 'Life deep anyone sport. Keep act important.\nMagazine article drive industry product increase. Know third so through. Force focus week land.', '2024-09-09 16:58:48'),
('c8e79746-3717-42a7-8ad5-2ba8787fd91d', '6df50635-ea39-4f4f-b291-5278b7b9a418', '8cb2b022-ae8f-4be4-a0aa-d0578b2c3723', 'Laugh scientist clear thousand door some tree. If ready task old common stay.\nImagine right none month society fight.', '2024-09-05 07:44:06'),
('e6a87e3f-96e0-4192-8abb-aa66e89e2a30', '6df50635-ea39-4f4f-b291-5278b7b9a418', 'b63ec63e-921a-402f-88b6-108dfb374495', 'Five long fire happen guy he. Condition would just room. Hundred learn recognize whole guy step heavy plan. Bank night authority fact guy.\nWindow number water describe best. Five senior note south.', '2024-09-04 13:55:58');

-- --------------------------------------------------------

--
-- Table structure for table `comment_flags`
--

CREATE TABLE `comment_flags` (
  `id` varchar(36) NOT NULL,
  `member_id` varchar(36) NOT NULL,
  `comment_id` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `id` varchar(36) NOT NULL,
  `account_id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `reputation` int(11) DEFAULT NULL,
  `role` varchar(50) NOT NULL,
  `biography` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`id`, `account_id`, `name`, `email`, `phone`, `reputation`, `role`, `biography`) VALUES
('02103e79-208d-4f03-a04e-3ecc76ef0108', '7cb0af33-557c-47c5-9d4a-f5da47fefb85', 'Rebecca Wood', 'cford@example.net', '0621685414', 45, 'Member', ''),
('0281ce9e-6206-4d8f-bb06-e043f776d819', '762b818c-1936-4ffb-ae79-aea7bdbdad69', 'Tony Lopez', 'barryjonathon@example.net', '0271029644', 6, 'Member', ''),
('05c433a0-07c6-43aa-9153-c4f01a636217', 'c81125cb-8bce-4e5b-a764-d16a71569f2b', 'Carmen Santiago', 'wendy84@example.net', '0502626899', 79, 'Member', ''),
('11de0d38-be69-4fc2-8346-8cd266ee5cad', '6c46c93e-6578-46fb-b14f-81806d18eddf', 'Andrew Howard', 'berrydonna@example.com', '0829854837', 67, 'Member', ''),
('30888fac-e79e-4a4c-8ebd-acaa3c14b8df', 'bccbbe3f-cca9-48b7-a1d3-1ccd65768f70', 'Ryan King', 'wendyanderson@example.org', '0717703680', 14, 'Member', ''),
('4cabe711-6362-462d-85f5-d82668fdb89a', 'd9fe1f8d-7199-43f6-9ebb-7ee9b9f74b48', 'Melissa Key', 'taylormcdaniel@example.net', '0176674974', 1000, 'Moderator', ''),
('6df50635-ea39-4f4f-b291-5278b7b9a418', 'e01bdd86-27e9-4b6c-a9ca-961699c20de8', 'Jeanette Castaneda', 'kdelgado@example.com', '0316904207', 5000, 'Admin', ''),
('8828c302-0aba-4809-a2f8-1bfd1355615f', '382104eb-c024-44e9-9247-b26bae4c6234', 'Elizabeth Anderson', 'nallen@example.net', '0820936822', 11, 'Member', ''),
('aa920c7b-0c41-4a76-a0ba-e3f93a80006d', 'db802872-5044-427c-b078-2b9e67de3f92', 'Deborah Martinez', 'zsimpson@example.org', '0984170916', 86, 'Member', ''),
('ea225474-f66e-4f45-ba88-c13b9eb447a4', '8322d1be-1178-4cee-9285-72324a4c4aad', 'Mary Johnson', 'sextonmichael@example.net', '0489707817', 26, 'Member', '');

-- --------------------------------------------------------

--
-- Table structure for table `member_badges`
--

CREATE TABLE `member_badges` (
  `id` varchar(36) NOT NULL,
  `member_id` varchar(36) NOT NULL,
  `badge_id` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `member_badges`
--

INSERT INTO `member_badges` (`id`, `member_id`, `badge_id`) VALUES
('04dd3c04-2520-4f97-90bb-689d08a19725', '02103e79-208d-4f03-a04e-3ecc76ef0108', 'ccf554b6-8d5b-4467-b29d-96d5a914566b'),
('445374d1-9168-4817-b99e-e549c193b75a', 'aa920c7b-0c41-4a76-a0ba-e3f93a80006d', '2dda5f68-a555-46b9-9509-233c5431e117'),
('494973ef-92b2-4142-8ed2-06f97562cee6', '05c433a0-07c6-43aa-9153-c4f01a636217', '44988d6e-6c79-44e6-a94e-aadd2c7146ce'),
('5ff91783-aa54-41c6-be9d-50feb2ad3ead', '0281ce9e-6206-4d8f-bb06-e043f776d819', '945f8a7e-11e0-4d1e-bfcd-60bb25315884'),
('89f4bf0d-6f18-4599-bdd3-a5454d21e57d', '30888fac-e79e-4a4c-8ebd-acaa3c14b8df', '219ebe3c-61f2-4208-aa65-871fafc580c7'),
('93ca73dc-2940-4154-a4ff-c94f931bc0de', '0281ce9e-6206-4d8f-bb06-e043f776d819', '44988d6e-6c79-44e6-a94e-aadd2c7146ce'),
('9f3c1170-87d9-4b72-9550-730184d2c116', '4cabe711-6362-462d-85f5-d82668fdb89a', '9910b793-f3d8-4fea-8ef0-4af529690bce'),
('a7d183b8-1e64-4f60-b56e-5656f78cd9f6', '4cabe711-6362-462d-85f5-d82668fdb89a', 'c75b2736-1e56-492e-b6ab-84e72766eaf1'),
('c63de5d7-302d-4df8-9e05-18ad09b95d03', '30888fac-e79e-4a4c-8ebd-acaa3c14b8df', '44988d6e-6c79-44e6-a94e-aadd2c7146ce'),
('d0d05f16-577c-4e49-a58d-4615384d935b', 'aa920c7b-0c41-4a76-a0ba-e3f93a80006d', 'ccf554b6-8d5b-4467-b29d-96d5a914566b');

-- --------------------------------------------------------

--
-- Table structure for table `member_views`
--

CREATE TABLE `member_views` (
  `id` varchar(36) NOT NULL,
  `member_id` varchar(36) NOT NULL,
  `question_id` varchar(36) NOT NULL,
  `flagged` tinyint(1) DEFAULT NULL,
  `viewing_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `member_views`
--

INSERT INTO `member_views` (`id`, `member_id`, `question_id`, `flagged`, `viewing_time`) VALUES
('28579bb3-b192-44c9-8260-943d34571ba2', 'aa920c7b-0c41-4a76-a0ba-e3f93a80006d', '61ccbefb-5a4f-4daf-b845-54371f8e9e8f', 0, '2024-09-11 17:42:08'),
('5622b46f-89d4-41f2-95f9-c1027098f67b', 'ea225474-f66e-4f45-ba88-c13b9eb447a4', 'b63ec63e-921a-402f-88b6-108dfb374495', 0, '2024-09-02 18:13:49'),
('7b9a556b-52f4-4b8e-8f2f-2edfc63333ac', '05c433a0-07c6-43aa-9153-c4f01a636217', '8cb2b022-ae8f-4be4-a0aa-d0578b2c3723', 0, '2024-09-12 23:33:01'),
('88893d4b-7b4c-4570-a3c6-c00d998ddde0', '05c433a0-07c6-43aa-9153-c4f01a636217', '05dcb34c-3c80-4a6a-afdd-30e567d9eb07', 0, '2024-09-01 07:09:14'),
('b23553a0-2d1c-4711-bc0c-4f55fd8dedda', 'ea225474-f66e-4f45-ba88-c13b9eb447a4', '9f85e965-90f8-45b1-89a7-a4d784c82840', 0, '2024-09-03 02:03:03'),
('b40dd3dc-dbf7-4575-ae33-49b35f0fbcdb', '30888fac-e79e-4a4c-8ebd-acaa3c14b8df', 'ba350546-0677-41f6-ae36-b3f30e28a9e6', 0, '2024-09-05 06:38:17'),
('e6f07ddd-c571-4422-85cf-dc1e3ec5be2c', '6df50635-ea39-4f4f-b291-5278b7b9a418', 'b63ec63e-921a-402f-88b6-108dfb374495', 0, '2024-09-04 12:43:47'),
('efdcf4ee-beed-4016-a3e6-2398ac0a8983', '05c433a0-07c6-43aa-9153-c4f01a636217', '2a224cae-cb0d-4434-92a6-901c97c85710', 0, '2024-09-13 01:56:55'),
('f0e44b8c-f966-4177-8387-dd89929c5808', 'ea225474-f66e-4f45-ba88-c13b9eb447a4', 'b63ec63e-921a-402f-88b6-108dfb374495', 0, '2024-09-05 06:24:27'),
('fe5cc6ad-04e4-4317-9a12-ad10147cb4ea', '05c433a0-07c6-43aa-9153-c4f01a636217', '8cb2b022-ae8f-4be4-a0aa-d0578b2c3723', 0, '2024-09-05 00:08:07');

-- --------------------------------------------------------

--
-- Table structure for table `member_votes`
--

CREATE TABLE `member_votes` (
  `id` varchar(36) NOT NULL,
  `member_id` varchar(36) NOT NULL,
  `answer_id` varchar(36) DEFAULT NULL,
  `question_id` varchar(36) DEFAULT NULL,
  `related_type` varchar(50) NOT NULL,
  `vote_type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` varchar(36) NOT NULL,
  `member_id` varchar(36) NOT NULL,
  `content` varchar(255) NOT NULL,
  `creation_time` datetime NOT NULL,
  `read` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `name` varchar(25) NOT NULL,
  `required` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`name`, `required`) VALUES
('comment', 50),
('create_bounty', 75),
('downvote', 125),
('edit_post', 2000),
('upvote', 15);

-- --------------------------------------------------------

--
-- Table structure for table `photos`
--

CREATE TABLE `photos` (
  `id` varchar(36) NOT NULL,
  `path` varchar(255) NOT NULL,
  `question_id` varchar(36) DEFAULT NULL,
  `answer_id` varchar(36) DEFAULT NULL,
  `related_type` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` varchar(36) NOT NULL,
  `member_id` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `question_text` text NOT NULL,
  `creation_time` datetime NOT NULL,
  `update_time` datetime DEFAULT NULL,
  `status` varchar(50) NOT NULL,
  `closing_remark` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `member_id`, `title`, `question_text`, `creation_time`, `update_time`, `status`, `closing_remark`) VALUES
('05dcb34c-3c80-4a6a-afdd-30e567d9eb07', '05c433a0-07c6-43aa-9153-c4f01a636217', 'Education right news dream base can anything.', 'Effort fight power turn. Age others paper yourself option trade. Painting window attack.\nTeacher particularly quite choose open. Group each stock wide whether employee. Your economy every whether.', '2024-09-09 23:38:03', NULL, 'Open', NULL),
('28ce457b-6a98-4f55-9011-578e6c679fe7', '05c433a0-07c6-43aa-9153-c4f01a636217', 'Give offer film moment take hold find.', 'Remain although with senior firm. Relationship between or top. Nor blood avoid her pull third up building. Enter sort throw significant.', '2024-09-09 20:58:20', NULL, 'Open', NULL),
('2a224cae-cb0d-4434-92a6-901c97c85710', '8828c302-0aba-4809-a2f8-1bfd1355615f', 'Lay style west then result.', 'Food consumer way practice do send million management.', '2024-09-02 05:48:41', NULL, 'Open', NULL),
('399a6007-3641-47a8-ac9e-22bcae3a30b8', '11de0d38-be69-4fc2-8346-8cd266ee5cad', 'Here difference seat rest wish firm.', 'Gas fund student center everyone meet avoid. Power staff capital entire among. Try defense small.', '2024-09-09 07:08:11', NULL, 'Open', NULL),
('61ccbefb-5a4f-4daf-b845-54371f8e9e8f', '05c433a0-07c6-43aa-9153-c4f01a636217', 'Discover wall cell assume history however.', 'Same adult race act provide. Many power road study part.\nQuality prepare animal executive attention. Around magazine campaign on.', '2024-09-12 22:46:04', NULL, 'Open', NULL),
('8cb2b022-ae8f-4be4-a0aa-d0578b2c3723', '4cabe711-6362-462d-85f5-d82668fdb89a', 'If major night prove son never crime sign.', 'Seek economic single doctor process. Main let hit back rise which. People drop finally it third.\nBoth near deep. Study their yourself also. Structure each authority plant matter individual month say.', '2024-09-06 02:46:15', NULL, 'Open', NULL),
('9f85e965-90f8-45b1-89a7-a4d784c82840', '4cabe711-6362-462d-85f5-d82668fdb89a', 'Personal school any may sell.', 'Choice specific cold. Talk bar everybody not.\nUnderstand ability near certainly sister sing. Test upon already election.', '2024-09-04 02:26:18', NULL, 'Open', NULL),
('b63ec63e-921a-402f-88b6-108dfb374495', '8828c302-0aba-4809-a2f8-1bfd1355615f', 'Hair kitchen audience would indicate food.', 'Action affect arrive event. Ball standard industry century grow edge. Power guy risk only safe listen whether.\nFormer size not station.\nSing indeed day kid prepare he. On natural travel nice.', '2024-09-01 09:06:46', NULL, 'Open', NULL),
('ba350546-0677-41f6-ae36-b3f30e28a9e6', '0281ce9e-6206-4d8f-bb06-e043f776d819', 'Start speak woman southern economy itself girl.', 'Tv coach successful high catch hear foot. For question dark law. Describe whether several thank other project.\nPoint discussion chair soon. Decade many small. Financial expert color assume low less.', '2024-09-13 14:03:25', NULL, 'Open', NULL),
('d05f64d9-9b89-45f4-8047-d9e46727a20d', 'ea225474-f66e-4f45-ba88-c13b9eb447a4', 'Quality painting perform camera middle against.', 'For service production. Just start worry age husband simply day. Goal look particular news everyone another natural.', '2024-09-02 07:59:28', NULL, 'Open', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `question_edits`
--

CREATE TABLE `question_edits` (
  `id` varchar(36) NOT NULL,
  `question_id` varchar(36) DEFAULT NULL,
  `edit_time` datetime DEFAULT NULL,
  `new_text` text NOT NULL,
  `accepted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `question_tags`
--

CREATE TABLE `question_tags` (
  `id` varchar(36) NOT NULL,
  `question_id` varchar(36) NOT NULL,
  `tag_id` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `question_tags`
--

INSERT INTO `question_tags` (`id`, `question_id`, `tag_id`) VALUES
('0204fde5-5ecc-4201-b298-8d8bace9ea4e', 'b63ec63e-921a-402f-88b6-108dfb374495', 'e069d464-efe5-4596-8dcc-170be32830fc'),
('23fdb39b-fb6d-49eb-9341-3b89b598517d', '05dcb34c-3c80-4a6a-afdd-30e567d9eb07', 'a9d4f188-a1a6-41b6-8e75-76bfb8bbca61'),
('2fe0694f-dddc-44ca-bbb1-5d12ff191d2b', '05dcb34c-3c80-4a6a-afdd-30e567d9eb07', 'c620b32c-8a02-48f5-8090-e33f9e21e5f0'),
('462a553a-e798-4b5e-8760-2a497c108796', '61ccbefb-5a4f-4daf-b845-54371f8e9e8f', '2c620291-aba3-410c-a3a7-416949ebba45'),
('46e72dc0-9cc0-41f0-b11e-e271d7ec005e', 'd05f64d9-9b89-45f4-8047-d9e46727a20d', 'e069d464-efe5-4596-8dcc-170be32830fc'),
('74075676-f773-4cc1-be8c-46173f5d43e9', '2a224cae-cb0d-4434-92a6-901c97c85710', 'f7ef70bd-753f-496b-a476-430637fa1899'),
('8c40bd19-84de-4829-a830-521529d4d032', 'b63ec63e-921a-402f-88b6-108dfb374495', 'a9d4f188-a1a6-41b6-8e75-76bfb8bbca61'),
('b666aaa2-7128-4eb4-bbc0-58e9d33901ce', '2a224cae-cb0d-4434-92a6-901c97c85710', 'f7ef70bd-753f-496b-a476-430637fa1899'),
('c9d86dbd-6b7b-4fab-a2d5-b43f4d9e9291', '399a6007-3641-47a8-ac9e-22bcae3a30b8', 'a023d044-95a3-4953-939e-cfce47d27c18'),
('dde0fbfa-a782-4b36-8a79-f215f4c9589a', '28ce457b-6a98-4f55-9011-578e6c679fe7', 'f868e0e1-3c02-4031-b1b0-4ea842d36fa8');

-- --------------------------------------------------------

--
-- Table structure for table `system_administrator_account`
--

CREATE TABLE `system_administrator_account` (
  `id` varchar(36) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `system_administrator_account`
--

INSERT INTO `system_administrator_account` (`id`, `username`, `password`) VALUES
('618f3934-d731-455e-bf31-491dc1105ac4', 'systemadmin', '123456qwerty');

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`id`, `name`, `description`) VALUES
('19899ab6-0bef-44fc-b55b-2db2fd6c7713', 'C/C++', 'Các câu hỏi về lập trình C và C++, bao gồm cú pháp, bộ nhớ, hiệu suất và quản lý tài nguyên.'),
('2c620291-aba3-410c-a3a7-416949ebba45', 'Java/J2EE', 'Các vấn đề về ngôn ngữ Java và Java Enterprise Edition, tập trung vào phát triển ứng dụng doanh nghiệp và web.'),
('3368797f-bd13-46c4-a602-facb59b88c86', 'JavaScript', 'Câu hỏi về lập trình JavaScript, từ cơ bản đến nâng cao, bao gồm xử lý sự kiện, DOM, và JavaScript hiện đại (ES6+).'),
('a023d044-95a3-4953-939e-cfce47d27c18', 'HTML, CSS', 'Câu hỏi về định dạng và cấu trúc của trang web, giao diện người dùng, và thiết kế với HTML, CSS.'),
('a9d4f188-a1a6-41b6-8e75-76bfb8bbca61', 'Python', 'Thảo luận về ngôn ngữ Python, bao gồm lập trình cơ bản, web, khoa học dữ liệu, và AI.'),
('c620b32c-8a02-48f5-8090-e33f9e21e5f0', 'C#/ASP.NET', 'Các câu hỏi về ngôn ngữ C# và ASP.NET, framework của Microsoft cho phát triển ứng dụng web và doanh nghiệp.'),
('c7e1aa8a-833c-44fb-b164-239cdcd6270a', 'Git/Github', 'Vấn đề liên quan đến hệ thống quản lý phiên bản Git và nền tảng GitHub, bao gồm nhánh, merge và xung đột mã.'),
('e069d464-efe5-4596-8dcc-170be32830fc', 'JSON', 'Thắc mắc về cách sử dụng JSON trong việc trao đổi dữ liệu, parse, và serialization.'),
('f7ef70bd-753f-496b-a476-430637fa1899', 'API/Library', 'Câu hỏi về việc sử dụng API và thư viện trong lập trình, bao gồm cách tích hợp và sử dụng chúng hiệu quả.'),
('f868e0e1-3c02-4031-b1b0-4ea842d36fa8', 'Others', 'Tag tổng quát cho những câu hỏi không thuộc về các chủ đề phổ biến khác.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `question_id` (`question_id`),
  ADD KEY `member_id` (`member_id`);

--
-- Indexes for table `answer_flags`
--
ALTER TABLE `answer_flags`
  ADD PRIMARY KEY (`id`),
  ADD KEY `member_id` (`member_id`),
  ADD KEY `answer_id` (`answer_id`);

--
-- Indexes for table `badges`
--
ALTER TABLE `badges`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bounties`
--
ALTER TABLE `bounties`
  ADD PRIMARY KEY (`id`),
  ADD KEY `question_id` (`question_id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `member_id` (`member_id`),
  ADD KEY `question_id` (`question_id`);

--
-- Indexes for table `comment_flags`
--
ALTER TABLE `comment_flags`
  ADD PRIMARY KEY (`id`),
  ADD KEY `member_id` (`member_id`),
  ADD KEY `comment_id` (`comment_id`);

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`id`),
  ADD KEY `account_id` (`account_id`);

--
-- Indexes for table `member_badges`
--
ALTER TABLE `member_badges`
  ADD PRIMARY KEY (`id`),
  ADD KEY `member_id` (`member_id`),
  ADD KEY `badge_id` (`badge_id`);

--
-- Indexes for table `member_views`
--
ALTER TABLE `member_views`
  ADD PRIMARY KEY (`id`),
  ADD KEY `member_id` (`member_id`),
  ADD KEY `question_id` (`question_id`);

--
-- Indexes for table `member_votes`
--
ALTER TABLE `member_votes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `member_id` (`member_id`),
  ADD KEY `answer_id` (`answer_id`),
  ADD KEY `question_id` (`question_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `member_id` (`member_id`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`name`);

--
-- Indexes for table `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `question_id` (`question_id`),
  ADD KEY `answer_id` (`answer_id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `member_id` (`member_id`);

--
-- Indexes for table `question_edits`
--
ALTER TABLE `question_edits`
  ADD PRIMARY KEY (`id`),
  ADD KEY `question_id` (`question_id`);

--
-- Indexes for table `question_tags`
--
ALTER TABLE `question_tags`
  ADD PRIMARY KEY (`id`),
  ADD KEY `question_id` (`question_id`),
  ADD KEY `tag_id` (`tag_id`);

--
-- Indexes for table `system_administrator_account`
--
ALTER TABLE `system_administrator_account`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `answers`
--
ALTER TABLE `answers`
  ADD CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`),
  ADD CONSTRAINT `answers_ibfk_2` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`);

--
-- Constraints for table `answer_flags`
--
ALTER TABLE `answer_flags`
  ADD CONSTRAINT `answer_flags_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`),
  ADD CONSTRAINT `answer_flags_ibfk_2` FOREIGN KEY (`answer_id`) REFERENCES `answers` (`id`);

--
-- Constraints for table `bounties`
--
ALTER TABLE `bounties`
  ADD CONSTRAINT `bounties_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`);

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`);

--
-- Constraints for table `comment_flags`
--
ALTER TABLE `comment_flags`
  ADD CONSTRAINT `comment_flags_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`),
  ADD CONSTRAINT `comment_flags_ibfk_2` FOREIGN KEY (`comment_id`) REFERENCES `comments` (`id`);

--
-- Constraints for table `members`
--
ALTER TABLE `members`
  ADD CONSTRAINT `members_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`);

--
-- Constraints for table `member_badges`
--
ALTER TABLE `member_badges`
  ADD CONSTRAINT `member_badges_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`),
  ADD CONSTRAINT `member_badges_ibfk_2` FOREIGN KEY (`badge_id`) REFERENCES `badges` (`id`);

--
-- Constraints for table `member_views`
--
ALTER TABLE `member_views`
  ADD CONSTRAINT `member_views_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`),
  ADD CONSTRAINT `member_views_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`);

--
-- Constraints for table `member_votes`
--
ALTER TABLE `member_votes`
  ADD CONSTRAINT `member_votes_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`),
  ADD CONSTRAINT `member_votes_ibfk_2` FOREIGN KEY (`answer_id`) REFERENCES `answers` (`id`),
  ADD CONSTRAINT `member_votes_ibfk_3` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`);

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`);

--
-- Constraints for table `photos`
--
ALTER TABLE `photos`
  ADD CONSTRAINT `photos_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`),
  ADD CONSTRAINT `photos_ibfk_2` FOREIGN KEY (`answer_id`) REFERENCES `answers` (`id`);

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`);

--
-- Constraints for table `question_edits`
--
ALTER TABLE `question_edits`
  ADD CONSTRAINT `question_edits_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`);

--
-- Constraints for table `question_tags`
--
ALTER TABLE `question_tags`
  ADD CONSTRAINT `question_tags_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`),
  ADD CONSTRAINT `question_tags_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
