/* Initializing Part */

const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
let web3Modal;
let provider;

// Mainnet
const connectionConfig = {
    network: 'mainnet',
    blockExplorerURI: 'https://etherscan.io',
    infuraId: "a6752658a0bf4f8c8405a13069677775",
    ABI_Word: [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"ApprovalCallerNotOwnerNorApproved","type":"error"},{"inputs":[],"name":"ApprovalQueryForNonexistentToken","type":"error"},{"inputs":[],"name":"ApprovalToCurrentOwner","type":"error"},{"inputs":[],"name":"ApproveToCaller","type":"error"},{"inputs":[],"name":"BalanceQueryForZeroAddress","type":"error"},{"inputs":[],"name":"MintToZeroAddress","type":"error"},{"inputs":[],"name":"MintZeroQuantity","type":"error"},{"inputs":[],"name":"OwnerIndexOutOfBounds","type":"error"},{"inputs":[],"name":"OwnerQueryForNonexistentToken","type":"error"},{"inputs":[],"name":"TokenIndexOutOfBounds","type":"error"},{"inputs":[],"name":"TransferCallerNotOwnerNorApproved","type":"error"},{"inputs":[],"name":"TransferFromIncorrectOwner","type":"error"},{"inputs":[],"name":"TransferToNonERC721ReceiverImplementer","type":"error"},{"inputs":[],"name":"TransferToZeroAddress","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"quantity","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalSupply","type":"uint256"}],"name":"mintWordEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"oriWordId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newWordId","type":"uint256"}],"name":"moveWordToTheBack","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"wordDefinedEvent","type":"event"},{"inputs":[],"name":"DESIGNATED_WORDID_OFFSET","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DICT_ADDON_PRICE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ERC721ATechinalDocumentURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"HEAD_RANDOM_WORDID","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_MINTVERSE_DICTIONARY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_MINTVERSE_GIVEAWAY_WORD","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_MINTVERSE_RANDOM_WORD","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SETTLE_HEAD_TOKENID","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TAIL_RANDOM_WORDID","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WORD_EXPIRATION_TIME","outputs":[{"internalType":"uint48","name":"","type":"uint48"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"animationCodeDocumentURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseTokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"categoryIdMappingDocumentURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"string","name":"definer","type":"string"},{"internalType":"uint8","name":"partOfSpeech1","type":"uint8"},{"internalType":"uint8","name":"partOfSpeech2","type":"uint8"},{"internalType":"string","name":"relatedWord","type":"string"},{"internalType":"string","name":"description","type":"string"}],"name":"defineWord","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"getAddonStatusByOwner","outputs":[{"internalType":"bool","name":"addon","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getTokenExpirationTime","outputs":[{"internalType":"uint256","name":"expirationTime","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"getTokenExpirationTimeByOwner","outputs":[{"internalType":"uint256[]","name":"expirationTimes","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getTokenProperties","outputs":[{"internalType":"string","name":"definer","type":"string"},{"internalType":"uint256","name":"wordId","type":"uint256"},{"internalType":"uint256","name":"categoryId","type":"uint256"},{"internalType":"uint256","name":"partOfSpeechId1","type":"uint256"},{"internalType":"uint256","name":"partOfSpeechId2","type":"uint256"},{"internalType":"string","name":"relatedWord","type":"string"},{"internalType":"string","name":"description","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"getTokenPropertiesByOwner","outputs":[{"components":[{"internalType":"string","name":"definerPart","type":"string"},{"internalType":"string","name":"relatedWordPart","type":"string"},{"internalType":"string","name":"descriptionPart","type":"string"},{"internalType":"uint16","name":"wordPart","type":"uint16"},{"internalType":"uint8","name":"categoryPart","type":"uint8"},{"internalType":"uint8","name":"partOfSpeechPart1","type":"uint8"},{"internalType":"uint8","name":"partOfSpeechPart2","type":"uint8"},{"internalType":"uint48","name":"mintTime","type":"uint48"},{"internalType":"bool","name":"defined","type":"bool"}],"internalType":"struct IWord.TokenInfo[]","name":"tokenInfos","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getTokenStatus","outputs":[{"internalType":"bool","name":"writtenOrNot","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"getTokenStatusByOwner","outputs":[{"internalType":"bool[]","name":"writtenOrNot","type":"bool[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalDictionary","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"legalDocumentURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"metadataMappingDocumentURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"bool","name":"addon","type":"bool"}],"name":"mintGiveawayDictionary","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint16","name":"wordId","type":"uint16"},{"internalType":"uint48","name":"mintTimestamp","type":"uint48"}],"name":"mintGiveawayWord","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"mintPublicEnable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mintPublicTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"addon","type":"bool"}],"name":"mintPublicWord","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"mintWhitelistEnable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mintWhitelistTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"quantity","type":"uint256"},{"internalType":"uint256","name":"maxClaimNum","type":"uint256"},{"internalType":"bool","name":"addon","type":"bool"},{"internalType":"bytes","name":"SIGNATURE","type":"bytes"}],"name":"mintWhitelistWord","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"mintedByAddress","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"partOfSpeechIdMappingDocumentURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"purchaseDictionaryCheckByAddress","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"revealTimestamp","outputs":[{"internalType":"uint48","name":"","type":"uint48"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"newAnimationCodeDocumentURI","type":"string"}],"name":"setAnimationCodeDocumentURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"newBaseTokenURI","type":"string"}],"name":"setBaseTokenURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint8","name":"categoryId","type":"uint8"}],"name":"setCategoryByTokenId","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"newCategoryIdMappingDocumentURI","type":"string"}],"name":"setCategoryIdMappingDocumentURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"price","type":"uint256"}],"name":"setDictPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"newERC721ATechinalDocumentURI","type":"string"}],"name":"setERC721ATechinalDocumentURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint48","name":"newExpirationPeriod","type":"uint48"}],"name":"setExpirationTime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"index","type":"uint16"}],"name":"setHeadRandomWordId","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"newLegalDocumentURI","type":"string"}],"name":"setLegalDocumentURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"setMaxDictAmt","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"setMaxGiveawayWordTokenAmt","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"setMaxRandomWordTokenAmt","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"newMetadataMappingDocumentURI","type":"string"}],"name":"setMetadataMappingDocumentURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"newPartOfSpeechIdMappingDocumentURI","type":"string"}],"name":"setPartOfSpeechIdMappingDocumentURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_hasPublicMintStarted","type":"bool"},{"internalType":"uint256","name":"_publicMintTimestamp","type":"uint256"}],"name":"setPublicMintPhase","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint48","name":"newRevealTimestamp","type":"uint48"}],"name":"setRevealTimestamp","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"index","type":"uint16"}],"name":"setSettleHeadRandomWordId","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"newSystemMechanismDocumentURI","type":"string"}],"name":"setSystemMechanismDocumentURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"index","type":"uint16"}],"name":"setTailRandomWordId","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bool","name":"definedOrNot","type":"bool"}],"name":"setTokenDefineStatusByTokenId","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint48","name":"mintTimestamp","type":"uint48"}],"name":"setTokenMintTimeByTokenId","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint16","name":"wordId","type":"uint16"}],"name":"setTokenWordIdByTokenId","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_treasury","type":"address"}],"name":"setTreasury","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"newVisualRebuildDocumentURI","type":"string"}],"name":"setVisualRebuildDocumentURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_hasWLMintStarted","type":"bool"},{"internalType":"uint256","name":"_wlMintTimestamp","type":"uint256"}],"name":"setWLMintPhase","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"newWordIdMappingDocumnetURI","type":"string"}],"name":"setWordIdMappingDocumnetURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"offsetAmount","type":"uint16"}],"name":"setWordIdOffset","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"startTokenId","type":"uint256"},{"internalType":"uint256","name":"endTokenId","type":"uint256"}],"name":"settleExpiredWord","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"systemMechanismDocumentURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"tokenItem","outputs":[{"internalType":"string","name":"definerPart","type":"string"},{"internalType":"string","name":"relatedWordPart","type":"string"},{"internalType":"string","name":"descriptionPart","type":"string"},{"internalType":"uint16","name":"wordPart","type":"uint16"},{"internalType":"uint8","name":"categoryPart","type":"uint8"},{"internalType":"uint8","name":"partOfSpeechPart1","type":"uint8"},{"internalType":"uint8","name":"partOfSpeechPart2","type":"uint8"},{"internalType":"uint48","name":"mintTime","type":"uint48"},{"internalType":"bool","name":"defined","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"curTokenURI","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"tokensOfOwner","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDictionary","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalWordGiveaway","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalWordWhitelist","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"treasury","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"maxQuantity","type":"uint256"},{"internalType":"bytes","name":"SIGNATURE","type":"bytes"}],"name":"verify","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"visualRebuildDocumentURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"whitelistMintAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdrawAll","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"wordIdMappingDocumnetURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}],
    contractAddr_Word: "0x895e34343e2cDAa58BD393EC416b446Ba4781c1c",
    ABI_Dictionary: [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"ApprovalCallerNotOwnerNorApproved","type":"error"},{"inputs":[],"name":"ApprovalQueryForNonexistentToken","type":"error"},{"inputs":[],"name":"ApprovalToCurrentOwner","type":"error"},{"inputs":[],"name":"ApproveToCaller","type":"error"},{"inputs":[],"name":"BalanceQueryForZeroAddress","type":"error"},{"inputs":[],"name":"MintToZeroAddress","type":"error"},{"inputs":[],"name":"MintZeroQuantity","type":"error"},{"inputs":[],"name":"OwnerIndexOutOfBounds","type":"error"},{"inputs":[],"name":"OwnerQueryForNonexistentToken","type":"error"},{"inputs":[],"name":"TokenIndexOutOfBounds","type":"error"},{"inputs":[],"name":"TransferCallerNotOwnerNorApproved","type":"error"},{"inputs":[],"name":"TransferFromIncorrectOwner","type":"error"},{"inputs":[],"name":"TransferToNonERC721ReceiverImplementer","type":"error"},{"inputs":[],"name":"TransferToZeroAddress","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"quantity","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalSupply","type":"uint256"}],"name":"mintDictionaryEvent","type":"event"},{"inputs":[],"name":"DICT_ADDON_PRICE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ERC721ATechinalDocumentURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_MINTVERSE_DICTIONARY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"airdropCheck","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"airdropDictionary","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"animationCodeDocumentURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseTokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"quantity","type":"uint256"}],"name":"claimPublicDictionary","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"claimPublicEnable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimPublicTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"quantity","type":"uint256"},{"internalType":"uint256","name":"maxClaimNum","type":"uint256"},{"internalType":"bytes","name":"SIGNATURE","type":"bytes"}],"name":"claimWhitelistDictionary","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"claimWhitelistEnable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimWhitelistTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalDictionary","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"legalDocumentURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"metadataMappingDocumentURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"quantity","type":"uint256"}],"name":"mintGiveawayDictionary","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"quantity","type":"uint256"}],"name":"mintPublicDictionary","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"mintPublicEnable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mintPublicTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"quantity","type":"uint256"},{"internalType":"uint256","name":"maxClaimNum","type":"uint256"},{"internalType":"bytes","name":"SIGNATURE","type":"bytes"}],"name":"mintWhitelistDictionary","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"mintWhitelistEnable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mintWhitelistTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mintverseWordAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"novelDocumentURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"newAnimationCodeDocumentURI","type":"string"}],"name":"setAnimationCodeDocumentURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"price","type":"uint256"}],"name":"setDictPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"newERC721ATechinalDocumentURI","type":"string"}],"name":"setERC721ATechinalDocumentURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"newLegalDocumentURI","type":"string"}],"name":"setLegalDocumentURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"setMaxDictAmt","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"newMetadataMappingDocumentURI","type":"string"}],"name":"setMetadataMappingDocumentURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newTokenAddress","type":"address"}],"name":"setMintverseWordTokenAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"newNovelDocumentURI","type":"string"}],"name":"setNovelDocumentURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_hasPublicClaimStarted","type":"bool"},{"internalType":"uint256","name":"_publicClaimTimestamp","type":"uint256"}],"name":"setPublicClaimPhase","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_hasPublicMintStarted","type":"bool"},{"internalType":"uint256","name":"_publicMintTimestamp","type":"uint256"}],"name":"setPublicMintPhase","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_treasury","type":"address"}],"name":"setTreasury","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"newVisualRebuildDocumentURI","type":"string"}],"name":"setVisualRebuildDocumentURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_hasWLClaimStarted","type":"bool"},{"internalType":"uint256","name":"_wlClaimTimestamp","type":"uint256"}],"name":"setWLClaimPhase","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_hasWLMintStarted","type":"bool"},{"internalType":"uint256","name":"_wlMintTimestamp","type":"uint256"}],"name":"setWLMintPhase","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"curTokenURI","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"tokensOfOwner","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAirdropDictionary","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDictionary","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"treasury","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"maxQuantity","type":"uint256"},{"internalType":"bytes","name":"SIGNATURE","type":"bytes"}],"name":"verifyClaim","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"maxQuantity","type":"uint256"},{"internalType":"bytes","name":"SIGNATURE","type":"bytes"}],"name":"verifyMint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"visualRebuildDocumentURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"whitelistMintAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdrawAll","outputs":[],"stateMutability":"payable","type":"function"}],
    contractAddr_Dictionary: "0x272EDff3514fBFDB8D505Fc7c5E0141B1425f2c2",
}

