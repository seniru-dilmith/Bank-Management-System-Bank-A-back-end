-- Create account_type table
CREATE TABLE `account_type` (
  `id` INT AUTO_INCREMENT,
  `name` VARCHAR(50),
  `interest_rate` DECIMAL(4,2),
  `minimum_amount` DECIMAL(10,2),
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
  `is_online` BOOLEAN,
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

-- Relationships

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

-- Sample Data Insertions

-- Insert account types (Savings and Fixed Deposit)
INSERT INTO `account_type` (`name`, `interest_rate`, `minimum_amount`, `withdrawal_limit`, `description`)
VALUES 
('Savings - Children', 12.00, 0, 5, 'Savings account for children with high interest and no minimum balance'),
('Savings - Teen', 11.00, 500, 5, 'Savings account for teenagers with moderate interest and a minimum balance'),
('Savings - Adult', 10.00, 1000, 5, 'Savings account for adults with moderate interest and a minimum balance of 1000'),
('Savings - Senior', 13.00, 1000, 5, 'Savings account for seniors with high interest and a minimum balance of 1000'),
('Fixed Deposit - 6 months', 13.00, 5000, 0, '6-month Fixed Deposit account'),
('Fixed Deposit - 1 year', 14.00, 5000, 0, '1-year Fixed Deposit account'),
('Fixed Deposit - 3 years', 15.00, 5000, 0, '3-year Fixed Deposit account');

-- Insert branches
INSERT INTO `branch` (`name`, `branch_address`, `contact_number`)
VALUES 
('Head Office', '123 Main St, Capital City', '111-222-3333'),
('North Branch', '45 North St, Uptown', '222-333-4444'),
('South Branch', '67 South St, Downtown', '333-444-5555'),
('East Branch', '123 East St, City', '444-555-6666'),
('West Branch', '456 West St, Suburbs', '555-666-7777');

-- Insert customer types (Individual and Organization)
INSERT INTO `customer_type` (`type_name`, `description`)
VALUES 
('Individual', 'Personal banking for individual customers'),
('Organization', 'Banking services for corporate organizations');

-- Insert customers
INSERT INTO `customer` (`nic`, `customer_type_id`, `first_name`, `last_name`, `address`, `phone`, `email`, `username`, `password`, `date_of_birth`)
VALUES 
('123456789V', 1, 'Alice', 'Smith', '456 Elm St', '011-555-1234', 'alice@example.com', 'alice01', '$2a$10$r997wlXuZyphF2FmjVKleesT7557JQqbFEJMdMXjjFogPSvz2MQhG', '2010-04-15'), -- Children pass: password123
('987654321V', 1, 'John', 'Doe', '789 Oak St', '011-555-5678', 'john@example.com', 'john01', '$2a$10$gLl8smHkhUK7xNpAXh62Vut9tt9I8TnwoWePLSdtmiuCAeU0.Goqu', '2005-09-25'), -- Teen pass: password456
('543216789V', 1, 'Sam', 'Adams', '789 Pine St', '011-555-9876', 'sam@example.com', 'samadams', '$2a$10$DsMGDeS3a/OdcuC59CxkoegWaloDv5hNiquW/pwv7LBmXUYcGb1Ee', '1975-11-30'), -- Adult pass: password789
('321654987V', 1, 'Elder', 'John', '1010 Maple St', '011-555-0001', 'elderjohn@example.com', 'elderjohn', '$2a$10$oeE4rvCaCldkxBMcrGRJrOc2yxJEbRN7kxWIk8d.Herty1xMSfkje', '1955-03-10'), -- Senior pass: password321
('852963741V', 2, 'XYZ Corp', 'Ltd', '22 Corporate Ave', '011-555-9876', 'xyzcorp@example.com', 'xyzcorp', '$2a$10$X1aSzbnckesYHrGObXSbReMtWNusBTLGbycKg/wtNzEIK7P6rH8me', '1985-06-10'); -- Organization pass: securepass

-- Insert loan types (Online loans do not require approval)
INSERT INTO `loan_type` (`type_name`, `is_online`, `description`)
VALUES 
('Business Loan', FALSE, 'Loans for businesses and organizations'),
('Personal Loan', FALSE, 'Personal loans for individual customers'),
('Online Loan', TRUE, 'Instant loan through online application');

-- Insert loans
INSERT INTO `loan` (`type_id`, `customer_id`, `fixed_deposit_id`, `status`, `loan_amount`, `loan_term`, `interest_rate`, `start_date`, `end_date`)
VALUES 
(1, 1, NULL, 'pending', 50000.00, 15, 5.50, '2024-01-01', '2039-01-01'),
(2, 2, NULL, 'approved', 20000.00, 5, 3.00, '2024-01-01', '2029-01-01'),
(3, 3, NULL, 'approved', 10000.00, 1, 6.00, '2024-01-01', '2025-01-01'); -- Online loan

-- Insert accounts
INSERT INTO `account` (`account_type_id`, `customer_id`, `withdrawals_used`, `acc_balance`, `branch_id`)
VALUES 
(1, 1, 2, 1000.00, 1),  -- Children Savings
(2, 2, 0, 1500.00, 2),  -- Teen Savings
(3, 3, 0, 5000.00, 3),  -- Adult Savings
(4, 4, 0, 10000.00, 4), -- Senior Savings
(5, 3, 0, 20000.00, 5); -- Organization FD

-- Insert loan installments
INSERT INTO `loan_installment` (`loan_id`, `is_paid`, `due_date`)
VALUES 
(1, FALSE, '2024-02-01'), -- First installment for Loan 1
(2, TRUE, '2024-02-01'),  -- First installment for Loan 2
(3, FALSE, '2024-02-01'); -- First installment for Online Loan

-- Insert fixed deposits
INSERT INTO `fixed_deposit` (`customer_id`, `account_id`, `amount`, `start_date`, `end_date`)
VALUES 
(1, 1, 1000.00, '2024-01-01', '2024-07-01'), -- 6 months FD
(2, 2, 5000.00, '2024-01-01', '2025-01-01'), -- 1 year FD
(3, 3, 10000.00, '2024-01-01', '2027-01-01'); -- 3 years FD

-- Insert transaction types first
INSERT INTO `transaction_type` (`name`, `description`)
VALUES 
('Deposit', 'Deposit money into an account.'),
('Withdrawal', 'Withdraw money from an account.'),
('Transfer', 'Transfer money between accounts.');

-- Insert transactions
INSERT INTO `transaction` (`customer_id`, `from_account_id`, `to_account_id`, `amount`, `transaction_type_id`)
VALUES 
(1, 1, 2, 500.00, 1), -- Deposit
(2, 2, 3, 1000.00, 2), -- Withdrawal
(3, 3, 1, 2000.00, 3); -- Transfer

-- Insert employee positions
INSERT INTO `position` (`name`, `available_action_id`, `description`)
VALUES 
('Branch Manager', 1, 'Manager overseeing branch operations'),
('Teller', 2, 'Responsible for day-to-day transactions'),
('Loan Officer', 3, 'Handles loan applications and approvals');

-- Insert employees
INSERT INTO `employee` (`first_name`, `last_name`, `phone`, `nic`, `email`, `username`, `password`, `position_id`)
VALUES 
('Alice', 'Johnson', '011-555-6789', '567890123V', 'alice@example.com', 'alicejohnson', '$2a$10$tWgWrL7bN.ANQ9juU.xqvOHAD0NKVWxJHZ9YZm.t0slDwugdloMNu', 1), -- password123
('Bob', 'Williams', '011-555-1122', '987654321V', 'bob@example.com', 'bobwilliams', '$2a$10$H6QV5evVjJR2gAhYnE.lPuiNmTtywxdyTRjDT9IlSKEJg4KOVqkDe', 2), -- password456
('Charlie', 'Brown', '011-555-3344', '741258963V', 'charlie@example.com', 'charlieb', '$2a$10$sUn8SVOxellftkH0a0dMBemma51jTejDtCY.PzEzs2lfV4fRdmiqq', 3); -- password789

-- Insert managers and employees related to branches
INSERT INTO `manager_employee` (`manager_id`, `branch_id`)
VALUES 
(1, 1), -- Manager of Head Office
(2, 2), -- Manager of North Branch
(3, 3); -- Manager of South Branch

INSERT INTO `general_employee` (`employee_id`, `branch_id`, `branch_manager_id`)
VALUES 
(1, 1, 1), -- Employee 1 at Head Office under Manager 1
(2, 2, 2), -- Employee 2 at North Branch under Manager 2
(3, 3, 3); -- Employee 3 at South Branch under Manager 3

-- Insert reports into the report table
INSERT INTO `report` (`id`, `branch_id`, `report_date`)
VALUES 
(1, 1, '2024-01-01'),  -- Report 1 for Main Branch
(2, 2, '2024-02-01'),  -- Report 2 for Downtown Branch
(3, 3, '2024-03-01');  -- Report 3 for Uptown Branch

-- insert the loan reports into the loan_report table
INSERT INTO `loan_report` (`report_id`, `loan_id`)
VALUES 
(1, 1), -- Report 1 is related to Loan 1
(2, 2), -- Report 2 is related to Loan 2
(3, 3); -- Report 3 is related to Loan 3

INSERT INTO `transaction_report` (`report_id`, `transaction_id`)
VALUES 
(1, 1),
(2, 2),
(3, 3);

-- insert actions
INSERT INTO `action` (`action_name`, `description`)
VALUES 
('Approve Loan', 'Approve a loan application.'),
('Deny Loan', 'Deny a loan application.'),
('Transfer Funds', 'Transfer funds between accounts.');
