// SPDX-License-Identifier: MIT
pragma solidity >=0.8.16;

import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/v1_0_0/FunctionsClient.sol";
import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/v1_0_0/libraries/FunctionsRequest.sol";
import {BytesLib} from "solidity-bytes-utils/contracts/BytesLib.sol";


contract SocialMediaVerifier is FunctionsClient, ConfirmedOwner {
    using FunctionsRequest for FunctionsRequest.Request;

    bytes32 public s_lastRequestId;
    bytes public s_lastResponse;
    bytes public s_lastError;
    address public issuerSimpleAddress;
    mapping(bytes32 => string[]) public requestToUserArgs;
    
    error UnexpectedRequestOr(address requestor);

    event Response(bytes32 indexed requestId, bytes response, bytes err, bool successCallToIssuerSimple);

    constructor(
        address router
    ) FunctionsClient(router) ConfirmedOwner(msg.sender) {}

    /**
     * @notice Send a request to verify social media address, triggered by end user
     * @param source JavaScript source code
     * @param encryptedSecretsUrls Encrypted URLs where to fetch user secrets
     * @param donHostedSecretsSlotID Don hosted secrets slotId
     * @param donHostedSecretsVersion Don hosted secrets version
     * @param args List of arguments accessible from within the source code
     * @param bytesArgs Array of bytes arguments, represented as hex strings
     * @param subscriptionId Billing ID
     */
    function sendRequest(
        string memory source,
        bytes memory encryptedSecretsUrls,
        uint8 donHostedSecretsSlotID,
        uint64 donHostedSecretsVersion,
        string[] memory args,
        bytes[] memory bytesArgs,
        uint64 subscriptionId,
        uint32 gasLimit,
        bytes32 donID
    ) external returns (bytes32 requestId) {
        FunctionsRequest.Request memory req;
        req.initializeRequestForInlineJavaScript(source);
        if (encryptedSecretsUrls.length > 0)
            req.addSecretsReference(encryptedSecretsUrls);
        else if (donHostedSecretsVersion > 0) {
            req.addDONHostedSecrets(
                donHostedSecretsSlotID,
                donHostedSecretsVersion
            );
        }
        if (args.length > 0) req.setArgs(args);
        if (bytesArgs.length > 0) req.setBytesArgs(bytesArgs);
        s_lastRequestId = _sendRequest(
            req.encodeCBOR(),
            subscriptionId,
            gasLimit,
            donID
        );
        requestToUserArgs[s_lastRequestId] = args;//later the args are used to issue the polygon credentials
        return s_lastRequestId;
    }

    /**
     * @notice Send a pre-encoded CBOR request
     * @param request CBOR-encoded request data
     * @param subscriptionId Billing ID
     * @param gasLimit The maximum amount of gas the request can consume
     * @param donID ID of the job to be invoked
     * @return requestId The ID of the sent request
     */
    function sendRequestCBOR(
        bytes memory request,
        uint64 subscriptionId,
        uint32 gasLimit,
        bytes32 donID
    ) external onlyOwner returns (bytes32 requestId) {
        s_lastRequestId = _sendRequest(
            request,
            subscriptionId,
            gasLimit,
            donID
        );
        return s_lastRequestId;
    }

    /**
     * @notice Store latest result/error
     * @param requestId The request ID, returned by sendRequest()
     * @param response Aggregated response from the user code
     * @param err Aggregated error from the user code or from the execution pipeline
     * Either response or error parameter will be set, but never both
     */
    function fulfillRequest(
        bytes32 requestId,
        bytes memory response,
        bytes memory err
    ) internal override {

        // if (requestToUserArgs[requestId] != requestor) {
        //     revert UnexpectedRequestOr(requestor);
        // }
        string[] memory requestUserArgs = requestToUserArgs[requestId];
        // Encode the function call, I will create a mapping between request id and user address
        // check if the response has address and it matches the user address
        // channel id, address, uuid of user
        bytes memory encodedData = abi.encodeWithSignature("issueCredential(string,string,string)", requestUserArgs[0], requestUserArgs[1],requestUserArgs[2]);
        (bool success,) =0                              m                                                                      issuerSimpleAddress.call(encodedData);
        s_lastResponse = response;000000
0        s_lastError = err;
        emit Response(requestId, s_lastResponse, s_lastError, success);
    }

    function setIssuerSimpleAddress(address _address) external onlyOwner {
        issuerSimpleAddress = _address;
    }

    function getIssuerSimpleAddress() external view returns (address) {
        return issuerSimpleAddress;
    }

dghb  nhbgt  
0

 01    
  3W2

000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000 QA 0













} 00000000
