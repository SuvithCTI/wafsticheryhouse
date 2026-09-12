-- ==========================================================
-- WAF STITCHERY HOUSE - DATABASE SCHEMA (MySQL)
-- Use this schema when connecting your live MySQL database.
-- ==========================================================

CREATE DATABASE IF NOT EXISTS `waf_stitchery_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `waf_stitchery_db`;

-- 1. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS `products` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `category` ENUM('blouses', 'kurtis', 'bridal', 'custom') NOT NULL DEFAULT 'blouses',
  `price` DECIMAL(10, 2) NOT NULL,
  `original_price` DECIMAL(10, 2) DEFAULT NULL,
  `description` TEXT NOT NULL,
  `fabric` VARCHAR(150) NOT NULL,
  `embroidery` VARCHAR(150) NOT NULL,
  `image` VARCHAR(500) NOT NULL,
  `additional_images` JSON DEFAULT NULL,
  `tags` JSON DEFAULT NULL,
  `in_stock` BOOLEAN NOT NULL DEFAULT TRUE,
  `featured` BOOLEAN NOT NULL DEFAULT FALSE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. CUSTOM STITCHING ORDERS TABLE
CREATE TABLE IF NOT EXISTS `custom_stitching_orders` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `customer_name` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `email` VARCHAR(150) DEFAULT NULL,
  `garment_type` ENUM('blouse', 'kurti', 'lehenga', 'suit') NOT NULL,
  `neckline` VARCHAR(100) NOT NULL,
  `sleeves` VARCHAR(100) NOT NULL,
  `back_design` VARCHAR(100) NOT NULL,
  `fabric_type` VARCHAR(100) NOT NULL,
  `fabric_color` VARCHAR(100) NOT NULL,
  `measurements` JSON NOT NULL, -- { bust, waist, shoulder, sleeveLength, length }
  `reference_image` MEDIUMTEXT DEFAULT NULL,
  `special_instructions` TEXT DEFAULT NULL,
  `delivery_date` DATE DEFAULT NULL,
  `urgency` ENUM('standard', 'express') NOT NULL DEFAULT 'standard',
  `estimated_price` DECIMAL(10, 2) NOT NULL,
  `status` ENUM('new', 'fabric_sourced', 'in_stitching', 'quality_check', 'ready', 'dispatched') NOT NULL DEFAULT 'new',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. INQUIRIES & CONSULTATION APPOINTMENTS
CREATE TABLE IF NOT EXISTS `inquiries` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) DEFAULT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `service_type` VARCHAR(150) NOT NULL,
  `message` TEXT NOT NULL,
  `preferred_contact` ENUM('whatsapp', 'call', 'email') NOT NULL DEFAULT 'whatsapp',
  `status` ENUM('unread', 'contacted', 'resolved') NOT NULL DEFAULT 'unread',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. GALLERY & LOOKBOOK TABLE
CREATE TABLE IF NOT EXISTS `gallery_items` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `category` ENUM('bridal', 'blouses', 'craftsmanship', 'real_brides') NOT NULL,
  `image` VARCHAR(500) NOT NULL,
  `description` TEXT NOT NULL,
  `details` JSON DEFAULT NULL,
  `likes` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. REVIEWS & TESTIMONIALS
CREATE TABLE IF NOT EXISTS `reviews` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `rating` INT NOT NULL DEFAULT 5,
  `date` VARCHAR(50) NOT NULL,
  `occasion` VARCHAR(150) NOT NULL,
  `comment` TEXT NOT NULL,
  `verified` BOOLEAN DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