// Testnet
// const connectionConfig = {
//     network: 'rinkeby',
//     blockExplorerURI: 'https://rinkeby.etherscan.io',
//     infuraId: "a6752658a0bf4f8c8405a13069677775",
//     ABI_Word: [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"ApprovalCallerNotOwnerNorApproved","type":"error"},{"inputs":[],"name":"ApprovalQueryForNonexistentToken","type":"error"},{"inputs":[],"name":"ApprovalToCurrentOwner","type":"error"},{"inputs":[],"name":"ApproveToCaller","type":"error"},{"inputs":[],"name":"BalanceQueryForZeroAddress","type":"error"},{"inputs":[],"name":"MintToZeroAddress","type":"error"},{"inputs":[],"name":"MintZeroQuantity","type":"error"},{"inputs":[],"name":"OwnerIndexOutOfBounds","type":"error"},{"inputs":[],"name":"OwnerQueryForNonexistentToken","type":"error"},{"inputs":[],"name":"TokenIndexOutOfBounds","type":"error"},{"inputs":[],"name":"TransferCallerNotOwnerNorApproved","type":"error"},{"inputs":[],"name":"TransferFromIncorrectOwner","type":"error"},{"inputs":[],"name":"TransferToNonERC721ReceiverImplementer","type":"error"},{"inputs":[],"name":"TransferToZeroAddress","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"quantity","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalSupply","type":"uint256"}],"name":"mintWordEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"oriWordId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newWordId","type":"uint256"}],"name":"moveWordToTheBack","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"wordDefinedEvent","type":"event"},{"inputs":[],"name":"DESIGNATED_WORDID_OFFSET","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DICT_ADDON_PRICE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ERC721ATechinalDocumentURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"HEAD_RANDOM_WORDID","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_MINTVERSE_DICTIONARY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_MINTVERSE_GIVEAWAY_WORD","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_MINTVERSE_RANDOM_WORD","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SETTLE_HEAD_TOKENID","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TAIL_RANDOM_WORDID","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WORD_EXPIRATION_TIME","outputs":[{"internalType":"uint48","name":"","type":"uint48"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"animationCodeDocumentURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseTokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"categoryIdMappingDocumentURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"string","name":"definer","type":"string"},{"internalType":"uint8","name":"partOfSpeech1","type":"uint8"},{"internalType":"uint8","name":"partOfSpeech2","type":"uint8"},{"internalType":"string","name":"relatedWord","type":"string"},{"internalType":"string","name":"description","type":"string"}],"name":"defineWord","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"getAddonStatusByOwner","outputs":[{"internalType":"bool","name":"addon","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getTokenExpirationTime","outputs":[{"internalType":"uint256","name":"expirationTime","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"getTokenExpirationTimeByOwner","outputs":[{"internalType":"uint256[]","name":"expirationTimes","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getTokenProperties","outputs":[{"internalType":"string","name":"definer","type":"string"},{"internalType":"uint256","name":"wordId","type":"uint256"},{"internalType":"uint256","name":"categoryId","type":"uint256"},{"internalType":"uint256","name":"partOfSpeechId1","type":"uint256"},{"internalType":"uint256","name":"partOfSpeechId2","type":"uint256"},{"internalType":"string","name":"relatedWord","type":"string"},{"internalType":"string","name":"description","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"getTokenPropertiesByOwner","outputs":[{"components":[{"internalType":"string","name":"definerPart","type":"string"},{"internalType":"string","name":"relatedWordPart","type":"string"},{"internalType":"string","name":"descriptionPart","type":"string"},{"internalType":"uint16","name":"wordPart","type":"uint16"},{"internalType":"uint8","name":"categoryPart","type":"uint8"},{"internalType":"uint8","name":"partOfSpeechPart1","type":"uint8"},{"internalType":"uint8","name":"partOfSpeechPart2","type":"uint8"},{"internalType":"uint48","name":"mintTime","type":"uint48"},{"internalType":"bool","name":"defined","type":"bool"}],"internalType":"struct IWord.TokenInfo[]","name":"tokenInfos","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getTokenStatus","outputs":[{"internalType":"bool","name":"writtenOrNot","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"getTokenStatusByOwner","outputs":[{"internalType":"bool[]","name":"writtenOrNot","type":"bool[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"legalDocumentURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"metadataMappingDocumentURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"bool","name":"addon","type":"bool"}],"name":"mintGiveawayDictionary","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint16","name":"wordId","type":"uint16"},{"internalType":"uint48","name":"mintTimestamp","type":"uint48"}],"name":"mintGiveawayWord","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"mintPublicEnable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mintPublicTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"addon","type":"bool"}],"name":"mintPublicWord","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"mintWhitelistEnable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mintWhitelistTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"quantity","type":"uint256"},{"internalType":"uint256","name":"maxClaimNum","type":"uint256"},{"internalType":"bool","name":"addon","type":"bool"},{"internalType":"bytes","name":"SIGNATURE","type":"bytes"}],"name":"mintWhitelistWord","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"mintedByAddress","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"partOfSpeechIdMappingDocumentURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"purchaseDictionaryCheckByAddress","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"revealTimestamp","outputs":[{"internalType":"uint48","name":"","type":"uint48"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"newAnimationCodeDocumentURI","type":"string"}],"name":"setAnimationCodeDocumentURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"newBaseTokenURI","type":"string"}],"name":"setBaseTokenURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint8","name":"categoryId","type":"uint8"}],"name":"setCategoryByTokenId","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"newCategoryIdMappingDocumentURI","type":"string"}],"name":"setCategoryIdMappingDocumentURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"price","type":"uint256"}],"name":"setDictPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"newERC721ATechinalDocumentURI","type":"string"}],"name":"setERC721ATechinalDocumentURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint48","name":"expirationPeriod","type":"uint48"}],"name":"setExpirationTime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"index","type":"uint16"}],"name":"setHeadRandomWordId","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"newLegalDocumentURI","type":"string"}],"name":"setLegalDocumentURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"setMaxDictAmt","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"setMaxGiveawayWordTokenAmt","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"setMaxRandomWordTokenAmt","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"newMetadataMappingDocumentURI","type":"string"}],"name":"setMetadataMappingDocumentURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"newPartOfSpeechIdMappingDocumentURI","type":"string"}],"name":"setPartOfSpeechIdMappingDocumentURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_hasPublicMintStarted","type":"bool"},{"internalType":"uint256","name":"_publicMintTimestamp","type":"uint256"}],"name":"setPublicMintPhase","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint48","name":"newRevealTimestamp","type":"uint48"}],"name":"setRevealTimestamp","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"index","type":"uint16"}],"name":"setSettleHeadRandomWordId","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"newSystemMechanismDocumentURI","type":"string"}],"name":"setSystemMechanismDocumentURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"index","type":"uint16"}],"name":"setTailRandomWordId","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bool","name":"definedOrNot","type":"bool"}],"name":"setTokenDefineStatusByTokenId","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint48","name":"mintTimestamp","type":"uint48"}],"name":"setTokenMintTimeByTokenId","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint16","name":"wordId","type":"uint16"}],"name":"setTokenWordIdByTokenId","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_treasury","type":"address"}],"name":"setTreasury","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"newVisualRebuildDocumentURI","type":"string"}],"name":"setVisualRebuildDocumentURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_hasWLMintStarted","type":"bool"},{"internalType":"uint256","name":"_wlMintTimestamp","type":"uint256"}],"name":"setWLMintPhase","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"newWordIdMappingDocumnetURI","type":"string"}],"name":"setWordIdMappingDocumnetURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"offsetAmount","type":"uint16"}],"name":"setWordIdOffset","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"startTokenId","type":"uint256"},{"internalType":"uint256","name":"endTokenId","type":"uint256"}],"name":"settleExpiredWord","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"systemMechanismDocumentURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"tokenItem","outputs":[{"internalType":"string","name":"definerPart","type":"string"},{"internalType":"string","name":"relatedWordPart","type":"string"},{"internalType":"string","name":"descriptionPart","type":"string"},{"internalType":"uint16","name":"wordPart","type":"uint16"},{"internalType":"uint8","name":"categoryPart","type":"uint8"},{"internalType":"uint8","name":"partOfSpeechPart1","type":"uint8"},{"internalType":"uint8","name":"partOfSpeechPart2","type":"uint8"},{"internalType":"uint48","name":"mintTime","type":"uint48"},{"internalType":"bool","name":"defined","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"curTokenURI","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"tokensOfOwner","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDictionary","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalWordGiveaway","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalWordWhitelist","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"treasury","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"maxQuantity","type":"uint256"},{"internalType":"bytes","name":"SIGNATURE","type":"bytes"}],"name":"verify","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"visualRebuildDocumentURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"whitelistMintAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdrawAll","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"wordIdMappingDocumnetURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}],
//     contractAddr_Word: "0x98564447EaEd93e25b67867a6a752798771cE6a0"
// }


