import * as $protobuf from "protobufjs";
/** Namespace dd. */
export namespace dd {

    /** Represents a DD */
    class DD extends $protobuf.rpc.Service {

        /**
         * Constructs a new DD service.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         */
        constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

        /**
         * Creates new DD service using the specified rpc implementation.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         * @returns RPC service. Useful where requests and/or responses are streamed.
         */
        public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): DD;

        /**
         * Calls Auth.
         * @param request AuthRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and AuthResponse
         */
        public auth(request: dd.IAuthRequest, callback: dd.DD.AuthCallback): void;

        /**
         * Calls Auth.
         * @param request AuthRequest message or plain object
         * @returns Promise
         */
        public auth(request: dd.IAuthRequest): Promise<dd.AuthResponse>;

        /**
         * Calls GetQuest.
         * @param request GetQuestRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and Quest
         */
        public getQuest(request: dd.IGetQuestRequest, callback: dd.DD.GetQuestCallback): void;

        /**
         * Calls GetQuest.
         * @param request GetQuestRequest message or plain object
         * @returns Promise
         */
        public getQuest(request: dd.IGetQuestRequest): Promise<dd.Quest>;

        /**
         * Calls GetQuests.
         * @param request GetQuestsRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and GetQuestsResponse
         */
        public getQuests(request: dd.IGetQuestsRequest, callback: dd.DD.GetQuestsCallback): void;

        /**
         * Calls GetQuests.
         * @param request GetQuestsRequest message or plain object
         * @returns Promise
         */
        public getQuests(request: dd.IGetQuestsRequest): Promise<dd.GetQuestsResponse>;

        /**
         * Calls CreateQuest.
         * @param request CreateQuestRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and CreateQuestResponse
         */
        public createQuest(request: dd.ICreateQuestRequest, callback: dd.DD.CreateQuestCallback): void;

        /**
         * Calls CreateQuest.
         * @param request CreateQuestRequest message or plain object
         * @returns Promise
         */
        public createQuest(request: dd.ICreateQuestRequest): Promise<dd.CreateQuestResponse>;

        /**
         * Calls EditQuest.
         * @param request EditQuestRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and Quest
         */
        public editQuest(request: dd.IEditQuestRequest, callback: dd.DD.EditQuestCallback): void;

