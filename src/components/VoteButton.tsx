import React, { useState, useEffect } from 'react';
import { ethers, BigNumber } from 'ethers';
import { Button, Tooltip, useToast } from '@chakra-ui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import VotingSystem from '../../artifacts/contracts/VotingSystem.sol/VotingSystem.json';

interface VoteButtonProps {
  articleId: number;
  isUpvote: boolean;
  contractAddress: string;
  hasVoted: boolean;
  onVoteSuccess: () => void;
}

const VoteButton: React.FC<VoteButtonProps> = ({ 
  articleId, 
  isUpvote, 
  contractAddress,
  hasVoted,
  onVoteSuccess
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFrozen, setIsFrozen] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (contractAddress && articleId !== undefined) {
      checkVoteStatus();
    }
  }, [articleId, contractAddress]);

  const checkVoteStatus = async () => {
    try {
      if (!window.ethereum) {
        console.error('MetaMask is not installed');
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, VotingSystem.abi, signer);

      const status = await contract.getArticleStatus(BigNumber.from(articleId));
      setIsFrozen(status.isFrozen);
    } catch (error) {
      console.error('Error checking vote status:', error);
    }
  };

  const handleVote = async () => {
    if (!window.ethereum) {
      toast({
        title: 'Wallet not found',
        description: 'Please install MetaMask to vote',
        status: 'error',
        duration: 5000,
      });
      return;
    }

    if (articleId === undefined) {
      toast({
        title: 'Error',
        description: 'Invalid article ID',
        status: 'error',
        duration: 5000,
      });
      return;
    }

    try {
      setIsLoading(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      
      const network = await provider.getNetwork();
      if (network.chainId !== 84532) {
        toast({
          title: 'Wrong Network',
          description: 'Please switch to Base Sepolia network',
          status: 'error',
          duration: 5000,
        });
        return;
      }

      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, VotingSystem.abi, signer);

      const articleIdBN = BigNumber.from(articleId);
      console.log('Voting with articleId:', articleIdBN.toString());

      const tx = await contract.vote(articleIdBN, isUpvote);
      await tx.wait();

      toast({
        title: 'Vote submitted',
        description: `Successfully ${isUpvote ? 'upvoted' : 'downvoted'} the article`,
        status: 'success',
        duration: 5000,
      });

      onVoteSuccess(); // Call the parent's callback to update shared state
      await checkVoteStatus();
    } catch (error: any) {
      console.error('Vote error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to submit vote',
        status: 'error',
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getTooltipText = () => {
    if (hasVoted) return 'You have already voted on this article';
    if (isFrozen) return 'Voting is temporarily frozen due to high activity';
    return isUpvote ? 'Upvote this article' : 'Downvote this article';
  };

  return (
    <Tooltip label={getTooltipText()}>
      <Button
        onClick={handleVote}
        isDisabled={hasVoted || isFrozen}
        isLoading={isLoading}
        colorScheme={isUpvote ? 'green' : 'red'}
        variant="outline"
        size="sm"
        leftIcon={isUpvote ? <ChevronUpIcon /> : <ChevronDownIcon />}
        opacity={hasVoted ? 0.6 : 1}
      >
        {isUpvote ? 'Upvote' : 'Downvote'}
      </Button>
    </Tooltip>
  );
};

export default VoteButton; 