// Init Web3 When page Loaded
window.addEventListener("load", async () => {
    // load web3Modal module
    web3Modal = new Web3Modal({
        network: connectionConfig.network,
        providerOptions:{
            walletconnect: {
                package: WalletConnectProvider,
                options: {
                    infuraId: connectionConfig.infuraId
                }
            }
        },
        theme: "dark"
    });
});

// Connect and Discount Wallet
async function onConnect() {
    console.log("Opening a dialog", web3Modal);
    try {
        provider = await web3Modal.connect();
        const web3 = new Web3(provider);
        web3.eth.net.getNetworkType().then(async (netId) => {
            if (netId!="main"){
                $('.popset').openPop({message:'請切換至以太主網再繼續！',type:'failed'});
                return false;
            }
            // if (netId!="rinkeby"){
            //     $('.popset').openPop({message:'請切換至rinkeby網再繼續！',type:'failed'});
            //     return false;
            // }        
        });

        // display wallet address
        const connectedAddress = await web3.eth.getAccounts();
        $('#address').text(short_wallet(connectedAddress[0]));
    } catch (e) {
        console.log("Could not get a wallet connection", e);
        return false;
    }

    // different condition
    provider.on("chainChanged", (chainId) => {});
    provider.on("accountsChanged", (accounts) => {
        onDisconnect();
    });

    return true
}

