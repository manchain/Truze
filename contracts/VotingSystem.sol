// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract VotingSystem is Ownable, ReentrancyGuard {
    struct Vote {
        bool isUpvote;
        uint256 timestamp;
    }

    struct Article {
        uint256 upvotes;
        uint256 downvotes;
        uint256 lastVoteTimestamp;
        uint256 votesInTimeWindow;
        bool isFrozen;
        mapping(address => Vote) userVotes;
    }

    // Mapping of article ID to Article struct
    mapping(uint256 => Article) private articles;
    
    // Constants
    uint256 public constant VOTE_COOLDOWN = 1 hours;
    uint256 public constant MAX_VOTES_PER_WINDOW = 100;
    uint256 public constant VOTE_WINDOW = 24 hours;

    // Events
    event VoteCast(uint256 indexed articleId, address indexed voter, bool isUpvote, uint256 timestamp);
    event ArticleFrozen(uint256 indexed articleId, uint256 timestamp);
    event ArticleUnfrozen(uint256 indexed articleId, uint256 timestamp);

    // Modifiers
    modifier articleExists(uint256 _articleId) {
        require(articles[_articleId].lastVoteTimestamp != 0, "Article does not exist");
        _;
    }

    modifier notFrozen(uint256 _articleId) {
        require(!articles[_articleId].isFrozen, "Article is frozen");
        _;
    }

    // Functions
    function vote(uint256 _articleId, bool _isUpvote) external nonReentrant articleExists(_articleId) notFrozen(_articleId) {
        Article storage article = articles[_articleId];
        
        // Check if user has already voted
        require(article.userVotes[msg.sender].timestamp == 0, "Already voted");
        
        // Check vote cooldown
        require(block.timestamp >= article.lastVoteTimestamp + VOTE_COOLDOWN, "Vote cooldown active");
        
        // Check votes in time window
        if (block.timestamp >= article.lastVoteTimestamp + VOTE_WINDOW) {
            article.votesInTimeWindow = 0;
        }
        require(article.votesInTimeWindow < MAX_VOTES_PER_WINDOW, "Max votes in window reached");

        // Update vote counts
        if (_isUpvote) {
            article.upvotes++;
        } else {
            article.downvotes++;
        }

        // Record vote
        article.userVotes[msg.sender] = Vote({
            isUpvote: _isUpvote,
            timestamp: block.timestamp
        });

        // Update article state
        article.lastVoteTimestamp = block.timestamp;
        article.votesInTimeWindow++;

        emit VoteCast(_articleId, msg.sender, _isUpvote, block.timestamp);
    }

    function freezeArticle(uint256 _articleId) external onlyOwner articleExists(_articleId) {
        require(!articles[_articleId].isFrozen, "Article already frozen");
        articles[_articleId].isFrozen = true;
        emit ArticleFrozen(_articleId, block.timestamp);
    }

    function unfreezeArticle(uint256 _articleId) external onlyOwner articleExists(_articleId) {
        require(articles[_articleId].isFrozen, "Article not frozen");
        articles[_articleId].isFrozen = false;
        emit ArticleUnfrozen(_articleId, block.timestamp);
    }

    function getArticleVotes(uint256 _articleId) external view articleExists(_articleId) returns (uint256 upvotes, uint256 downvotes) {
        Article storage article = articles[_articleId];
        return (article.upvotes, article.downvotes);
    }

    function getUserVote(uint256 _articleId, address _user) external view articleExists(_articleId) returns (bool isUpvote, uint256 timestamp) {
        Vote storage vote = articles[_articleId].userVotes[_user];
        return (vote.isUpvote, vote.timestamp);
    }

    function isArticleFrozen(uint256 _articleId) external view articleExists(_articleId) returns (bool) {
        return articles[_articleId].isFrozen;
    }

    function getVotesInTimeWindow(uint256 _articleId) external view articleExists(_articleId) returns (uint256) {
        Article storage article = articles[_articleId];
        if (block.timestamp >= article.lastVoteTimestamp + VOTE_WINDOW) {
            return 0;
        }
        return article.votesInTimeWindow;
    }
}
