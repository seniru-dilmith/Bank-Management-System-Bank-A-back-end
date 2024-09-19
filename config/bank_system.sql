-- Create account_type table
CREATE TABLE `account_type` (
  `id` INT AUTO_INCREMENT,
  `name` VARCHAR(50),
  `interest_rate` DECIMAL(4,2),
  `minimum_amount` DECIMAL(5,2),
  `withdrawal_limit` INT,
  `description` VARCHAR(255),
  PRIMARY KEY (`id`),
  UNIQUE KEY (`name`)
);

-- Create branch table
CREATE TABLE `branch` (
  `id` INT AUTO_INCREMENT,
  `name` VARCHAR(255),
  `branch_address` VARCHAR(255),
  `contact_number` VARCHAR(50),
  PRIMARY KEY (`id`)
);

-- Create customer_type table
CREATE TABLE `customer_type` (
  `id` INT AUTO_INCREMENT,
  `type_name` VARCHAR(50),
  `description` VARCHAR(255),
  PRIMARY KEY (`id`),
  UNIQUE KEY (`type_name`)
);

-- Create customer table
CREATE TABLE `customer` (
  `id` INT AUTO_INCREMENT,
  `nic` VARCHAR(12),
  `customer_type_id` INT,
  `first_name` VARCHAR(255),
  `last_name` VARCHAR(255),
  `address` VARCHAR(255),
  `phone` VARCHAR(50),
  `email` VARCHAR(255),
  `username` VARCHAR(50),
  `password` VARCHAR(255),
  `date_of_birth` DATE,
  PRIMARY KEY (`id`),
  UNIQUE KEY (`nic`, `phone`, `email`, `username`)
);

-- Create loan_type table
CREATE TABLE `loan_type` (
  `id` INT AUTO_INCREMENT,
  `type_name` VARCHAR(50),
  `is_approval_needed` BOOLEAN,
  `description` VARCHAR(255),
  PRIMARY KEY (`id`),
  UNIQUE KEY (`type_name`)
);

-- Create loan table
CREATE TABLE `loan` (
  `id` INT AUTO_INCREMENT,
  `type_id` INT,
  `customer_id` INT,
  `fixed_deposit_id` INT,
  `status` ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  `loan_amount` DECIMAL(15,2),
  `loan_term` INT,
  `interest_rate` DECIMAL(4,2),
  `start_date` DATE,
  `end_date` DATE,
  PRIMARY KEY (`id`)
);

-- Create account table
CREATE TABLE `account` (
  `id` INT AUTO_INCREMENT,
  `account_type_id` INT,
  `customer_id` INT,
  `withdrawals_used` INT,
  `acc_balance` DECIMAL(15,2),
  `branch_id` INT,
  PRIMARY KEY (`id`)
);

-- Create loan_installment table
CREATE TABLE `loan_installment` (
  `id` INT AUTO_INCREMENT,
  `loan_id` INT,
  `is_paid` BOOLEAN,
  `due_date` DATE,
  PRIMARY KEY (`id`)
);

-- Create fixed_deposit table
CREATE TABLE `fixed_deposit` (
  `id` INT AUTO_INCREMENT,
  `customer_id` INT,
  `account_id` INT,
  `amount` DECIMAL(15,2),
  `start_date` DATE,
  `end_date` DATE,
  PRIMARY KEY (`id`)
);

-- Create report table
CREATE TABLE `report` (
  `id` INT AUTO_INCREMENT,
  `branch_id` INT,
  `report_date` DATE,
  PRIMARY KEY (`id`)
);

-- Create transaction_type table
CREATE TABLE `transaction_type` (
  `id` INT AUTO_INCREMENT,
  `name` VARCHAR(50),
  `description` VARCHAR(255),
  PRIMARY KEY (`id`),
  UNIQUE KEY (`name`)
);

-- Create transaction table
CREATE TABLE `transaction` (
  `id` INT AUTO_INCREMENT,
  `customer_id` INT,
  `from_account_id` INT,
  `to_account_id` INT,
  `amount` DECIMAL(15,2),
  `timestamp` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `transaction_type_id` INT,
  PRIMARY KEY (`id`)
);