async function onDisconnect() {
    console.log("Killing the wallet connection", provider);

    if (provider.disconnect) {
        await provider.disconnect();
        await web3Modal.clearCachedProvider();
        provider = null;
    }


    if(location.pathname=='/mint/'){
        // on minting page
        $('#connectWallect').text('重新連結錢包');
        $('.mint').hide();
        $('.mint-container .mint').show();
        $('.connect').show();
    }else{
        
        // on define page
        $("#speech").val(0);
        $('input').val("");
        $('texture').val("");

        $('.intro').show();
        $('.edit').hide();
    }


}




/* Intergration Part */


// Mint Dictionary
async function mint_public_dictionary(){
    const web3 = new Web3(provider);
    const connectedAddress = await web3.eth.getAccounts();
    const DictionaryContract = new web3.eth.Contract(connectionConfig.ABI_Dictionary, connectionConfig.contractAddr_Dictionary);
    let tx_hash;
    let is_tx_success = false;

    // get total mint number
    const totalSupply = await DictionaryContract.methods.totalSupply().call({});
    if(totalSupply ==210){
        $('.popset').openPop({message:'很抱歉，全數的辭典都被鑄造光了！',type:'failed'});
        onDisconnect();
        $('#connectWallect').attr("disabled", true);
        $('#connectWallect').text("Sold Out");
    }


    var price = await DictionaryContract.methods.DICT_ADDON_PRICE().call({});
    var Bprice = web3.utils.toBN(price)


    // Execute Minting
    DictionaryContract.methods.mintPublicDictionary(
            1,
        )
        .estimateGas({
            from: connectedAddress[0],
            value: Bprice
        })
        .then(function(gasAmount) {
            DictionaryContract.methods.mintPublicDictionary(
                    1,
                )
                .send({
                    from: connectedAddress[0],
                    gas: Math.floor(gasAmount * 1.5),
                    value: Bprice
                })
                .on("transactionHash", function(hash) {
                    tx_hash = hash;
                    $('.popset').openPop({
                        message: '您的 辭典鑄造 交易已送出，請耐心等候。',
                        url: connectionConfig.blockExplorerURI+"/tx/" + tx_hash,
                        type: 'success' 
                    });
                })
                .on('confirmation', async function(confirmationNumber, receipt) {
                    // ensure confirmation comes in once only.
                    if(!is_tx_success){
                        is_tx_success = true;
                        console.log(receipt);

                        $('.popset').openPop({
                            message: '辭典鑄造成功！',
                            url: connectionConfig.blockExplorerURI+"/tx/" + tx_hash,
                            type: 'success' 
                        });
                    }

                })
                .on("error", function(error, receipt) {
                    console.log(error);
                    console.log(receipt);

                    if (error.message.indexOf("EIP-1559") > -1) {
                        $('.popset').openPop({
                            message: '疑似冷錢包與小狐狸（Metamask）傳輸中出現問題，請嘗試使用WalletConnect重試。',
                            type: 'failed' 
                        });
                        onDisconnect();
                    } else if (error.message.indexOf("Can't mint - Public mint phase hasn't enable") > -1) {
                        $('.popset').openPop({
                            message: "無法鑄造 - 公開鑄造階段尚未啟動",
                            type: 'failed' 
                        });
                        onDisconnect();
                    } else if (error.message.indexOf("Can't mint - Public mint phase hasn't started") > -1) {
                        $('.popset').openPop({
                            message: "無法鑄造 - 目前不是公開鑄造時間",
                            type: 'failed' 
                        });
                        onDisconnect();
                    } else if (error.message.indexOf("Exceed maximum dictionary amount") > -1) {
                        $('.popset').openPop({
                            message: "無法鑄造 - 全數的辭典都被鑄造光了。",
                            type: 'failed' 
                        });
                        onDisconnect();
                    } else if (error.message.indexOf("Not the right amount of ether") > -1) {
                        $('.popset').openPop({
                            message: "無法鑄造 - 輸入的ETH金額不正確。",
                            type: 'failed' 
                        });
                        onDisconnect();
                    } else if (error.message.indexOf("insufficient funds") > -1) {
                        $('.popset').openPop({
                            message: "很抱歉，您的錢包的 ETH 餘額不足",
                            type: 'failed' 
                        });
                        onDisconnect();
                    } else {
                        $('.popset').openPop({
                            message: "鑄造失敗！原因如下"+error.message,
                            type: 'failed' 
                        });
                        onDisconnect();
                    }
                });
        })
        .catch(function(error) {
            if (error.message.indexOf("EIP-1559") > -1) {
                $('.popset').openPop({
                    message: '疑似冷錢包與小狐狸（Metamask）傳輸中出現問題，請嘗試使用WalletConnect重試。',
                    type: 'failed' 
                });
                onDisconnect();
            } else if (error.message.indexOf("Can't mint - Public mint phase hasn't enable") > -1) {
                $('.popset').openPop({
                    message: "無法鑄造 - 公開鑄造階段尚未啟動",
                    type: 'failed' 
                });
                onDisconnect();
            } else if (error.message.indexOf("Can't mint - Public mint phase hasn't started") > -1) {
                $('.popset').openPop({
                    message: "無法鑄造 - 目前不是公開鑄造時間",
                    type: 'failed' 
                });
                onDisconnect();
            } else if (error.message.indexOf("Exceed maximum dictionary amount") > -1) {
                $('.popset').openPop({
                    message: "無法鑄造 - 全數的辭典都被鑄造光了。",
                    type: 'failed' 
                });
                onDisconnect();
            } else if (error.message.indexOf("Not the right amount of ether") > -1) {
                $('.popset').openPop({
                    message: "無法鑄造 - 輸入的ETH金額不正確。",
                    type: 'failed' 
                });
                onDisconnect();
            } else if (error.message.indexOf("insufficient funds") > -1) {
                $('.popset').openPop({
                    message: "很抱歉，您的錢包的 ETH 餘額不足",
                    type: 'failed' 
                });
                onDisconnect();
            } else {
                $('.popset').openPop({
                    message: "鑄造失敗！原因如下"+error.message,
                    type: 'failed' 
                });
                onDisconnect();
            }
        });

}


