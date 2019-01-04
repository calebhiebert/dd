/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.dd = (function() {

    /**
     * Namespace dd.
     * @exports dd
     * @namespace
     */
    var dd = {};

    dd.DD = (function() {

        /**
         * Constructs a new DD service.
         * @memberof dd
         * @classdesc Represents a DD
         * @extends $protobuf.rpc.Service
         * @constructor
         * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
         * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
         * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
         */
        function DD(rpcImpl, requestDelimited, responseDelimited) {
            $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
        }

        (DD.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = DD;

        /**
         * Creates new DD service using the specified rpc implementation.
         * @function create
         * @memberof dd.DD
         * @static
         * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
         * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
         * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
         * @returns {DD} RPC service. Useful where requests and/or responses are streamed.
         */
        DD.create = function create(rpcImpl, requestDelimited, responseDelimited) {
            return new this(rpcImpl, requestDelimited, responseDelimited);
        };

        /**
         * Callback as used by {@link dd.DD#auth}.
         * @memberof dd.DD
         * @typedef AuthCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {dd.AuthResponse} [response] AuthResponse
         */

        /**
         * Calls Auth.
         * @function auth
         * @memberof dd.DD
         * @instance
         * @param {dd.IAuthRequest} request AuthRequest message or plain object
         * @param {dd.DD.AuthCallback} callback Node-style callback called with the error, if any, and AuthResponse
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(DD.prototype.auth = function auth(request, callback) {
            return this.rpcCall(auth, $root.dd.AuthRequest, $root.dd.AuthResponse, request, callback);
        }, "name", { value: "Auth" });

        /**
         * Calls Auth.
         * @function auth
         * @memberof dd.DD
         * @instance
         * @param {dd.IAuthRequest} request AuthRequest message or plain object
         * @returns {Promise<dd.AuthResponse>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link dd.DD#getUser}.
         * @memberof dd.DD
         * @typedef GetUserCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {dd.User} [response] User
         */

        /**
         * Calls GetUser.
         * @function getUser
         * @memberof dd.DD
         * @instance
         * @param {dd.IGetByIdRequest} request GetByIdRequest message or plain object
         * @param {dd.DD.GetUserCallback} callback Node-style callback called with the error, if any, and User
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(DD.prototype.getUser = function getUser(request, callback) {
            return this.rpcCall(getUser, $root.dd.GetByIdRequest, $root.dd.User, request, callback);
        }, "name", { value: "GetUser" });

        /**
         * Calls GetUser.
         * @function getUser
         * @memberof dd.DD
         * @instance
         * @param {dd.IGetByIdRequest} request GetByIdRequest message or plain object
         * @returns {Promise<dd.User>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link dd.DD#createUser}.
         * @memberof dd.DD
         * @typedef CreateUserCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {dd.User} [response] User
         */

        /**
         * Calls CreateUser.
         * @function createUser
         * @memberof dd.DD
         * @instance
         * @param {dd.ICreateUserRequest} request CreateUserRequest message or plain object
         * @param {dd.DD.CreateUserCallback} callback Node-style callback called with the error, if any, and User
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(DD.prototype.createUser = function createUser(request, callback) {
            return this.rpcCall(createUser, $root.dd.CreateUserRequest, $root.dd.User, request, callback);
        }, "name", { value: "CreateUser" });

        /**
         * Calls CreateUser.
         * @function createUser
         * @memberof dd.DD
         * @instance
         * @param {dd.ICreateUserRequest} request CreateUserRequest message or plain object
         * @returns {Promise<dd.User>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link dd.DD#getCampaign}.
         * @memberof dd.DD
         * @typedef GetCampaignCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {dd.Campaign} [response] Campaign
         */

        /**
         * Calls GetCampaign.
         * @function getCampaign
         * @memberof dd.DD
         * @instance
         * @param {dd.IGetByIdRequest} request GetByIdRequest message or plain object
         * @param {dd.DD.GetCampaignCallback} callback Node-style callback called with the error, if any, and Campaign
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(DD.prototype.getCampaign = function getCampaign(request, callback) {
            return this.rpcCall(getCampaign, $root.dd.GetByIdRequest, $root.dd.Campaign, request, callback);
        }, "name", { value: "GetCampaign" });

        /**
         * Calls GetCampaign.
         * @function getCampaign
         * @memberof dd.DD
         * @instance
         * @param {dd.IGetByIdRequest} request GetByIdRequest message or plain object
         * @returns {Promise<dd.Campaign>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link dd.DD#getCampaigns}.
         * @memberof dd.DD
         * @typedef GetCampaignsCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {dd.GetCampaignsResponse} [response] GetCampaignsResponse
         */

        /**
         * Calls GetCampaigns.
         * @function getCampaigns
         * @memberof dd.DD
         * @instance
         * @param {dd.IGetCampaignsRequest} request GetCampaignsRequest message or plain object
         * @param {dd.DD.GetCampaignsCallback} callback Node-style callback called with the error, if any, and GetCampaignsResponse
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(DD.prototype.getCampaigns = function getCampaigns(request, callback) {
            return this.rpcCall(getCampaigns, $root.dd.GetCampaignsRequest, $root.dd.GetCampaignsResponse, request, callback);
        }, "name", { value: "GetCampaigns" });

        /**
         * Calls GetCampaigns.
         * @function getCampaigns
         * @memberof dd.DD
         * @instance
         * @param {dd.IGetCampaignsRequest} request GetCampaignsRequest message or plain object
         * @returns {Promise<dd.GetCampaignsResponse>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link dd.DD#createCampaign}.
         * @memberof dd.DD
         * @typedef CreateCampaignCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {dd.CreateCampaignResponse} [response] CreateCampaignResponse
         */

        /**
         * Calls CreateCampaign.
         * @function createCampaign
         * @memberof dd.DD
         * @instance
         * @param {dd.ICreateCampaignRequest} request CreateCampaignRequest message or plain object
         * @param {dd.DD.CreateCampaignCallback} callback Node-style callback called with the error, if any, and CreateCampaignResponse
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(DD.prototype.createCampaign = function createCampaign(request, callback) {
            return this.rpcCall(createCampaign, $root.dd.CreateCampaignRequest, $root.dd.CreateCampaignResponse, request, callback);
        }, "name", { value: "CreateCampaign" });

        /**
         * Calls CreateCampaign.
         * @function createCampaign
         * @memberof dd.DD
         * @instance
         * @param {dd.ICreateCampaignRequest} request CreateCampaignRequest message or plain object
         * @returns {Promise<dd.CreateCampaignResponse>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link dd.DD#editCampaign}.
         * @memberof dd.DD
         * @typedef EditCampaignCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {dd.CampaignCore} [response] CampaignCore
         */

        /**
         * Calls EditCampaign.
         * @function editCampaign
         * @memberof dd.DD
         * @instance
         * @param {dd.IEditCampaignRequest} request EditCampaignRequest message or plain object
         * @param {dd.DD.EditCampaignCallback} callback Node-style callback called with the error, if any, and CampaignCore
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(DD.prototype.editCampaign = function editCampaign(request, callback) {
            return this.rpcCall(editCampaign, $root.dd.EditCampaignRequest, $root.dd.CampaignCore, request, callback);
        }, "name", { value: "EditCampaign" });

        /**
         * Calls EditCampaign.
         * @function editCampaign
         * @memberof dd.DD
         * @instance
         * @param {dd.IEditCampaignRequest} request EditCampaignRequest message or plain object
         * @returns {Promise<dd.CampaignCore>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link dd.DD#getQuest}.
         * @memberof dd.DD
         * @typedef GetQuestCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {dd.Quest} [response] Quest
         */

        /**
         * Calls GetQuest.
         * @function getQuest
         * @memberof dd.DD
         * @instance
         * @param {dd.IGetByIdRequest} request GetByIdRequest message or plain object
         * @param {dd.DD.GetQuestCallback} callback Node-style callback called with the error, if any, and Quest
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(DD.prototype.getQuest = function getQuest(request, callback) {
            return this.rpcCall(getQuest, $root.dd.GetByIdRequest, $root.dd.Quest, request, callback);
        }, "name", { value: "GetQuest" });

        /**
         * Calls GetQuest.
         * @function getQuest
         * @memberof dd.DD
         * @instance
         * @param {dd.IGetByIdRequest} request GetByIdRequest message or plain object
         * @returns {Promise<dd.Quest>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link dd.DD#getQuests}.
         * @memberof dd.DD
         * @typedef GetQuestsCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {dd.GetQuestsResponse} [response] GetQuestsResponse
         */

        /**
         * Calls GetQuests.
         * @function getQuests
         * @memberof dd.DD
         * @instance
         * @param {dd.IGetQuestsRequest} request GetQuestsRequest message or plain object
         * @param {dd.DD.GetQuestsCallback} callback Node-style callback called with the error, if any, and GetQuestsResponse
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(DD.prototype.getQuests = function getQuests(request, callback) {
            return this.rpcCall(getQuests, $root.dd.GetQuestsRequest, $root.dd.GetQuestsResponse, request, callback);
        }, "name", { value: "GetQuests" });

        /**
         * Calls GetQuests.
         * @function getQuests
         * @memberof dd.DD
         * @instance
         * @param {dd.IGetQuestsRequest} request GetQuestsRequest message or plain object
         * @returns {Promise<dd.GetQuestsResponse>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link dd.DD#createQuest}.
         * @memberof dd.DD
         * @typedef CreateQuestCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {dd.CreateQuestResponse} [response] CreateQuestResponse
         */

        /**
         * Calls CreateQuest.
         * @function createQuest
         * @memberof dd.DD
         * @instance
         * @param {dd.ICreateQuestRequest} request CreateQuestRequest message or plain object
         * @param {dd.DD.CreateQuestCallback} callback Node-style callback called with the error, if any, and CreateQuestResponse
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(DD.prototype.createQuest = function createQuest(request, callback) {
            return this.rpcCall(createQuest, $root.dd.CreateQuestRequest, $root.dd.CreateQuestResponse, request, callback);
        }, "name", { value: "CreateQuest" });

        /**
         * Calls CreateQuest.
         * @function createQuest
         * @memberof dd.DD
         * @instance
         * @param {dd.ICreateQuestRequest} request CreateQuestRequest message or plain object
         * @returns {Promise<dd.CreateQuestResponse>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link dd.DD#editQuest}.
         * @memberof dd.DD
         * @typedef EditQuestCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {dd.Quest} [response] Quest
         */

        /**
         * Calls EditQuest.
         * @function editQuest
         * @memberof dd.DD
         * @instance
         * @param {dd.IEditQuestRequest} request EditQuestRequest message or plain object
         * @param {dd.DD.EditQuestCallback} callback Node-style callback called with the error, if any, and Quest
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(DD.prototype.editQuest = function editQuest(request, callback) {
            return this.rpcCall(editQuest, $root.dd.EditQuestRequest, $root.dd.Quest, request, callback);
        }, "name", { value: "EditQuest" });

        /**
         * Calls EditQuest.
         * @function editQuest
         * @memberof dd.DD
         * @instance
         * @param {dd.IEditQuestRequest} request EditQuestRequest message or plain object
         * @returns {Promise<dd.Quest>} Promise
         * @variation 2
         */

        return DD;
    })();

    dd.GetByIdRequest = (function() {

        /**
         * Properties of a GetByIdRequest.
         * @memberof dd
         * @interface IGetByIdRequest
         * @property {string|null} [id] GetByIdRequest id
         */

        /**
         * Constructs a new GetByIdRequest.
         * @memberof dd
         * @classdesc Represents a GetByIdRequest.
         * @implements IGetByIdRequest
         * @constructor
         * @param {dd.IGetByIdRequest=} [properties] Properties to set
         */
        function GetByIdRequest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GetByIdRequest id.
         * @member {string} id
         * @memberof dd.GetByIdRequest
         * @instance
         */
        GetByIdRequest.prototype.id = "";

        /**
         * Creates a new GetByIdRequest instance using the specified properties.
         * @function create
         * @memberof dd.GetByIdRequest
         * @static
         * @param {dd.IGetByIdRequest=} [properties] Properties to set
         * @returns {dd.GetByIdRequest} GetByIdRequest instance
         */
        GetByIdRequest.create = function create(properties) {
            return new GetByIdRequest(properties);
        };

        /**
         * Encodes the specified GetByIdRequest message. Does not implicitly {@link dd.GetByIdRequest.verify|verify} messages.
         * @function encode
         * @memberof dd.GetByIdRequest
         * @static
         * @param {dd.IGetByIdRequest} message GetByIdRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetByIdRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && message.hasOwnProperty("id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            return writer;
        };

        /**
         * Encodes the specified GetByIdRequest message, length delimited. Does not implicitly {@link dd.GetByIdRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dd.GetByIdRequest
         * @static
         * @param {dd.IGetByIdRequest} message GetByIdRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetByIdRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GetByIdRequest message from the specified reader or buffer.
         * @function decode
         * @memberof dd.GetByIdRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dd.GetByIdRequest} GetByIdRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetByIdRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dd.GetByIdRequest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GetByIdRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dd.GetByIdRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dd.GetByIdRequest} GetByIdRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetByIdRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GetByIdRequest message.
         * @function verify
         * @memberof dd.GetByIdRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GetByIdRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            return null;
        };

        /**
         * Creates a GetByIdRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof dd.GetByIdRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {dd.GetByIdRequest} GetByIdRequest
         */
        GetByIdRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.dd.GetByIdRequest)
                return object;
            var message = new $root.dd.GetByIdRequest();
            if (object.id != null)
                message.id = String(object.id);
            return message;
        };

        /**
         * Creates a plain object from a GetByIdRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof dd.GetByIdRequest
         * @static
         * @param {dd.GetByIdRequest} message GetByIdRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GetByIdRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.id = "";
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            return object;
        };

        /**
         * Converts this GetByIdRequest to JSON.
         * @function toJSON
         * @memberof dd.GetByIdRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GetByIdRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GetByIdRequest;
    })();

    dd.SearchParams = (function() {

        /**
         * Properties of a SearchParams.
         * @memberof dd
         * @interface ISearchParams
         * @property {Array.<string>|null} [ids] SearchParams ids
         * @property {number|null} [limit] SearchParams limit
         * @property {number|null} [offset] SearchParams offset
         */

        /**
         * Constructs a new SearchParams.
         * @memberof dd
         * @classdesc Represents a SearchParams.
         * @implements ISearchParams
         * @constructor
         * @param {dd.ISearchParams=} [properties] Properties to set
         */
        function SearchParams(properties) {
            this.ids = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SearchParams ids.
         * @member {Array.<string>} ids
         * @memberof dd.SearchParams
         * @instance
         */
        SearchParams.prototype.ids = $util.emptyArray;

        /**
         * SearchParams limit.
         * @member {number} limit
         * @memberof dd.SearchParams
         * @instance
         */
        SearchParams.prototype.limit = 0;

        /**
         * SearchParams offset.
         * @member {number} offset
         * @memberof dd.SearchParams
         * @instance
         */
        SearchParams.prototype.offset = 0;

        /**
         * Creates a new SearchParams instance using the specified properties.
         * @function create
         * @memberof dd.SearchParams
         * @static
         * @param {dd.ISearchParams=} [properties] Properties to set
         * @returns {dd.SearchParams} SearchParams instance
         */
        SearchParams.create = function create(properties) {
            return new SearchParams(properties);
        };

        /**
         * Encodes the specified SearchParams message. Does not implicitly {@link dd.SearchParams.verify|verify} messages.
         * @function encode
         * @memberof dd.SearchParams
         * @static
         * @param {dd.ISearchParams} message SearchParams message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SearchParams.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.ids != null && message.ids.length)
                for (var i = 0; i < message.ids.length; ++i)
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.ids[i]);
            if (message.limit != null && message.hasOwnProperty("limit"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.limit);
            if (message.offset != null && message.hasOwnProperty("offset"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.offset);
            return writer;
        };

        /**
         * Encodes the specified SearchParams message, length delimited. Does not implicitly {@link dd.SearchParams.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dd.SearchParams
         * @static
         * @param {dd.ISearchParams} message SearchParams message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SearchParams.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SearchParams message from the specified reader or buffer.
         * @function decode
         * @memberof dd.SearchParams
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dd.SearchParams} SearchParams
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SearchParams.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dd.SearchParams();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.ids && message.ids.length))
                        message.ids = [];
                    message.ids.push(reader.string());
                    break;
                case 2:
                    message.limit = reader.uint32();
                    break;
                case 3:
                    message.offset = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SearchParams message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dd.SearchParams
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dd.SearchParams} SearchParams
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SearchParams.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SearchParams message.
         * @function verify
         * @memberof dd.SearchParams
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SearchParams.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.ids != null && message.hasOwnProperty("ids")) {
                if (!Array.isArray(message.ids))
                    return "ids: array expected";
                for (var i = 0; i < message.ids.length; ++i)
                    if (!$util.isString(message.ids[i]))
                        return "ids: string[] expected";
            }
            if (message.limit != null && message.hasOwnProperty("limit"))
                if (!$util.isInteger(message.limit))
                    return "limit: integer expected";
            if (message.offset != null && message.hasOwnProperty("offset"))
                if (!$util.isInteger(message.offset))
                    return "offset: integer expected";
            return null;
        };

        /**
         * Creates a SearchParams message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof dd.SearchParams
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {dd.SearchParams} SearchParams
         */
        SearchParams.fromObject = function fromObject(object) {
            if (object instanceof $root.dd.SearchParams)
                return object;
            var message = new $root.dd.SearchParams();
            if (object.ids) {
                if (!Array.isArray(object.ids))
                    throw TypeError(".dd.SearchParams.ids: array expected");
                message.ids = [];
                for (var i = 0; i < object.ids.length; ++i)
                    message.ids[i] = String(object.ids[i]);
            }
            if (object.limit != null)
                message.limit = object.limit >>> 0;
            if (object.offset != null)
                message.offset = object.offset >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a SearchParams message. Also converts values to other types if specified.
         * @function toObject
         * @memberof dd.SearchParams
         * @static
         * @param {dd.SearchParams} message SearchParams
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SearchParams.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.ids = [];
            if (options.defaults) {
                object.limit = 0;
                object.offset = 0;
            }
            if (message.ids && message.ids.length) {
                object.ids = [];
                for (var j = 0; j < message.ids.length; ++j)
                    object.ids[j] = message.ids[j];
            }
            if (message.limit != null && message.hasOwnProperty("limit"))
                object.limit = message.limit;
            if (message.offset != null && message.hasOwnProperty("offset"))
                object.offset = message.offset;
            return object;
        };

        /**
         * Converts this SearchParams to JSON.
         * @function toJSON
         * @memberof dd.SearchParams
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SearchParams.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SearchParams;
    })();

    dd.AuthRequest = (function() {

        /**
         * Properties of an AuthRequest.
         * @memberof dd
         * @interface IAuthRequest
         * @property {string|null} [token] AuthRequest token
         */

        /**
         * Constructs a new AuthRequest.
         * @memberof dd
         * @classdesc Represents an AuthRequest.
         * @implements IAuthRequest
         * @constructor
         * @param {dd.IAuthRequest=} [properties] Properties to set
         */
        function AuthRequest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AuthRequest token.
         * @member {string} token
         * @memberof dd.AuthRequest
         * @instance
         */
        AuthRequest.prototype.token = "";

        /**
         * Creates a new AuthRequest instance using the specified properties.
         * @function create
         * @memberof dd.AuthRequest
         * @static
         * @param {dd.IAuthRequest=} [properties] Properties to set
         * @returns {dd.AuthRequest} AuthRequest instance
         */
        AuthRequest.create = function create(properties) {
            return new AuthRequest(properties);
        };

        /**
         * Encodes the specified AuthRequest message. Does not implicitly {@link dd.AuthRequest.verify|verify} messages.
         * @function encode
         * @memberof dd.AuthRequest
         * @static
         * @param {dd.IAuthRequest} message AuthRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AuthRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.token != null && message.hasOwnProperty("token"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.token);
            return writer;
        };

        /**
         * Encodes the specified AuthRequest message, length delimited. Does not implicitly {@link dd.AuthRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dd.AuthRequest
         * @static
         * @param {dd.IAuthRequest} message AuthRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AuthRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AuthRequest message from the specified reader or buffer.
         * @function decode
         * @memberof dd.AuthRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dd.AuthRequest} AuthRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AuthRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dd.AuthRequest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.token = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an AuthRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dd.AuthRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dd.AuthRequest} AuthRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AuthRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AuthRequest message.
         * @function verify
         * @memberof dd.AuthRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AuthRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.token != null && message.hasOwnProperty("token"))
                if (!$util.isString(message.token))
                    return "token: string expected";
            return null;
        };

        /**
         * Creates an AuthRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof dd.AuthRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {dd.AuthRequest} AuthRequest
         */
        AuthRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.dd.AuthRequest)
                return object;
            var message = new $root.dd.AuthRequest();
            if (object.token != null)
                message.token = String(object.token);
            return message;
        };

        /**
         * Creates a plain object from an AuthRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof dd.AuthRequest
         * @static
         * @param {dd.AuthRequest} message AuthRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AuthRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.token = "";
            if (message.token != null && message.hasOwnProperty("token"))
                object.token = message.token;
            return object;
        };

        /**
         * Converts this AuthRequest to JSON.
         * @function toJSON
         * @memberof dd.AuthRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AuthRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return AuthRequest;
    })();

    dd.AuthResponse = (function() {

        /**
         * Properties of an AuthResponse.
         * @memberof dd
         * @interface IAuthResponse
         * @property {dd.IUser|null} [user] AuthResponse user
         * @property {boolean|null} [reigstrationRequired] AuthResponse reigstrationRequired
         */

        /**
         * Constructs a new AuthResponse.
         * @memberof dd
         * @classdesc Represents an AuthResponse.
         * @implements IAuthResponse
         * @constructor
         * @param {dd.IAuthResponse=} [properties] Properties to set
         */
        function AuthResponse(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AuthResponse user.
         * @member {dd.IUser|null|undefined} user
         * @memberof dd.AuthResponse
         * @instance
         */
        AuthResponse.prototype.user = null;

        /**
         * AuthResponse reigstrationRequired.
         * @member {boolean} reigstrationRequired
         * @memberof dd.AuthResponse
         * @instance
         */
        AuthResponse.prototype.reigstrationRequired = false;

        /**
         * Creates a new AuthResponse instance using the specified properties.
         * @function create
         * @memberof dd.AuthResponse
         * @static
         * @param {dd.IAuthResponse=} [properties] Properties to set
         * @returns {dd.AuthResponse} AuthResponse instance
         */
        AuthResponse.create = function create(properties) {
            return new AuthResponse(properties);
        };

        /**
         * Encodes the specified AuthResponse message. Does not implicitly {@link dd.AuthResponse.verify|verify} messages.
         * @function encode
         * @memberof dd.AuthResponse
         * @static
         * @param {dd.IAuthResponse} message AuthResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AuthResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.user != null && message.hasOwnProperty("user"))
                $root.dd.User.encode(message.user, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.reigstrationRequired != null && message.hasOwnProperty("reigstrationRequired"))
                writer.uint32(/* id 2, wireType 0 =*/16).bool(message.reigstrationRequired);
            return writer;
        };

        /**
         * Encodes the specified AuthResponse message, length delimited. Does not implicitly {@link dd.AuthResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dd.AuthResponse
         * @static
         * @param {dd.IAuthResponse} message AuthResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AuthResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AuthResponse message from the specified reader or buffer.
         * @function decode
         * @memberof dd.AuthResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dd.AuthResponse} AuthResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AuthResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dd.AuthResponse();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.user = $root.dd.User.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.reigstrationRequired = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an AuthResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dd.AuthResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dd.AuthResponse} AuthResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AuthResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AuthResponse message.
         * @function verify
         * @memberof dd.AuthResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AuthResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.user != null && message.hasOwnProperty("user")) {
                var error = $root.dd.User.verify(message.user);
                if (error)
                    return "user." + error;
            }
            if (message.reigstrationRequired != null && message.hasOwnProperty("reigstrationRequired"))
                if (typeof message.reigstrationRequired !== "boolean")
                    return "reigstrationRequired: boolean expected";
            return null;
        };

        /**
         * Creates an AuthResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof dd.AuthResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {dd.AuthResponse} AuthResponse
         */
        AuthResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.dd.AuthResponse)
                return object;
            var message = new $root.dd.AuthResponse();
            if (object.user != null) {
                if (typeof object.user !== "object")
                    throw TypeError(".dd.AuthResponse.user: object expected");
                message.user = $root.dd.User.fromObject(object.user);
            }
            if (object.reigstrationRequired != null)
                message.reigstrationRequired = Boolean(object.reigstrationRequired);
            return message;
        };

        /**
         * Creates a plain object from an AuthResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof dd.AuthResponse
         * @static
         * @param {dd.AuthResponse} message AuthResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AuthResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.user = null;
                object.reigstrationRequired = false;
            }
            if (message.user != null && message.hasOwnProperty("user"))
                object.user = $root.dd.User.toObject(message.user, options);
            if (message.reigstrationRequired != null && message.hasOwnProperty("reigstrationRequired"))
                object.reigstrationRequired = message.reigstrationRequired;
            return object;
        };

        /**
         * Converts this AuthResponse to JSON.
         * @function toJSON
         * @memberof dd.AuthResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AuthResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return AuthResponse;
    })();

    dd.CreateUserRequest = (function() {

        /**
         * Properties of a CreateUserRequest.
         * @memberof dd
         * @interface ICreateUserRequest
         * @property {string|null} [token] CreateUserRequest token
         * @property {string|null} [username] CreateUserRequest username
         */

        /**
         * Constructs a new CreateUserRequest.
         * @memberof dd
         * @classdesc Represents a CreateUserRequest.
         * @implements ICreateUserRequest
         * @constructor
         * @param {dd.ICreateUserRequest=} [properties] Properties to set
         */
        function CreateUserRequest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CreateUserRequest token.
         * @member {string} token
         * @memberof dd.CreateUserRequest
         * @instance
         */
        CreateUserRequest.prototype.token = "";

        /**
         * CreateUserRequest username.
         * @member {string} username
         * @memberof dd.CreateUserRequest
         * @instance
         */
        CreateUserRequest.prototype.username = "";

        /**
         * Creates a new CreateUserRequest instance using the specified properties.
         * @function create
         * @memberof dd.CreateUserRequest
         * @static
         * @param {dd.ICreateUserRequest=} [properties] Properties to set
         * @returns {dd.CreateUserRequest} CreateUserRequest instance
         */
        CreateUserRequest.create = function create(properties) {
            return new CreateUserRequest(properties);
        };

        /**
         * Encodes the specified CreateUserRequest message. Does not implicitly {@link dd.CreateUserRequest.verify|verify} messages.
         * @function encode
         * @memberof dd.CreateUserRequest
         * @static
         * @param {dd.ICreateUserRequest} message CreateUserRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CreateUserRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.token != null && message.hasOwnProperty("token"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.token);
            if (message.username != null && message.hasOwnProperty("username"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.username);
            return writer;
        };

        /**
         * Encodes the specified CreateUserRequest message, length delimited. Does not implicitly {@link dd.CreateUserRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dd.CreateUserRequest
         * @static
         * @param {dd.ICreateUserRequest} message CreateUserRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CreateUserRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CreateUserRequest message from the specified reader or buffer.
         * @function decode
         * @memberof dd.CreateUserRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dd.CreateUserRequest} CreateUserRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CreateUserRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dd.CreateUserRequest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.token = reader.string();
                    break;
                case 2:
                    message.username = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CreateUserRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dd.CreateUserRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dd.CreateUserRequest} CreateUserRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CreateUserRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CreateUserRequest message.
         * @function verify
         * @memberof dd.CreateUserRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CreateUserRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.token != null && message.hasOwnProperty("token"))
                if (!$util.isString(message.token))
                    return "token: string expected";
            if (message.username != null && message.hasOwnProperty("username"))
                if (!$util.isString(message.username))
                    return "username: string expected";
            return null;
        };

        /**
         * Creates a CreateUserRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof dd.CreateUserRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {dd.CreateUserRequest} CreateUserRequest
         */
        CreateUserRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.dd.CreateUserRequest)
                return object;
            var message = new $root.dd.CreateUserRequest();
            if (object.token != null)
                message.token = String(object.token);
            if (object.username != null)
                message.username = String(object.username);
            return message;
        };

        /**
         * Creates a plain object from a CreateUserRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof dd.CreateUserRequest
         * @static
         * @param {dd.CreateUserRequest} message CreateUserRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CreateUserRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.token = "";
                object.username = "";
            }
            if (message.token != null && message.hasOwnProperty("token"))
                object.token = message.token;
            if (message.username != null && message.hasOwnProperty("username"))
                object.username = message.username;
            return object;
        };

        /**
         * Converts this CreateUserRequest to JSON.
         * @function toJSON
         * @memberof dd.CreateUserRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CreateUserRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CreateUserRequest;
    })();

    dd.GetCampaignsRequest = (function() {

        /**
         * Properties of a GetCampaignsRequest.
         * @memberof dd
         * @interface IGetCampaignsRequest
         * @property {dd.ISearchParams|null} [search] GetCampaignsRequest search
         */

        /**
         * Constructs a new GetCampaignsRequest.
         * @memberof dd
         * @classdesc Represents a GetCampaignsRequest.
         * @implements IGetCampaignsRequest
         * @constructor
         * @param {dd.IGetCampaignsRequest=} [properties] Properties to set
         */
        function GetCampaignsRequest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GetCampaignsRequest search.
         * @member {dd.ISearchParams|null|undefined} search
         * @memberof dd.GetCampaignsRequest
         * @instance
         */
        GetCampaignsRequest.prototype.search = null;

        /**
         * Creates a new GetCampaignsRequest instance using the specified properties.
         * @function create
         * @memberof dd.GetCampaignsRequest
         * @static
         * @param {dd.IGetCampaignsRequest=} [properties] Properties to set
         * @returns {dd.GetCampaignsRequest} GetCampaignsRequest instance
         */
        GetCampaignsRequest.create = function create(properties) {
            return new GetCampaignsRequest(properties);
        };

        /**
         * Encodes the specified GetCampaignsRequest message. Does not implicitly {@link dd.GetCampaignsRequest.verify|verify} messages.
         * @function encode
         * @memberof dd.GetCampaignsRequest
         * @static
         * @param {dd.IGetCampaignsRequest} message GetCampaignsRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetCampaignsRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.search != null && message.hasOwnProperty("search"))
                $root.dd.SearchParams.encode(message.search, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified GetCampaignsRequest message, length delimited. Does not implicitly {@link dd.GetCampaignsRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dd.GetCampaignsRequest
         * @static
         * @param {dd.IGetCampaignsRequest} message GetCampaignsRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetCampaignsRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GetCampaignsRequest message from the specified reader or buffer.
         * @function decode
         * @memberof dd.GetCampaignsRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dd.GetCampaignsRequest} GetCampaignsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetCampaignsRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dd.GetCampaignsRequest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.search = $root.dd.SearchParams.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GetCampaignsRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dd.GetCampaignsRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dd.GetCampaignsRequest} GetCampaignsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetCampaignsRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GetCampaignsRequest message.
         * @function verify
         * @memberof dd.GetCampaignsRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GetCampaignsRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.search != null && message.hasOwnProperty("search")) {
                var error = $root.dd.SearchParams.verify(message.search);
                if (error)
                    return "search." + error;
            }
            return null;
        };

        /**
         * Creates a GetCampaignsRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof dd.GetCampaignsRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {dd.GetCampaignsRequest} GetCampaignsRequest
         */
        GetCampaignsRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.dd.GetCampaignsRequest)
                return object;
            var message = new $root.dd.GetCampaignsRequest();
            if (object.search != null) {
                if (typeof object.search !== "object")
                    throw TypeError(".dd.GetCampaignsRequest.search: object expected");
                message.search = $root.dd.SearchParams.fromObject(object.search);
            }
            return message;
        };

        /**
         * Creates a plain object from a GetCampaignsRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof dd.GetCampaignsRequest
         * @static
         * @param {dd.GetCampaignsRequest} message GetCampaignsRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GetCampaignsRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.search = null;
            if (message.search != null && message.hasOwnProperty("search"))
                object.search = $root.dd.SearchParams.toObject(message.search, options);
            return object;
        };

        /**
         * Converts this GetCampaignsRequest to JSON.
         * @function toJSON
         * @memberof dd.GetCampaignsRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GetCampaignsRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GetCampaignsRequest;
    })();

    dd.GetCampaignsResponse = (function() {

        /**
         * Properties of a GetCampaignsResponse.
         * @memberof dd
         * @interface IGetCampaignsResponse
         * @property {Array.<dd.ICampaignCore>|null} [campaigns] GetCampaignsResponse campaigns
         * @property {number|null} [total] GetCampaignsResponse total
         */

        /**
         * Constructs a new GetCampaignsResponse.
         * @memberof dd
         * @classdesc Represents a GetCampaignsResponse.
         * @implements IGetCampaignsResponse
         * @constructor
         * @param {dd.IGetCampaignsResponse=} [properties] Properties to set
         */
        function GetCampaignsResponse(properties) {
            this.campaigns = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GetCampaignsResponse campaigns.
         * @member {Array.<dd.ICampaignCore>} campaigns
         * @memberof dd.GetCampaignsResponse
         * @instance
         */
        GetCampaignsResponse.prototype.campaigns = $util.emptyArray;

        /**
         * GetCampaignsResponse total.
         * @member {number} total
         * @memberof dd.GetCampaignsResponse
         * @instance
         */
        GetCampaignsResponse.prototype.total = 0;

        /**
         * Creates a new GetCampaignsResponse instance using the specified properties.
         * @function create
         * @memberof dd.GetCampaignsResponse
         * @static
         * @param {dd.IGetCampaignsResponse=} [properties] Properties to set
         * @returns {dd.GetCampaignsResponse} GetCampaignsResponse instance
         */
        GetCampaignsResponse.create = function create(properties) {
            return new GetCampaignsResponse(properties);
        };

        /**
         * Encodes the specified GetCampaignsResponse message. Does not implicitly {@link dd.GetCampaignsResponse.verify|verify} messages.
         * @function encode
         * @memberof dd.GetCampaignsResponse
         * @static
         * @param {dd.IGetCampaignsResponse} message GetCampaignsResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetCampaignsResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.campaigns != null && message.campaigns.length)
                for (var i = 0; i < message.campaigns.length; ++i)
                    $root.dd.CampaignCore.encode(message.campaigns[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.total != null && message.hasOwnProperty("total"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.total);
            return writer;
        };

        /**
         * Encodes the specified GetCampaignsResponse message, length delimited. Does not implicitly {@link dd.GetCampaignsResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dd.GetCampaignsResponse
         * @static
         * @param {dd.IGetCampaignsResponse} message GetCampaignsResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetCampaignsResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GetCampaignsResponse message from the specified reader or buffer.
         * @function decode
         * @memberof dd.GetCampaignsResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dd.GetCampaignsResponse} GetCampaignsResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetCampaignsResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dd.GetCampaignsResponse();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.campaigns && message.campaigns.length))
                        message.campaigns = [];
                    message.campaigns.push($root.dd.CampaignCore.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.total = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GetCampaignsResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dd.GetCampaignsResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dd.GetCampaignsResponse} GetCampaignsResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetCampaignsResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GetCampaignsResponse message.
         * @function verify
         * @memberof dd.GetCampaignsResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GetCampaignsResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.campaigns != null && message.hasOwnProperty("campaigns")) {
                if (!Array.isArray(message.campaigns))
                    return "campaigns: array expected";
                for (var i = 0; i < message.campaigns.length; ++i) {
                    var error = $root.dd.CampaignCore.verify(message.campaigns[i]);
                    if (error)
                        return "campaigns." + error;
                }
            }
            if (message.total != null && message.hasOwnProperty("total"))
                if (!$util.isInteger(message.total))
                    return "total: integer expected";
            return null;
        };

        /**
         * Creates a GetCampaignsResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof dd.GetCampaignsResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {dd.GetCampaignsResponse} GetCampaignsResponse
         */
        GetCampaignsResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.dd.GetCampaignsResponse)
                return object;
            var message = new $root.dd.GetCampaignsResponse();
            if (object.campaigns) {
                if (!Array.isArray(object.campaigns))
                    throw TypeError(".dd.GetCampaignsResponse.campaigns: array expected");
                message.campaigns = [];
                for (var i = 0; i < object.campaigns.length; ++i) {
                    if (typeof object.campaigns[i] !== "object")
                        throw TypeError(".dd.GetCampaignsResponse.campaigns: object expected");
                    message.campaigns[i] = $root.dd.CampaignCore.fromObject(object.campaigns[i]);
                }
            }
            if (object.total != null)
                message.total = object.total >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a GetCampaignsResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof dd.GetCampaignsResponse
         * @static
         * @param {dd.GetCampaignsResponse} message GetCampaignsResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GetCampaignsResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.campaigns = [];
            if (options.defaults)
                object.total = 0;
            if (message.campaigns && message.campaigns.length) {
                object.campaigns = [];
                for (var j = 0; j < message.campaigns.length; ++j)
                    object.campaigns[j] = $root.dd.CampaignCore.toObject(message.campaigns[j], options);
            }
            if (message.total != null && message.hasOwnProperty("total"))
                object.total = message.total;
            return object;
        };

        /**
         * Converts this GetCampaignsResponse to JSON.
         * @function toJSON
         * @memberof dd.GetCampaignsResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GetCampaignsResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GetCampaignsResponse;
    })();

    dd.CreateCampaignRequest = (function() {

        /**
         * Properties of a CreateCampaignRequest.
         * @memberof dd
         * @interface ICreateCampaignRequest
         */

        /**
         * Constructs a new CreateCampaignRequest.
         * @memberof dd
         * @classdesc Represents a CreateCampaignRequest.
         * @implements ICreateCampaignRequest
         * @constructor
         * @param {dd.ICreateCampaignRequest=} [properties] Properties to set
         */
        function CreateCampaignRequest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new CreateCampaignRequest instance using the specified properties.
         * @function create
         * @memberof dd.CreateCampaignRequest
         * @static
         * @param {dd.ICreateCampaignRequest=} [properties] Properties to set
         * @returns {dd.CreateCampaignRequest} CreateCampaignRequest instance
         */
        CreateCampaignRequest.create = function create(properties) {
            return new CreateCampaignRequest(properties);
        };

        /**
         * Encodes the specified CreateCampaignRequest message. Does not implicitly {@link dd.CreateCampaignRequest.verify|verify} messages.
         * @function encode
         * @memberof dd.CreateCampaignRequest
         * @static
         * @param {dd.ICreateCampaignRequest} message CreateCampaignRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CreateCampaignRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified CreateCampaignRequest message, length delimited. Does not implicitly {@link dd.CreateCampaignRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dd.CreateCampaignRequest
         * @static
         * @param {dd.ICreateCampaignRequest} message CreateCampaignRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CreateCampaignRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CreateCampaignRequest message from the specified reader or buffer.
         * @function decode
         * @memberof dd.CreateCampaignRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dd.CreateCampaignRequest} CreateCampaignRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CreateCampaignRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dd.CreateCampaignRequest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CreateCampaignRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dd.CreateCampaignRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dd.CreateCampaignRequest} CreateCampaignRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CreateCampaignRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CreateCampaignRequest message.
         * @function verify
         * @memberof dd.CreateCampaignRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CreateCampaignRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a CreateCampaignRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof dd.CreateCampaignRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {dd.CreateCampaignRequest} CreateCampaignRequest
         */
        CreateCampaignRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.dd.CreateCampaignRequest)
                return object;
            return new $root.dd.CreateCampaignRequest();
        };

        /**
         * Creates a plain object from a CreateCampaignRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof dd.CreateCampaignRequest
         * @static
         * @param {dd.CreateCampaignRequest} message CreateCampaignRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CreateCampaignRequest.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this CreateCampaignRequest to JSON.
         * @function toJSON
         * @memberof dd.CreateCampaignRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CreateCampaignRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CreateCampaignRequest;
    })();

    dd.CreateCampaignResponse = (function() {

        /**
         * Properties of a CreateCampaignResponse.
         * @memberof dd
         * @interface ICreateCampaignResponse
         * @property {string|null} [id] CreateCampaignResponse id
         */

        /**
         * Constructs a new CreateCampaignResponse.
         * @memberof dd
         * @classdesc Represents a CreateCampaignResponse.
         * @implements ICreateCampaignResponse
         * @constructor
         * @param {dd.ICreateCampaignResponse=} [properties] Properties to set
         */
        function CreateCampaignResponse(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CreateCampaignResponse id.
         * @member {string} id
         * @memberof dd.CreateCampaignResponse
         * @instance
         */
        CreateCampaignResponse.prototype.id = "";

        /**
         * Creates a new CreateCampaignResponse instance using the specified properties.
         * @function create
         * @memberof dd.CreateCampaignResponse
         * @static
         * @param {dd.ICreateCampaignResponse=} [properties] Properties to set
         * @returns {dd.CreateCampaignResponse} CreateCampaignResponse instance
         */
        CreateCampaignResponse.create = function create(properties) {
            return new CreateCampaignResponse(properties);
        };

        /**
         * Encodes the specified CreateCampaignResponse message. Does not implicitly {@link dd.CreateCampaignResponse.verify|verify} messages.
         * @function encode
         * @memberof dd.CreateCampaignResponse
         * @static
         * @param {dd.ICreateCampaignResponse} message CreateCampaignResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CreateCampaignResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && message.hasOwnProperty("id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            return writer;
        };

        /**
         * Encodes the specified CreateCampaignResponse message, length delimited. Does not implicitly {@link dd.CreateCampaignResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dd.CreateCampaignResponse
         * @static
         * @param {dd.ICreateCampaignResponse} message CreateCampaignResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CreateCampaignResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CreateCampaignResponse message from the specified reader or buffer.
         * @function decode
         * @memberof dd.CreateCampaignResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dd.CreateCampaignResponse} CreateCampaignResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CreateCampaignResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dd.CreateCampaignResponse();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CreateCampaignResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dd.CreateCampaignResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dd.CreateCampaignResponse} CreateCampaignResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CreateCampaignResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CreateCampaignResponse message.
         * @function verify
         * @memberof dd.CreateCampaignResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CreateCampaignResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            return null;
        };

        /**
         * Creates a CreateCampaignResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof dd.CreateCampaignResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {dd.CreateCampaignResponse} CreateCampaignResponse
         */
        CreateCampaignResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.dd.CreateCampaignResponse)
                return object;
            var message = new $root.dd.CreateCampaignResponse();
            if (object.id != null)
                message.id = String(object.id);
            return message;
        };

        /**
         * Creates a plain object from a CreateCampaignResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof dd.CreateCampaignResponse
         * @static
         * @param {dd.CreateCampaignResponse} message CreateCampaignResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CreateCampaignResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.id = "";
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            return object;
        };

        /**
         * Converts this CreateCampaignResponse to JSON.
         * @function toJSON
         * @memberof dd.CreateCampaignResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CreateCampaignResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CreateCampaignResponse;
    })();

    dd.EditCampaignRequest = (function() {

        /**
         * Properties of an EditCampaignRequest.
         * @memberof dd
         * @interface IEditCampaignRequest
         * @property {dd.ICampaignCore|null} [campaign] EditCampaignRequest campaign
         * @property {string|null} [id] EditCampaignRequest id
         */

        /**
         * Constructs a new EditCampaignRequest.
         * @memberof dd
         * @classdesc Represents an EditCampaignRequest.
         * @implements IEditCampaignRequest
         * @constructor
         * @param {dd.IEditCampaignRequest=} [properties] Properties to set
         */
        function EditCampaignRequest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * EditCampaignRequest campaign.
         * @member {dd.ICampaignCore|null|undefined} campaign
         * @memberof dd.EditCampaignRequest
         * @instance
         */
        EditCampaignRequest.prototype.campaign = null;

        /**
         * EditCampaignRequest id.
         * @member {string} id
         * @memberof dd.EditCampaignRequest
         * @instance
         */
        EditCampaignRequest.prototype.id = "";

        /**
         * Creates a new EditCampaignRequest instance using the specified properties.
         * @function create
         * @memberof dd.EditCampaignRequest
         * @static
         * @param {dd.IEditCampaignRequest=} [properties] Properties to set
         * @returns {dd.EditCampaignRequest} EditCampaignRequest instance
         */
        EditCampaignRequest.create = function create(properties) {
            return new EditCampaignRequest(properties);
        };

        /**
         * Encodes the specified EditCampaignRequest message. Does not implicitly {@link dd.EditCampaignRequest.verify|verify} messages.
         * @function encode
         * @memberof dd.EditCampaignRequest
         * @static
         * @param {dd.IEditCampaignRequest} message EditCampaignRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EditCampaignRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.campaign != null && message.hasOwnProperty("campaign"))
                $root.dd.CampaignCore.encode(message.campaign, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.id != null && message.hasOwnProperty("id"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.id);
            return writer;
        };

        /**
         * Encodes the specified EditCampaignRequest message, length delimited. Does not implicitly {@link dd.EditCampaignRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dd.EditCampaignRequest
         * @static
         * @param {dd.IEditCampaignRequest} message EditCampaignRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EditCampaignRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an EditCampaignRequest message from the specified reader or buffer.
         * @function decode
         * @memberof dd.EditCampaignRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dd.EditCampaignRequest} EditCampaignRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EditCampaignRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dd.EditCampaignRequest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.campaign = $root.dd.CampaignCore.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.id = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an EditCampaignRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dd.EditCampaignRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dd.EditCampaignRequest} EditCampaignRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EditCampaignRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an EditCampaignRequest message.
         * @function verify
         * @memberof dd.EditCampaignRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        EditCampaignRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.campaign != null && message.hasOwnProperty("campaign")) {
                var error = $root.dd.CampaignCore.verify(message.campaign);
                if (error)
                    return "campaign." + error;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            return null;
        };

        /**
         * Creates an EditCampaignRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof dd.EditCampaignRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {dd.EditCampaignRequest} EditCampaignRequest
         */
        EditCampaignRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.dd.EditCampaignRequest)
                return object;
            var message = new $root.dd.EditCampaignRequest();
            if (object.campaign != null) {
                if (typeof object.campaign !== "object")
                    throw TypeError(".dd.EditCampaignRequest.campaign: object expected");
                message.campaign = $root.dd.CampaignCore.fromObject(object.campaign);
            }
            if (object.id != null)
                message.id = String(object.id);
            return message;
        };

        /**
         * Creates a plain object from an EditCampaignRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof dd.EditCampaignRequest
         * @static
         * @param {dd.EditCampaignRequest} message EditCampaignRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EditCampaignRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.campaign = null;
                object.id = "";
            }
            if (message.campaign != null && message.hasOwnProperty("campaign"))
                object.campaign = $root.dd.CampaignCore.toObject(message.campaign, options);
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            return object;
        };

        /**
         * Converts this EditCampaignRequest to JSON.
         * @function toJSON
         * @memberof dd.EditCampaignRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EditCampaignRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return EditCampaignRequest;
    })();

    dd.GetQuestsRequest = (function() {

        /**
         * Properties of a GetQuestsRequest.
         * @memberof dd
         * @interface IGetQuestsRequest
         * @property {dd.ISearchParams|null} [search] GetQuestsRequest search
         */

        /**
         * Constructs a new GetQuestsRequest.
         * @memberof dd
         * @classdesc Represents a GetQuestsRequest.
         * @implements IGetQuestsRequest
         * @constructor
         * @param {dd.IGetQuestsRequest=} [properties] Properties to set
         */
        function GetQuestsRequest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GetQuestsRequest search.
         * @member {dd.ISearchParams|null|undefined} search
         * @memberof dd.GetQuestsRequest
         * @instance
         */
        GetQuestsRequest.prototype.search = null;

        /**
         * Creates a new GetQuestsRequest instance using the specified properties.
         * @function create
         * @memberof dd.GetQuestsRequest
         * @static
         * @param {dd.IGetQuestsRequest=} [properties] Properties to set
         * @returns {dd.GetQuestsRequest} GetQuestsRequest instance
         */
        GetQuestsRequest.create = function create(properties) {
            return new GetQuestsRequest(properties);
        };

        /**
         * Encodes the specified GetQuestsRequest message. Does not implicitly {@link dd.GetQuestsRequest.verify|verify} messages.
         * @function encode
         * @memberof dd.GetQuestsRequest
         * @static
         * @param {dd.IGetQuestsRequest} message GetQuestsRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetQuestsRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.search != null && message.hasOwnProperty("search"))
                $root.dd.SearchParams.encode(message.search, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified GetQuestsRequest message, length delimited. Does not implicitly {@link dd.GetQuestsRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dd.GetQuestsRequest
         * @static
         * @param {dd.IGetQuestsRequest} message GetQuestsRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetQuestsRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GetQuestsRequest message from the specified reader or buffer.
         * @function decode
         * @memberof dd.GetQuestsRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dd.GetQuestsRequest} GetQuestsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetQuestsRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dd.GetQuestsRequest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.search = $root.dd.SearchParams.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GetQuestsRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dd.GetQuestsRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dd.GetQuestsRequest} GetQuestsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetQuestsRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GetQuestsRequest message.
         * @function verify
         * @memberof dd.GetQuestsRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GetQuestsRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.search != null && message.hasOwnProperty("search")) {
                var error = $root.dd.SearchParams.verify(message.search);
                if (error)
                    return "search." + error;
            }
            return null;
        };

        /**
         * Creates a GetQuestsRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof dd.GetQuestsRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {dd.GetQuestsRequest} GetQuestsRequest
         */
        GetQuestsRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.dd.GetQuestsRequest)
                return object;
            var message = new $root.dd.GetQuestsRequest();
            if (object.search != null) {
                if (typeof object.search !== "object")
                    throw TypeError(".dd.GetQuestsRequest.search: object expected");
                message.search = $root.dd.SearchParams.fromObject(object.search);
            }
            return message;
        };

        /**
         * Creates a plain object from a GetQuestsRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof dd.GetQuestsRequest
         * @static
         * @param {dd.GetQuestsRequest} message GetQuestsRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GetQuestsRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.search = null;
            if (message.search != null && message.hasOwnProperty("search"))
                object.search = $root.dd.SearchParams.toObject(message.search, options);
            return object;
        };

        /**
         * Converts this GetQuestsRequest to JSON.
         * @function toJSON
         * @memberof dd.GetQuestsRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GetQuestsRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GetQuestsRequest;
    })();

    dd.GetQuestsResponse = (function() {

        /**
         * Properties of a GetQuestsResponse.
         * @memberof dd
         * @interface IGetQuestsResponse
         * @property {Array.<dd.IQuest>|null} [quests] GetQuestsResponse quests
         * @property {number|null} [total] GetQuestsResponse total
         */

        /**
         * Constructs a new GetQuestsResponse.
         * @memberof dd
         * @classdesc Represents a GetQuestsResponse.
         * @implements IGetQuestsResponse
         * @constructor
         * @param {dd.IGetQuestsResponse=} [properties] Properties to set
         */
        function GetQuestsResponse(properties) {
            this.quests = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GetQuestsResponse quests.
         * @member {Array.<dd.IQuest>} quests
         * @memberof dd.GetQuestsResponse
         * @instance
         */
        GetQuestsResponse.prototype.quests = $util.emptyArray;

        /**
         * GetQuestsResponse total.
         * @member {number} total
         * @memberof dd.GetQuestsResponse
         * @instance
         */
        GetQuestsResponse.prototype.total = 0;

        /**
         * Creates a new GetQuestsResponse instance using the specified properties.
         * @function create
         * @memberof dd.GetQuestsResponse
         * @static
         * @param {dd.IGetQuestsResponse=} [properties] Properties to set
         * @returns {dd.GetQuestsResponse} GetQuestsResponse instance
         */
        GetQuestsResponse.create = function create(properties) {
            return new GetQuestsResponse(properties);
        };

        /**
         * Encodes the specified GetQuestsResponse message. Does not implicitly {@link dd.GetQuestsResponse.verify|verify} messages.
         * @function encode
         * @memberof dd.GetQuestsResponse
         * @static
         * @param {dd.IGetQuestsResponse} message GetQuestsResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetQuestsResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.quests != null && message.quests.length)
                for (var i = 0; i < message.quests.length; ++i)
                    $root.dd.Quest.encode(message.quests[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.total != null && message.hasOwnProperty("total"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.total);
            return writer;
        };

        /**
         * Encodes the specified GetQuestsResponse message, length delimited. Does not implicitly {@link dd.GetQuestsResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dd.GetQuestsResponse
         * @static
         * @param {dd.IGetQuestsResponse} message GetQuestsResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetQuestsResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GetQuestsResponse message from the specified reader or buffer.
         * @function decode
         * @memberof dd.GetQuestsResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dd.GetQuestsResponse} GetQuestsResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetQuestsResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dd.GetQuestsResponse();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.quests && message.quests.length))
                        message.quests = [];
                    message.quests.push($root.dd.Quest.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.total = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GetQuestsResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dd.GetQuestsResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dd.GetQuestsResponse} GetQuestsResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetQuestsResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GetQuestsResponse message.
         * @function verify
         * @memberof dd.GetQuestsResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GetQuestsResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.quests != null && message.hasOwnProperty("quests")) {
                if (!Array.isArray(message.quests))
                    return "quests: array expected";
                for (var i = 0; i < message.quests.length; ++i) {
                    var error = $root.dd.Quest.verify(message.quests[i]);
                    if (error)
                        return "quests." + error;
                }
            }
            if (message.total != null && message.hasOwnProperty("total"))
                if (!$util.isInteger(message.total))
                    return "total: integer expected";
            return null;
        };

        /**
         * Creates a GetQuestsResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof dd.GetQuestsResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {dd.GetQuestsResponse} GetQuestsResponse
         */
        GetQuestsResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.dd.GetQuestsResponse)
                return object;
            var message = new $root.dd.GetQuestsResponse();
            if (object.quests) {
                if (!Array.isArray(object.quests))
                    throw TypeError(".dd.GetQuestsResponse.quests: array expected");
                message.quests = [];
                for (var i = 0; i < object.quests.length; ++i) {
                    if (typeof object.quests[i] !== "object")
                        throw TypeError(".dd.GetQuestsResponse.quests: object expected");
                    message.quests[i] = $root.dd.Quest.fromObject(object.quests[i]);
                }
            }
            if (object.total != null)
                message.total = object.total >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a GetQuestsResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof dd.GetQuestsResponse
         * @static
         * @param {dd.GetQuestsResponse} message GetQuestsResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GetQuestsResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.quests = [];
            if (options.defaults)
                object.total = 0;
            if (message.quests && message.quests.length) {
                object.quests = [];
                for (var j = 0; j < message.quests.length; ++j)
                    object.quests[j] = $root.dd.Quest.toObject(message.quests[j], options);
            }
            if (message.total != null && message.hasOwnProperty("total"))
                object.total = message.total;
            return object;
        };

        /**
         * Converts this GetQuestsResponse to JSON.
         * @function toJSON
         * @memberof dd.GetQuestsResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GetQuestsResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GetQuestsResponse;
    })();

    dd.CreateQuestRequest = (function() {

        /**
         * Properties of a CreateQuestRequest.
         * @memberof dd
         * @interface ICreateQuestRequest
         */

        /**
         * Constructs a new CreateQuestRequest.
         * @memberof dd
         * @classdesc Represents a CreateQuestRequest.
         * @implements ICreateQuestRequest
         * @constructor
         * @param {dd.ICreateQuestRequest=} [properties] Properties to set
         */
        function CreateQuestRequest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new CreateQuestRequest instance using the specified properties.
         * @function create
         * @memberof dd.CreateQuestRequest
         * @static
         * @param {dd.ICreateQuestRequest=} [properties] Properties to set
         * @returns {dd.CreateQuestRequest} CreateQuestRequest instance
         */
        CreateQuestRequest.create = function create(properties) {
            return new CreateQuestRequest(properties);
        };

        /**
         * Encodes the specified CreateQuestRequest message. Does not implicitly {@link dd.CreateQuestRequest.verify|verify} messages.
         * @function encode
         * @memberof dd.CreateQuestRequest
         * @static
         * @param {dd.ICreateQuestRequest} message CreateQuestRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CreateQuestRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified CreateQuestRequest message, length delimited. Does not implicitly {@link dd.CreateQuestRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dd.CreateQuestRequest
         * @static
         * @param {dd.ICreateQuestRequest} message CreateQuestRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CreateQuestRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CreateQuestRequest message from the specified reader or buffer.
         * @function decode
         * @memberof dd.CreateQuestRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dd.CreateQuestRequest} CreateQuestRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CreateQuestRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dd.CreateQuestRequest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CreateQuestRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dd.CreateQuestRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dd.CreateQuestRequest} CreateQuestRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CreateQuestRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CreateQuestRequest message.
         * @function verify
         * @memberof dd.CreateQuestRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CreateQuestRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a CreateQuestRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof dd.CreateQuestRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {dd.CreateQuestRequest} CreateQuestRequest
         */
        CreateQuestRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.dd.CreateQuestRequest)
                return object;
            return new $root.dd.CreateQuestRequest();
        };

        /**
         * Creates a plain object from a CreateQuestRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof dd.CreateQuestRequest
         * @static
         * @param {dd.CreateQuestRequest} message CreateQuestRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CreateQuestRequest.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this CreateQuestRequest to JSON.
         * @function toJSON
         * @memberof dd.CreateQuestRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CreateQuestRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CreateQuestRequest;
    })();

    dd.CreateQuestResponse = (function() {

        /**
         * Properties of a CreateQuestResponse.
         * @memberof dd
         * @interface ICreateQuestResponse
         * @property {string|null} [id] CreateQuestResponse id
         */

        /**
         * Constructs a new CreateQuestResponse.
         * @memberof dd
         * @classdesc Represents a CreateQuestResponse.
         * @implements ICreateQuestResponse
         * @constructor
         * @param {dd.ICreateQuestResponse=} [properties] Properties to set
         */
        function CreateQuestResponse(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CreateQuestResponse id.
         * @member {string} id
         * @memberof dd.CreateQuestResponse
         * @instance
         */
        CreateQuestResponse.prototype.id = "";

        /**
         * Creates a new CreateQuestResponse instance using the specified properties.
         * @function create
         * @memberof dd.CreateQuestResponse
         * @static
         * @param {dd.ICreateQuestResponse=} [properties] Properties to set
         * @returns {dd.CreateQuestResponse} CreateQuestResponse instance
         */
        CreateQuestResponse.create = function create(properties) {
            return new CreateQuestResponse(properties);
        };

        /**
         * Encodes the specified CreateQuestResponse message. Does not implicitly {@link dd.CreateQuestResponse.verify|verify} messages.
         * @function encode
         * @memberof dd.CreateQuestResponse
         * @static
         * @param {dd.ICreateQuestResponse} message CreateQuestResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CreateQuestResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && message.hasOwnProperty("id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            return writer;
        };

        /**
         * Encodes the specified CreateQuestResponse message, length delimited. Does not implicitly {@link dd.CreateQuestResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dd.CreateQuestResponse
         * @static
         * @param {dd.ICreateQuestResponse} message CreateQuestResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CreateQuestResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CreateQuestResponse message from the specified reader or buffer.
         * @function decode
         * @memberof dd.CreateQuestResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dd.CreateQuestResponse} CreateQuestResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CreateQuestResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dd.CreateQuestResponse();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CreateQuestResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dd.CreateQuestResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dd.CreateQuestResponse} CreateQuestResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CreateQuestResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CreateQuestResponse message.
         * @function verify
         * @memberof dd.CreateQuestResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CreateQuestResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            return null;
        };

        /**
         * Creates a CreateQuestResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof dd.CreateQuestResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {dd.CreateQuestResponse} CreateQuestResponse
         */
        CreateQuestResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.dd.CreateQuestResponse)
                return object;
            var message = new $root.dd.CreateQuestResponse();
            if (object.id != null)
                message.id = String(object.id);
            return message;
        };

        /**
         * Creates a plain object from a CreateQuestResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof dd.CreateQuestResponse
         * @static
         * @param {dd.CreateQuestResponse} message CreateQuestResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CreateQuestResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.id = "";
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            return object;
        };

        /**
         * Converts this CreateQuestResponse to JSON.
         * @function toJSON
         * @memberof dd.CreateQuestResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CreateQuestResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CreateQuestResponse;
    })();

    dd.EditQuestRequest = (function() {

        /**
         * Properties of an EditQuestRequest.
         * @memberof dd
         * @interface IEditQuestRequest
         * @property {string|null} [id] EditQuestRequest id
         * @property {dd.IQuest|null} [quest] EditQuestRequest quest
         */

        /**
         * Constructs a new EditQuestRequest.
         * @memberof dd
         * @classdesc Represents an EditQuestRequest.
         * @implements IEditQuestRequest
         * @constructor
         * @param {dd.IEditQuestRequest=} [properties] Properties to set
         */
        function EditQuestRequest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * EditQuestRequest id.
         * @member {string} id
         * @memberof dd.EditQuestRequest
         * @instance
         */
        EditQuestRequest.prototype.id = "";

        /**
         * EditQuestRequest quest.
         * @member {dd.IQuest|null|undefined} quest
         * @memberof dd.EditQuestRequest
         * @instance
         */
        EditQuestRequest.prototype.quest = null;

        /**
         * Creates a new EditQuestRequest instance using the specified properties.
         * @function create
         * @memberof dd.EditQuestRequest
         * @static
         * @param {dd.IEditQuestRequest=} [properties] Properties to set
         * @returns {dd.EditQuestRequest} EditQuestRequest instance
         */
        EditQuestRequest.create = function create(properties) {
            return new EditQuestRequest(properties);
        };

        /**
         * Encodes the specified EditQuestRequest message. Does not implicitly {@link dd.EditQuestRequest.verify|verify} messages.
         * @function encode
         * @memberof dd.EditQuestRequest
         * @static
         * @param {dd.IEditQuestRequest} message EditQuestRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EditQuestRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && message.hasOwnProperty("id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.quest != null && message.hasOwnProperty("quest"))
                $root.dd.Quest.encode(message.quest, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified EditQuestRequest message, length delimited. Does not implicitly {@link dd.EditQuestRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dd.EditQuestRequest
         * @static
         * @param {dd.IEditQuestRequest} message EditQuestRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EditQuestRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an EditQuestRequest message from the specified reader or buffer.
         * @function decode
         * @memberof dd.EditQuestRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dd.EditQuestRequest} EditQuestRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EditQuestRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dd.EditQuestRequest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.quest = $root.dd.Quest.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an EditQuestRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dd.EditQuestRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dd.EditQuestRequest} EditQuestRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EditQuestRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an EditQuestRequest message.
         * @function verify
         * @memberof dd.EditQuestRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        EditQuestRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.quest != null && message.hasOwnProperty("quest")) {
                var error = $root.dd.Quest.verify(message.quest);
                if (error)
                    return "quest." + error;
            }
            return null;
        };

        /**
         * Creates an EditQuestRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof dd.EditQuestRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {dd.EditQuestRequest} EditQuestRequest
         */
        EditQuestRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.dd.EditQuestRequest)
                return object;
            var message = new $root.dd.EditQuestRequest();
            if (object.id != null)
                message.id = String(object.id);
            if (object.quest != null) {
                if (typeof object.quest !== "object")
                    throw TypeError(".dd.EditQuestRequest.quest: object expected");
                message.quest = $root.dd.Quest.fromObject(object.quest);
            }
            return message;
        };

        /**
         * Creates a plain object from an EditQuestRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof dd.EditQuestRequest
         * @static
         * @param {dd.EditQuestRequest} message EditQuestRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EditQuestRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.id = "";
                object.quest = null;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.quest != null && message.hasOwnProperty("quest"))
                object.quest = $root.dd.Quest.toObject(message.quest, options);
            return object;
        };

        /**
         * Converts this EditQuestRequest to JSON.
         * @function toJSON
         * @memberof dd.EditQuestRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EditQuestRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return EditQuestRequest;
    })();

    dd.Quest = (function() {

        /**
         * Properties of a Quest.
         * @memberof dd
         * @interface IQuest
         * @property {string|null} [id] Quest id
         * @property {string|null} [name] Quest name
         * @property {string|null} [description] Quest description
         */

        /**
         * Constructs a new Quest.
         * @memberof dd
         * @classdesc Represents a Quest.
         * @implements IQuest
         * @constructor
         * @param {dd.IQuest=} [properties] Properties to set
         */
        function Quest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Quest id.
         * @member {string} id
         * @memberof dd.Quest
         * @instance
         */
        Quest.prototype.id = "";

        /**
         * Quest name.
         * @member {string} name
         * @memberof dd.Quest
         * @instance
         */
        Quest.prototype.name = "";

        /**
         * Quest description.
         * @member {string} description
         * @memberof dd.Quest
         * @instance
         */
        Quest.prototype.description = "";

        /**
         * Creates a new Quest instance using the specified properties.
         * @function create
         * @memberof dd.Quest
         * @static
         * @param {dd.IQuest=} [properties] Properties to set
         * @returns {dd.Quest} Quest instance
         */
        Quest.create = function create(properties) {
            return new Quest(properties);
        };

        /**
         * Encodes the specified Quest message. Does not implicitly {@link dd.Quest.verify|verify} messages.
         * @function encode
         * @memberof dd.Quest
         * @static
         * @param {dd.IQuest} message Quest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Quest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && message.hasOwnProperty("id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.name != null && message.hasOwnProperty("name"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
            if (message.description != null && message.hasOwnProperty("description"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.description);
            return writer;
        };

        /**
         * Encodes the specified Quest message, length delimited. Does not implicitly {@link dd.Quest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dd.Quest
         * @static
         * @param {dd.IQuest} message Quest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Quest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Quest message from the specified reader or buffer.
         * @function decode
         * @memberof dd.Quest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dd.Quest} Quest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Quest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dd.Quest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.name = reader.string();
                    break;
                case 3:
                    message.description = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Quest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dd.Quest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dd.Quest} Quest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Quest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Quest message.
         * @function verify
         * @memberof dd.Quest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Quest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.description != null && message.hasOwnProperty("description"))
                if (!$util.isString(message.description))
                    return "description: string expected";
            return null;
        };

        /**
         * Creates a Quest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof dd.Quest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {dd.Quest} Quest
         */
        Quest.fromObject = function fromObject(object) {
            if (object instanceof $root.dd.Quest)
                return object;
            var message = new $root.dd.Quest();
            if (object.id != null)
                message.id = String(object.id);
            if (object.name != null)
                message.name = String(object.name);
            if (object.description != null)
                message.description = String(object.description);
            return message;
        };

        /**
         * Creates a plain object from a Quest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof dd.Quest
         * @static
         * @param {dd.Quest} message Quest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Quest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.id = "";
                object.name = "";
                object.description = "";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.description != null && message.hasOwnProperty("description"))
                object.description = message.description;
            return object;
        };

        /**
         * Converts this Quest to JSON.
         * @function toJSON
         * @memberof dd.Quest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Quest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Quest;
    })();

    dd.User = (function() {

        /**
         * Properties of a User.
         * @memberof dd
         * @interface IUser
         * @property {string|null} [id] User id
         * @property {string|null} [name] User name
         * @property {string|null} [imageURL] User imageURL
         * @property {number|Long|null} [createdAt] User createdAt
         */

        /**
         * Constructs a new User.
         * @memberof dd
         * @classdesc Represents a User.
         * @implements IUser
         * @constructor
         * @param {dd.IUser=} [properties] Properties to set
         */
        function User(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * User id.
         * @member {string} id
         * @memberof dd.User
         * @instance
         */
        User.prototype.id = "";

        /**
         * User name.
         * @member {string} name
         * @memberof dd.User
         * @instance
         */
        User.prototype.name = "";

        /**
         * User imageURL.
         * @member {string} imageURL
         * @memberof dd.User
         * @instance
         */
        User.prototype.imageURL = "";

        /**
         * User createdAt.
         * @member {number|Long} createdAt
         * @memberof dd.User
         * @instance
         */
        User.prototype.createdAt = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Creates a new User instance using the specified properties.
         * @function create
         * @memberof dd.User
         * @static
         * @param {dd.IUser=} [properties] Properties to set
         * @returns {dd.User} User instance
         */
        User.create = function create(properties) {
            return new User(properties);
        };

        /**
         * Encodes the specified User message. Does not implicitly {@link dd.User.verify|verify} messages.
         * @function encode
         * @memberof dd.User
         * @static
         * @param {dd.IUser} message User message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        User.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && message.hasOwnProperty("id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.name != null && message.hasOwnProperty("name"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
            if (message.imageURL != null && message.hasOwnProperty("imageURL"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.imageURL);
            if (message.createdAt != null && message.hasOwnProperty("createdAt"))
                writer.uint32(/* id 4, wireType 0 =*/32).uint64(message.createdAt);
            return writer;
        };

        /**
         * Encodes the specified User message, length delimited. Does not implicitly {@link dd.User.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dd.User
         * @static
         * @param {dd.IUser} message User message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        User.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a User message from the specified reader or buffer.
         * @function decode
         * @memberof dd.User
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dd.User} User
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        User.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dd.User();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.name = reader.string();
                    break;
                case 3:
                    message.imageURL = reader.string();
                    break;
                case 4:
                    message.createdAt = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a User message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dd.User
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dd.User} User
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        User.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a User message.
         * @function verify
         * @memberof dd.User
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        User.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.imageURL != null && message.hasOwnProperty("imageURL"))
                if (!$util.isString(message.imageURL))
                    return "imageURL: string expected";
            if (message.createdAt != null && message.hasOwnProperty("createdAt"))
                if (!$util.isInteger(message.createdAt) && !(message.createdAt && $util.isInteger(message.createdAt.low) && $util.isInteger(message.createdAt.high)))
                    return "createdAt: integer|Long expected";
            return null;
        };

        /**
         * Creates a User message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof dd.User
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {dd.User} User
         */
        User.fromObject = function fromObject(object) {
            if (object instanceof $root.dd.User)
                return object;
            var message = new $root.dd.User();
            if (object.id != null)
                message.id = String(object.id);
            if (object.name != null)
                message.name = String(object.name);
            if (object.imageURL != null)
                message.imageURL = String(object.imageURL);
            if (object.createdAt != null)
                if ($util.Long)
                    (message.createdAt = $util.Long.fromValue(object.createdAt)).unsigned = true;
                else if (typeof object.createdAt === "string")
                    message.createdAt = parseInt(object.createdAt, 10);
                else if (typeof object.createdAt === "number")
                    message.createdAt = object.createdAt;
                else if (typeof object.createdAt === "object")
                    message.createdAt = new $util.LongBits(object.createdAt.low >>> 0, object.createdAt.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from a User message. Also converts values to other types if specified.
         * @function toObject
         * @memberof dd.User
         * @static
         * @param {dd.User} message User
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        User.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.id = "";
                object.name = "";
                object.imageURL = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.createdAt = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.createdAt = options.longs === String ? "0" : 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.imageURL != null && message.hasOwnProperty("imageURL"))
                object.imageURL = message.imageURL;
            if (message.createdAt != null && message.hasOwnProperty("createdAt"))
                if (typeof message.createdAt === "number")
                    object.createdAt = options.longs === String ? String(message.createdAt) : message.createdAt;
                else
                    object.createdAt = options.longs === String ? $util.Long.prototype.toString.call(message.createdAt) : options.longs === Number ? new $util.LongBits(message.createdAt.low >>> 0, message.createdAt.high >>> 0).toNumber(true) : message.createdAt;
            return object;
        };

        /**
         * Converts this User to JSON.
         * @function toJSON
         * @memberof dd.User
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        User.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return User;
    })();

    dd.CampaignCore = (function() {

        /**
         * Properties of a CampaignCore.
         * @memberof dd
         * @interface ICampaignCore
         * @property {string|null} [id] CampaignCore id
         * @property {string|null} [name] CampaignCore name
         * @property {string|null} [description] CampaignCore description
         * @property {string|null} [imageId] CampaignCore imageId
         * @property {Array.<number|Long>|null} [experienceTable] CampaignCore experienceTable
         */

        /**
         * Constructs a new CampaignCore.
         * @memberof dd
         * @classdesc Represents a CampaignCore.
         * @implements ICampaignCore
         * @constructor
         * @param {dd.ICampaignCore=} [properties] Properties to set
         */
        function CampaignCore(properties) {
            this.experienceTable = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CampaignCore id.
         * @member {string} id
         * @memberof dd.CampaignCore
         * @instance
         */
        CampaignCore.prototype.id = "";

        /**
         * CampaignCore name.
         * @member {string} name
         * @memberof dd.CampaignCore
         * @instance
         */
        CampaignCore.prototype.name = "";

        /**
         * CampaignCore description.
         * @member {string} description
         * @memberof dd.CampaignCore
         * @instance
         */
        CampaignCore.prototype.description = "";

        /**
         * CampaignCore imageId.
         * @member {string} imageId
         * @memberof dd.CampaignCore
         * @instance
         */
        CampaignCore.prototype.imageId = "";

        /**
         * CampaignCore experienceTable.
         * @member {Array.<number|Long>} experienceTable
         * @memberof dd.CampaignCore
         * @instance
         */
        CampaignCore.prototype.experienceTable = $util.emptyArray;

        /**
         * Creates a new CampaignCore instance using the specified properties.
         * @function create
         * @memberof dd.CampaignCore
         * @static
         * @param {dd.ICampaignCore=} [properties] Properties to set
         * @returns {dd.CampaignCore} CampaignCore instance
         */
        CampaignCore.create = function create(properties) {
            return new CampaignCore(properties);
        };

        /**
         * Encodes the specified CampaignCore message. Does not implicitly {@link dd.CampaignCore.verify|verify} messages.
         * @function encode
         * @memberof dd.CampaignCore
         * @static
         * @param {dd.ICampaignCore} message CampaignCore message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CampaignCore.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && message.hasOwnProperty("id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.name != null && message.hasOwnProperty("name"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
            if (message.description != null && message.hasOwnProperty("description"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.description);
            if (message.imageId != null && message.hasOwnProperty("imageId"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.imageId);
            if (message.experienceTable != null && message.experienceTable.length) {
                writer.uint32(/* id 10, wireType 2 =*/82).fork();
                for (var i = 0; i < message.experienceTable.length; ++i)
                    writer.uint64(message.experienceTable[i]);
                writer.ldelim();
            }
            return writer;
        };

        /**
         * Encodes the specified CampaignCore message, length delimited. Does not implicitly {@link dd.CampaignCore.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dd.CampaignCore
         * @static
         * @param {dd.ICampaignCore} message CampaignCore message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CampaignCore.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CampaignCore message from the specified reader or buffer.
         * @function decode
         * @memberof dd.CampaignCore
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dd.CampaignCore} CampaignCore
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CampaignCore.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dd.CampaignCore();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.name = reader.string();
                    break;
                case 3:
                    message.description = reader.string();
                    break;
                case 4:
                    message.imageId = reader.string();
                    break;
                case 10:
                    if (!(message.experienceTable && message.experienceTable.length))
                        message.experienceTable = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.experienceTable.push(reader.uint64());
                    } else
                        message.experienceTable.push(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CampaignCore message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dd.CampaignCore
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dd.CampaignCore} CampaignCore
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CampaignCore.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CampaignCore message.
         * @function verify
         * @memberof dd.CampaignCore
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CampaignCore.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.description != null && message.hasOwnProperty("description"))
                if (!$util.isString(message.description))
                    return "description: string expected";
            if (message.imageId != null && message.hasOwnProperty("imageId"))
                if (!$util.isString(message.imageId))
                    return "imageId: string expected";
            if (message.experienceTable != null && message.hasOwnProperty("experienceTable")) {
                if (!Array.isArray(message.experienceTable))
                    return "experienceTable: array expected";
                for (var i = 0; i < message.experienceTable.length; ++i)
                    if (!$util.isInteger(message.experienceTable[i]) && !(message.experienceTable[i] && $util.isInteger(message.experienceTable[i].low) && $util.isInteger(message.experienceTable[i].high)))
                        return "experienceTable: integer|Long[] expected";
            }
            return null;
        };

        /**
         * Creates a CampaignCore message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof dd.CampaignCore
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {dd.CampaignCore} CampaignCore
         */
        CampaignCore.fromObject = function fromObject(object) {
            if (object instanceof $root.dd.CampaignCore)
                return object;
            var message = new $root.dd.CampaignCore();
            if (object.id != null)
                message.id = String(object.id);
            if (object.name != null)
                message.name = String(object.name);
            if (object.description != null)
                message.description = String(object.description);
            if (object.imageId != null)
                message.imageId = String(object.imageId);
            if (object.experienceTable) {
                if (!Array.isArray(object.experienceTable))
                    throw TypeError(".dd.CampaignCore.experienceTable: array expected");
                message.experienceTable = [];
                for (var i = 0; i < object.experienceTable.length; ++i)
                    if ($util.Long)
                        (message.experienceTable[i] = $util.Long.fromValue(object.experienceTable[i])).unsigned = true;
                    else if (typeof object.experienceTable[i] === "string")
                        message.experienceTable[i] = parseInt(object.experienceTable[i], 10);
                    else if (typeof object.experienceTable[i] === "number")
                        message.experienceTable[i] = object.experienceTable[i];
                    else if (typeof object.experienceTable[i] === "object")
                        message.experienceTable[i] = new $util.LongBits(object.experienceTable[i].low >>> 0, object.experienceTable[i].high >>> 0).toNumber(true);
            }
            return message;
        };

        /**
         * Creates a plain object from a CampaignCore message. Also converts values to other types if specified.
         * @function toObject
         * @memberof dd.CampaignCore
         * @static
         * @param {dd.CampaignCore} message CampaignCore
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CampaignCore.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.experienceTable = [];
            if (options.defaults) {
                object.id = "";
                object.name = "";
                object.description = "";
                object.imageId = "";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.description != null && message.hasOwnProperty("description"))
                object.description = message.description;
            if (message.imageId != null && message.hasOwnProperty("imageId"))
                object.imageId = message.imageId;
            if (message.experienceTable && message.experienceTable.length) {
                object.experienceTable = [];
                for (var j = 0; j < message.experienceTable.length; ++j)
                    if (typeof message.experienceTable[j] === "number")
                        object.experienceTable[j] = options.longs === String ? String(message.experienceTable[j]) : message.experienceTable[j];
                    else
                        object.experienceTable[j] = options.longs === String ? $util.Long.prototype.toString.call(message.experienceTable[j]) : options.longs === Number ? new $util.LongBits(message.experienceTable[j].low >>> 0, message.experienceTable[j].high >>> 0).toNumber(true) : message.experienceTable[j];
            }
            return object;
        };

        /**
         * Converts this CampaignCore to JSON.
         * @function toJSON
         * @memberof dd.CampaignCore
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CampaignCore.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CampaignCore;
    })();

    dd.Campaign = (function() {

        /**
         * Properties of a Campaign.
         * @memberof dd
         * @interface ICampaign
         * @property {string|null} [id] Campaign id
         * @property {string|null} [name] Campaign name
         * @property {string|null} [description] Campaign description
         * @property {string|null} [imageId] Campaign imageId
         * @property {Array.<number|Long>|null} [experienceTable] Campaign experienceTable
         */

        /**
         * Constructs a new Campaign.
         * @memberof dd
         * @classdesc Represents a Campaign.
         * @implements ICampaign
         * @constructor
         * @param {dd.ICampaign=} [properties] Properties to set
         */
        function Campaign(properties) {
            this.experienceTable = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Campaign id.
         * @member {string} id
         * @memberof dd.Campaign
         * @instance
         */
        Campaign.prototype.id = "";

        /**
         * Campaign name.
         * @member {string} name
         * @memberof dd.Campaign
         * @instance
         */
        Campaign.prototype.name = "";

        /**
         * Campaign description.
         * @member {string} description
         * @memberof dd.Campaign
         * @instance
         */
        Campaign.prototype.description = "";

        /**
         * Campaign imageId.
         * @member {string} imageId
         * @memberof dd.Campaign
         * @instance
         */
        Campaign.prototype.imageId = "";

        /**
         * Campaign experienceTable.
         * @member {Array.<number|Long>} experienceTable
         * @memberof dd.Campaign
         * @instance
         */
        Campaign.prototype.experienceTable = $util.emptyArray;

        /**
         * Creates a new Campaign instance using the specified properties.
         * @function create
         * @memberof dd.Campaign
         * @static
         * @param {dd.ICampaign=} [properties] Properties to set
         * @returns {dd.Campaign} Campaign instance
         */
        Campaign.create = function create(properties) {
            return new Campaign(properties);
        };

        /**
         * Encodes the specified Campaign message. Does not implicitly {@link dd.Campaign.verify|verify} messages.
         * @function encode
         * @memberof dd.Campaign
         * @static
         * @param {dd.ICampaign} message Campaign message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Campaign.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && message.hasOwnProperty("id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.name != null && message.hasOwnProperty("name"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
            if (message.description != null && message.hasOwnProperty("description"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.description);
            if (message.imageId != null && message.hasOwnProperty("imageId"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.imageId);
            if (message.experienceTable != null && message.experienceTable.length) {
                writer.uint32(/* id 10, wireType 2 =*/82).fork();
                for (var i = 0; i < message.experienceTable.length; ++i)
                    writer.uint64(message.experienceTable[i]);
                writer.ldelim();
            }
            return writer;
        };

        /**
         * Encodes the specified Campaign message, length delimited. Does not implicitly {@link dd.Campaign.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dd.Campaign
         * @static
         * @param {dd.ICampaign} message Campaign message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Campaign.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Campaign message from the specified reader or buffer.
         * @function decode
         * @memberof dd.Campaign
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dd.Campaign} Campaign
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Campaign.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dd.Campaign();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.name = reader.string();
                    break;
                case 3:
                    message.description = reader.string();
                    break;
                case 4:
                    message.imageId = reader.string();
                    break;
                case 10:
                    if (!(message.experienceTable && message.experienceTable.length))
                        message.experienceTable = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.experienceTable.push(reader.uint64());
                    } else
                        message.experienceTable.push(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Campaign message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dd.Campaign
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dd.Campaign} Campaign
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Campaign.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Campaign message.
         * @function verify
         * @memberof dd.Campaign
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Campaign.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.description != null && message.hasOwnProperty("description"))
                if (!$util.isString(message.description))
                    return "description: string expected";
            if (message.imageId != null && message.hasOwnProperty("imageId"))
                if (!$util.isString(message.imageId))
                    return "imageId: string expected";
            if (message.experienceTable != null && message.hasOwnProperty("experienceTable")) {
                if (!Array.isArray(message.experienceTable))
                    return "experienceTable: array expected";
                for (var i = 0; i < message.experienceTable.length; ++i)
                    if (!$util.isInteger(message.experienceTable[i]) && !(message.experienceTable[i] && $util.isInteger(message.experienceTable[i].low) && $util.isInteger(message.experienceTable[i].high)))
                        return "experienceTable: integer|Long[] expected";
            }
            return null;
        };

        /**
         * Creates a Campaign message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof dd.Campaign
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {dd.Campaign} Campaign
         */
        Campaign.fromObject = function fromObject(object) {
            if (object instanceof $root.dd.Campaign)
                return object;
            var message = new $root.dd.Campaign();
            if (object.id != null)
                message.id = String(object.id);
            if (object.name != null)
                message.name = String(object.name);
            if (object.description != null)
                message.description = String(object.description);
            if (object.imageId != null)
                message.imageId = String(object.imageId);
            if (object.experienceTable) {
                if (!Array.isArray(object.experienceTable))
                    throw TypeError(".dd.Campaign.experienceTable: array expected");
                message.experienceTable = [];
                for (var i = 0; i < object.experienceTable.length; ++i)
                    if ($util.Long)
                        (message.experienceTable[i] = $util.Long.fromValue(object.experienceTable[i])).unsigned = true;
                    else if (typeof object.experienceTable[i] === "string")
                        message.experienceTable[i] = parseInt(object.experienceTable[i], 10);
                    else if (typeof object.experienceTable[i] === "number")
                        message.experienceTable[i] = object.experienceTable[i];
                    else if (typeof object.experienceTable[i] === "object")
                        message.experienceTable[i] = new $util.LongBits(object.experienceTable[i].low >>> 0, object.experienceTable[i].high >>> 0).toNumber(true);
            }
            return message;
        };

        /**
         * Creates a plain object from a Campaign message. Also converts values to other types if specified.
         * @function toObject
         * @memberof dd.Campaign
         * @static
         * @param {dd.Campaign} message Campaign
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Campaign.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.experienceTable = [];
            if (options.defaults) {
                object.id = "";
                object.name = "";
                object.description = "";
                object.imageId = "";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.description != null && message.hasOwnProperty("description"))
                object.description = message.description;
            if (message.imageId != null && message.hasOwnProperty("imageId"))
                object.imageId = message.imageId;
            if (message.experienceTable && message.experienceTable.length) {
                object.experienceTable = [];
                for (var j = 0; j < message.experienceTable.length; ++j)
                    if (typeof message.experienceTable[j] === "number")
                        object.experienceTable[j] = options.longs === String ? String(message.experienceTable[j]) : message.experienceTable[j];
                    else
                        object.experienceTable[j] = options.longs === String ? $util.Long.prototype.toString.call(message.experienceTable[j]) : options.longs === Number ? new $util.LongBits(message.experienceTable[j].low >>> 0, message.experienceTable[j].high >>> 0).toNumber(true) : message.experienceTable[j];
            }
            return object;
        };

        /**
         * Converts this Campaign to JSON.
         * @function toJSON
         * @memberof dd.Campaign
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Campaign.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Campaign;
    })();

    return dd;
})();

module.exports = $root;
