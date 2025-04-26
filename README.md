# 🏦 Decentralized Bank (dBank)

Welcome to **dBank**, a decentralized banking system built on the Ethereum blockchain. It allows users to **deposit**, **withdraw**, **borrow**, and **pay off loans** while earning interest in the form of **DBIC tokens**.
For development purpose we used **Truffle**

## 🚀 Features
- **Deposit ETH** and earn DBIC tokens as interest.
- **Withdraw ETH** anytime from your balance.
- **Borrow ETH** by collateralizing DBIC tokens.
- **Pay Off Loans** to reclaim your collateral.
- **Automatic DBIC Token Minting** as interest on deposits.

## 📌 Smart Contracts
- **DBank.sol**: Handles deposits, withdrawals, borrowing, and payoffs.
- **Token.sol**: ERC-20 contract for DBIC token minting.

We are also planning to make this gas free for our users and cost them on different services also we can provide pools for lending/borrowing.

## 🛠 Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/sarthakbansal7/DBI.git
cd dbank
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Start Local Blockchain (Ganache)
```sh
ganache-cli
```

### 4️⃣ Deploy Smart Contracts
```sh
truffle migrate --reset
```

### 5️⃣ Start the Frontend
```sh
npm start
```

## 💳 How to Use
### **1. Connect to MetaMask**
Click the **Connect Wallet** button to link your MetaMask account.

### **2. Deposit ETH**
- Enter the amount of ETH to deposit.
- Click **Deposit**.
- Earn DBIC tokens as interest!

### **3. Withdraw ETH**
- Click **Withdraw** to retrieve your ETH balance and accumulated interest as tokens

### **4. Borrow ETH**
- Enter the amount of ETH to borrow.
- Provide DBIC tokens as collateral.
- Click **Borrow**.

### **5. Pay Off Loan**
- Click **Pay Off** to repay the loan and unlock your collateral.

## 📜 License:
This project is open-source under the **MIT License**.

## 🤝 Contributing:
Feel free to submit issues or pull requests!

## 📧 Contact
For any queries, reach out at **sarthakbansalog@gmail.com**.

Happy Banking! 🚀