// show connected info
function short_wallet(str) {
    return str.slice(0, 6) + '...' + str.slice(-4);
}


// Get Minting Status
async function update_minting_status() {
    const web3 = new Web3(provider);
    const connectedAddress = await web3.eth.getAccounts();
    // const WordContract = new web3.eth.Contract(connectionConfig.ABI_Word, connectionConfig.contractAddr_Word);
    const DictionaryContract = new web3.eth.Contract(connectionConfig.ABI_Dictionary, connectionConfig.contractAddr_Dictionary);


    // check whether dictionary has been soldout
    const dictionary_purchase_num = await DictionaryContract.methods.totalSupply().call({});

    if(dictionary_purchase_num==210){
        $("#mintBtn").text("Sold Out");
        $("#mintBtn").attr("disabled", true);
    }

    // const word_minted_num = await WordContract.methods.totalSupply().call({});
    const word_minted_num = 2100;


    return {word_minted_num, dictionary_purchase_num}
}



// Get WL Mint Info From API
async function get_wallet_info_web3() {
    const web3 = new Web3(provider);
    const connectedAddress = await web3.eth.getAccounts();
    const WordContract = new web3.eth.Contract(connectionConfig.ABI_Word, connectionConfig.contractAddr_Word);
    
    // get claimed number
    const claimedNumber = await WordContract.methods.whitelistMintAmount(connectedAddress[0]).call({});

    // get total mint number
    const totalSupply = await WordContract.methods.totalSupply().call({});
    const totalWordGiveaway = await WordContract.methods.totalWordGiveaway().call({});
    if(totalSupply - totalWordGiveaway==2667){
        $('.popset').openPop({message:'很抱歉，全數的詞彙都被鑄造光了！',type:'failed'});
        onDisconnect();
        $(".mintNum>p >span").text("Sold Out");
    }

    // get Dictionary Purchase status
    const dictionaryPurchased = await WordContract.methods.purchaseDictionaryCheckByAddress(connectedAddress[0]).call({});
    if(dictionaryPurchased){
        $(".check").addClass("disabled");
        $("#check").attr("disabled", true);
    }

    axios
        .get("https://api.mintverse.world/word/whitelist/" + connectedAddress[0])
        .then(async function(response) {
        	console.log(response);
            wallet_info = {
                address: connectedAddress[0],
                mint_limit: response.data.maxQuantity,
                signedSignature: response.data.signedSignature,

                claimed_Number: parseInt(claimedNumber),
                is_whitelist_mint:true
            }

            // check whether public mint of whitelist mint
            if(wallet_info.mint_limit==0 && wallet_info.claimed_Number==0){
                // validate public mint status
	    		$('.popset').openPop({message:'您的地址至多可鑄造 1 個'});
                wallet_info.is_whitelist_mint = false;
                wallet_info.mint_limit = 1;


            }else{
                // goes for whitelist mint
                $('.popset').openPop({message:'您的地址至多可鑄造 '+(wallet_info.mint_limit - wallet_info.claimed_Number)+" 個"});
            }

			// 最大限制 mint 數量
			let maxMint = wallet_info.mint_limit - wallet_info.claimed_Number;

            if(maxMint<=0){
                $('.popset').openPop({message:'您已經超過鑄造上限的數量了'});
                onDisconnect();
            }
            $('.inputWrap img').off();
			$('.inputWrap img').on('click', function(event) {
				event.preventDefault();
				/* Act on the event */
				let num = $('.inputWrap span').text();
				let index = $( ".inputWrap img" ).index( this );
				num = parseInt(num);
				if(index == 0){
					num = num + 1 <= maxMint ? num + 1 : num;
				}else{
					num = num - 1 < 1 ? num  : num - 1;
				}
				$('.inputWrap span').text(num.toString());
			});
			$('#max_mint').text(maxMint);

            // show wallet
            $('.mint').show();
            $('.connect').hide();

        })
        .catch(function(error) {
            console.log(error);
        });
}


