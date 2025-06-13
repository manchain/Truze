# Truze - ZK-Powered News Verification Platform

Truze is a decentralized platform for news verification that leverages Zero-Knowledge (ZK) proofs and blockchain technology to ensure the authenticity and credibility of news content. The platform implements a federated system where users can verify news articles while maintaining privacy and security.

## 🌟 Features

- **ZK-Proof Based Verification**: Implements zero-knowledge proofs for secure and private news verification
- **Decentralized Architecture**: Built on blockchain technology for transparency and immutability
- **User Authentication**: Secure authentication using Privy for wallet and email-based login
- **Base Sepolia Integration**: Deployed on Base Sepolia testnet for efficient and cost-effective transactions
- **Modern UI/UX**: Built with Next.js and Chakra UI for a responsive and intuitive user interface

## 🛠️ Tech Stack

- **Frontend**:
  - Next.js 13
  - React 18
  - Chakra UI
  - TailwindCSS
  - Framer Motion

- **Blockchain**:
  - Hardhat
  - Solidity
  - Web3.js
  - OpenZeppelin Contracts

- **Authentication**:
  - Privy
  - WalletConnect

- **ZK Implementation**:
  - Circomlib
  - SnarkJS

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Yarn or npm
- MetaMask or any Web3 wallet
- Base Sepolia testnet ETH

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/truze.git
cd truze
```

2. Install dependencies:
```bash
yarn install
# or
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```env
PRIVY_APP_ID=your_privy_app_id
```


### Development

Run the development server:
```bash
yarn dev
# or
npm run dev
```


```

## 📁 Project Structure

```
truze/
├── src/
│   ├── components/     # React components
│   ├── pages/         # Next.js pages
│   ├── config/        # Configuration files
│   └── lib/           # Utility functions and helpers
├── contracts/         # Smart contracts
├── circuits/          # ZK circuit files
├── scripts/           # Deployment and utility scripts
└── public/           # Static assets
```

## 🔧 Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn test` - Run tests
- `yarn compile` - Compile smart contracts
- `yarn deploy` - Deploy to local network
- `yarn deploy:base-sepolia` - Deploy to Base Sepolia

## 🔐 Security

- Smart contracts are built using OpenZeppelin's battle-tested contracts
- ZK proofs ensure privacy and security of verification data
- Regular security audits and testing

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Base Sepolia for providing the testnet infrastructure
- Privy for authentication solutions
- OpenZeppelin for secure smart contract libraries
- The ZK community for their invaluable tools and resources 