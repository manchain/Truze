// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NewsVerification is Ownable {
    using Counters for Counters.Counter;
    
    struct Article {
        string contentHash;
        address publisher;
        uint256 timestamp;
        bool isVerified;
        uint256 verificationCount;
    }
    
    struct VerificationProof {
        bytes32 proofHash;
        address verifier;
        uint256 timestamp;
    }
    
    Counters.Counter private _articleIds;
    mapping(uint256 => Article) public articles;
    mapping(uint256 => VerificationProof[]) public articleProofs;
    mapping(address => bool) public validators;
    
    event ArticlePublished(uint256 indexed articleId, address indexed publisher, string contentHash);
    event ArticleVerified(uint256 indexed articleId, address indexed verifier, bytes32 proofHash);
    event ValidatorAdded(address indexed validator);
    event ValidatorRemoved(address indexed validator);
    
    modifier onlyValidator() {
        require(validators[msg.sender], "Not a validator");
        _;
    }
    
    constructor() {
        validators[msg.sender] = true;
    }
    
    function addValidator(address _validator) external onlyOwner {
        validators[_validator] = true;
        emit ValidatorAdded(_validator);
    }
    
    function removeValidator(address _validator) external onlyOwner {
        validators[_validator] = false;
        emit ValidatorRemoved(_validator);
    }
    
    function publishArticle(string memory _contentHash) external returns (uint256) {
        _articleIds.increment();
        uint256 newArticleId = _articleIds.current();
        
        articles[newArticleId] = Article({
            contentHash: _contentHash,
            publisher: msg.sender,
            timestamp: block.timestamp,
            isVerified: false,
            verificationCount: 0
        });
        
        emit ArticlePublished(newArticleId, msg.sender, _contentHash);
        return newArticleId;
    }
    
    function verifyArticle(uint256 _articleId, bytes32 _proofHash) external onlyValidator {
        require(_articleId <= _articleIds.current(), "Article does not exist");
        
        Article storage article = articles[_articleId];
        article.verificationCount += 1;
        
        if (article.verificationCount >= 3) {
            article.isVerified = true;
        }
        
        articleProofs[_articleId].push(VerificationProof({
            proofHash: _proofHash,
            verifier: msg.sender,
            timestamp: block.timestamp
        }));
        
        emit ArticleVerified(_articleId, msg.sender, _proofHash);
    }
    
    function getArticle(uint256 _articleId) external view returns (
        string memory contentHash,
        address publisher,
        uint256 timestamp,
        bool isVerified,
        uint256 verificationCount
    ) {
        Article memory article = articles[_articleId];
        return (
            article.contentHash,
            article.publisher,
            article.timestamp,
            article.isVerified,
            article.verificationCount
        );
    }
    
    function getVerificationProofs(uint256 _articleId) external view returns (VerificationProof[] memory) {
        return articleProofs[_articleId];
    }
} 