// Free Mint Paper Function
async function mint_whitelist_word(wallet_info){
    const web3 = new Web3(provider);
    const connectedAddress = await web3.eth.getAccounts();
    const WordContract = new web3.eth.Contract(connectionConfig.ABI_Word, connectionConfig.contractAddr_Word);
    let tx_hash;
    let is_tx_success = false;


    var mint_num = parseInt($('.inputWrap span').text());
    var purchasedictionary = $('#check').is(":checked") ? true : false;
	var price = await WordContract.methods.DICT_ADDON_PRICE().call({});
  	var Bprice = web3.utils.toBN(price)

    // get total mint number
    const totalSupply = await WordContract.methods.totalSupply().call({});
    const totalWordGiveaway = await WordContract.methods.totalWordGiveaway().call({});
    if(totalSupply - totalWordGiveaway==2667){
        $('.popset').openPop({message:'很抱歉，全數的詞彙都被鑄造光了！',type:'failed'});
        onDisconnect();
        $(".mintNum>p >span").text("Sold Out");
    }


    // Checks before minting
    // check on valid minting number
    if (mint_num > wallet_info.mint_limit - wallet_info.claimed_Number) {
        $('.popset').openPop({ message: '白名單鑄造數量超過上限', type: 'failed' });
        onDisconnect();
    }
    // check qualification on contract
    const verification = await WordContract.methods.verify(wallet_info.mint_limit,wallet_info.signedSignature).call({from:connectedAddress[0]});

    if(!verification){
        $('.popset').openPop({ message: '白名單資格有問題，請聯繫Discord或FB/IG。', type: 'failed' });
        onDisconnect();
    }

    // Execute Minting
    WordContract.methods.mintWhitelistWord(
            mint_num,
            wallet_info.mint_limit,
            purchasedictionary,
            wallet_info.signedSignature
        )
        .estimateGas({
        	from: connectedAddress[0],
        	value: purchasedictionary ? Bprice : "0"
        })
        .then(function(gasAmount) {
            WordContract.methods.mintWhitelistWord(
                    mint_num,
                    wallet_info.mint_limit,
                    purchasedictionary,
                    wallet_info.signedSignature
                )
                .send({
                    from: connectedAddress[0],
                    gas: Math.floor(gasAmount * 1.5),
                    value: purchasedictionary ? Bprice : "0"
                })
                .on("transactionHash", function(hash) {
                    tx_hash = hash;
                	$('.popset').openPop({
                		message: '您的 FREEMINT 交易已送出，請耐心等候。',
                        url: connectionConfig.blockExplorerURI+"/tx/" + tx_hash,
                		type: 'success' 
                	});
                })
                .on('confirmation', async function(confirmationNumber, receipt) {
                    // ensure confirmation comes in once only.
                    if(!is_tx_success){
                        is_tx_success = true;
                        console.log(receipt);

                    	$('.popset').openPop({
                    		message: '詞彙鑄造成功！',
                            url: connectionConfig.blockExplorerURI+"/tx/" + tx_hash,
                    		type: 'success' 
                    	});
                    }

                })
                .on("error", function(error, receipt) {
                    console.log(error);
                    console.log(receipt);

                    if (error.message.indexOf("EIP-1559") > -1) {
	                	$('.popset').openPop({
	                		message: '疑似冷錢包與小狐狸（Metamask）傳輸中出現問題，請嘗試使用WalletConnect重試。',
	                		type: 'failed' 
	                	});
                        onDisconnect();
                    } else if (error.message.indexOf("Can't mint - WL mint phase hasn't enable") > -1) {
	                	$('.popset').openPop({
	                		message: "無法鑄造 - 白名單階段尚未啟動",
	                		type: 'failed' 
	                	});
                        onDisconnect();
                    } else if (error.message.indexOf("Can't mint - WL mint phase hasn't started") > -1) {
	                	$('.popset').openPop({
	                		message: "無法鑄造 - 目前不是白名單鑄造時間",
	                		type: 'failed' 
	                	});
                        onDisconnect();
                    } else if (error.message.indexOf("Can't claim - Not eligible") > -1) {
	                	$('.popset').openPop({
	                		message: "無法鑄造 - 您所連接的地址不符合白名單資格",
	                		type: 'failed' 
	                	});
                        onDisconnect();
                    } else if (error.message.indexOf("Exceed maximum word amount") > -1) {
	                	$('.popset').openPop({
	                		message: "無法鑄造 - 全數的詞彙都被鑄造光了，請等待42小時後重生的詞彙。",
	                		type: 'failed' 
	                	});
                        onDisconnect();
                    } else if (error.message.indexOf("Exceed maximum mintable whitelist amount") > -1) {
	                	$('.popset').openPop({
	                		message: "無法鑄造 - 輸入的數量超過您可以鑄造的上限。",
	                		type: 'failed' 
	                	});
                        onDisconnect();
                    } else if (error.message.indexOf("insufficient funds") > -1) {
	                	$('.popset').openPop({
	                		message: "很抱歉，您的錢包的 ETH 餘額不足",
	                		type: 'failed' 
	                	});
                        onDisconnect();
                    } else {
	                	$('.popset').openPop({
	                		message: "鑄造失敗！"+error.message,
	                		type: 'failed' 
	                	});
                        onDisconnect();

                    }
                });
        })
        .catch(function(error) {
	        if (error.message.indexOf("EIP-1559") > -1) {
	        	$('.popset').openPop({
	        		message: '疑似冷錢包與小狐狸（Metamask）傳輸中出現問題，請嘗試使用WalletConnect重試。',
	        		type: 'failed' 
	        	});
                onDisconnect();
	        } else if (error.message.indexOf("Can't mint - WL mint phase hasn't enable") > -1) {
	        	$('.popset').openPop({
	        		message: "無法鑄造 - 白名單階段尚未啟動",
	        		type: 'failed' 
	        	});
	            onDisconnect();
	        } else if (error.message.indexOf("Can't mint - WL mint phase hasn't started") > -1) {
	        	$('.popset').openPop({
	        		message: "無法鑄造 - 目前不是白名單鑄造時間",
	        		type: 'failed' 
	        	});
	            onDisconnect();
	        } else if (error.message.indexOf("Can't claim - Not eligible") > -1) {
	        	$('.popset').openPop({
	        		message: "無法鑄造 - 您所連接的地址不符合白名單資格",
	        		type: 'failed' 
	        	});
	            onDisconnect();
	        } else if (error.message.indexOf("Exceed maximum word amount") > -1) {
	        	$('.popset').openPop({
	        		message: "無法鑄造 - 全數的詞彙都被鑄造光了，請等待42小時後重生的詞彙。",
	        		type: 'failed' 
	        	});
	            onDisconnect();
	        } else if (error.message.indexOf("Exceed maximum mintable whitelist amount") > -1) {
	        	$('.popset').openPop({
	        		message: "無法鑄造 - 輸入的數量超過您可以鑄造的上限。",
	        		type: 'failed' 
	        	});
	            onDisconnect();
	        } else if (error.message.indexOf("insufficient funds") > -1) {
	        	$('.popset').openPop({
	        		message: "很抱歉，您的錢包的 ETH 餘額不足",
	        		type: 'failed' 
	        	});
                onDisconnect();
	        } else {
	        	$('.popset').openPop({
	        		message: "鑄造失敗！"+error.message,
	        		type: 'failed' 
	        	});
                onDisconnect();
	        }
        });
}

