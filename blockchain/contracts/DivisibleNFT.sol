// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

contract DivisibleNFT is ERC721, ERC721URIStorage, ERC721Enumerable, ERC721Burnable, Ownable, IERC721Receiver {
    using Counters for Counters.Counter;

    event Wrapped(address indexed token, uint256 indexed tokenId);
    event Unwrapped(address indexed token, uint256 indexed tokenId);
    event Transferred(address indexed to, uint256 indexed tokenId, uint256 indexed amount);

    Counters.Counter private _tokenIdCounter;

    mapping(uint256 => uint256) private _tokenAmount;

    struct UnderlyingToken {
        address token;
        uint256 tokenId;
        bool isWrapped;
    }

    UnderlyingToken private _underlyingToken;

    constructor() ERC721("DivisibleNFT", "DNFT") {}

    function getUnderlyingToken() public view returns(address, uint256, bool) {
        return (_underlyingToken.token, _underlyingToken.tokenId, _underlyingToken.isWrapped);
    }
  
    function getTokenAmount(uint256 tokenId) public view returns(uint256 amount) {
        amount = _tokenAmount[tokenId];
    }

    function wrap(address to, uint256 amount, string memory uri, address token, uint256 tokenId) public onlyOwner { // Multisig/DAO can call this to wrap an underlying NFT
        require(_underlyingToken.isWrapped == false, "A token is already wrapped");
        
        safeMint(to, amount, uri);

        _underlyingToken = UnderlyingToken(token, tokenId, true);

        IERC721(token).safeTransferFrom(_msgSender(), address(this), tokenId);

        emit Wrapped(token, tokenId);
    }

    function unwrap(address to) public onlyOwner { // Multisig/DAO can call this to unwrap the underlying NFT
        (address token, uint256 tokenId, ) = getUnderlyingToken();

        delete _underlyingToken;

        IERC721(token).safeTransferFrom(address(this), to, tokenId);

        emit Unwrapped(token, tokenId);

        // Maybe we could selfdestruct
        // selfdestruct(payable(to));
    }

    function safeMint(address to, uint256 amount, string memory uri) internal {
        _mint(to, amount, uri);
    }

    function _mint(address to, uint256 amount, string memory uri) internal virtual {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _tokenAmount[tokenId] = amount;
        _setTokenURI(tokenId, uri);
    }

    function _createSplitToken(address to, uint256 tokenId, uint256 amount) internal virtual {
        _mint(to, amount, ERC721URIStorage.tokenURI(tokenId));

        _tokenAmount[tokenId] -= amount;
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId,
        uint256 amount
    ) public virtual {
        require(amount <= _tokenAmount[tokenId], "amount is too large");

        if (amount == _tokenAmount[tokenId]) {
            ERC721.safeTransferFrom(from, to, tokenId);
        } else {
            _createSplitToken(to, tokenId, amount);
        }

        emit Transferred(to, tokenId, amount);
    }

    function _transfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override {
        transferFrom(from, to, tokenId, _tokenAmount[tokenId]);
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);

        delete _tokenAmount[tokenId];
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function onERC721Received(address, address, uint256, bytes calldata) external pure returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }
}