-- Create position table
CREATE TABLE `position` (
  `id` INT AUTO_INCREMENT,
  `name` VARCHAR(50),
  `available_action_id` INT,
  `description` VARCHAR(255),
  PRIMARY KEY (`id`),
  UNIQUE KEY (`name`)
);

-- Create employee table
CREATE TABLE `employee` (
  `id` INT AUTO_INCREMENT,
  `first_name` VARCHAR(255),
  `last_name` VARCHAR(255),
  `phone` VARCHAR(50),
  `nic` VARCHAR(12),
  `email` VARCHAR(255),
  `username` VARCHAR(50),
  `password` VARCHAR(255),
  `position_id` INT,
  PRIMARY KEY (`id`),
  UNIQUE KEY (`nic`, `email`, `username`)
);

-- Create manager_employee table
CREATE TABLE `manager_employee` (
  `manager_id` INT,
  `branch_id` INT,
  PRIMARY KEY (`manager_id`)
);

-- Create general_employee table
CREATE TABLE `general_employee` (
  `employee_id` INT,
  `branch_id` INT,
  `branch_manager_id` INT,
  PRIMARY KEY (`employee_id`)
);

-- Create loan_report table
CREATE TABLE `loan_report` (
  `report_id` INT,
  `loan_id` INT,
  PRIMARY KEY (`report_id`, `loan_id`)
);

-- Create transaction_report table
CREATE TABLE `transaction_report` (
  `report_id` INT,
  `transaction_id` INT,
  PRIMARY KEY (`report_id`, `transaction_id`)
);

-- Create action table
CREATE TABLE `action` (
  `id` INT AUTO_INCREMENT,
  `action_name` VARCHAR(50),
  `description` VARCHAR(255),
  PRIMARY KEY (`id`),
  UNIQUE KEY (`action_name`)
);


-- relationsships

-- Add foreign key relationships to customer table
ALTER TABLE `customer`
ADD FOREIGN KEY (`customer_type_id`) REFERENCES `customer_type`(`id`)
ON DELETE CASCADE ON UPDATE CASCADE;

-- Add foreign key relationships to loan table
ALTER TABLE `loan`
ADD FOREIGN KEY (`customer_id`) REFERENCES `customer`(`id`)
ON DELETE CASCADE ON UPDATE CASCADE,
ADD FOREIGN KEY (`type_id`) REFERENCES `loan_type`(`id`)
ON DELETE CASCADE ON UPDATE CASCADE;

-- Add foreign key relationships to account table
ALTER TABLE `account`
ADD FOREIGN KEY (`customer_id`) REFERENCES `customer`(`id`)
ON DELETE CASCADE ON UPDATE CASCADE,
ADD FOREIGN KEY (`branch_id`) REFERENCES `branch`(`id`)
ON DELETE CASCADE ON UPDATE CASCADE,
ADD FOREIGN KEY (`account_type_id`) REFERENCES `account_type`(`id`)
ON DELETE CASCADE ON UPDATE CASCADE;

-- Add foreign key relationships to loan_installment table
ALTER TABLE `loan_installment`
ADD FOREIGN KEY (`loan_id`) REFERENCES `loan`(`id`)
ON DELETE CASCADE ON UPDATE CASCADE;

-- Add foreign key relationships to fixed_deposit table
ALTER TABLE `fixed_deposit`
ADD FOREIGN KEY (`customer_id`) REFERENCES `customer`(`id`)
ON DELETE CASCADE ON UPDATE CASCADE,
ADD FOREIGN KEY (`account_id`) REFERENCES `account`(`id`)
ON DELETE CASCADE ON UPDATE CASCADE;

