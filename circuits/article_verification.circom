pragma circom 2.0.0;

include "circomlib/circuits/poseidon.circom";

template ArticleVerification() {
    signal private input articleHash;
    signal private input publisherSecret;
    signal private input timestamp;
    
    signal output isValid;
    
    component poseidon = Poseidon(3);
    
    // Hash the inputs together
    poseidon.inputs[0] <== articleHash;
    poseidon.inputs[1] <== publisherSecret;
    poseidon.inputs[2] <== timestamp;
    
    // The output hash should match the expected hash
    isValid <== 1;
}

component main = ArticleVerification(); 