        /**
         * Calls EditQuest.
         * @param request EditQuestRequest message or plain object
         * @returns Promise
         */
        public editQuest(request: dd.IEditQuestRequest): Promise<dd.Quest>;
    }

    namespace DD {

        /**
         * Callback as used by {@link dd.DD#auth}.
         * @param error Error, if any
         * @param [response] AuthResponse
         */
        type AuthCallback = (error: (Error|null), response?: dd.AuthResponse) => void;

        /**
         * Callback as used by {@link dd.DD#getQuest}.
         * @param error Error, if any
         * @param [response] Quest
         */
        type GetQuestCallback = (error: (Error|null), response?: dd.Quest) => void;

        /**
         * Callback as used by {@link dd.DD#getQuests}.
         * @param error Error, if any
         * @param [response] GetQuestsResponse
         */
        type GetQuestsCallback = (error: (Error|null), response?: dd.GetQuestsResponse) => void;

        /**
         * Callback as used by {@link dd.DD#createQuest}.
         * @param error Error, if any
         * @param [response] CreateQuestResponse
         */
        type CreateQuestCallback = (error: (Error|null), response?: dd.CreateQuestResponse) => void;

        /**
         * Callback as used by {@link dd.DD#editQuest}.
         * @param error Error, if any
         * @param [response] Quest
         */
        type EditQuestCallback = (error: (Error|null), response?: dd.Quest) => void;
    }

    /** Properties of an AuthRequest. */
    interface IAuthRequest {

        /** AuthRequest token */
        token?: (string|null);
    }

    /** Represents an AuthRequest. */
    class AuthRequest implements IAuthRequest {

        /**
         * Constructs a new AuthRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: dd.IAuthRequest);

        /** AuthRequest token. */
        public token: string;

        /**
         * Creates a new AuthRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AuthRequest instance
         */
        public static create(properties?: dd.IAuthRequest): dd.AuthRequest;

        /**
         * Encodes the specified AuthRequest message. Does not implicitly {@link dd.AuthRequest.verify|verify} messages.
         * @param message AuthRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dd.IAuthRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AuthRequest message, length delimited. Does not implicitly {@link dd.AuthRequest.verify|verify} messages.
         * @param message AuthRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dd.IAuthRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AuthRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AuthRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dd.AuthRequest;

        /**
         * Decodes an AuthRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AuthRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dd.AuthRequest;

        /**
         * Verifies an AuthRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AuthRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AuthRequest
         */
        public static fromObject(object: { [k: string]: any }): dd.AuthRequest;

        /**
         * Creates a plain object from an AuthRequest message. Also converts values to other types if specified.
         * @param message AuthRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: dd.AuthRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AuthRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an AuthResponse. */
    interface IAuthResponse {

        /** AuthResponse id */
        id?: (string|null);

        /** AuthResponse name */
        name?: (string|null);

        /** AuthResponse imageURL */
        imageURL?: (string|null);
    }

    /** Represents an AuthResponse. */
    class AuthResponse implements IAuthResponse {

        /**
         * Constructs a new AuthResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: dd.IAuthResponse);

        /** AuthResponse id. */
        public id: string;

        /** AuthResponse name. */
        public name: string;

        /** AuthResponse imageURL. */
        public imageURL: string;

        /**
         * Creates a new AuthResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AuthResponse instance
         */
        public static create(properties?: dd.IAuthResponse): dd.AuthResponse;

        /**
         * Encodes the specified AuthResponse message. Does not implicitly {@link dd.AuthResponse.verify|verify} messages.
         * @param message AuthResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dd.IAuthResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AuthResponse message, length delimited. Does not implicitly {@link dd.AuthResponse.verify|verify} messages.
         * @param message AuthResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dd.IAuthResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AuthResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AuthResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dd.AuthResponse;

        /**
         * Decodes an AuthResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AuthResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dd.AuthResponse;

        /**
         * Verifies an AuthResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AuthResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AuthResponse
         */
        public static fromObject(object: { [k: string]: any }): dd.AuthResponse;

        /**
         * Creates a plain object from an AuthResponse message. Also converts values to other types if specified.
         * @param message AuthResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: dd.AuthResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AuthResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CreateQuestRequest. */
    interface ICreateQuestRequest {
    }

    /** Represents a CreateQuestRequest. */
    class CreateQuestRequest implements ICreateQuestRequest {

        /**
         * Constructs a new CreateQuestRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: dd.ICreateQuestRequest);

        /**
         * Creates a new CreateQuestRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CreateQuestRequest instance
         */
        public static create(properties?: dd.ICreateQuestRequest): dd.CreateQuestRequest;

        /**
         * Encodes the specified CreateQuestRequest message. Does not implicitly {@link dd.CreateQuestRequest.verify|verify} messages.
         * @param message CreateQuestRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dd.ICreateQuestRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CreateQuestRequest message, length delimited. Does not implicitly {@link dd.CreateQuestRequest.verify|verify} messages.
         * @param message CreateQuestRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dd.ICreateQuestRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CreateQuestRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CreateQuestRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dd.CreateQuestRequest;

        /**
         * Decodes a CreateQuestRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CreateQuestRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dd.CreateQuestRequest;

        /**
         * Verifies a CreateQuestRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CreateQuestRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CreateQuestRequest
         */
        public static fromObject(object: { [k: string]: any }): dd.CreateQuestRequest;

        /**
         * Creates a plain object from a CreateQuestRequest message. Also converts values to other types if specified.
         * @param message CreateQuestRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: dd.CreateQuestRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CreateQuestRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CreateQuestResponse. */
    interface ICreateQuestResponse {

        /** CreateQuestResponse id */
        id?: (string|null);
    }

    /** Represents a CreateQuestResponse. */
    class CreateQuestResponse implements ICreateQuestResponse {

        /**
         * Constructs a new CreateQuestResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: dd.ICreateQuestResponse);

        /** CreateQuestResponse id. */
        public id: string;

        /**
         * Creates a new CreateQuestResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CreateQuestResponse instance
         */
        public static create(properties?: dd.ICreateQuestResponse): dd.CreateQuestResponse;

        /**
         * Encodes the specified CreateQuestResponse message. Does not implicitly {@link dd.CreateQuestResponse.verify|verify} messages.
         * @param message CreateQuestResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dd.ICreateQuestResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CreateQuestResponse message, length delimited. Does not implicitly {@link dd.CreateQuestResponse.verify|verify} messages.
         * @param message CreateQuestResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dd.ICreateQuestResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CreateQuestResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CreateQuestResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dd.CreateQuestResponse;

        /**
         * Decodes a CreateQuestResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CreateQuestResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dd.CreateQuestResponse;

        /**
         * Verifies a CreateQuestResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CreateQuestResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CreateQuestResponse
         */
        public static fromObject(object: { [k: string]: any }): dd.CreateQuestResponse;

        /**
         * Creates a plain object from a CreateQuestResponse message. Also converts values to other types if specified.
         * @param message CreateQuestResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: dd.CreateQuestResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CreateQuestResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an EditQuestRequest. */
    interface IEditQuestRequest {

        /** EditQuestRequest id */
        id?: (string|null);

        /** EditQuestRequest quest */
        quest?: (dd.IQuest|null);
    }

    /** Represents an EditQuestRequest. */
    class EditQuestRequest implements IEditQuestRequest {

        /**
         * Constructs a new EditQuestRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: dd.IEditQuestRequest);

        /** EditQuestRequest id. */
        public id: string;

        /** EditQuestRequest quest. */
        public quest?: (dd.IQuest|null);

        /**
         * Creates a new EditQuestRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EditQuestRequest instance
         */
        public static create(properties?: dd.IEditQuestRequest): dd.EditQuestRequest;

        /**
         * Encodes the specified EditQuestRequest message. Does not implicitly {@link dd.EditQuestRequest.verify|verify} messages.
         * @param message EditQuestRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dd.IEditQuestRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified EditQuestRequest message, length delimited. Does not implicitly {@link dd.EditQuestRequest.verify|verify} messages.
         * @param message EditQuestRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dd.IEditQuestRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an EditQuestRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EditQuestRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dd.EditQuestRequest;

        /**
         * Decodes an EditQuestRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns EditQuestRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dd.EditQuestRequest;

        /**
         * Verifies an EditQuestRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an EditQuestRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EditQuestRequest
         */
        public static fromObject(object: { [k: string]: any }): dd.EditQuestRequest;

        /**
         * Creates a plain object from an EditQuestRequest message. Also converts values to other types if specified.
         * @param message EditQuestRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: dd.EditQuestRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EditQuestRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GetQuestsRequest. */
    interface IGetQuestsRequest {

        /** GetQuestsRequest search */
        search?: (dd.ISearchParams|null);
    }

    /** Represents a GetQuestsRequest. */
    class GetQuestsRequest implements IGetQuestsRequest {

        /**
         * Constructs a new GetQuestsRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: dd.IGetQuestsRequest);

        /** GetQuestsRequest search. */
        public search?: (dd.ISearchParams|null);

        /**
         * Creates a new GetQuestsRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GetQuestsRequest instance
         */
        public static create(properties?: dd.IGetQuestsRequest): dd.GetQuestsRequest;

        /**
         * Encodes the specified GetQuestsRequest message. Does not implicitly {@link dd.GetQuestsRequest.verify|verify} messages.
         * @param message GetQuestsRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dd.IGetQuestsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GetQuestsRequest message, length delimited. Does not implicitly {@link dd.GetQuestsRequest.verify|verify} messages.
         * @param message GetQuestsRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dd.IGetQuestsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GetQuestsRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GetQuestsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dd.GetQuestsRequest;

        /**
         * Decodes a GetQuestsRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GetQuestsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dd.GetQuestsRequest;

        /**
         * Verifies a GetQuestsRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GetQuestsRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GetQuestsRequest
         */
        public static fromObject(object: { [k: string]: any }): dd.GetQuestsRequest;

        /**
         * Creates a plain object from a GetQuestsRequest message. Also converts values to other types if specified.
         * @param message GetQuestsRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: dd.GetQuestsRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GetQuestsRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GetQuestsResponse. */
    interface IGetQuestsResponse {

        /** GetQuestsResponse quests */
        quests?: (dd.IQuest[]|null);

        /** GetQuestsResponse total */
        total?: (number|null);
    }

    /** Represents a GetQuestsResponse. */
    class GetQuestsResponse implements IGetQuestsResponse {

        /**
         * Constructs a new GetQuestsResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: dd.IGetQuestsResponse);

        /** GetQuestsResponse quests. */
        public quests: dd.IQuest[];

        /** GetQuestsResponse total. */
        public total: number;

        /**
         * Creates a new GetQuestsResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GetQuestsResponse instance
         */
        public static create(properties?: dd.IGetQuestsResponse): dd.GetQuestsResponse;

        /**
         * Encodes the specified GetQuestsResponse message. Does not implicitly {@link dd.GetQuestsResponse.verify|verify} messages.
         * @param message GetQuestsResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dd.IGetQuestsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GetQuestsResponse message, length delimited. Does not implicitly {@link dd.GetQuestsResponse.verify|verify} messages.
         * @param message GetQuestsResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dd.IGetQuestsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GetQuestsResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GetQuestsResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dd.GetQuestsResponse;

        /**
         * Decodes a GetQuestsResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GetQuestsResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dd.GetQuestsResponse;

        /**
         * Verifies a GetQuestsResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GetQuestsResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GetQuestsResponse
         */
        public static fromObject(object: { [k: string]: any }): dd.GetQuestsResponse;

        /**
         * Creates a plain object from a GetQuestsResponse message. Also converts values to other types if specified.
         * @param message GetQuestsResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: dd.GetQuestsResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GetQuestsResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GetQuestRequest. */
    interface IGetQuestRequest {

        /** GetQuestRequest id */
        id?: (string|null);
    }

    /** Represents a GetQuestRequest. */
    class GetQuestRequest implements IGetQuestRequest {

        /**
         * Constructs a new GetQuestRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: dd.IGetQuestRequest);

        /** GetQuestRequest id. */
        public id: string;

        /**
         * Creates a new GetQuestRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GetQuestRequest instance
         */
        public static create(properties?: dd.IGetQuestRequest): dd.GetQuestRequest;

        /**
         * Encodes the specified GetQuestRequest message. Does not implicitly {@link dd.GetQuestRequest.verify|verify} messages.
         * @param message GetQuestRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dd.IGetQuestRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GetQuestRequest message, length delimited. Does not implicitly {@link dd.GetQuestRequest.verify|verify} messages.
         * @param message GetQuestRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dd.IGetQuestRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GetQuestRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GetQuestRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dd.GetQuestRequest;

        /**
         * Decodes a GetQuestRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GetQuestRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dd.GetQuestRequest;

        /**
         * Verifies a GetQuestRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GetQuestRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GetQuestRequest
         */
        public static fromObject(object: { [k: string]: any }): dd.GetQuestRequest;

        /**
         * Creates a plain object from a GetQuestRequest message. Also converts values to other types if specified.
         * @param message GetQuestRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: dd.GetQuestRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GetQuestRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Quest. */
    interface IQuest {

        /** Quest id */
        id?: (string|null);

        /** Quest name */
        name?: (string|null);

        /** Quest description */
        description?: (string|null);
    }

    /** Represents a Quest. */
    class Quest implements IQuest {

        /**
         * Constructs a new Quest.
         * @param [properties] Properties to set
         */
        constructor(properties?: dd.IQuest);

        /** Quest id. */
        public id: string;

        /** Quest name. */
        public name: string;

        /** Quest description. */
        public description: string;

        /**
         * Creates a new Quest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Quest instance
         */
        public static create(properties?: dd.IQuest): dd.Quest;

        /**
         * Encodes the specified Quest message. Does not implicitly {@link dd.Quest.verify|verify} messages.
         * @param message Quest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dd.IQuest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Quest message, length delimited. Does not implicitly {@link dd.Quest.verify|verify} messages.
         * @param message Quest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dd.IQuest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Quest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Quest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dd.Quest;

        /**
         * Decodes a Quest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Quest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dd.Quest;

        /**
         * Verifies a Quest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Quest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Quest
         */
        public static fromObject(object: { [k: string]: any }): dd.Quest;

        /**
         * Creates a plain object from a Quest message. Also converts values to other types if specified.
         * @param message Quest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: dd.Quest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Quest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SearchParams. */
    interface ISearchParams {

        /** SearchParams ids */
        ids?: (string[]|null);

        /** SearchParams limit */
        limit?: (number|null);

        /** SearchParams offset */
        offset?: (number|null);
    }

    /** Represents a SearchParams. */
    class SearchParams implements ISearchParams {

        /**
         * Constructs a new SearchParams.
         * @param [properties] Properties to set
         */
        constructor(properties?: dd.ISearchParams);

        /** SearchParams ids. */
        public ids: string[];

        /** SearchParams limit. */
        public limit: number;

        /** SearchParams offset. */
        public offset: number;

        /**
         * Creates a new SearchParams instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SearchParams instance
         */
        public static create(properties?: dd.ISearchParams): dd.SearchParams;

        /**
         * Encodes the specified SearchParams message. Does not implicitly {@link dd.SearchParams.verify|verify} messages.
         * @param message SearchParams message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dd.ISearchParams, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SearchParams message, length delimited. Does not implicitly {@link dd.SearchParams.verify|verify} messages.
         * @param message SearchParams message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dd.ISearchParams, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SearchParams message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SearchParams
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dd.SearchParams;

        /**
         * Decodes a SearchParams message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SearchParams
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dd.SearchParams;

        /**
         * Verifies a SearchParams message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SearchParams message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SearchParams
         */
        public static fromObject(object: { [k: string]: any }): dd.SearchParams;

        /**
         * Creates a plain object from a SearchParams message. Also converts values to other types if specified.
         * @param message SearchParams
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: dd.SearchParams, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SearchParams to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