-- Add foreign key relationships to transaction table
ALTER TABLE `transaction`
ADD FOREIGN KEY (`from_account_id`) REFERENCES `account`(`id`)
ON DELETE CASCADE ON UPDATE CASCADE,
ADD FOREIGN KEY (`to_account_id`) REFERENCES `account`(`id`)
ON DELETE CASCADE ON UPDATE CASCADE,
ADD FOREIGN KEY (`transaction_type_id`) REFERENCES `transaction_type`(`id`)
ON DELETE CASCADE ON UPDATE CASCADE;

-- Add foreign key relationships to employee table
ALTER TABLE `employee`
ADD FOREIGN KEY (`position_id`) REFERENCES `position`(`id`)
ON DELETE CASCADE ON UPDATE CASCADE;

-- Add foreign key relationships to manager_employee table
ALTER TABLE `manager_employee`
ADD FOREIGN KEY (`branch_id`) REFERENCES `branch`(`id`)
ON DELETE CASCADE ON UPDATE CASCADE;

-- Add foreign key relationships to general_employee table
ALTER TABLE `general_employee`
ADD FOREIGN KEY (`branch_id`) REFERENCES `branch`(`id`)
ON DELETE CASCADE ON UPDATE CASCADE,
ADD FOREIGN KEY (`branch_manager_id`) REFERENCES `manager_employee`(`manager_id`)
ON DELETE CASCADE ON UPDATE CASCADE;

-- Add foreign key relationships to report table
ALTER TABLE `report`
ADD FOREIGN KEY (`branch_id`) REFERENCES `branch`(`id`)
ON DELETE CASCADE ON UPDATE CASCADE;

-- Add foreign key relationships to loan_report table
ALTER TABLE `loan_report`
ADD FOREIGN KEY (`report_id`) REFERENCES `report`(`id`)
ON DELETE CASCADE ON UPDATE CASCADE,
ADD FOREIGN KEY (`loan_id`) REFERENCES `loan`(`id`)
ON DELETE CASCADE ON UPDATE CASCADE;

-- Add foreign key relationships to transaction_report table
ALTER TABLE `transaction_report`
ADD FOREIGN KEY (`report_id`) REFERENCES `report`(`id`)
ON DELETE CASCADE ON UPDATE CASCADE,
ADD FOREIGN KEY (`transaction_id`) REFERENCES `transaction`(`id`)
ON DELETE CASCADE ON UPDATE CASCADE;


-- sample insertions

INSERT INTO `account_type` (`name`, `interest_rate`, `minimum_amount`, `withdrawal_limit`, `description`)
VALUES 
('Savings Account', 2.50, 500.00, 5, 'A basic savings account with a withdrawal limit.'),
('Checking Account', 0.50, 1000.00, 10, 'Checking account with no interest and unlimited withdrawals.'),
('Fixed Deposit Account', 5.00, 5000.00, 0, 'A fixed deposit account with a higher interest rate.');

INSERT INTO `branch` (`name`, `branch_address`, `contact_number`)
VALUES 
('Main Branch', '123 Main Street, City', '123-456-7890'),
('Downtown Branch', '456 Market Road, City', '098-765-4321'),
('Uptown Branch', '789 North Avenue, City', '234-567-8901');

INSERT INTO `customer_type` (`type_name`, `description`)
VALUES 
('Retail', 'Individual customers for personal banking services.'),
('Corporate', 'Corporate customers for business banking services.'),
('SME', 'Small and Medium Enterprises.');

INSERT INTO `customer` (`nic`, `customer_type_id`, `first_name`, `last_name`, `address`, `phone`, `email`, `username`, `password`, `date_of_birth`)
VALUES 
('987654321V', 1, 'John', 'Doe', '123 Elm Street', '123-456-7890', 'john@example.com', 'johndoe', 'password123', '1980-06-12'),
('123456789V', 2, 'Jane', 'Smith', '456 Oak Street', '098-765-4321', 'jane@example.com', 'janesmith', 'password123', '1990-03-22'),
('654987321V', 3, 'Sam', 'Adams', '789 Pine Street', '234-567-8901', 'sam@example.com', 'samadams', 'password123', '1975-11-30');

