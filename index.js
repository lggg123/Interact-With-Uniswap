const { ChainId, Fetcher, WETH, Route, Trade, TokenAmount, TradeType } = require('@uniswap/sdk');
const ethers = require('ethers');

const url = 'ETHEREUM_NODE_URL';
const customHttpProvider = new ethers.providers.JsonRpcProvider(url);

const chainId = ChainId.MAINNET;
const tokenAddress = 'TOKEN_ADDRESS'

const init = async() => {
  const dai = await Fetcher.fetchTokenData(chainId, tokenAddress, customHttpProvider);
  cont weth = WETH[chainId];
  const pair = await Fetcher.fetchPairData(dai, weth, customHttpProvider);
  const route = new Route([pair], weth);
  const trade = new Trade(route, new TokenAmount(weth, '100000000000000000'), TradeType.EXACT_INPUT);
  console.log("Mid Price WETH -> DAI:", route.midPrice.toSignificant(6));
  console.log("Mid Price DAI -> WETH;", route.midPrice.invert().toSignificant(6));
  console.log("-".repeat(45));
  console.log("Execution Price WETH -> DAI:", trade.executionPrice.toSignificant(6));
  console.log("Mid Price after trade WETH -> DAI:", trade.nextMidPrice.toSignificant(6));
}

init();

// explanation of code
// Line 1-2: Importing the Uniswap SDK and ethers library with necessary Uniswap packages.
// Line 4: Setting our Ethereum node URL.
// Line 5: Instantiating an ethers JsonRpcProvider instance.
// Line 7: Defining chainId to mainnet.
// Line 8: Specifying tokn address to DAI; always confirm the address before using Uniswap You can get the address
// of any ERC20 token from https://etherscan.io/tokens
// Line 10: Defining the init variable as an async function.
// Line 11: Creating a pointer to the DAI token and fetching the token using the Fetcher object by customHttpProvider as arguments.
// Line 12: Defining our other token Wrapped ether.
// Line 13: Instantiating the pair object, the pair object allows interaction with a specific market, fetching the pair data of WETH and DAI pair.
// Line 14: Instantiating the route object and passing pair array and WETH as the input token.
// Line 15: Creating a new trade to get the execution prices of WETH in DAI, Providing 100 WETH in input with 15 zeros and specifying the trade type.
// Line 16: Getting midprice of WETH in DAI.
// Line 17: Getting midprice of DAI in WETH.
// Line 18: Printing a dashed line for better output representation.
// Line 19: Getting the exact execution price of WETH in DAI.
// Line 20: Getting midprice of WETH in DAI after the trade.
// Line 23: Calling the init function.
// Now save the script file and run it using the following command
// node index
