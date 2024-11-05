-- Users table to store user details
CREATE TABLE IF NOT EXISTS users (
    user_id TEXT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL, -- Store hashed password
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- API Keys table for storing user-specific API keys (for user authentication)
CREATE TABLE IF NOT EXISTS api_keys (
    api_key_id TEXT PRIMARY KEY,
    user_id TEXT REFERENCES users(user_id) ON DELETE CASCADE,
    api_key VARCHAR(255) UNIQUE NOT NULL, -- API key for authentication
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- SMS Messages table to log outgoing messages
CREATE TABLE IF NOT EXISTS sms_messages (
    sms_id TEXT PRIMARY KEY,
    user_id TEXT REFERENCES users(user_id) ON DELETE SET NULL,
    sender_address VARCHAR(15) NOT NULL,      -- Sender ID or number
    receiver_address VARCHAR(15) NOT NULL,    -- Receiver's phone number
    message TEXT NOT NULL,                    -- The SMS content
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'Pending',     -- Status (Pending, Sent, Failed)
    delivery_report TEXT                      -- Optional delivery status/report
);

-- Billing or Credits table to manage user credits for sending messages
CREATE TABLE IF NOT EXISTS billing (
    billing_id TEXT PRIMARY KEY,
    user_id TEXT REFERENCES users(user_id) ON DELETE CASCADE,
    credits INT DEFAULT 0,                        -- Available credits for the user
    last_recharge TIMESTAMP,                      -- Timestamp of the last recharge
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Transaction history for tracking recharge history and credit usage
CREATE TABLE IF NOT EXISTS transactions (
    transaction_id TEXT PRIMARY KEY,
    user_id TEXT REFERENCES users(user_id) ON DELETE SET NULL,
    transaction_type VARCHAR(20) NOT NULL,        -- Types: "Recharge", "Deduction"
    amount INT NOT NULL,                          -- Amount credited or debited
    description TEXT,                             -- Optional description
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Roles and Permissions table to enable role-based access control if needed
CREATE TABLE IF NOT EXISTS roles (
    role_id TEXT PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS user_roles (
    user_id TEXT REFERENCES users(user_id) ON DELETE CASCADE,
    role_id TEXT REFERENCES roles(role_id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

-- Indexes for performance
CREATE INDEX idx_user_sms ON sms_messages(user_id);
CREATE INDEX idx_user_billing ON billing(user_id);
CREATE INDEX idx_user_transactions ON transactions(user_id);
