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
         * Callback as used by {@link dd.DD#me}.
         * @memberof dd.DD
         * @typedef MeCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {dd.User} [response] User
         */

        /**
         * Calls Me.
         * @function me
         * @memberof dd.DD
         * @instance
         * @param {dd.IBlank} request Blank message or plain object
         * @param {dd.DD.MeCallback} callback Node-style callback called with the error, if any, and User
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(DD.prototype.me = function me(request, callback) {
            return this.rpcCall(me, $root.dd.Blank, $root.dd.User, request, callback);
        }, "name", { value: "Me" });

        /**
         * Calls Me.
         * @function me
         * @memberof dd.DD
         * @instance
         * @param {dd.IBlank} request Blank message or plain object
         * @returns {Promise<dd.User>} Promise
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
         * Callback as used by {@link dd.DD#getEntityPreset}.
         * @memberof dd.DD
         * @typedef GetEntityPresetCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {dd.EntityPreset} [response] EntityPreset
         */

        /**
         * Calls GetEntityPreset.
         * @function getEntityPreset
         * @memberof dd.DD
         * @instance
         * @param {dd.IGetByIdRequest} request GetByIdRequest message or plain object
         * @param {dd.DD.GetEntityPresetCallback} callback Node-style callback called with the error, if any, and EntityPreset
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(DD.prototype.getEntityPreset = function getEntityPreset(request, callback) {
            return this.rpcCall(getEntityPreset, $root.dd.GetByIdRequest, $root.dd.EntityPreset, request, callback);
        }, "name", { value: "GetEntityPreset" });

        /**
         * Calls GetEntityPreset.
         * @function getEntityPreset
         * @memberof dd.DD
         * @instance
         * @param {dd.IGetByIdRequest} request GetByIdRequest message or plain object
         * @returns {Promise<dd.EntityPreset>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link dd.DD#createEntityPreset}.
         * @memberof dd.DD
         * @typedef CreateEntityPresetCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {dd.CreateEntityPresetResponse} [response] CreateEntityPresetResponse
         */

        /**
         * Calls CreateEntityPreset.
         * @function createEntityPreset
         * @memberof dd.DD
         * @instance
         * @param {dd.IBlank} request Blank message or plain object
         * @param {dd.DD.CreateEntityPresetCallback} callback Node-style callback called with the error, if any, and CreateEntityPresetResponse
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(DD.prototype.createEntityPreset = function createEntityPreset(request, callback) {
            return this.rpcCall(createEntityPreset, $root.dd.Blank, $root.dd.CreateEntityPresetResponse, request, callback);
        }, "name", { value: "CreateEntityPreset" });

        /**
         * Calls CreateEntityPreset.
         * @function createEntityPreset
         * @memberof dd.DD
         * @instance
         * @param {dd.IBlank} request Blank message or plain object
         * @returns {Promise<dd.CreateEntityPresetResponse>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link dd.DD#editEntityPreset}.
         * @memberof dd.DD
         * @typedef EditEntityPresetCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {dd.EntityPreset} [response] EntityPreset
         */

        /**
         * Calls EditEntityPreset.
         * @function editEntityPreset
         * @memberof dd.DD
         * @instance
         * @param {dd.IEditEntityPresetRequest} request EditEntityPresetRequest message or plain object
         * @param {dd.DD.EditEntityPresetCallback} callback Node-style callback called with the error, if any, and EntityPreset
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(DD.prototype.editEntityPreset = function editEntityPreset(request, callback) {
            return this.rpcCall(editEntityPreset, $root.dd.EditEntityPresetRequest, $root.dd.EntityPreset, request, callback);
        }, "name", { value: "EditEntityPreset" });

        /**
         * Calls EditEntityPreset.
         * @function editEntityPreset
         * @memberof dd.DD
         * @instance
         * @param {dd.IEditEntityPresetRequest} request EditEntityPresetRequest message or plain object
         * @returns {Promise<dd.EntityPreset>} Promise
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

    dd.Blank = (function() {

        /**
         * Properties of a Blank.
         * @memberof dd
         * @interface IBlank
         */

        /**
         * Constructs a new Blank.
         * @memberof dd
         * @classdesc Represents a Blank.
         * @implements IBlank
         * @constructor
         * @param {dd.IBlank=} [properties] Properties to set
         */
        function Blank(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new Blank instance using the specified properties.
         * @function create
         * @memberof dd.Blank
         * @static
         * @param {dd.IBlank=} [properties] Properties to set
         * @returns {dd.Blank} Blank instance
         */
        Blank.create = function create(properties) {
            return new Blank(properties);
        };

        /**
         * Encodes the specified Blank message. Does not implicitly {@link dd.Blank.verify|verify} messages.
         * @function encode
         * @memberof dd.Blank
         * @static
         * @param {dd.IBlank} message Blank message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Blank.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified Blank message, length delimited. Does not implicitly {@link dd.Blank.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dd.Blank
         * @static
         * @param {dd.IBlank} message Blank message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Blank.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Blank message from the specified reader or buffer.
         * @function decode
         * @memberof dd.Blank
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dd.Blank} Blank
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Blank.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dd.Blank();
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
         * Decodes a Blank message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dd.Blank
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dd.Blank} Blank
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Blank.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Blank message.
         * @function verify
         * @memberof dd.Blank
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Blank.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a Blank message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof dd.Blank
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {dd.Blank} Blank
         */
        Blank.fromObject = function fromObject(object) {
            if (object instanceof $root.dd.Blank)
                return object;
            return new $root.dd.Blank();
        };

        /**
         * Creates a plain object from a Blank message. Also converts values to other types if specified.
         * @function toObject
         * @memberof dd.Blank
         * @static
         * @param {dd.Blank} message Blank
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Blank.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this Blank to JSON.
         * @function toJSON
         * @memberof dd.Blank
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Blank.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Blank;
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

    dd.CreateEntityPresetResponse = (function() {

        /**
         * Properties of a CreateEntityPresetResponse.
         * @memberof dd
         * @interface ICreateEntityPresetResponse
         * @property {string|null} [id] CreateEntityPresetResponse id
         */

        /**
         * Constructs a new CreateEntityPresetResponse.
         * @memberof dd
         * @classdesc Represents a CreateEntityPresetResponse.
         * @implements ICreateEntityPresetResponse
         * @constructor
         * @param {dd.ICreateEntityPresetResponse=} [properties] Properties to set
         */
        function CreateEntityPresetResponse(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CreateEntityPresetResponse id.
         * @member {string} id
         * @memberof dd.CreateEntityPresetResponse
         * @instance
         */
        CreateEntityPresetResponse.prototype.id = "";

        /**
         * Creates a new CreateEntityPresetResponse instance using the specified properties.
         * @function create
         * @memberof dd.CreateEntityPresetResponse
         * @static
         * @param {dd.ICreateEntityPresetResponse=} [properties] Properties to set
         * @returns {dd.CreateEntityPresetResponse} CreateEntityPresetResponse instance
         */
        CreateEntityPresetResponse.create = function create(properties) {
            return new CreateEntityPresetResponse(properties);
        };

        /**
         * Encodes the specified CreateEntityPresetResponse message. Does not implicitly {@link dd.CreateEntityPresetResponse.verify|verify} messages.
         * @function encode
         * @memberof dd.CreateEntityPresetResponse
         * @static
         * @param {dd.ICreateEntityPresetResponse} message CreateEntityPresetResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CreateEntityPresetResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && message.hasOwnProperty("id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            return writer;
        };

        /**
         * Encodes the specified CreateEntityPresetResponse message, length delimited. Does not implicitly {@link dd.CreateEntityPresetResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dd.CreateEntityPresetResponse
         * @static
         * @param {dd.ICreateEntityPresetResponse} message CreateEntityPresetResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CreateEntityPresetResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CreateEntityPresetResponse message from the specified reader or buffer.
         * @function decode
         * @memberof dd.CreateEntityPresetResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dd.CreateEntityPresetResponse} CreateEntityPresetResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CreateEntityPresetResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dd.CreateEntityPresetResponse();
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
         * Decodes a CreateEntityPresetResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dd.CreateEntityPresetResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dd.CreateEntityPresetResponse} CreateEntityPresetResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CreateEntityPresetResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CreateEntityPresetResponse message.
         * @function verify
         * @memberof dd.CreateEntityPresetResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CreateEntityPresetResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            return null;
        };

        /**
         * Creates a CreateEntityPresetResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof dd.CreateEntityPresetResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {dd.CreateEntityPresetResponse} CreateEntityPresetResponse
         */
        CreateEntityPresetResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.dd.CreateEntityPresetResponse)
                return object;
            var message = new $root.dd.CreateEntityPresetResponse();
            if (object.id != null)
                message.id = String(object.id);
            return message;
        };

        /**
         * Creates a plain object from a CreateEntityPresetResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof dd.CreateEntityPresetResponse
         * @static
         * @param {dd.CreateEntityPresetResponse} message CreateEntityPresetResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CreateEntityPresetResponse.toObject = function toObject(message, options) {
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
         * Converts this CreateEntityPresetResponse to JSON.
         * @function toJSON
         * @memberof dd.CreateEntityPresetResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CreateEntityPresetResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CreateEntityPresetResponse;
    })();

    dd.EditEntityPresetRequest = (function() {

        /**
         * Properties of an EditEntityPresetRequest.
         * @memberof dd
         * @interface IEditEntityPresetRequest
         * @property {string|null} [campaignId] EditEntityPresetRequest campaignId
         * @property {string|null} [id] EditEntityPresetRequest id
         * @property {dd.IEntityPreset|null} [preset] EditEntityPresetRequest preset
         */

        /**
         * Constructs a new EditEntityPresetRequest.
         * @memberof dd
         * @classdesc Represents an EditEntityPresetRequest.
         * @implements IEditEntityPresetRequest
         * @constructor
         * @param {dd.IEditEntityPresetRequest=} [properties] Properties to set
         */
        function EditEntityPresetRequest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * EditEntityPresetRequest campaignId.
         * @member {string} campaignId
         * @memberof dd.EditEntityPresetRequest
         * @instance
         */
        EditEntityPresetRequest.prototype.campaignId = "";

        /**
         * EditEntityPresetRequest id.
         * @member {string} id
         * @memberof dd.EditEntityPresetRequest
         * @instance
         */
        EditEntityPresetRequest.prototype.id = "";

        /**
         * EditEntityPresetRequest preset.
         * @member {dd.IEntityPreset|null|undefined} preset
         * @memberof dd.EditEntityPresetRequest
         * @instance
         */
        EditEntityPresetRequest.prototype.preset = null;

        /**
         * Creates a new EditEntityPresetRequest instance using the specified properties.
         * @function create
         * @memberof dd.EditEntityPresetRequest
         * @static
         * @param {dd.IEditEntityPresetRequest=} [properties] Properties to set
         * @returns {dd.EditEntityPresetRequest} EditEntityPresetRequest instance
         */
        EditEntityPresetRequest.create = function create(properties) {
            return new EditEntityPresetRequest(properties);
        };

        /**
         * Encodes the specified EditEntityPresetRequest message. Does not implicitly {@link dd.EditEntityPresetRequest.verify|verify} messages.
         * @function encode
         * @memberof dd.EditEntityPresetRequest
         * @static
         * @param {dd.IEditEntityPresetRequest} message EditEntityPresetRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EditEntityPresetRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.campaignId != null && message.hasOwnProperty("campaignId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.campaignId);
            if (message.id != null && message.hasOwnProperty("id"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.id);
            if (message.preset != null && message.hasOwnProperty("preset"))
                $root.dd.EntityPreset.encode(message.preset, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified EditEntityPresetRequest message, length delimited. Does not implicitly {@link dd.EditEntityPresetRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dd.EditEntityPresetRequest
         * @static
         * @param {dd.IEditEntityPresetRequest} message EditEntityPresetRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EditEntityPresetRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an EditEntityPresetRequest message from the specified reader or buffer.
         * @function decode
         * @memberof dd.EditEntityPresetRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dd.EditEntityPresetRequest} EditEntityPresetRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EditEntityPresetRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dd.EditEntityPresetRequest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.campaignId = reader.string();
                    break;
                case 2:
                    message.id = reader.string();
                    break;
                case 3:
                    message.preset = $root.dd.EntityPreset.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an EditEntityPresetRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dd.EditEntityPresetRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dd.EditEntityPresetRequest} EditEntityPresetRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EditEntityPresetRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an EditEntityPresetRequest message.
         * @function verify
         * @memberof dd.EditEntityPresetRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        EditEntityPresetRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.campaignId != null && message.hasOwnProperty("campaignId"))
                if (!$util.isString(message.campaignId))
                    return "campaignId: string expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.preset != null && message.hasOwnProperty("preset")) {
                var error = $root.dd.EntityPreset.verify(message.preset);
                if (error)
                    return "preset." + error;
            }
            return null;
        };

        /**
         * Creates an EditEntityPresetRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof dd.EditEntityPresetRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {dd.EditEntityPresetRequest} EditEntityPresetRequest
         */
        EditEntityPresetRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.dd.EditEntityPresetRequest)
                return object;
            var message = new $root.dd.EditEntityPresetRequest();
            if (object.campaignId != null)
                message.campaignId = String(object.campaignId);
            if (object.id != null)
                message.id = String(object.id);
            if (object.preset != null) {
                if (typeof object.preset !== "object")
                    throw TypeError(".dd.EditEntityPresetRequest.preset: object expected");
                message.preset = $root.dd.EntityPreset.fromObject(object.preset);
            }
            return message;
        };

        /**
         * Creates a plain object from an EditEntityPresetRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof dd.EditEntityPresetRequest
         * @static
         * @param {dd.EditEntityPresetRequest} message EditEntityPresetRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EditEntityPresetRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.campaignId = "";
                object.id = "";
                object.preset = null;
            }
            if (message.campaignId != null && message.hasOwnProperty("campaignId"))
                object.campaignId = message.campaignId;
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.preset != null && message.hasOwnProperty("preset"))
                object.preset = $root.dd.EntityPreset.toObject(message.preset, options);
            return object;
        };

        /**
         * Converts this EditEntityPresetRequest to JSON.
         * @function toJSON
         * @memberof dd.EditEntityPresetRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EditEntityPresetRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return EditEntityPresetRequest;
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
                    writer.int64(message.experienceTable[i]);
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
                            message.experienceTable.push(reader.int64());
                    } else
                        message.experienceTable.push(reader.int64());
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
                        (message.experienceTable[i] = $util.Long.fromValue(object.experienceTable[i])).unsigned = false;
                    else if (typeof object.experienceTable[i] === "string")
                        message.experienceTable[i] = parseInt(object.experienceTable[i], 10);
                    else if (typeof object.experienceTable[i] === "number")
                        message.experienceTable[i] = object.experienceTable[i];
                    else if (typeof object.experienceTable[i] === "object")
                        message.experienceTable[i] = new $util.LongBits(object.experienceTable[i].low >>> 0, object.experienceTable[i].high >>> 0).toNumber();
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
                        object.experienceTable[j] = options.longs === String ? $util.Long.prototype.toString.call(message.experienceTable[j]) : options.longs === Number ? new $util.LongBits(message.experienceTable[j].low >>> 0, message.experienceTable[j].high >>> 0).toNumber() : message.experienceTable[j];
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
         * @property {Array.<dd.ICampaignUser>|null} [users] Campaign users
         * @property {Array.<dd.IItem>|null} [items] Campaign items
         * @property {Array.<dd.IEntityPreset>|null} [entityPresets] Campaign entityPresets
         * @property {Array.<dd.IEntity>|null} [entities] Campaign entities
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
            this.users = [];
            this.items = [];
            this.entityPresets = [];
            this.entities = [];
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
         * Campaign users.
         * @member {Array.<dd.ICampaignUser>} users
         * @memberof dd.Campaign
         * @instance
         */
        Campaign.prototype.users = $util.emptyArray;

        /**
         * Campaign items.
         * @member {Array.<dd.IItem>} items
         * @memberof dd.Campaign
         * @instance
         */
        Campaign.prototype.items = $util.emptyArray;

        /**
         * Campaign entityPresets.
         * @member {Array.<dd.IEntityPreset>} entityPresets
         * @memberof dd.Campaign
         * @instance
         */
        Campaign.prototype.entityPresets = $util.emptyArray;

        /**
         * Campaign entities.
         * @member {Array.<dd.IEntity>} entities
         * @memberof dd.Campaign
         * @instance
         */
        Campaign.prototype.entities = $util.emptyArray;

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
                    writer.int64(message.experienceTable[i]);
                writer.ldelim();
            }
            if (message.users != null && message.users.length)
                for (var i = 0; i < message.users.length; ++i)
                    $root.dd.CampaignUser.encode(message.users[i], writer.uint32(/* id 11, wireType 2 =*/90).fork()).ldelim();
            if (message.items != null && message.items.length)
                for (var i = 0; i < message.items.length; ++i)
                    $root.dd.Item.encode(message.items[i], writer.uint32(/* id 12, wireType 2 =*/98).fork()).ldelim();
            if (message.entityPresets != null && message.entityPresets.length)
                for (var i = 0; i < message.entityPresets.length; ++i)
                    $root.dd.EntityPreset.encode(message.entityPresets[i], writer.uint32(/* id 13, wireType 2 =*/106).fork()).ldelim();
            if (message.entities != null && message.entities.length)
                for (var i = 0; i < message.entities.length; ++i)
                    $root.dd.Entity.encode(message.entities[i], writer.uint32(/* id 14, wireType 2 =*/114).fork()).ldelim();
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
                            message.experienceTable.push(reader.int64());
                    } else
                        message.experienceTable.push(reader.int64());
                    break;
                case 11:
                    if (!(message.users && message.users.length))
                        message.users = [];
                    message.users.push($root.dd.CampaignUser.decode(reader, reader.uint32()));
                    break;
                case 12:
                    if (!(message.items && message.items.length))
                        message.items = [];
                    message.items.push($root.dd.Item.decode(reader, reader.uint32()));
                    break;
                case 13:
                    if (!(message.entityPresets && message.entityPresets.length))
                        message.entityPresets = [];
                    message.entityPresets.push($root.dd.EntityPreset.decode(reader, reader.uint32()));
                    break;
                case 14:
                    if (!(message.entities && message.entities.length))
                        message.entities = [];
                    message.entities.push($root.dd.Entity.decode(reader, reader.uint32()));
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
            if (message.users != null && message.hasOwnProperty("users")) {
                if (!Array.isArray(message.users))
                    return "users: array expected";
                for (var i = 0; i < message.users.length; ++i) {
                    var error = $root.dd.CampaignUser.verify(message.users[i]);
                    if (error)
                        return "users." + error;
                }
            }
            if (message.items != null && message.hasOwnProperty("items")) {
                if (!Array.isArray(message.items))
                    return "items: array expected";
                for (var i = 0; i < message.items.length; ++i) {
                    var error = $root.dd.Item.verify(message.items[i]);
                    if (error)
                        return "items." + error;
                }
            }
            if (message.entityPresets != null && message.hasOwnProperty("entityPresets")) {
                if (!Array.isArray(message.entityPresets))
                    return "entityPresets: array expected";
                for (var i = 0; i < message.entityPresets.length; ++i) {
                    var error = $root.dd.EntityPreset.verify(message.entityPresets[i]);
                    if (error)
                        return "entityPresets." + error;
                }
            }
            if (message.entities != null && message.hasOwnProperty("entities")) {
                if (!Array.isArray(message.entities))
                    return "entities: array expected";
                for (var i = 0; i < message.entities.length; ++i) {
                    var error = $root.dd.Entity.verify(message.entities[i]);
                    if (error)
                        return "entities." + error;
                }
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
                        (message.experienceTable[i] = $util.Long.fromValue(object.experienceTable[i])).unsigned = false;
                    else if (typeof object.experienceTable[i] === "string")
                        message.experienceTable[i] = parseInt(object.experienceTable[i], 10);
                    else if (typeof object.experienceTable[i] === "number")
                        message.experienceTable[i] = object.experienceTable[i];
                    else if (typeof object.experienceTable[i] === "object")
                        message.experienceTable[i] = new $util.LongBits(object.experienceTable[i].low >>> 0, object.experienceTable[i].high >>> 0).toNumber();
            }
            if (object.users) {
                if (!Array.isArray(object.users))
                    throw TypeError(".dd.Campaign.users: array expected");
                message.users = [];
                for (var i = 0; i < object.users.length; ++i) {
                    if (typeof object.users[i] !== "object")
                        throw TypeError(".dd.Campaign.users: object expected");
                    message.users[i] = $root.dd.CampaignUser.fromObject(object.users[i]);
                }
            }
            if (object.items) {
                if (!Array.isArray(object.items))
                    throw TypeError(".dd.Campaign.items: array expected");
                message.items = [];
                for (var i = 0; i < object.items.length; ++i) {
                    if (typeof object.items[i] !== "object")
                        throw TypeError(".dd.Campaign.items: object expected");
                    message.items[i] = $root.dd.Item.fromObject(object.items[i]);
                }
            }
            if (object.entityPresets) {
                if (!Array.isArray(object.entityPresets))
                    throw TypeError(".dd.Campaign.entityPresets: array expected");
                message.entityPresets = [];
                for (var i = 0; i < object.entityPresets.length; ++i) {
                    if (typeof object.entityPresets[i] !== "object")
                        throw TypeError(".dd.Campaign.entityPresets: object expected");
                    message.entityPresets[i] = $root.dd.EntityPreset.fromObject(object.entityPresets[i]);
                }
            }
            if (object.entities) {
                if (!Array.isArray(object.entities))
                    throw TypeError(".dd.Campaign.entities: array expected");
                message.entities = [];
                for (var i = 0; i < object.entities.length; ++i) {
                    if (typeof object.entities[i] !== "object")
                        throw TypeError(".dd.Campaign.entities: object expected");
                    message.entities[i] = $root.dd.Entity.fromObject(object.entities[i]);
                }
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
            if (options.arrays || options.defaults) {
                object.experienceTable = [];
                object.users = [];
                object.items = [];
                object.entityPresets = [];
                object.entities = [];
            }
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
                        object.experienceTable[j] = options.longs === String ? $util.Long.prototype.toString.call(message.experienceTable[j]) : options.longs === Number ? new $util.LongBits(message.experienceTable[j].low >>> 0, message.experienceTable[j].high >>> 0).toNumber() : message.experienceTable[j];
            }
            if (message.users && message.users.length) {
                object.users = [];
                for (var j = 0; j < message.users.length; ++j)
                    object.users[j] = $root.dd.CampaignUser.toObject(message.users[j], options);
            }
            if (message.items && message.items.length) {
                object.items = [];
                for (var j = 0; j < message.items.length; ++j)
                    object.items[j] = $root.dd.Item.toObject(message.items[j], options);
            }
            if (message.entityPresets && message.entityPresets.length) {
                object.entityPresets = [];
                for (var j = 0; j < message.entityPresets.length; ++j)
                    object.entityPresets[j] = $root.dd.EntityPreset.toObject(message.entityPresets[j], options);
            }
            if (message.entities && message.entities.length) {
                object.entities = [];
                for (var j = 0; j < message.entities.length; ++j)
                    object.entities[j] = $root.dd.Entity.toObject(message.entities[j], options);
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

    dd.Entity = (function() {

        /**
         * Properties of an Entity.
         * @memberof dd
         * @interface IEntity
         * @property {string|null} [id] Entity id
         * @property {string|null} [name] Entity name
         * @property {string|null} [description] Entity description
         * @property {dd.IUser|null} [user] Entity user
         * @property {string|null} [imageId] Entity imageId
         * @property {Array.<dd.IAttribute>|null} [attributes] Entity attributes
         * @property {number|Long|null} [xp] Entity xp
         * @property {dd.IInventory|null} [inventory] Entity inventory
         * @property {dd.IHealth|null} [health] Entity health
         * @property {dd.IEntityPreset|null} [preset] Entity preset
         */

        /**
         * Constructs a new Entity.
         * @memberof dd
         * @classdesc Represents an Entity.
         * @implements IEntity
         * @constructor
         * @param {dd.IEntity=} [properties] Properties to set
         */
        function Entity(properties) {
            this.attributes = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Entity id.
         * @member {string} id
         * @memberof dd.Entity
         * @instance
         */
        Entity.prototype.id = "";

        /**
         * Entity name.
         * @member {string} name
         * @memberof dd.Entity
         * @instance
         */
        Entity.prototype.name = "";

        /**
         * Entity description.
         * @member {string} description
         * @memberof dd.Entity
         * @instance
         */
        Entity.prototype.description = "";

        /**
         * Entity user.
         * @member {dd.IUser|null|undefined} user
         * @memberof dd.Entity
         * @instance
         */
        Entity.prototype.user = null;

        /**
         * Entity imageId.
         * @member {string} imageId
         * @memberof dd.Entity
         * @instance
         */
        Entity.prototype.imageId = "";

        /**
         * Entity attributes.
         * @member {Array.<dd.IAttribute>} attributes
         * @memberof dd.Entity
         * @instance
         */
        Entity.prototype.attributes = $util.emptyArray;

        /**
         * Entity xp.
         * @member {number|Long} xp
         * @memberof dd.Entity
         * @instance
         */
        Entity.prototype.xp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Entity inventory.
         * @member {dd.IInventory|null|undefined} inventory
         * @memberof dd.Entity
         * @instance
         */
        Entity.prototype.inventory = null;

        /**
         * Entity health.
         * @member {dd.IHealth|null|undefined} health
         * @memberof dd.Entity
         * @instance
         */
        Entity.prototype.health = null;

        /**
         * Entity preset.
         * @member {dd.IEntityPreset|null|undefined} preset
         * @memberof dd.Entity
         * @instance
         */
        Entity.prototype.preset = null;

        /**
         * Creates a new Entity instance using the specified properties.
         * @function create
         * @memberof dd.Entity
         * @static
         * @param {dd.IEntity=} [properties] Properties to set
         * @returns {dd.Entity} Entity instance
         */
        Entity.create = function create(properties) {
            return new Entity(properties);
        };

        /**
         * Encodes the specified Entity message. Does not implicitly {@link dd.Entity.verify|verify} messages.
         * @function encode
         * @memberof dd.Entity
         * @static
         * @param {dd.IEntity} message Entity message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Entity.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && message.hasOwnProperty("id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.name != null && message.hasOwnProperty("name"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
            if (message.description != null && message.hasOwnProperty("description"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.description);
            if (message.user != null && message.hasOwnProperty("user"))
                $root.dd.User.encode(message.user, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.imageId != null && message.hasOwnProperty("imageId"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.imageId);
            if (message.attributes != null && message.attributes.length)
                for (var i = 0; i < message.attributes.length; ++i)
                    $root.dd.Attribute.encode(message.attributes[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            if (message.xp != null && message.hasOwnProperty("xp"))
                writer.uint32(/* id 7, wireType 0 =*/56).int64(message.xp);
            if (message.inventory != null && message.hasOwnProperty("inventory"))
                $root.dd.Inventory.encode(message.inventory, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
            if (message.health != null && message.hasOwnProperty("health"))
                $root.dd.Health.encode(message.health, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
            if (message.preset != null && message.hasOwnProperty("preset"))
                $root.dd.EntityPreset.encode(message.preset, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Entity message, length delimited. Does not implicitly {@link dd.Entity.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dd.Entity
         * @static
         * @param {dd.IEntity} message Entity message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Entity.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Entity message from the specified reader or buffer.
         * @function decode
         * @memberof dd.Entity
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dd.Entity} Entity
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Entity.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dd.Entity();
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
                    message.user = $root.dd.User.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.imageId = reader.string();
                    break;
                case 6:
                    if (!(message.attributes && message.attributes.length))
                        message.attributes = [];
                    message.attributes.push($root.dd.Attribute.decode(reader, reader.uint32()));
                    break;
                case 7:
                    message.xp = reader.int64();
                    break;
                case 8:
                    message.inventory = $root.dd.Inventory.decode(reader, reader.uint32());
                    break;
                case 9:
                    message.health = $root.dd.Health.decode(reader, reader.uint32());
                    break;
                case 10:
                    message.preset = $root.dd.EntityPreset.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Entity message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dd.Entity
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dd.Entity} Entity
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Entity.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Entity message.
         * @function verify
         * @memberof dd.Entity
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Entity.verify = function verify(message) {
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
            if (message.user != null && message.hasOwnProperty("user")) {
                var error = $root.dd.User.verify(message.user);
                if (error)
                    return "user." + error;
            }
            if (message.imageId != null && message.hasOwnProperty("imageId"))
                if (!$util.isString(message.imageId))
                    return "imageId: string expected";
            if (message.attributes != null && message.hasOwnProperty("attributes")) {
                if (!Array.isArray(message.attributes))
                    return "attributes: array expected";
                for (var i = 0; i < message.attributes.length; ++i) {
                    var error = $root.dd.Attribute.verify(message.attributes[i]);
                    if (error)
                        return "attributes." + error;
                }
            }
            if (message.xp != null && message.hasOwnProperty("xp"))
                if (!$util.isInteger(message.xp) && !(message.xp && $util.isInteger(message.xp.low) && $util.isInteger(message.xp.high)))
                    return "xp: integer|Long expected";
            if (message.inventory != null && message.hasOwnProperty("inventory")) {
                var error = $root.dd.Inventory.verify(message.inventory);
                if (error)
                    return "inventory." + error;
            }
            if (message.health != null && message.hasOwnProperty("health")) {
                var error = $root.dd.Health.verify(message.health);
                if (error)
                    return "health." + error;
            }
            if (message.preset != null && message.hasOwnProperty("preset")) {
                var error = $root.dd.EntityPreset.verify(message.preset);
                if (error)
                    return "preset." + error;
            }
            return null;
        };

        /**
         * Creates an Entity message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof dd.Entity
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {dd.Entity} Entity
         */
        Entity.fromObject = function fromObject(object) {
            if (object instanceof $root.dd.Entity)
                return object;
            var message = new $root.dd.Entity();
            if (object.id != null)
                message.id = String(object.id);
            if (object.name != null)
                message.name = String(object.name);
            if (object.description != null)
                message.description = String(object.description);
            if (object.user != null) {
                if (typeof object.user !== "object")
                    throw TypeError(".dd.Entity.user: object expected");
                message.user = $root.dd.User.fromObject(object.user);
            }
            if (object.imageId != null)
                message.imageId = String(object.imageId);
            if (object.attributes) {
                if (!Array.isArray(object.attributes))
                    throw TypeError(".dd.Entity.attributes: array expected");
                message.attributes = [];
                for (var i = 0; i < object.attributes.length; ++i) {
                    if (typeof object.attributes[i] !== "object")
                        throw TypeError(".dd.Entity.attributes: object expected");
                    message.attributes[i] = $root.dd.Attribute.fromObject(object.attributes[i]);
                }
            }
            if (object.xp != null)
                if ($util.Long)
                    (message.xp = $util.Long.fromValue(object.xp)).unsigned = false;
                else if (typeof object.xp === "string")
                    message.xp = parseInt(object.xp, 10);
                else if (typeof object.xp === "number")
                    message.xp = object.xp;
                else if (typeof object.xp === "object")
                    message.xp = new $util.LongBits(object.xp.low >>> 0, object.xp.high >>> 0).toNumber();
            if (object.inventory != null) {
                if (typeof object.inventory !== "object")
                    throw TypeError(".dd.Entity.inventory: object expected");
                message.inventory = $root.dd.Inventory.fromObject(object.inventory);
            }
            if (object.health != null) {
                if (typeof object.health !== "object")
                    throw TypeError(".dd.Entity.health: object expected");
                message.health = $root.dd.Health.fromObject(object.health);
            }
            if (object.preset != null) {
                if (typeof object.preset !== "object")
                    throw TypeError(".dd.Entity.preset: object expected");
                message.preset = $root.dd.EntityPreset.fromObject(object.preset);
            }
            return message;
        };

        /**
         * Creates a plain object from an Entity message. Also converts values to other types if specified.
         * @function toObject
         * @memberof dd.Entity
         * @static
         * @param {dd.Entity} message Entity
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Entity.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.attributes = [];
            if (options.defaults) {
                object.id = "";
                object.name = "";
                object.description = "";
                object.user = null;
                object.imageId = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.xp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.xp = options.longs === String ? "0" : 0;
                object.inventory = null;
                object.health = null;
                object.preset = null;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.description != null && message.hasOwnProperty("description"))
                object.description = message.description;
            if (message.user != null && message.hasOwnProperty("user"))
                object.user = $root.dd.User.toObject(message.user, options);
            if (message.imageId != null && message.hasOwnProperty("imageId"))
                object.imageId = message.imageId;
            if (message.attributes && message.attributes.length) {
                object.attributes = [];
                for (var j = 0; j < message.attributes.length; ++j)
                    object.attributes[j] = $root.dd.Attribute.toObject(message.attributes[j], options);
            }
            if (message.xp != null && message.hasOwnProperty("xp"))
                if (typeof message.xp === "number")
                    object.xp = options.longs === String ? String(message.xp) : message.xp;
                else
                    object.xp = options.longs === String ? $util.Long.prototype.toString.call(message.xp) : options.longs === Number ? new $util.LongBits(message.xp.low >>> 0, message.xp.high >>> 0).toNumber() : message.xp;
            if (message.inventory != null && message.hasOwnProperty("inventory"))
                object.inventory = $root.dd.Inventory.toObject(message.inventory, options);
            if (message.health != null && message.hasOwnProperty("health"))
                object.health = $root.dd.Health.toObject(message.health, options);
            if (message.preset != null && message.hasOwnProperty("preset"))
                object.preset = $root.dd.EntityPreset.toObject(message.preset, options);
            return object;
        };

        /**
         * Converts this Entity to JSON.
         * @function toJSON
         * @memberof dd.Entity
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Entity.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Entity;
    })();

    dd.EntityPreset = (function() {

        /**
         * Properties of an EntityPreset.
         * @memberof dd
         * @interface IEntityPreset
         * @property {string|null} [id] EntityPreset id
         * @property {string|null} [name] EntityPreset name
         * @property {string|null} [description] EntityPreset description
         * @property {dd.IUser|null} [user] EntityPreset user
         * @property {string|null} [imageId] EntityPreset imageId
         * @property {Array.<dd.IEntityAttribute>|null} [attributes] EntityPreset attributes
         * @property {dd.IInventory|null} [inventory] EntityPreset inventory
         * @property {dd.IHealthPreset|null} [health] EntityPreset health
         * @property {boolean|null} [playerCreatable] EntityPreset playerCreatable
         */

        /**
         * Constructs a new EntityPreset.
         * @memberof dd
         * @classdesc Represents an EntityPreset.
         * @implements IEntityPreset
         * @constructor
         * @param {dd.IEntityPreset=} [properties] Properties to set
         */
        function EntityPreset(properties) {
            this.attributes = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * EntityPreset id.
         * @member {string} id
         * @memberof dd.EntityPreset
         * @instance
         */
        EntityPreset.prototype.id = "";

        /**
         * EntityPreset name.
         * @member {string} name
         * @memberof dd.EntityPreset
         * @instance
         */
        EntityPreset.prototype.name = "";

        /**
         * EntityPreset description.
         * @member {string} description
         * @memberof dd.EntityPreset
         * @instance
         */
        EntityPreset.prototype.description = "";

        /**
         * EntityPreset user.
         * @member {dd.IUser|null|undefined} user
         * @memberof dd.EntityPreset
         * @instance
         */
        EntityPreset.prototype.user = null;

        /**
         * EntityPreset imageId.
         * @member {string} imageId
         * @memberof dd.EntityPreset
         * @instance
         */
        EntityPreset.prototype.imageId = "";

        /**
         * EntityPreset attributes.
         * @member {Array.<dd.IEntityAttribute>} attributes
         * @memberof dd.EntityPreset
         * @instance
         */
        EntityPreset.prototype.attributes = $util.emptyArray;

        /**
         * EntityPreset inventory.
         * @member {dd.IInventory|null|undefined} inventory
         * @memberof dd.EntityPreset
         * @instance
         */
        EntityPreset.prototype.inventory = null;

        /**
         * EntityPreset health.
         * @member {dd.IHealthPreset|null|undefined} health
         * @memberof dd.EntityPreset
         * @instance
         */
        EntityPreset.prototype.health = null;

        /**
         * EntityPreset playerCreatable.
         * @member {boolean} playerCreatable
         * @memberof dd.EntityPreset
         * @instance
         */
        EntityPreset.prototype.playerCreatable = false;

        /**
         * Creates a new EntityPreset instance using the specified properties.
         * @function create
         * @memberof dd.EntityPreset
         * @static
         * @param {dd.IEntityPreset=} [properties] Properties to set
         * @returns {dd.EntityPreset} EntityPreset instance
         */
        EntityPreset.create = function create(properties) {
            return new EntityPreset(properties);
        };

        /**
         * Encodes the specified EntityPreset message. Does not implicitly {@link dd.EntityPreset.verify|verify} messages.
         * @function encode
         * @memberof dd.EntityPreset
         * @static
         * @param {dd.IEntityPreset} message EntityPreset message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EntityPreset.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && message.hasOwnProperty("id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.name != null && message.hasOwnProperty("name"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
            if (message.description != null && message.hasOwnProperty("description"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.description);
            if (message.user != null && message.hasOwnProperty("user"))
                $root.dd.User.encode(message.user, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.imageId != null && message.hasOwnProperty("imageId"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.imageId);
            if (message.attributes != null && message.attributes.length)
                for (var i = 0; i < message.attributes.length; ++i)
                    $root.dd.EntityAttribute.encode(message.attributes[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            if (message.inventory != null && message.hasOwnProperty("inventory"))
                $root.dd.Inventory.encode(message.inventory, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
            if (message.health != null && message.hasOwnProperty("health"))
                $root.dd.HealthPreset.encode(message.health, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
            if (message.playerCreatable != null && message.hasOwnProperty("playerCreatable"))
                writer.uint32(/* id 9, wireType 0 =*/72).bool(message.playerCreatable);
            return writer;
        };

        /**
         * Encodes the specified EntityPreset message, length delimited. Does not implicitly {@link dd.EntityPreset.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dd.EntityPreset
         * @static
         * @param {dd.IEntityPreset} message EntityPreset message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EntityPreset.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an EntityPreset message from the specified reader or buffer.
         * @function decode
         * @memberof dd.EntityPreset
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dd.EntityPreset} EntityPreset
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EntityPreset.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dd.EntityPreset();
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
                    message.user = $root.dd.User.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.imageId = reader.string();
                    break;
                case 6:
                    if (!(message.attributes && message.attributes.length))
                        message.attributes = [];
                    message.attributes.push($root.dd.EntityAttribute.decode(reader, reader.uint32()));
                    break;
                case 7:
                    message.inventory = $root.dd.Inventory.decode(reader, reader.uint32());
                    break;
                case 8:
                    message.health = $root.dd.HealthPreset.decode(reader, reader.uint32());
                    break;
                case 9:
                    message.playerCreatable = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an EntityPreset message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dd.EntityPreset
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dd.EntityPreset} EntityPreset
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EntityPreset.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an EntityPreset message.
         * @function verify
         * @memberof dd.EntityPreset
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        EntityPreset.verify = function verify(message) {
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
            if (message.user != null && message.hasOwnProperty("user")) {
                var error = $root.dd.User.verify(message.user);
                if (error)
                    return "user." + error;
            }
            if (message.imageId != null && message.hasOwnProperty("imageId"))
                if (!$util.isString(message.imageId))
                    return "imageId: string expected";
            if (message.attributes != null && message.hasOwnProperty("attributes")) {
                if (!Array.isArray(message.attributes))
                    return "attributes: array expected";
                for (var i = 0; i < message.attributes.length; ++i) {
                    var error = $root.dd.EntityAttribute.verify(message.attributes[i]);
                    if (error)
                        return "attributes." + error;
                }
            }
            if (message.inventory != null && message.hasOwnProperty("inventory")) {
                var error = $root.dd.Inventory.verify(message.inventory);
                if (error)
                    return "inventory." + error;
            }
            if (message.health != null && message.hasOwnProperty("health")) {
                var error = $root.dd.HealthPreset.verify(message.health);
                if (error)
                    return "health." + error;
            }
            if (message.playerCreatable != null && message.hasOwnProperty("playerCreatable"))
                if (typeof message.playerCreatable !== "boolean")
                    return "playerCreatable: boolean expected";
            return null;
        };

        /**
         * Creates an EntityPreset message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof dd.EntityPreset
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {dd.EntityPreset} EntityPreset
         */
        EntityPreset.fromObject = function fromObject(object) {
            if (object instanceof $root.dd.EntityPreset)
                return object;
            var message = new $root.dd.EntityPreset();
            if (object.id != null)
                message.id = String(object.id);
            if (object.name != null)
                message.name = String(object.name);
            if (object.description != null)
                message.description = String(object.description);
            if (object.user != null) {
                if (typeof object.user !== "object")
                    throw TypeError(".dd.EntityPreset.user: object expected");
                message.user = $root.dd.User.fromObject(object.user);
            }
            if (object.imageId != null)
                message.imageId = String(object.imageId);
            if (object.attributes) {
                if (!Array.isArray(object.attributes))
                    throw TypeError(".dd.EntityPreset.attributes: array expected");
                message.attributes = [];
                for (var i = 0; i < object.attributes.length; ++i) {
                    if (typeof object.attributes[i] !== "object")
                        throw TypeError(".dd.EntityPreset.attributes: object expected");
                    message.attributes[i] = $root.dd.EntityAttribute.fromObject(object.attributes[i]);
                }
            }
            if (object.inventory != null) {
                if (typeof object.inventory !== "object")
                    throw TypeError(".dd.EntityPreset.inventory: object expected");
                message.inventory = $root.dd.Inventory.fromObject(object.inventory);
            }
            if (object.health != null) {
                if (typeof object.health !== "object")
                    throw TypeError(".dd.EntityPreset.health: object expected");
                message.health = $root.dd.HealthPreset.fromObject(object.health);
            }
            if (object.playerCreatable != null)
                message.playerCreatable = Boolean(object.playerCreatable);
            return message;
        };

        /**
         * Creates a plain object from an EntityPreset message. Also converts values to other types if specified.
         * @function toObject
         * @memberof dd.EntityPreset
         * @static
         * @param {dd.EntityPreset} message EntityPreset
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EntityPreset.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.attributes = [];
            if (options.defaults) {
                object.id = "";
                object.name = "";
                object.description = "";
                object.user = null;
                object.imageId = "";
                object.inventory = null;
                object.health = null;
                object.playerCreatable = false;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.description != null && message.hasOwnProperty("description"))
                object.description = message.description;
            if (message.user != null && message.hasOwnProperty("user"))
                object.user = $root.dd.User.toObject(message.user, options);
            if (message.imageId != null && message.hasOwnProperty("imageId"))
                object.imageId = message.imageId;
            if (message.attributes && message.attributes.length) {
                object.attributes = [];
                for (var j = 0; j < message.attributes.length; ++j)
                    object.attributes[j] = $root.dd.EntityAttribute.toObject(message.attributes[j], options);
            }
            if (message.inventory != null && message.hasOwnProperty("inventory"))
                object.inventory = $root.dd.Inventory.toObject(message.inventory, options);
            if (message.health != null && message.hasOwnProperty("health"))
                object.health = $root.dd.HealthPreset.toObject(message.health, options);
            if (message.playerCreatable != null && message.hasOwnProperty("playerCreatable"))
                object.playerCreatable = message.playerCreatable;
            return object;
        };

        /**
         * Converts this EntityPreset to JSON.
         * @function toJSON
         * @memberof dd.EntityPreset
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EntityPreset.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return EntityPreset;
    })();

    dd.EntityAttribute = (function() {

        /**
         * Properties of an EntityAttribute.
         * @memberof dd
         * @interface IEntityAttribute
         * @property {string|null} [name] EntityAttribute name
         * @property {string|null} [description] EntityAttribute description
         * @property {string|null} [imageId] EntityAttribute imageId
         * @property {string|null} [defaultValue] EntityAttribute defaultValue
         * @property {number|null} [type] EntityAttribute type
         * @property {Array.<string>|null} [options] EntityAttribute options
         * @property {number|null} ["class"] EntityAttribute class
         * @property {boolean|null} [required] EntityAttribute required
         * @property {number|Long|null} [max] EntityAttribute max
         * @property {number|Long|null} [min] EntityAttribute min
         */

        /**
         * Constructs a new EntityAttribute.
         * @memberof dd
         * @classdesc Represents an EntityAttribute.
         * @implements IEntityAttribute
         * @constructor
         * @param {dd.IEntityAttribute=} [properties] Properties to set
         */
        function EntityAttribute(properties) {
            this.options = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * EntityAttribute name.
         * @member {string} name
         * @memberof dd.EntityAttribute
         * @instance
         */
        EntityAttribute.prototype.name = "";

        /**
         * EntityAttribute description.
         * @member {string} description
         * @memberof dd.EntityAttribute
         * @instance
         */
        EntityAttribute.prototype.description = "";

        /**
         * EntityAttribute imageId.
         * @member {string} imageId
         * @memberof dd.EntityAttribute
         * @instance
         */
        EntityAttribute.prototype.imageId = "";

        /**
         * EntityAttribute defaultValue.
         * @member {string} defaultValue
         * @memberof dd.EntityAttribute
         * @instance
         */
        EntityAttribute.prototype.defaultValue = "";

        /**
         * EntityAttribute type.
         * @member {number} type
         * @memberof dd.EntityAttribute
         * @instance
         */
        EntityAttribute.prototype.type = 0;

        /**
         * EntityAttribute options.
         * @member {Array.<string>} options
         * @memberof dd.EntityAttribute
         * @instance
         */
        EntityAttribute.prototype.options = $util.emptyArray;

        /**
         * EntityAttribute class.
         * @member {number} class
         * @memberof dd.EntityAttribute
         * @instance
         */
        EntityAttribute.prototype["class"] = 0;

        /**
         * EntityAttribute required.
         * @member {boolean} required
         * @memberof dd.EntityAttribute
         * @instance
         */
        EntityAttribute.prototype.required = false;

        /**
         * EntityAttribute max.
         * @member {number|Long} max
         * @memberof dd.EntityAttribute
         * @instance
         */
        EntityAttribute.prototype.max = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * EntityAttribute min.
         * @member {number|Long} min
         * @memberof dd.EntityAttribute
         * @instance
         */
        EntityAttribute.prototype.min = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new EntityAttribute instance using the specified properties.
         * @function create
         * @memberof dd.EntityAttribute
         * @static
         * @param {dd.IEntityAttribute=} [properties] Properties to set
         * @returns {dd.EntityAttribute} EntityAttribute instance
         */
        EntityAttribute.create = function create(properties) {
            return new EntityAttribute(properties);
        };

        /**
         * Encodes the specified EntityAttribute message. Does not implicitly {@link dd.EntityAttribute.verify|verify} messages.
         * @function encode
         * @memberof dd.EntityAttribute
         * @static
         * @param {dd.IEntityAttribute} message EntityAttribute message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EntityAttribute.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.name != null && message.hasOwnProperty("name"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
            if (message.description != null && message.hasOwnProperty("description"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.description);
            if (message.imageId != null && message.hasOwnProperty("imageId"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.imageId);
            if (message.defaultValue != null && message.hasOwnProperty("defaultValue"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.defaultValue);
            if (message.type != null && message.hasOwnProperty("type"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.type);
            if (message.options != null && message.options.length)
                for (var i = 0; i < message.options.length; ++i)
                    writer.uint32(/* id 6, wireType 2 =*/50).string(message.options[i]);
            if (message["class"] != null && message.hasOwnProperty("class"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message["class"]);
            if (message.required != null && message.hasOwnProperty("required"))
                writer.uint32(/* id 8, wireType 0 =*/64).bool(message.required);
            if (message.max != null && message.hasOwnProperty("max"))
                writer.uint32(/* id 9, wireType 0 =*/72).int64(message.max);
            if (message.min != null && message.hasOwnProperty("min"))
                writer.uint32(/* id 10, wireType 0 =*/80).int64(message.min);
            return writer;
        };

        /**
         * Encodes the specified EntityAttribute message, length delimited. Does not implicitly {@link dd.EntityAttribute.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dd.EntityAttribute
         * @static
         * @param {dd.IEntityAttribute} message EntityAttribute message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EntityAttribute.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an EntityAttribute message from the specified reader or buffer.
         * @function decode
         * @memberof dd.EntityAttribute
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dd.EntityAttribute} EntityAttribute
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EntityAttribute.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dd.EntityAttribute();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                case 2:
                    message.description = reader.string();
                    break;
                case 3:
                    message.imageId = reader.string();
                    break;
                case 4:
                    message.defaultValue = reader.string();
                    break;
                case 5:
                    message.type = reader.int32();
                    break;
                case 6:
                    if (!(message.options && message.options.length))
                        message.options = [];
                    message.options.push(reader.string());
                    break;
                case 7:
                    message["class"] = reader.int32();
                    break;
                case 8:
                    message.required = reader.bool();
                    break;
                case 9:
                    message.max = reader.int64();
                    break;
                case 10:
                    message.min = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an EntityAttribute message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dd.EntityAttribute
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dd.EntityAttribute} EntityAttribute
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EntityAttribute.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an EntityAttribute message.
         * @function verify
         * @memberof dd.EntityAttribute
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        EntityAttribute.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.description != null && message.hasOwnProperty("description"))
                if (!$util.isString(message.description))
                    return "description: string expected";
            if (message.imageId != null && message.hasOwnProperty("imageId"))
                if (!$util.isString(message.imageId))
                    return "imageId: string expected";
            if (message.defaultValue != null && message.hasOwnProperty("defaultValue"))
                if (!$util.isString(message.defaultValue))
                    return "defaultValue: string expected";
            if (message.type != null && message.hasOwnProperty("type"))
                if (!$util.isInteger(message.type))
                    return "type: integer expected";
            if (message.options != null && message.hasOwnProperty("options")) {
                if (!Array.isArray(message.options))
                    return "options: array expected";
                for (var i = 0; i < message.options.length; ++i)
                    if (!$util.isString(message.options[i]))
                        return "options: string[] expected";
            }
            if (message["class"] != null && message.hasOwnProperty("class"))
                if (!$util.isInteger(message["class"]))
                    return "class: integer expected";
            if (message.required != null && message.hasOwnProperty("required"))
                if (typeof message.required !== "boolean")
                    return "required: boolean expected";
            if (message.max != null && message.hasOwnProperty("max"))
                if (!$util.isInteger(message.max) && !(message.max && $util.isInteger(message.max.low) && $util.isInteger(message.max.high)))
                    return "max: integer|Long expected";
            if (message.min != null && message.hasOwnProperty("min"))
                if (!$util.isInteger(message.min) && !(message.min && $util.isInteger(message.min.low) && $util.isInteger(message.min.high)))
                    return "min: integer|Long expected";
            return null;
        };

        /**
         * Creates an EntityAttribute message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof dd.EntityAttribute
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {dd.EntityAttribute} EntityAttribute
         */
        EntityAttribute.fromObject = function fromObject(object) {
            if (object instanceof $root.dd.EntityAttribute)
                return object;
            var message = new $root.dd.EntityAttribute();
            if (object.name != null)
                message.name = String(object.name);
            if (object.description != null)
                message.description = String(object.description);
            if (object.imageId != null)
                message.imageId = String(object.imageId);
            if (object.defaultValue != null)
                message.defaultValue = String(object.defaultValue);
            if (object.type != null)
                message.type = object.type | 0;
            if (object.options) {
                if (!Array.isArray(object.options))
                    throw TypeError(".dd.EntityAttribute.options: array expected");
                message.options = [];
                for (var i = 0; i < object.options.length; ++i)
                    message.options[i] = String(object.options[i]);
            }
            if (object["class"] != null)
                message["class"] = object["class"] | 0;
            if (object.required != null)
                message.required = Boolean(object.required);
            if (object.max != null)
                if ($util.Long)
                    (message.max = $util.Long.fromValue(object.max)).unsigned = false;
                else if (typeof object.max === "string")
                    message.max = parseInt(object.max, 10);
                else if (typeof object.max === "number")
                    message.max = object.max;
                else if (typeof object.max === "object")
                    message.max = new $util.LongBits(object.max.low >>> 0, object.max.high >>> 0).toNumber();
            if (object.min != null)
                if ($util.Long)
                    (message.min = $util.Long.fromValue(object.min)).unsigned = false;
                else if (typeof object.min === "string")
                    message.min = parseInt(object.min, 10);
                else if (typeof object.min === "number")
                    message.min = object.min;
                else if (typeof object.min === "object")
                    message.min = new $util.LongBits(object.min.low >>> 0, object.min.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from an EntityAttribute message. Also converts values to other types if specified.
         * @function toObject
         * @memberof dd.EntityAttribute
         * @static
         * @param {dd.EntityAttribute} message EntityAttribute
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EntityAttribute.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.options = [];
            if (options.defaults) {
                object.name = "";
                object.description = "";
                object.imageId = "";
                object.defaultValue = "";
                object.type = 0;
                object["class"] = 0;
                object.required = false;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.max = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.max = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.min = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.min = options.longs === String ? "0" : 0;
            }
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.description != null && message.hasOwnProperty("description"))
                object.description = message.description;
            if (message.imageId != null && message.hasOwnProperty("imageId"))
                object.imageId = message.imageId;
            if (message.defaultValue != null && message.hasOwnProperty("defaultValue"))
                object.defaultValue = message.defaultValue;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = message.type;
            if (message.options && message.options.length) {
                object.options = [];
                for (var j = 0; j < message.options.length; ++j)
                    object.options[j] = message.options[j];
            }
            if (message["class"] != null && message.hasOwnProperty("class"))
                object["class"] = message["class"];
            if (message.required != null && message.hasOwnProperty("required"))
                object.required = message.required;
            if (message.max != null && message.hasOwnProperty("max"))
                if (typeof message.max === "number")
                    object.max = options.longs === String ? String(message.max) : message.max;
                else
                    object.max = options.longs === String ? $util.Long.prototype.toString.call(message.max) : options.longs === Number ? new $util.LongBits(message.max.low >>> 0, message.max.high >>> 0).toNumber() : message.max;
            if (message.min != null && message.hasOwnProperty("min"))
                if (typeof message.min === "number")
                    object.min = options.longs === String ? String(message.min) : message.min;
                else
                    object.min = options.longs === String ? $util.Long.prototype.toString.call(message.min) : options.longs === Number ? new $util.LongBits(message.min.low >>> 0, message.min.high >>> 0).toNumber() : message.min;
            return object;
        };

        /**
         * Converts this EntityAttribute to JSON.
         * @function toJSON
         * @memberof dd.EntityAttribute
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EntityAttribute.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return EntityAttribute;
    })();

    dd.Item = (function() {

        /**
         * Properties of an Item.
         * @memberof dd
         * @interface IItem
         * @property {string|null} [id] Item id
         * @property {string|null} [name] Item name
         * @property {string|null} [description] Item description
         * @property {string|null} [imageId] Item imageId
         * @property {Array.<dd.IAttribute>|null} [attributes] Item attributes
         */

        /**
         * Constructs a new Item.
         * @memberof dd
         * @classdesc Represents an Item.
         * @implements IItem
         * @constructor
         * @param {dd.IItem=} [properties] Properties to set
         */
        function Item(properties) {
            this.attributes = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Item id.
         * @member {string} id
         * @memberof dd.Item
         * @instance
         */
        Item.prototype.id = "";

        /**
         * Item name.
         * @member {string} name
         * @memberof dd.Item
         * @instance
         */
        Item.prototype.name = "";

        /**
         * Item description.
         * @member {string} description
         * @memberof dd.Item
         * @instance
         */
        Item.prototype.description = "";

        /**
         * Item imageId.
         * @member {string} imageId
         * @memberof dd.Item
         * @instance
         */
        Item.prototype.imageId = "";

        /**
         * Item attributes.
         * @member {Array.<dd.IAttribute>} attributes
         * @memberof dd.Item
         * @instance
         */
        Item.prototype.attributes = $util.emptyArray;

        /**
         * Creates a new Item instance using the specified properties.
         * @function create
         * @memberof dd.Item
         * @static
         * @param {dd.IItem=} [properties] Properties to set
         * @returns {dd.Item} Item instance
         */
        Item.create = function create(properties) {
            return new Item(properties);
        };

        /**
         * Encodes the specified Item message. Does not implicitly {@link dd.Item.verify|verify} messages.
         * @function encode
         * @memberof dd.Item
         * @static
         * @param {dd.IItem} message Item message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Item.encode = function encode(message, writer) {
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
            if (message.attributes != null && message.attributes.length)
                for (var i = 0; i < message.attributes.length; ++i)
                    $root.dd.Attribute.encode(message.attributes[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Item message, length delimited. Does not implicitly {@link dd.Item.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dd.Item
         * @static
         * @param {dd.IItem} message Item message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Item.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Item message from the specified reader or buffer.
         * @function decode
         * @memberof dd.Item
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dd.Item} Item
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Item.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dd.Item();
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
                case 5:
                    if (!(message.attributes && message.attributes.length))
                        message.attributes = [];
                    message.attributes.push($root.dd.Attribute.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Item message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dd.Item
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dd.Item} Item
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Item.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Item message.
         * @function verify
         * @memberof dd.Item
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Item.verify = function verify(message) {
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
            if (message.attributes != null && message.hasOwnProperty("attributes")) {
                if (!Array.isArray(message.attributes))
                    return "attributes: array expected";
                for (var i = 0; i < message.attributes.length; ++i) {
                    var error = $root.dd.Attribute.verify(message.attributes[i]);
                    if (error)
                        return "attributes." + error;
                }
            }
            return null;
        };

        /**
         * Creates an Item message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof dd.Item
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {dd.Item} Item
         */
        Item.fromObject = function fromObject(object) {
            if (object instanceof $root.dd.Item)
                return object;
            var message = new $root.dd.Item();
            if (object.id != null)
                message.id = String(object.id);
            if (object.name != null)
                message.name = String(object.name);
            if (object.description != null)
                message.description = String(object.description);
            if (object.imageId != null)
                message.imageId = String(object.imageId);
            if (object.attributes) {
                if (!Array.isArray(object.attributes))
                    throw TypeError(".dd.Item.attributes: array expected");
                message.attributes = [];
                for (var i = 0; i < object.attributes.length; ++i) {
                    if (typeof object.attributes[i] !== "object")
                        throw TypeError(".dd.Item.attributes: object expected");
                    message.attributes[i] = $root.dd.Attribute.fromObject(object.attributes[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from an Item message. Also converts values to other types if specified.
         * @function toObject
         * @memberof dd.Item
         * @static
         * @param {dd.Item} message Item
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Item.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.attributes = [];
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
            if (message.attributes && message.attributes.length) {
                object.attributes = [];
                for (var j = 0; j < message.attributes.length; ++j)
                    object.attributes[j] = $root.dd.Attribute.toObject(message.attributes[j], options);
            }
            return object;
        };

        /**
         * Converts this Item to JSON.
         * @function toJSON
         * @memberof dd.Item
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Item.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Item;
    })();

    dd.Inventory = (function() {

        /**
         * Properties of an Inventory.
         * @memberof dd
         * @interface IInventory
         * @property {Array.<dd.IInventoryItem>|null} [items] Inventory items
         */

        /**
         * Constructs a new Inventory.
         * @memberof dd
         * @classdesc Represents an Inventory.
         * @implements IInventory
         * @constructor
         * @param {dd.IInventory=} [properties] Properties to set
         */
        function Inventory(properties) {
            this.items = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Inventory items.
         * @member {Array.<dd.IInventoryItem>} items
         * @memberof dd.Inventory
         * @instance
         */
        Inventory.prototype.items = $util.emptyArray;

        /**
         * Creates a new Inventory instance using the specified properties.
         * @function create
         * @memberof dd.Inventory
         * @static
         * @param {dd.IInventory=} [properties] Properties to set
         * @returns {dd.Inventory} Inventory instance
         */
        Inventory.create = function create(properties) {
            return new Inventory(properties);
        };

        /**
         * Encodes the specified Inventory message. Does not implicitly {@link dd.Inventory.verify|verify} messages.
         * @function encode
         * @memberof dd.Inventory
         * @static
         * @param {dd.IInventory} message Inventory message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Inventory.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.items != null && message.items.length)
                for (var i = 0; i < message.items.length; ++i)
                    $root.dd.InventoryItem.encode(message.items[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Inventory message, length delimited. Does not implicitly {@link dd.Inventory.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dd.Inventory
         * @static
         * @param {dd.IInventory} message Inventory message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Inventory.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Inventory message from the specified reader or buffer.
         * @function decode
         * @memberof dd.Inventory
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dd.Inventory} Inventory
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Inventory.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dd.Inventory();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.items && message.items.length))
                        message.items = [];
                    message.items.push($root.dd.InventoryItem.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Inventory message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dd.Inventory
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dd.Inventory} Inventory
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Inventory.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Inventory message.
         * @function verify
         * @memberof dd.Inventory
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Inventory.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.items != null && message.hasOwnProperty("items")) {
                if (!Array.isArray(message.items))
                    return "items: array expected";
                for (var i = 0; i < message.items.length; ++i) {
                    var error = $root.dd.InventoryItem.verify(message.items[i]);
                    if (error)
                        return "items." + error;
                }
            }
            return null;
        };

        /**
         * Creates an Inventory message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof dd.Inventory
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {dd.Inventory} Inventory
         */
        Inventory.fromObject = function fromObject(object) {
            if (object instanceof $root.dd.Inventory)
                return object;
            var message = new $root.dd.Inventory();
            if (object.items) {
                if (!Array.isArray(object.items))
                    throw TypeError(".dd.Inventory.items: array expected");
                message.items = [];
                for (var i = 0; i < object.items.length; ++i) {
                    if (typeof object.items[i] !== "object")
                        throw TypeError(".dd.Inventory.items: object expected");
                    message.items[i] = $root.dd.InventoryItem.fromObject(object.items[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from an Inventory message. Also converts values to other types if specified.
         * @function toObject
         * @memberof dd.Inventory
         * @static
         * @param {dd.Inventory} message Inventory
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Inventory.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.items = [];
            if (message.items && message.items.length) {
                object.items = [];
                for (var j = 0; j < message.items.length; ++j)
                    object.items[j] = $root.dd.InventoryItem.toObject(message.items[j], options);
            }
            return object;
        };

        /**
         * Converts this Inventory to JSON.
         * @function toJSON
         * @memberof dd.Inventory
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Inventory.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Inventory;
    })();

    dd.InventoryItem = (function() {

        /**
         * Properties of an InventoryItem.
         * @memberof dd
         * @interface IInventoryItem
         * @property {dd.IItem|null} [item] InventoryItem item
         * @property {number|Long|null} [quantity] InventoryItem quantity
         */

        /**
         * Constructs a new InventoryItem.
         * @memberof dd
         * @classdesc Represents an InventoryItem.
         * @implements IInventoryItem
         * @constructor
         * @param {dd.IInventoryItem=} [properties] Properties to set
         */
        function InventoryItem(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * InventoryItem item.
         * @member {dd.IItem|null|undefined} item
         * @memberof dd.InventoryItem
         * @instance
         */
        InventoryItem.prototype.item = null;

        /**
         * InventoryItem quantity.
         * @member {number|Long} quantity
         * @memberof dd.InventoryItem
         * @instance
         */
        InventoryItem.prototype.quantity = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new InventoryItem instance using the specified properties.
         * @function create
         * @memberof dd.InventoryItem
         * @static
         * @param {dd.IInventoryItem=} [properties] Properties to set
         * @returns {dd.InventoryItem} InventoryItem instance
         */
        InventoryItem.create = function create(properties) {
            return new InventoryItem(properties);
        };

        /**
         * Encodes the specified InventoryItem message. Does not implicitly {@link dd.InventoryItem.verify|verify} messages.
         * @function encode
         * @memberof dd.InventoryItem
         * @static
         * @param {dd.IInventoryItem} message InventoryItem message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        InventoryItem.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.item != null && message.hasOwnProperty("item"))
                $root.dd.Item.encode(message.item, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.quantity != null && message.hasOwnProperty("quantity"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.quantity);
            return writer;
        };

        /**
         * Encodes the specified InventoryItem message, length delimited. Does not implicitly {@link dd.InventoryItem.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dd.InventoryItem
         * @static
         * @param {dd.IInventoryItem} message InventoryItem message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        InventoryItem.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an InventoryItem message from the specified reader or buffer.
         * @function decode
         * @memberof dd.InventoryItem
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dd.InventoryItem} InventoryItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        InventoryItem.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dd.InventoryItem();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.item = $root.dd.Item.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.quantity = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an InventoryItem message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dd.InventoryItem
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dd.InventoryItem} InventoryItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        InventoryItem.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an InventoryItem message.
         * @function verify
         * @memberof dd.InventoryItem
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        InventoryItem.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.item != null && message.hasOwnProperty("item")) {
                var error = $root.dd.Item.verify(message.item);
                if (error)
                    return "item." + error;
            }
            if (message.quantity != null && message.hasOwnProperty("quantity"))
                if (!$util.isInteger(message.quantity) && !(message.quantity && $util.isInteger(message.quantity.low) && $util.isInteger(message.quantity.high)))
                    return "quantity: integer|Long expected";
            return null;
        };

        /**
         * Creates an InventoryItem message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof dd.InventoryItem
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {dd.InventoryItem} InventoryItem
         */
        InventoryItem.fromObject = function fromObject(object) {
            if (object instanceof $root.dd.InventoryItem)
                return object;
            var message = new $root.dd.InventoryItem();
            if (object.item != null) {
                if (typeof object.item !== "object")
                    throw TypeError(".dd.InventoryItem.item: object expected");
                message.item = $root.dd.Item.fromObject(object.item);
            }
            if (object.quantity != null)
                if ($util.Long)
                    (message.quantity = $util.Long.fromValue(object.quantity)).unsigned = false;
                else if (typeof object.quantity === "string")
                    message.quantity = parseInt(object.quantity, 10);
                else if (typeof object.quantity === "number")
                    message.quantity = object.quantity;
                else if (typeof object.quantity === "object")
                    message.quantity = new $util.LongBits(object.quantity.low >>> 0, object.quantity.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from an InventoryItem message. Also converts values to other types if specified.
         * @function toObject
         * @memberof dd.InventoryItem
         * @static
         * @param {dd.InventoryItem} message InventoryItem
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        InventoryItem.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.item = null;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.quantity = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.quantity = options.longs === String ? "0" : 0;
            }
            if (message.item != null && message.hasOwnProperty("item"))
                object.item = $root.dd.Item.toObject(message.item, options);
            if (message.quantity != null && message.hasOwnProperty("quantity"))
                if (typeof message.quantity === "number")
                    object.quantity = options.longs === String ? String(message.quantity) : message.quantity;
                else
                    object.quantity = options.longs === String ? $util.Long.prototype.toString.call(message.quantity) : options.longs === Number ? new $util.LongBits(message.quantity.low >>> 0, message.quantity.high >>> 0).toNumber() : message.quantity;
            return object;
        };

        /**
         * Converts this InventoryItem to JSON.
         * @function toJSON
         * @memberof dd.InventoryItem
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        InventoryItem.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return InventoryItem;
    })();

    dd.Attribute = (function() {

        /**
         * Properties of an Attribute.
         * @memberof dd
         * @interface IAttribute
         * @property {string|null} [name] Attribute name
         * @property {number|null} [type] Attribute type
         * @property {string|null} [data] Attribute data
         */

        /**
         * Constructs a new Attribute.
         * @memberof dd
         * @classdesc Represents an Attribute.
         * @implements IAttribute
         * @constructor
         * @param {dd.IAttribute=} [properties] Properties to set
         */
        function Attribute(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Attribute name.
         * @member {string} name
         * @memberof dd.Attribute
         * @instance
         */
        Attribute.prototype.name = "";

        /**
         * Attribute type.
         * @member {number} type
         * @memberof dd.Attribute
         * @instance
         */
        Attribute.prototype.type = 0;

        /**
         * Attribute data.
         * @member {string} data
         * @memberof dd.Attribute
         * @instance
         */
        Attribute.prototype.data = "";

        /**
         * Creates a new Attribute instance using the specified properties.
         * @function create
         * @memberof dd.Attribute
         * @static
         * @param {dd.IAttribute=} [properties] Properties to set
         * @returns {dd.Attribute} Attribute instance
         */
        Attribute.create = function create(properties) {
            return new Attribute(properties);
        };

        /**
         * Encodes the specified Attribute message. Does not implicitly {@link dd.Attribute.verify|verify} messages.
         * @function encode
         * @memberof dd.Attribute
         * @static
         * @param {dd.IAttribute} message Attribute message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Attribute.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.name != null && message.hasOwnProperty("name"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
            if (message.type != null && message.hasOwnProperty("type"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.type);
            if (message.data != null && message.hasOwnProperty("data"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.data);
            return writer;
        };

        /**
         * Encodes the specified Attribute message, length delimited. Does not implicitly {@link dd.Attribute.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dd.Attribute
         * @static
         * @param {dd.IAttribute} message Attribute message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Attribute.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Attribute message from the specified reader or buffer.
         * @function decode
         * @memberof dd.Attribute
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dd.Attribute} Attribute
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Attribute.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dd.Attribute();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                case 2:
                    message.type = reader.int32();
                    break;
                case 3:
                    message.data = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Attribute message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dd.Attribute
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dd.Attribute} Attribute
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Attribute.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Attribute message.
         * @function verify
         * @memberof dd.Attribute
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Attribute.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.type != null && message.hasOwnProperty("type"))
                if (!$util.isInteger(message.type))
                    return "type: integer expected";
            if (message.data != null && message.hasOwnProperty("data"))
                if (!$util.isString(message.data))
                    return "data: string expected";
            return null;
        };

        /**
         * Creates an Attribute message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof dd.Attribute
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {dd.Attribute} Attribute
         */
        Attribute.fromObject = function fromObject(object) {
            if (object instanceof $root.dd.Attribute)
                return object;
            var message = new $root.dd.Attribute();
            if (object.name != null)
                message.name = String(object.name);
            if (object.type != null)
                message.type = object.type | 0;
            if (object.data != null)
                message.data = String(object.data);
            return message;
        };

        /**
         * Creates a plain object from an Attribute message. Also converts values to other types if specified.
         * @function toObject
         * @memberof dd.Attribute
         * @static
         * @param {dd.Attribute} message Attribute
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Attribute.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.name = "";
                object.type = 0;
                object.data = "";
            }
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = message.type;
            if (message.data != null && message.hasOwnProperty("data"))
                object.data = message.data;
            return object;
        };

        /**
         * Converts this Attribute to JSON.
         * @function toJSON
         * @memberof dd.Attribute
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Attribute.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Attribute;
    })();

    dd.CampaignUser = (function() {

        /**
         * Properties of a CampaignUser.
         * @memberof dd
         * @interface ICampaignUser
         * @property {dd.IUser|null} [user] CampaignUser user
         * @property {boolean|null} [isAdmin] CampaignUser isAdmin
         */

        /**
         * Constructs a new CampaignUser.
         * @memberof dd
         * @classdesc Represents a CampaignUser.
         * @implements ICampaignUser
         * @constructor
         * @param {dd.ICampaignUser=} [properties] Properties to set
         */
        function CampaignUser(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CampaignUser user.
         * @member {dd.IUser|null|undefined} user
         * @memberof dd.CampaignUser
         * @instance
         */
        CampaignUser.prototype.user = null;

        /**
         * CampaignUser isAdmin.
         * @member {boolean} isAdmin
         * @memberof dd.CampaignUser
         * @instance
         */
        CampaignUser.prototype.isAdmin = false;

        /**
         * Creates a new CampaignUser instance using the specified properties.
         * @function create
         * @memberof dd.CampaignUser
         * @static
         * @param {dd.ICampaignUser=} [properties] Properties to set
         * @returns {dd.CampaignUser} CampaignUser instance
         */
        CampaignUser.create = function create(properties) {
            return new CampaignUser(properties);
        };

        /**
         * Encodes the specified CampaignUser message. Does not implicitly {@link dd.CampaignUser.verify|verify} messages.
         * @function encode
         * @memberof dd.CampaignUser
         * @static
         * @param {dd.ICampaignUser} message CampaignUser message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CampaignUser.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.user != null && message.hasOwnProperty("user"))
                $root.dd.User.encode(message.user, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.isAdmin != null && message.hasOwnProperty("isAdmin"))
                writer.uint32(/* id 2, wireType 0 =*/16).bool(message.isAdmin);
            return writer;
        };

        /**
         * Encodes the specified CampaignUser message, length delimited. Does not implicitly {@link dd.CampaignUser.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dd.CampaignUser
         * @static
         * @param {dd.ICampaignUser} message CampaignUser message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CampaignUser.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CampaignUser message from the specified reader or buffer.
         * @function decode
         * @memberof dd.CampaignUser
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dd.CampaignUser} CampaignUser
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CampaignUser.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dd.CampaignUser();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.user = $root.dd.User.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.isAdmin = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CampaignUser message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dd.CampaignUser
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dd.CampaignUser} CampaignUser
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CampaignUser.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CampaignUser message.
         * @function verify
         * @memberof dd.CampaignUser
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CampaignUser.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.user != null && message.hasOwnProperty("user")) {
                var error = $root.dd.User.verify(message.user);
                if (error)
                    return "user." + error;
            }
            if (message.isAdmin != null && message.hasOwnProperty("isAdmin"))
                if (typeof message.isAdmin !== "boolean")
                    return "isAdmin: boolean expected";
            return null;
        };

        /**
         * Creates a CampaignUser message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof dd.CampaignUser
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {dd.CampaignUser} CampaignUser
         */
        CampaignUser.fromObject = function fromObject(object) {
            if (object instanceof $root.dd.CampaignUser)
                return object;
            var message = new $root.dd.CampaignUser();
            if (object.user != null) {
                if (typeof object.user !== "object")
                    throw TypeError(".dd.CampaignUser.user: object expected");
                message.user = $root.dd.User.fromObject(object.user);
            }
            if (object.isAdmin != null)
                message.isAdmin = Boolean(object.isAdmin);
            return message;
        };

        /**
         * Creates a plain object from a CampaignUser message. Also converts values to other types if specified.
         * @function toObject
         * @memberof dd.CampaignUser
         * @static
         * @param {dd.CampaignUser} message CampaignUser
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CampaignUser.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.user = null;
                object.isAdmin = false;
            }
            if (message.user != null && message.hasOwnProperty("user"))
                object.user = $root.dd.User.toObject(message.user, options);
            if (message.isAdmin != null && message.hasOwnProperty("isAdmin"))
                object.isAdmin = message.isAdmin;
            return object;
        };

        /**
         * Converts this CampaignUser to JSON.
         * @function toJSON
         * @memberof dd.CampaignUser
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CampaignUser.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CampaignUser;
    })();

    dd.HealthPreset = (function() {

        /**
         * Properties of a HealthPreset.
         * @memberof dd
         * @interface IHealthPreset
         * @property {number|null} [mode] HealthPreset mode
         * @property {number|Long|null} [max] HealthPreset max
         */

        /**
         * Constructs a new HealthPreset.
         * @memberof dd
         * @classdesc Represents a HealthPreset.
         * @implements IHealthPreset
         * @constructor
         * @param {dd.IHealthPreset=} [properties] Properties to set
         */
        function HealthPreset(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * HealthPreset mode.
         * @member {number} mode
         * @memberof dd.HealthPreset
         * @instance
         */
        HealthPreset.prototype.mode = 0;

        /**
         * HealthPreset max.
         * @member {number|Long} max
         * @memberof dd.HealthPreset
         * @instance
         */
        HealthPreset.prototype.max = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new HealthPreset instance using the specified properties.
         * @function create
         * @memberof dd.HealthPreset
         * @static
         * @param {dd.IHealthPreset=} [properties] Properties to set
         * @returns {dd.HealthPreset} HealthPreset instance
         */
        HealthPreset.create = function create(properties) {
            return new HealthPreset(properties);
        };

        /**
         * Encodes the specified HealthPreset message. Does not implicitly {@link dd.HealthPreset.verify|verify} messages.
         * @function encode
         * @memberof dd.HealthPreset
         * @static
         * @param {dd.IHealthPreset} message HealthPreset message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HealthPreset.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.mode != null && message.hasOwnProperty("mode"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.mode);
            if (message.max != null && message.hasOwnProperty("max"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.max);
            return writer;
        };

        /**
         * Encodes the specified HealthPreset message, length delimited. Does not implicitly {@link dd.HealthPreset.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dd.HealthPreset
         * @static
         * @param {dd.IHealthPreset} message HealthPreset message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HealthPreset.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a HealthPreset message from the specified reader or buffer.
         * @function decode
         * @memberof dd.HealthPreset
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dd.HealthPreset} HealthPreset
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HealthPreset.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dd.HealthPreset();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.mode = reader.int32();
                    break;
                case 2:
                    message.max = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a HealthPreset message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dd.HealthPreset
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dd.HealthPreset} HealthPreset
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HealthPreset.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a HealthPreset message.
         * @function verify
         * @memberof dd.HealthPreset
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        HealthPreset.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.mode != null && message.hasOwnProperty("mode"))
                if (!$util.isInteger(message.mode))
                    return "mode: integer expected";
            if (message.max != null && message.hasOwnProperty("max"))
                if (!$util.isInteger(message.max) && !(message.max && $util.isInteger(message.max.low) && $util.isInteger(message.max.high)))
                    return "max: integer|Long expected";
            return null;
        };

        /**
         * Creates a HealthPreset message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof dd.HealthPreset
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {dd.HealthPreset} HealthPreset
         */
        HealthPreset.fromObject = function fromObject(object) {
            if (object instanceof $root.dd.HealthPreset)
                return object;
            var message = new $root.dd.HealthPreset();
            if (object.mode != null)
                message.mode = object.mode | 0;
            if (object.max != null)
                if ($util.Long)
                    (message.max = $util.Long.fromValue(object.max)).unsigned = false;
                else if (typeof object.max === "string")
                    message.max = parseInt(object.max, 10);
                else if (typeof object.max === "number")
                    message.max = object.max;
                else if (typeof object.max === "object")
                    message.max = new $util.LongBits(object.max.low >>> 0, object.max.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a HealthPreset message. Also converts values to other types if specified.
         * @function toObject
         * @memberof dd.HealthPreset
         * @static
         * @param {dd.HealthPreset} message HealthPreset
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        HealthPreset.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.mode = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.max = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.max = options.longs === String ? "0" : 0;
            }
            if (message.mode != null && message.hasOwnProperty("mode"))
                object.mode = message.mode;
            if (message.max != null && message.hasOwnProperty("max"))
                if (typeof message.max === "number")
                    object.max = options.longs === String ? String(message.max) : message.max;
                else
                    object.max = options.longs === String ? $util.Long.prototype.toString.call(message.max) : options.longs === Number ? new $util.LongBits(message.max.low >>> 0, message.max.high >>> 0).toNumber() : message.max;
            return object;
        };

        /**
         * Converts this HealthPreset to JSON.
         * @function toJSON
         * @memberof dd.HealthPreset
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        HealthPreset.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return HealthPreset;
    })();

    dd.Health = (function() {

        /**
         * Properties of a Health.
         * @memberof dd
         * @interface IHealth
         * @property {number|null} [mode] Health mode
         * @property {dd.Health.INormal|null} [normal] Health normal
         * @property {dd.Health.IMultiBar|null} [multiBar] Health multiBar
         */

        /**
         * Constructs a new Health.
         * @memberof dd
         * @classdesc Represents a Health.
         * @implements IHealth
         * @constructor
         * @param {dd.IHealth=} [properties] Properties to set
         */
        function Health(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Health mode.
         * @member {number} mode
         * @memberof dd.Health
         * @instance
         */
        Health.prototype.mode = 0;

        /**
         * Health normal.
         * @member {dd.Health.INormal|null|undefined} normal
         * @memberof dd.Health
         * @instance
         */
        Health.prototype.normal = null;

        /**
         * Health multiBar.
         * @member {dd.Health.IMultiBar|null|undefined} multiBar
         * @memberof dd.Health
         * @instance
         */
        Health.prototype.multiBar = null;

        /**
         * Creates a new Health instance using the specified properties.
         * @function create
         * @memberof dd.Health
         * @static
         * @param {dd.IHealth=} [properties] Properties to set
         * @returns {dd.Health} Health instance
         */
        Health.create = function create(properties) {
            return new Health(properties);
        };

        /**
         * Encodes the specified Health message. Does not implicitly {@link dd.Health.verify|verify} messages.
         * @function encode
         * @memberof dd.Health
         * @static
         * @param {dd.IHealth} message Health message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Health.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.mode != null && message.hasOwnProperty("mode"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.mode);
            if (message.normal != null && message.hasOwnProperty("normal"))
                $root.dd.Health.Normal.encode(message.normal, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.multiBar != null && message.hasOwnProperty("multiBar"))
                $root.dd.Health.MultiBar.encode(message.multiBar, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Health message, length delimited. Does not implicitly {@link dd.Health.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dd.Health
         * @static
         * @param {dd.IHealth} message Health message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Health.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Health message from the specified reader or buffer.
         * @function decode
         * @memberof dd.Health
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dd.Health} Health
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Health.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dd.Health();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.mode = reader.int32();
                    break;
                case 2:
                    message.normal = $root.dd.Health.Normal.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.multiBar = $root.dd.Health.MultiBar.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Health message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dd.Health
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dd.Health} Health
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Health.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Health message.
         * @function verify
         * @memberof dd.Health
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Health.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.mode != null && message.hasOwnProperty("mode"))
                if (!$util.isInteger(message.mode))
                    return "mode: integer expected";
            if (message.normal != null && message.hasOwnProperty("normal")) {
                var error = $root.dd.Health.Normal.verify(message.normal);
                if (error)
                    return "normal." + error;
            }
            if (message.multiBar != null && message.hasOwnProperty("multiBar")) {
                var error = $root.dd.Health.MultiBar.verify(message.multiBar);
                if (error)
                    return "multiBar." + error;
            }
            return null;
        };

        /**
         * Creates a Health message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof dd.Health
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {dd.Health} Health
         */
        Health.fromObject = function fromObject(object) {
            if (object instanceof $root.dd.Health)
                return object;
            var message = new $root.dd.Health();
            if (object.mode != null)
                message.mode = object.mode | 0;
            if (object.normal != null) {
                if (typeof object.normal !== "object")
                    throw TypeError(".dd.Health.normal: object expected");
                message.normal = $root.dd.Health.Normal.fromObject(object.normal);
            }
            if (object.multiBar != null) {
                if (typeof object.multiBar !== "object")
                    throw TypeError(".dd.Health.multiBar: object expected");
                message.multiBar = $root.dd.Health.MultiBar.fromObject(object.multiBar);
            }
            return message;
        };

        /**
         * Creates a plain object from a Health message. Also converts values to other types if specified.
         * @function toObject
         * @memberof dd.Health
         * @static
         * @param {dd.Health} message Health
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Health.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.mode = 0;
                object.normal = null;
                object.multiBar = null;
            }
            if (message.mode != null && message.hasOwnProperty("mode"))
                object.mode = message.mode;
            if (message.normal != null && message.hasOwnProperty("normal"))
                object.normal = $root.dd.Health.Normal.toObject(message.normal, options);
            if (message.multiBar != null && message.hasOwnProperty("multiBar"))
                object.multiBar = $root.dd.Health.MultiBar.toObject(message.multiBar, options);
            return object;
        };

        /**
         * Converts this Health to JSON.
         * @function toJSON
         * @memberof dd.Health
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Health.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        Health.Normal = (function() {

            /**
             * Properties of a Normal.
             * @memberof dd.Health
             * @interface INormal
             * @property {number|Long|null} [max] Normal max
             * @property {number|Long|null} [current] Normal current
             * @property {number|Long|null} [temp] Normal temp
             */

            /**
             * Constructs a new Normal.
             * @memberof dd.Health
             * @classdesc Represents a Normal.
             * @implements INormal
             * @constructor
             * @param {dd.Health.INormal=} [properties] Properties to set
             */
            function Normal(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Normal max.
             * @member {number|Long} max
             * @memberof dd.Health.Normal
             * @instance
             */
            Normal.prototype.max = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Normal current.
             * @member {number|Long} current
             * @memberof dd.Health.Normal
             * @instance
             */
            Normal.prototype.current = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Normal temp.
             * @member {number|Long} temp
             * @memberof dd.Health.Normal
             * @instance
             */
            Normal.prototype.temp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Creates a new Normal instance using the specified properties.
             * @function create
             * @memberof dd.Health.Normal
             * @static
             * @param {dd.Health.INormal=} [properties] Properties to set
             * @returns {dd.Health.Normal} Normal instance
             */
            Normal.create = function create(properties) {
                return new Normal(properties);
            };

            /**
             * Encodes the specified Normal message. Does not implicitly {@link dd.Health.Normal.verify|verify} messages.
             * @function encode
             * @memberof dd.Health.Normal
             * @static
             * @param {dd.Health.INormal} message Normal message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Normal.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.max != null && message.hasOwnProperty("max"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.max);
                if (message.current != null && message.hasOwnProperty("current"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int64(message.current);
                if (message.temp != null && message.hasOwnProperty("temp"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int64(message.temp);
                return writer;
            };

            /**
             * Encodes the specified Normal message, length delimited. Does not implicitly {@link dd.Health.Normal.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dd.Health.Normal
             * @static
             * @param {dd.Health.INormal} message Normal message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Normal.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Normal message from the specified reader or buffer.
             * @function decode
             * @memberof dd.Health.Normal
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dd.Health.Normal} Normal
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Normal.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dd.Health.Normal();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.max = reader.int64();
                        break;
                    case 2:
                        message.current = reader.int64();
                        break;
                    case 3:
                        message.temp = reader.int64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Normal message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dd.Health.Normal
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dd.Health.Normal} Normal
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Normal.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Normal message.
             * @function verify
             * @memberof dd.Health.Normal
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Normal.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.max != null && message.hasOwnProperty("max"))
                    if (!$util.isInteger(message.max) && !(message.max && $util.isInteger(message.max.low) && $util.isInteger(message.max.high)))
                        return "max: integer|Long expected";
                if (message.current != null && message.hasOwnProperty("current"))
                    if (!$util.isInteger(message.current) && !(message.current && $util.isInteger(message.current.low) && $util.isInteger(message.current.high)))
                        return "current: integer|Long expected";
                if (message.temp != null && message.hasOwnProperty("temp"))
                    if (!$util.isInteger(message.temp) && !(message.temp && $util.isInteger(message.temp.low) && $util.isInteger(message.temp.high)))
                        return "temp: integer|Long expected";
                return null;
            };

            /**
             * Creates a Normal message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dd.Health.Normal
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dd.Health.Normal} Normal
             */
            Normal.fromObject = function fromObject(object) {
                if (object instanceof $root.dd.Health.Normal)
                    return object;
                var message = new $root.dd.Health.Normal();
                if (object.max != null)
                    if ($util.Long)
                        (message.max = $util.Long.fromValue(object.max)).unsigned = false;
                    else if (typeof object.max === "string")
                        message.max = parseInt(object.max, 10);
                    else if (typeof object.max === "number")
                        message.max = object.max;
                    else if (typeof object.max === "object")
                        message.max = new $util.LongBits(object.max.low >>> 0, object.max.high >>> 0).toNumber();
                if (object.current != null)
                    if ($util.Long)
                        (message.current = $util.Long.fromValue(object.current)).unsigned = false;
                    else if (typeof object.current === "string")
                        message.current = parseInt(object.current, 10);
                    else if (typeof object.current === "number")
                        message.current = object.current;
                    else if (typeof object.current === "object")
                        message.current = new $util.LongBits(object.current.low >>> 0, object.current.high >>> 0).toNumber();
                if (object.temp != null)
                    if ($util.Long)
                        (message.temp = $util.Long.fromValue(object.temp)).unsigned = false;
                    else if (typeof object.temp === "string")
                        message.temp = parseInt(object.temp, 10);
                    else if (typeof object.temp === "number")
                        message.temp = object.temp;
                    else if (typeof object.temp === "object")
                        message.temp = new $util.LongBits(object.temp.low >>> 0, object.temp.high >>> 0).toNumber();
                return message;
            };

            /**
             * Creates a plain object from a Normal message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dd.Health.Normal
             * @static
             * @param {dd.Health.Normal} message Normal
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Normal.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.max = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.max = options.longs === String ? "0" : 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.current = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.current = options.longs === String ? "0" : 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.temp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.temp = options.longs === String ? "0" : 0;
                }
                if (message.max != null && message.hasOwnProperty("max"))
                    if (typeof message.max === "number")
                        object.max = options.longs === String ? String(message.max) : message.max;
                    else
                        object.max = options.longs === String ? $util.Long.prototype.toString.call(message.max) : options.longs === Number ? new $util.LongBits(message.max.low >>> 0, message.max.high >>> 0).toNumber() : message.max;
                if (message.current != null && message.hasOwnProperty("current"))
                    if (typeof message.current === "number")
                        object.current = options.longs === String ? String(message.current) : message.current;
                    else
                        object.current = options.longs === String ? $util.Long.prototype.toString.call(message.current) : options.longs === Number ? new $util.LongBits(message.current.low >>> 0, message.current.high >>> 0).toNumber() : message.current;
                if (message.temp != null && message.hasOwnProperty("temp"))
                    if (typeof message.temp === "number")
                        object.temp = options.longs === String ? String(message.temp) : message.temp;
                    else
                        object.temp = options.longs === String ? $util.Long.prototype.toString.call(message.temp) : options.longs === Number ? new $util.LongBits(message.temp.low >>> 0, message.temp.high >>> 0).toNumber() : message.temp;
                return object;
            };

            /**
             * Converts this Normal to JSON.
             * @function toJSON
             * @memberof dd.Health.Normal
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Normal.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Normal;
        })();

        Health.MultiBar = (function() {

            /**
             * Properties of a MultiBar.
             * @memberof dd.Health
             * @interface IMultiBar
             * @property {Array.<number|Long>|null} [bars] MultiBar bars
             * @property {number|Long|null} [current] MultiBar current
             */

            /**
             * Constructs a new MultiBar.
             * @memberof dd.Health
             * @classdesc Represents a MultiBar.
             * @implements IMultiBar
             * @constructor
             * @param {dd.Health.IMultiBar=} [properties] Properties to set
             */
            function MultiBar(properties) {
                this.bars = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * MultiBar bars.
             * @member {Array.<number|Long>} bars
             * @memberof dd.Health.MultiBar
             * @instance
             */
            MultiBar.prototype.bars = $util.emptyArray;

            /**
             * MultiBar current.
             * @member {number|Long} current
             * @memberof dd.Health.MultiBar
             * @instance
             */
            MultiBar.prototype.current = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Creates a new MultiBar instance using the specified properties.
             * @function create
             * @memberof dd.Health.MultiBar
             * @static
             * @param {dd.Health.IMultiBar=} [properties] Properties to set
             * @returns {dd.Health.MultiBar} MultiBar instance
             */
            MultiBar.create = function create(properties) {
                return new MultiBar(properties);
            };

            /**
             * Encodes the specified MultiBar message. Does not implicitly {@link dd.Health.MultiBar.verify|verify} messages.
             * @function encode
             * @memberof dd.Health.MultiBar
             * @static
             * @param {dd.Health.IMultiBar} message MultiBar message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MultiBar.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.bars != null && message.bars.length) {
                    writer.uint32(/* id 1, wireType 2 =*/10).fork();
                    for (var i = 0; i < message.bars.length; ++i)
                        writer.int64(message.bars[i]);
                    writer.ldelim();
                }
                if (message.current != null && message.hasOwnProperty("current"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int64(message.current);
                return writer;
            };

            /**
             * Encodes the specified MultiBar message, length delimited. Does not implicitly {@link dd.Health.MultiBar.verify|verify} messages.
             * @function encodeDelimited
             * @memberof dd.Health.MultiBar
             * @static
             * @param {dd.Health.IMultiBar} message MultiBar message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MultiBar.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a MultiBar message from the specified reader or buffer.
             * @function decode
             * @memberof dd.Health.MultiBar
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {dd.Health.MultiBar} MultiBar
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MultiBar.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dd.Health.MultiBar();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.bars && message.bars.length))
                            message.bars = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.bars.push(reader.int64());
                        } else
                            message.bars.push(reader.int64());
                        break;
                    case 2:
                        message.current = reader.int64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a MultiBar message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof dd.Health.MultiBar
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {dd.Health.MultiBar} MultiBar
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MultiBar.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a MultiBar message.
             * @function verify
             * @memberof dd.Health.MultiBar
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            MultiBar.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.bars != null && message.hasOwnProperty("bars")) {
                    if (!Array.isArray(message.bars))
                        return "bars: array expected";
                    for (var i = 0; i < message.bars.length; ++i)
                        if (!$util.isInteger(message.bars[i]) && !(message.bars[i] && $util.isInteger(message.bars[i].low) && $util.isInteger(message.bars[i].high)))
                            return "bars: integer|Long[] expected";
                }
                if (message.current != null && message.hasOwnProperty("current"))
                    if (!$util.isInteger(message.current) && !(message.current && $util.isInteger(message.current.low) && $util.isInteger(message.current.high)))
                        return "current: integer|Long expected";
                return null;
            };

            /**
             * Creates a MultiBar message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof dd.Health.MultiBar
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {dd.Health.MultiBar} MultiBar
             */
            MultiBar.fromObject = function fromObject(object) {
                if (object instanceof $root.dd.Health.MultiBar)
                    return object;
                var message = new $root.dd.Health.MultiBar();
                if (object.bars) {
                    if (!Array.isArray(object.bars))
                        throw TypeError(".dd.Health.MultiBar.bars: array expected");
                    message.bars = [];
                    for (var i = 0; i < object.bars.length; ++i)
                        if ($util.Long)
                            (message.bars[i] = $util.Long.fromValue(object.bars[i])).unsigned = false;
                        else if (typeof object.bars[i] === "string")
                            message.bars[i] = parseInt(object.bars[i], 10);
                        else if (typeof object.bars[i] === "number")
                            message.bars[i] = object.bars[i];
                        else if (typeof object.bars[i] === "object")
                            message.bars[i] = new $util.LongBits(object.bars[i].low >>> 0, object.bars[i].high >>> 0).toNumber();
                }
                if (object.current != null)
                    if ($util.Long)
                        (message.current = $util.Long.fromValue(object.current)).unsigned = false;
                    else if (typeof object.current === "string")
                        message.current = parseInt(object.current, 10);
                    else if (typeof object.current === "number")
                        message.current = object.current;
                    else if (typeof object.current === "object")
                        message.current = new $util.LongBits(object.current.low >>> 0, object.current.high >>> 0).toNumber();
                return message;
            };

            /**
             * Creates a plain object from a MultiBar message. Also converts values to other types if specified.
             * @function toObject
             * @memberof dd.Health.MultiBar
             * @static
             * @param {dd.Health.MultiBar} message MultiBar
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            MultiBar.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.bars = [];
                if (options.defaults)
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.current = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.current = options.longs === String ? "0" : 0;
                if (message.bars && message.bars.length) {
                    object.bars = [];
                    for (var j = 0; j < message.bars.length; ++j)
                        if (typeof message.bars[j] === "number")
                            object.bars[j] = options.longs === String ? String(message.bars[j]) : message.bars[j];
                        else
                            object.bars[j] = options.longs === String ? $util.Long.prototype.toString.call(message.bars[j]) : options.longs === Number ? new $util.LongBits(message.bars[j].low >>> 0, message.bars[j].high >>> 0).toNumber() : message.bars[j];
                }
                if (message.current != null && message.hasOwnProperty("current"))
                    if (typeof message.current === "number")
                        object.current = options.longs === String ? String(message.current) : message.current;
                    else
                        object.current = options.longs === String ? $util.Long.prototype.toString.call(message.current) : options.longs === Number ? new $util.LongBits(message.current.low >>> 0, message.current.high >>> 0).toNumber() : message.current;
                return object;
            };

            /**
             * Converts this MultiBar to JSON.
             * @function toJSON
             * @memberof dd.Health.MultiBar
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            MultiBar.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return MultiBar;
        })();

        return Health;
    })();

    return dd;
})();

module.exports = $root;