async function mint_public_word(wallet_info){
    const web3 = new Web3(provider);
    const connectedAddress = await web3.eth.getAccounts();
    const WordContract = new web3.eth.Contract(connectionConfig.ABI_Word, connectionConfig.contractAddr_Word);
    let tx_hash;
    let is_tx_success = false;

    // get total mint number
    const totalSupply = await WordContract.methods.totalSupply().call({});
    const totalWordGiveaway = await WordContract.methods.totalWordGiveaway().call({});
    if(totalSupply - totalWordGiveaway==2667){
        $('.popset').openPop({message:'很抱歉，全數的詞彙都被鑄造光了！',type:'failed'});
        onDisconnect();
        $(".mintNum>p >span").text("Sold Out");
    }


    var mint_num = 1;
    var purchasedictionary = $('#check').is(":checked") ? true : false;
    var price = await WordContract.methods.DICT_ADDON_PRICE().call({});
    var Bprice = web3.utils.toBN(price)


    // Execute Minting
    WordContract.methods.mintPublicWord(
            purchasedictionary,
        )
        .estimateGas({
            from: connectedAddress[0],
            value: purchasedictionary ? Bprice : "0"
        })
        .then(function(gasAmount) {
            WordContract.methods.mintPublicWord(
                    purchasedictionary,
                )
                .send({
                    from: connectedAddress[0],
                    gas: Math.floor(gasAmount * 1.5),
                    value: purchasedictionary ? Bprice : "0"
                })
                .on("transactionHash", function(hash) {
                    tx_hash = hash;
                    $('.popset').openPop({
                        message: '您的 FREEMINT 交易已送出，請耐心等候。',
                        url: connectionConfig.blockExplorerURI+"/tx/" + tx_hash,
                        type: 'success' 
                    });
                })
                .on('confirmation', async function(confirmationNumber, receipt) {
                    // ensure confirmation comes in once only.
                    if(!is_tx_success){
                        is_tx_success = true;
                        console.log(receipt);

                        $('.popset').openPop({
                            message: '詞彙鑄造成功！',
                            url: connectionConfig.blockExplorerURI+"/tx/" + tx_hash,
                            type: 'success' 
                        });
                    }

                })
                .on("error", function(error, receipt) {
                    console.log(error);
                    console.log(receipt);

                    if (error.message.indexOf("EIP-1559") > -1) {
                        $('.popset').openPop({
                            message: '疑似冷錢包與小狐狸（Metamask）傳輸中出現問題，請嘗試使用WalletConnect重試。',
                            type: 'failed' 
                        });
                        onDisconnect();
                    } else if (error.message.indexOf("Can't mint - Public mint phase hasn't enable") > -1) {
                        $('.popset').openPop({
                            message: "無法鑄造 - 公開FREEMINT階段尚未啟動",
                            type: 'failed' 
                        });
                        onDisconnect();
                    } else if (error.message.indexOf("Can't mint - Public mint phase hasn't started") > -1) {
                        $('.popset').openPop({
                            message: "無法鑄造 - 目前不是公開FREEMINT鑄造時間",
                            type: 'failed' 
                        });
                        onDisconnect();
                    } else if (error.message.indexOf("Can't claim - Not eligible") > -1) {
                        $('.popset').openPop({
                            message: "無法鑄造 - 您所連接的地址不符合白名單資格",
                            type: 'failed' 
                        });
                        onDisconnect();
                    } else if (error.message.indexOf("Exceed maximum word amount") > -1) {
                        $('.popset').openPop({
                            message: "無法鑄造 - 全數的詞彙都被鑄造光了。",
                            type: 'failed' 
                        });
                        onDisconnect();
                    } else if (error.message.indexOf("Already minted you naughty, leave some word for others") > -1) {
                        $('.popset').openPop({
                            message: "無法鑄造 - 輸入的數量超過您可以鑄造的上限。",
                            type: 'failed' 
                        });
                        onDisconnect();
                    } else if (error.message.indexOf("insufficient funds") > -1) {
                        $('.popset').openPop({
                            message: "很抱歉，您的錢包的 ETH 餘額不足",
                            type: 'failed' 
                        });
                        onDisconnect();
                    } else {
                        $('.popset').openPop({
                            message: "FREEMINT鑄造失敗！"+error.message,
                            type: 'failed' 
                        });
                        onDisconnect();
                    }
                });
        })
        .catch(function(error) {
            if (error.message.indexOf("EIP-1559") > -1) {
                $('.popset').openPop({
                    message: '疑似冷錢包與小狐狸（Metamask）傳輸中出現問題，請嘗試使用WalletConnect重試。',
                    type: 'failed' 
                });
                onDisconnect();
            } else if (error.message.indexOf("Can't mint - Public mint phase hasn't enable") > -1) {
                $('.popset').openPop({
                    message: "無法鑄造 - 公開FREEMINT階段尚未啟動",
                    type: 'failed' 
                });
                onDisconnect();
            } else if (error.message.indexOf("Can't mint - Public mint phase hasn't started") > -1) {
                $('.popset').openPop({
                    message: "無法鑄造 - 目前不是公開FREEMINT鑄造時間",
                    type: 'failed' 
                });
                onDisconnect();
            } else if (error.message.indexOf("Can't claim - Not eligible") > -1) {
                $('.popset').openPop({
                    message: "無法鑄造 - 您所連接的地址不符合白名單資格",
                    type: 'failed' 
                });
                onDisconnect();
            } else if (error.message.indexOf("Exceed maximum word amount") > -1) {
                $('.popset').openPop({
                    message: "無法鑄造 - 全數的詞彙都被鑄造光了。",
                    type: 'failed' 
                });
                onDisconnect();
            } else if (error.message.indexOf("Already minted you naughty, leave some word for others") > -1) {
                $('.popset').openPop({
                    message: "無法鑄造 - 輸入的數量超過您可以鑄造的上限。",
                    type: 'failed' 
                });
                onDisconnect();
            } else if (error.message.indexOf("insufficient funds") > -1) {
                $('.popset').openPop({
                    message: "很抱歉，您的錢包的 ETH 餘額不足",
                    type: 'failed' 
                });
                onDisconnect();
            } else {
                $('.popset').openPop({
                    message: "FREEMINT鑄造失敗！"+error.message,
                    type: 'failed' 
                });
                onDisconnect();
            }
        });
}




