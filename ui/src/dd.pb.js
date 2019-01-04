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
         * @param {dd.IGetQuestRequest} request GetQuestRequest message or plain object
         * @param {dd.DD.GetQuestCallback} callback Node-style callback called with the error, if any, and Quest
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(DD.prototype.getQuest = function getQuest(request, callback) {
            return this.rpcCall(getQuest, $root.dd.GetQuestRequest, $root.dd.Quest, request, callback);
        }, "name", { value: "GetQuest" });

        /**
         * Calls GetQuest.
         * @function getQuest
         * @memberof dd.DD
         * @instance
         * @param {dd.IGetQuestRequest} request GetQuestRequest message or plain object
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
         * @property {string|null} [id] AuthResponse id
         * @property {string|null} [name] AuthResponse name
         * @property {string|null} [imageURL] AuthResponse imageURL
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
         * AuthResponse id.
         * @member {string} id
         * @memberof dd.AuthResponse
         * @instance
         */
        AuthResponse.prototype.id = "";

        /**
         * AuthResponse name.
         * @member {string} name
         * @memberof dd.AuthResponse
         * @instance
         */
        AuthResponse.prototype.name = "";

        /**
         * AuthResponse imageURL.
         * @member {string} imageURL
         * @memberof dd.AuthResponse
         * @instance
         */
        AuthResponse.prototype.imageURL = "";

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
            if (message.id != null && message.hasOwnProperty("id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.name != null && message.hasOwnProperty("name"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
            if (message.imageURL != null && message.hasOwnProperty("imageURL"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.imageURL);
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
                    message.id = reader.string();
                    break;
                case 2:
                    message.name = reader.string();
                    break;
                case 3:
                    message.imageURL = reader.string();
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
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.imageURL != null && message.hasOwnProperty("imageURL"))
                if (!$util.isString(message.imageURL))
                    return "imageURL: string expected";
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
            if (object.id != null)
                message.id = String(object.id);
            if (object.name != null)
                message.name = String(object.name);
            if (object.imageURL != null)
                message.imageURL = String(object.imageURL);
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
                object.id = "";
                object.name = "";
                object.imageURL = "";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.imageURL != null && message.hasOwnProperty("imageURL"))
                object.imageURL = message.imageURL;
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

    dd.GetQuestRequest = (function() {

        /**
         * Properties of a GetQuestRequest.
         * @memberof dd
         * @interface IGetQuestRequest
         * @property {string|null} [id] GetQuestRequest id
         */

        /**
         * Constructs a new GetQuestRequest.
         * @memberof dd
         * @classdesc Represents a GetQuestRequest.
         * @implements IGetQuestRequest
         * @constructor
         * @param {dd.IGetQuestRequest=} [properties] Properties to set
         */
        function GetQuestRequest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GetQuestRequest id.
         * @member {string} id
         * @memberof dd.GetQuestRequest
         * @instance
         */
        GetQuestRequest.prototype.id = "";

        /**
         * Creates a new GetQuestRequest instance using the specified properties.
         * @function create
         * @memberof dd.GetQuestRequest
         * @static
         * @param {dd.IGetQuestRequest=} [properties] Properties to set
         * @returns {dd.GetQuestRequest} GetQuestRequest instance
         */
        GetQuestRequest.create = function create(properties) {
            return new GetQuestRequest(properties);
        };

        /**
         * Encodes the specified GetQuestRequest message. Does not implicitly {@link dd.GetQuestRequest.verify|verify} messages.
         * @function encode
         * @memberof dd.GetQuestRequest
         * @static
         * @param {dd.IGetQuestRequest} message GetQuestRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetQuestRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && message.hasOwnProperty("id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            return writer;
        };

        /**
         * Encodes the specified GetQuestRequest message, length delimited. Does not implicitly {@link dd.GetQuestRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dd.GetQuestRequest
         * @static
         * @param {dd.IGetQuestRequest} message GetQuestRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetQuestRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GetQuestRequest message from the specified reader or buffer.
         * @function decode
         * @memberof dd.GetQuestRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dd.GetQuestRequest} GetQuestRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetQuestRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dd.GetQuestRequest();
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
         * Decodes a GetQuestRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dd.GetQuestRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dd.GetQuestRequest} GetQuestRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetQuestRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GetQuestRequest message.
         * @function verify
         * @memberof dd.GetQuestRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GetQuestRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            return null;
        };

        /**
         * Creates a GetQuestRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof dd.GetQuestRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {dd.GetQuestRequest} GetQuestRequest
         */
        GetQuestRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.dd.GetQuestRequest)
                return object;
            var message = new $root.dd.GetQuestRequest();
            if (object.id != null)
                message.id = String(object.id);
            return message;
        };

        /**
         * Creates a plain object from a GetQuestRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof dd.GetQuestRequest
         * @static
         * @param {dd.GetQuestRequest} message GetQuestRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GetQuestRequest.toObject = function toObject(message, options) {
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
         * Converts this GetQuestRequest to JSON.
         * @function toJSON
         * @memberof dd.GetQuestRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GetQuestRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GetQuestRequest;
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

    return dd;
})();

module.exports = $root;