INSERT INTO `loan_type` (`type_name`, `is_approval_needed`, `description`)
VALUES 
('Home Loan', TRUE, 'Loan for purchasing homes.'),
('Personal Loan', TRUE, 'Loan for personal expenses.'),
('Business Loan', TRUE, 'Loan for business operations.');

INSERT INTO `loan` (`type_id`, `customer_id`, `fixed_deposit_id`, `status`, `loan_amount`, `loan_term`, `interest_rate`, `start_date`, `end_date`)
VALUES 
(1, 1, NULL, 'approved', 50000.00, 15, 5.00, '2024-01-01', '2039-01-01'),
(2, 2, NULL, 'pending', 20000.00, 5, 3.50, '2024-02-01', '2029-02-01'),
(3, 3, NULL, 'rejected', 100000.00, 10, 6.00, '2024-03-01', '2034-03-01');

INSERT INTO `account` (`account_type_id`, `customer_id`, `withdrawals_used`, `acc_balance`, `branch_id`)
VALUES 
(1, 1, 2, 10000.00, 1),
(2, 2, 0, 15000.00, 2),
(3, 3, 0, 20000.00, 3);

INSERT INTO `loan_installment` (`loan_id`, `is_paid`, `due_date`)
VALUES 
(1, TRUE, '2024-02-01'),
(2, FALSE, '2024-03-01'),
(3, FALSE, '2024-04-01');

INSERT INTO `fixed_deposit` (`customer_id`, `account_id`, `amount`, `start_date`, `end_date`)
VALUES 
(1, 3, 5000.00, '2024-01-01', '2029-01-01'),
(2, 2, 10000.00, '2024-03-01', '2027-03-01'),
(3, 1, 15000.00, '2024-05-01', '2026-05-01');

INSERT INTO `report` (`branch_id`, `report_date`)
VALUES 
(1, '2024-02-01'),
(2, '2024-03-01'),
(3, '2024-04-01');

INSERT INTO `transaction_type` (`name`, `description`)
VALUES 
('Deposit', 'Deposit money into an account.'),
('Withdrawal', 'Withdraw money from an account.'),
('Transfer', 'Transfer money between accounts.');

INSERT INTO `transaction` (`customer_id`, `from_account_id`, `to_account_id`, `amount`, `transaction_type_id`)
VALUES 
(1, 1, 2, 500.00, 3),
(2, 2, 3, 1000.00, 1),
(3, 3, 1, 1500.00, 2);

INSERT INTO `position` (`name`, `available_action_id`, `description`)
VALUES 
('Teller', 1, 'Handles deposits and withdrawals.'),
('Loan Officer', 2, 'Manages loan approvals.'),
('cashier', 3, 'Handles da-to-day tasks');

INSERT INTO `employee` (`first_name`, `last_name`, `phone`, `nic`, `email`, `username`, `password`, `position_id`)
VALUES 
('Alice', 'Johnson', '123-456-7890', '567890123V', 'alice@example.com', 'alicejohnson', 'password123', 1),
('Bob', 'Williams', '098-765-4321', '987654321V', 'bob@example.com', 'bobwilliams', 'password123', 2),
('Charlie', 'Brown', '234-567-8901', '345678901V', 'charlie@example.com', 'charlieb', 'password123', 3);

INSERT INTO `manager_employee` (`manager_id`, `branch_id`)
VALUES 
(3, 1),
(2, 2),
(1, 3);

INSERT INTO `general_employee` (`employee_id`, `branch_id`, `branch_manager_id`)
VALUES 
(1, 1, 3),
(2, 2, 2),
(3, 3, 1);

INSERT INTO `loan_report` (`report_id`, `loan_id`)
VALUES 
(1, 1),
(2, 2),
(3, 3);

INSERT INTO `transaction_report` (`report_id`, `transaction_id`)
VALUES 
(1, 1),
(2, 2),
(3, 3);

INSERT INTO `action` (`action_name`, `description`)
VALUES 
('Approve Loan', 'Approve a loan application.'),
('Deny Loan', 'Deny a loan application.'),
('Transfer Funds', 'Transfer funds between accounts.');