// Define Word Part


// sign signature for uploading
async function sign_messages(){
    $('.popset').openPop({message:'請至小狐狸簽署詞彙定義條款....'});

    const web3 = new Web3(provider);
    const connectedAddress = await web3.eth.getAccounts();
    const WordContract = new web3.eth.Contract(connectionConfig.ABI_Word, connectionConfig.contractAddr_Word);

    await web3.eth.personal.sign("我已閱讀並同意參與《第二宇宙辭典》的詞彙定義條款",connectedAddress[0],function (error){
        // console.log(error);
        if(error!=null){
            $('.popset').openPop({message:'簽署失敗，請重新連接錢包進行簽署！',type:'failed'});
            onDisconnect();
        }

    })
    .then(function (result){
        // console.log(result);
        $('.popset').openPop({message:'簽署成功，請稍候....'});
        signature = result;
    })
}


// tokensOfOwner
async function tokens_of_owner(define_data){
    const web3 = new Web3(provider);
    const connectedAddress = await web3.eth.getAccounts();
    const WordContract = new web3.eth.Contract(connectionConfig.ABI_Word, connectionConfig.contractAddr_Word);

    const tokensOfOwner_result = await WordContract.methods.tokensOfOwner(connectedAddress[0]).call({});

    let nftIdList = [];
    for(i=0;i<tokensOfOwner_result.length;i++){
        nftIdList.push({
            token:tokensOfOwner_result[i]
        })
    }

    let wallet_info = {
        address:connectedAddress[0],
        nftIdList
    };

    return wallet_info;
}


// define function
async function define_word(define_data){
    const web3 = new Web3(provider);
    const connectedAddress = await web3.eth.getAccounts();
    const WordContract = new web3.eth.Contract(connectionConfig.ABI_Word, connectionConfig.contractAddr_Word);
    let tx_hash;
    let is_tx_success = false;


    // Execute Minting
    WordContract.methods.defineWord(
            define_data.tokenId,
            define_data.definer,
            define_data.partOfSpeech1,
            define_data.partOfSpeech2,
            define_data.relatedWord,
            define_data.description
        )
        .estimateGas({
            from: connectedAddress[0],
        })
        .then(function(gasAmount) {
            WordContract.methods.defineWord(
                    define_data.tokenId,
                    define_data.definer,
                    define_data.partOfSpeech1,
                    define_data.partOfSpeech2,
                    define_data.relatedWord,
                    define_data.description
                )
                .send({
                    from: connectedAddress[0],
                    gas: Math.floor(gasAmount * 1.5),
                })
                .on("transactionHash", function(hash) {
                    tx_hash = hash;
                    $('.popset').openPop({
                        message: '您的 FREEMINT 交易已送出，請耐心等候。',
                        url: connectionConfig.blockExplorerURI+"/tx/" + tx_hash,
                        type: 'success' 
                    });
                })
                .on('confirmation', async function(confirmationNumber, receipt) {
                    // ensure confirmation comes in once only.
                    if(!is_tx_success){
                        is_tx_success = true;
                        console.log(receipt);

                        $('.popset').openPop({
                            message: '詞彙定義成功！',
                            url: connectionConfig.blockExplorerURI+"/tx/" + tx_hash,
                            type: 'success' 
                        });
                    }

                })
                .on("error", function(error, receipt) {
                    console.log(error);
                    console.log(receipt);

                    if (error.message.indexOf("EIP-1559") > -1) {
                        $('.popset').openPop({
                            message: '疑似冷錢包與小狐狸（Metamask）傳輸中出現問題，請嘗試使用WalletConnect重試。',
                            type: 'failed' 
                        });
                        onDisconnect();
                    } else if (error.message.indexOf("Can't define - Not the word owner") > -1) {
                        $('.popset').openPop({
                            message: "無法定義 - 你不是詞彙有者",
                            type: 'failed' 
                        });
                        onDisconnect();
                    } else if (error.message.indexOf("Invalid Block Time - Mint time shouldn't be larger than current time") > -1) {
                        $('.popset').openPop({
                            message: "無法定義 - 尚未到底詞彙定義時間",
                            type: 'failed' 
                        });
                        onDisconnect();
                    } else if (error.message.indexOf("Invalid Block Time - This token is expired") > -1) {
                        $('.popset').openPop({
                            message: "無法定義 - 詞彙已死亡",
                            type: 'failed' 
                        });
                        onDisconnect();
                    } else if (error.message.indexOf("insufficient funds") > -1) {
                        $('.popset').openPop({
                            message: "很抱歉，您的錢包的 ETH 餘額不足",
                            type: 'failed' 
                        });
                    } else {
                        $('.popset').openPop({
                            message: "詞彙定義失敗！",
                            type: 'failed' 
                        });
                    }
                });
        })
        .catch(function(error) {
            if (error.message.indexOf("EIP-1559") > -1) {
                $('.popset').openPop({
                    message: '疑似冷錢包與小狐狸（Metamask）傳輸中出現問題，請嘗試使用WalletConnect重試。',
                    type: 'failed' 
                });
                onDisconnect();
            } else if (error.message.indexOf("Can't define - Not the word owner") > -1) {
                $('.popset').openPop({
                    message: "無法定義 - 你不是詞彙有者",
                    type: 'failed' 
                });
                onDisconnect();
            } else if (error.message.indexOf("Invalid Block Time - Mint time shouldn't be larger than current time") > -1) {
                $('.popset').openPop({
                    message: "無法定義 - 尚未到底詞彙定義時間",
                    type: 'failed' 
                });
                onDisconnect();
            } else if (error.message.indexOf("Invalid Block Time - This token is expired") > -1) {
                $('.popset').openPop({
                    message: "無法定義 - 詞彙已死亡",
                    type: 'failed' 
                });
                onDisconnect();
            } else if (error.message.indexOf("insufficient funds") > -1) {
                $('.popset').openPop({
                    message: "很抱歉，您的錢包的 ETH 餘額不足",
                    type: 'failed' 
                });
            } else {
                $('.popset').openPop({
                    message: "詞彙定義失敗！",
                    type: 'failed' 
                });
            }
        });
}

