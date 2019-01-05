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
         * Calls Me.
         * @param request Blank message or plain object
         * @param callback Node-style callback called with the error, if any, and User
         */
        public me(request: dd.IBlank, callback: dd.DD.MeCallback): void;

        /**
         * Calls Me.
         * @param request Blank message or plain object
         * @returns Promise
         */
        public me(request: dd.IBlank): Promise<dd.User>;

        /**
         * Calls GetUser.
         * @param request GetByIdRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and User
         */
        public getUser(request: dd.IGetByIdRequest, callback: dd.DD.GetUserCallback): void;

        /**
         * Calls GetUser.
         * @param request GetByIdRequest message or plain object
         * @returns Promise
         */
        public getUser(request: dd.IGetByIdRequest): Promise<dd.User>;

        /**
         * Calls CreateUser.
         * @param request CreateUserRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and User
         */
        public createUser(request: dd.ICreateUserRequest, callback: dd.DD.CreateUserCallback): void;

        /**
         * Calls CreateUser.
         * @param request CreateUserRequest message or plain object
         * @returns Promise
         */
        public createUser(request: dd.ICreateUserRequest): Promise<dd.User>;

        /**
         * Calls GetCampaign.
         * @param request GetByIdRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and Campaign
         */
        public getCampaign(request: dd.IGetByIdRequest, callback: dd.DD.GetCampaignCallback): void;

        /**
         * Calls GetCampaign.
         * @param request GetByIdRequest message or plain object
         * @returns Promise
         */
        public getCampaign(request: dd.IGetByIdRequest): Promise<dd.Campaign>;

        /**
         * Calls GetCampaigns.
         * @param request GetCampaignsRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and GetCampaignsResponse
         */
        public getCampaigns(request: dd.IGetCampaignsRequest, callback: dd.DD.GetCampaignsCallback): void;

        /**
         * Calls GetCampaigns.
         * @param request GetCampaignsRequest message or plain object
         * @returns Promise
         */
        public getCampaigns(request: dd.IGetCampaignsRequest): Promise<dd.GetCampaignsResponse>;

        /**
         * Calls CreateCampaign.
         * @param request CreateCampaignRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and CreateCampaignResponse
         */
        public createCampaign(request: dd.ICreateCampaignRequest, callback: dd.DD.CreateCampaignCallback): void;

        /**
         * Calls CreateCampaign.
         * @param request CreateCampaignRequest message or plain object
         * @returns Promise
         */
        public createCampaign(request: dd.ICreateCampaignRequest): Promise<dd.CreateCampaignResponse>;

        /**
         * Calls EditCampaign.
         * @param request EditCampaignRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and CampaignCore
         */
        public editCampaign(request: dd.IEditCampaignRequest, callback: dd.DD.EditCampaignCallback): void;

        /**
         * Calls EditCampaign.
         * @param request EditCampaignRequest message or plain object
         * @returns Promise
         */
        public editCampaign(request: dd.IEditCampaignRequest): Promise<dd.CampaignCore>;

        /**
         * Calls GetQuest.
         * @param request GetByIdRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and Quest
         */
        public getQuest(request: dd.IGetByIdRequest, callback: dd.DD.GetQuestCallback): void;

        /**
         * Calls GetQuest.
         * @param request GetByIdRequest message or plain object
         * @returns Promise
         */
        public getQuest(request: dd.IGetByIdRequest): Promise<dd.Quest>;

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
         * Callback as used by {@link dd.DD#me}.
         * @param error Error, if any
         * @param [response] User
         */
        type MeCallback = (error: (Error|null), response?: dd.User) => void;

        /**
         * Callback as used by {@link dd.DD#getUser}.
         * @param error Error, if any
         * @param [response] User
         */
        type GetUserCallback = (error: (Error|null), response?: dd.User) => void;

        /**
         * Callback as used by {@link dd.DD#createUser}.
         * @param error Error, if any
         * @param [response] User
         */
        type CreateUserCallback = (error: (Error|null), response?: dd.User) => void;

        /**
         * Callback as used by {@link dd.DD#getCampaign}.
         * @param error Error, if any
         * @param [response] Campaign
         */
        type GetCampaignCallback = (error: (Error|null), response?: dd.Campaign) => void;

        /**
         * Callback as used by {@link dd.DD#getCampaigns}.
         * @param error Error, if any
         * @param [response] GetCampaignsResponse
         */
        type GetCampaignsCallback = (error: (Error|null), response?: dd.GetCampaignsResponse) => void;

        /**
         * Callback as used by {@link dd.DD#createCampaign}.
         * @param error Error, if any
         * @param [response] CreateCampaignResponse
         */
        type CreateCampaignCallback = (error: (Error|null), response?: dd.CreateCampaignResponse) => void;

        /**
         * Callback as used by {@link dd.DD#editCampaign}.
         * @param error Error, if any
         * @param [response] CampaignCore
         */
        type EditCampaignCallback = (error: (Error|null), response?: dd.CampaignCore) => void;

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

    /** Properties of a GetByIdRequest. */
    interface IGetByIdRequest {

        /** GetByIdRequest id */
        id?: (string|null);
    }

    /** Represents a GetByIdRequest. */
    class GetByIdRequest implements IGetByIdRequest {

        /**
         * Constructs a new GetByIdRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: dd.IGetByIdRequest);

        /** GetByIdRequest id. */
        public id: string;

        /**
         * Creates a new GetByIdRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GetByIdRequest instance
         */
        public static create(properties?: dd.IGetByIdRequest): dd.GetByIdRequest;

        /**
         * Encodes the specified GetByIdRequest message. Does not implicitly {@link dd.GetByIdRequest.verify|verify} messages.
         * @param message GetByIdRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dd.IGetByIdRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GetByIdRequest message, length delimited. Does not implicitly {@link dd.GetByIdRequest.verify|verify} messages.
         * @param message GetByIdRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dd.IGetByIdRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GetByIdRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GetByIdRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dd.GetByIdRequest;

        /**
         * Decodes a GetByIdRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GetByIdRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dd.GetByIdRequest;

        /**
         * Verifies a GetByIdRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GetByIdRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GetByIdRequest
         */
        public static fromObject(object: { [k: string]: any }): dd.GetByIdRequest;

        /**
         * Creates a plain object from a GetByIdRequest message. Also converts values to other types if specified.
         * @param message GetByIdRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: dd.GetByIdRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GetByIdRequest to JSON.
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

    /** Properties of a Blank. */
    interface IBlank {
    }

    /** Represents a Blank. */
    class Blank implements IBlank {

        /**
         * Constructs a new Blank.
         * @param [properties] Properties to set
         */
        constructor(properties?: dd.IBlank);

        /**
         * Creates a new Blank instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Blank instance
         */
        public static create(properties?: dd.IBlank): dd.Blank;

        /**
         * Encodes the specified Blank message. Does not implicitly {@link dd.Blank.verify|verify} messages.
         * @param message Blank message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dd.IBlank, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Blank message, length delimited. Does not implicitly {@link dd.Blank.verify|verify} messages.
         * @param message Blank message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dd.IBlank, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Blank message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Blank
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dd.Blank;

        /**
         * Decodes a Blank message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Blank
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dd.Blank;

        /**
         * Verifies a Blank message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Blank message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Blank
         */
        public static fromObject(object: { [k: string]: any }): dd.Blank;

        /**
         * Creates a plain object from a Blank message. Also converts values to other types if specified.
         * @param message Blank
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: dd.Blank, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Blank to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
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

        /** AuthResponse user */
        user?: (dd.IUser|null);

        /** AuthResponse reigstrationRequired */
        reigstrationRequired?: (boolean|null);
    }

    /** Represents an AuthResponse. */
    class AuthResponse implements IAuthResponse {

        /**
         * Constructs a new AuthResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: dd.IAuthResponse);

        /** AuthResponse user. */
        public user?: (dd.IUser|null);

        /** AuthResponse reigstrationRequired. */
        public reigstrationRequired: boolean;

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

    /** Properties of a CreateUserRequest. */
    interface ICreateUserRequest {

        /** CreateUserRequest token */
        token?: (string|null);

        /** CreateUserRequest username */
        username?: (string|null);
    }

    /** Represents a CreateUserRequest. */
    class CreateUserRequest implements ICreateUserRequest {

        /**
         * Constructs a new CreateUserRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: dd.ICreateUserRequest);

        /** CreateUserRequest token. */
        public token: string;

        /** CreateUserRequest username. */
        public username: string;

        /**
         * Creates a new CreateUserRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CreateUserRequest instance
         */
        public static create(properties?: dd.ICreateUserRequest): dd.CreateUserRequest;

        /**
         * Encodes the specified CreateUserRequest message. Does not implicitly {@link dd.CreateUserRequest.verify|verify} messages.
         * @param message CreateUserRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dd.ICreateUserRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CreateUserRequest message, length delimited. Does not implicitly {@link dd.CreateUserRequest.verify|verify} messages.
         * @param message CreateUserRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dd.ICreateUserRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CreateUserRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CreateUserRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dd.CreateUserRequest;

        /**
         * Decodes a CreateUserRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CreateUserRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dd.CreateUserRequest;

        /**
         * Verifies a CreateUserRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CreateUserRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CreateUserRequest
         */
        public static fromObject(object: { [k: string]: any }): dd.CreateUserRequest;

        /**
         * Creates a plain object from a CreateUserRequest message. Also converts values to other types if specified.
         * @param message CreateUserRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: dd.CreateUserRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CreateUserRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GetCampaignsRequest. */
    interface IGetCampaignsRequest {

        /** GetCampaignsRequest search */
        search?: (dd.ISearchParams|null);
    }

    /** Represents a GetCampaignsRequest. */
    class GetCampaignsRequest implements IGetCampaignsRequest {

        /**
         * Constructs a new GetCampaignsRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: dd.IGetCampaignsRequest);

        /** GetCampaignsRequest search. */
        public search?: (dd.ISearchParams|null);

        /**
         * Creates a new GetCampaignsRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GetCampaignsRequest instance
         */
        public static create(properties?: dd.IGetCampaignsRequest): dd.GetCampaignsRequest;

        /**
         * Encodes the specified GetCampaignsRequest message. Does not implicitly {@link dd.GetCampaignsRequest.verify|verify} messages.
         * @param message GetCampaignsRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dd.IGetCampaignsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GetCampaignsRequest message, length delimited. Does not implicitly {@link dd.GetCampaignsRequest.verify|verify} messages.
         * @param message GetCampaignsRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dd.IGetCampaignsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GetCampaignsRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GetCampaignsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dd.GetCampaignsRequest;

        /**
         * Decodes a GetCampaignsRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GetCampaignsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dd.GetCampaignsRequest;

        /**
         * Verifies a GetCampaignsRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GetCampaignsRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GetCampaignsRequest
         */
        public static fromObject(object: { [k: string]: any }): dd.GetCampaignsRequest;

        /**
         * Creates a plain object from a GetCampaignsRequest message. Also converts values to other types if specified.
         * @param message GetCampaignsRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: dd.GetCampaignsRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GetCampaignsRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GetCampaignsResponse. */
    interface IGetCampaignsResponse {

        /** GetCampaignsResponse campaigns */
        campaigns?: (dd.ICampaignCore[]|null);

        /** GetCampaignsResponse total */
        total?: (number|null);
    }

    /** Represents a GetCampaignsResponse. */
    class GetCampaignsResponse implements IGetCampaignsResponse {

        /**
         * Constructs a new GetCampaignsResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: dd.IGetCampaignsResponse);

        /** GetCampaignsResponse campaigns. */
        public campaigns: dd.ICampaignCore[];

        /** GetCampaignsResponse total. */
        public total: number;

        /**
         * Creates a new GetCampaignsResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GetCampaignsResponse instance
         */
        public static create(properties?: dd.IGetCampaignsResponse): dd.GetCampaignsResponse;

        /**
         * Encodes the specified GetCampaignsResponse message. Does not implicitly {@link dd.GetCampaignsResponse.verify|verify} messages.
         * @param message GetCampaignsResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dd.IGetCampaignsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GetCampaignsResponse message, length delimited. Does not implicitly {@link dd.GetCampaignsResponse.verify|verify} messages.
         * @param message GetCampaignsResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dd.IGetCampaignsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GetCampaignsResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GetCampaignsResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dd.GetCampaignsResponse;

        /**
         * Decodes a GetCampaignsResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GetCampaignsResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dd.GetCampaignsResponse;

        /**
         * Verifies a GetCampaignsResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GetCampaignsResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GetCampaignsResponse
         */
        public static fromObject(object: { [k: string]: any }): dd.GetCampaignsResponse;

        /**
         * Creates a plain object from a GetCampaignsResponse message. Also converts values to other types if specified.
         * @param message GetCampaignsResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: dd.GetCampaignsResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GetCampaignsResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CreateCampaignRequest. */
    interface ICreateCampaignRequest {
    }

    /** Represents a CreateCampaignRequest. */
    class CreateCampaignRequest implements ICreateCampaignRequest {

        /**
         * Constructs a new CreateCampaignRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: dd.ICreateCampaignRequest);

        /**
         * Creates a new CreateCampaignRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CreateCampaignRequest instance
         */
        public static create(properties?: dd.ICreateCampaignRequest): dd.CreateCampaignRequest;

        /**
         * Encodes the specified CreateCampaignRequest message. Does not implicitly {@link dd.CreateCampaignRequest.verify|verify} messages.
         * @param message CreateCampaignRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dd.ICreateCampaignRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CreateCampaignRequest message, length delimited. Does not implicitly {@link dd.CreateCampaignRequest.verify|verify} messages.
         * @param message CreateCampaignRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dd.ICreateCampaignRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CreateCampaignRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CreateCampaignRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dd.CreateCampaignRequest;

        /**
         * Decodes a CreateCampaignRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CreateCampaignRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dd.CreateCampaignRequest;

        /**
         * Verifies a CreateCampaignRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CreateCampaignRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CreateCampaignRequest
         */
        public static fromObject(object: { [k: string]: any }): dd.CreateCampaignRequest;

        /**
         * Creates a plain object from a CreateCampaignRequest message. Also converts values to other types if specified.
         * @param message CreateCampaignRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: dd.CreateCampaignRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CreateCampaignRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CreateCampaignResponse. */
    interface ICreateCampaignResponse {

        /** CreateCampaignResponse id */
        id?: (string|null);
    }

    /** Represents a CreateCampaignResponse. */
    class CreateCampaignResponse implements ICreateCampaignResponse {

        /**
         * Constructs a new CreateCampaignResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: dd.ICreateCampaignResponse);

        /** CreateCampaignResponse id. */
        public id: string;

        /**
         * Creates a new CreateCampaignResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CreateCampaignResponse instance
         */
        public static create(properties?: dd.ICreateCampaignResponse): dd.CreateCampaignResponse;

        /**
         * Encodes the specified CreateCampaignResponse message. Does not implicitly {@link dd.CreateCampaignResponse.verify|verify} messages.
         * @param message CreateCampaignResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dd.ICreateCampaignResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CreateCampaignResponse message, length delimited. Does not implicitly {@link dd.CreateCampaignResponse.verify|verify} messages.
         * @param message CreateCampaignResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dd.ICreateCampaignResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CreateCampaignResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CreateCampaignResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dd.CreateCampaignResponse;

        /**
         * Decodes a CreateCampaignResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CreateCampaignResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dd.CreateCampaignResponse;

        /**
         * Verifies a CreateCampaignResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CreateCampaignResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CreateCampaignResponse
         */
        public static fromObject(object: { [k: string]: any }): dd.CreateCampaignResponse;

        /**
         * Creates a plain object from a CreateCampaignResponse message. Also converts values to other types if specified.
         * @param message CreateCampaignResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: dd.CreateCampaignResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CreateCampaignResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an EditCampaignRequest. */
    interface IEditCampaignRequest {

        /** EditCampaignRequest campaign */
        campaign?: (dd.ICampaignCore|null);

        /** EditCampaignRequest id */
        id?: (string|null);
    }

    /** Represents an EditCampaignRequest. */
    class EditCampaignRequest implements IEditCampaignRequest {

        /**
         * Constructs a new EditCampaignRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: dd.IEditCampaignRequest);

        /** EditCampaignRequest campaign. */
        public campaign?: (dd.ICampaignCore|null);

        /** EditCampaignRequest id. */
        public id: string;

        /**
         * Creates a new EditCampaignRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EditCampaignRequest instance
         */
        public static create(properties?: dd.IEditCampaignRequest): dd.EditCampaignRequest;

        /**
         * Encodes the specified EditCampaignRequest message. Does not implicitly {@link dd.EditCampaignRequest.verify|verify} messages.
         * @param message EditCampaignRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dd.IEditCampaignRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified EditCampaignRequest message, length delimited. Does not implicitly {@link dd.EditCampaignRequest.verify|verify} messages.
         * @param message EditCampaignRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dd.IEditCampaignRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an EditCampaignRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EditCampaignRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dd.EditCampaignRequest;

        /**
         * Decodes an EditCampaignRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns EditCampaignRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dd.EditCampaignRequest;

        /**
         * Verifies an EditCampaignRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an EditCampaignRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EditCampaignRequest
         */
        public static fromObject(object: { [k: string]: any }): dd.EditCampaignRequest;

        /**
         * Creates a plain object from an EditCampaignRequest message. Also converts values to other types if specified.
         * @param message EditCampaignRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: dd.EditCampaignRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EditCampaignRequest to JSON.
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

    /** Properties of a User. */
    interface IUser {

        /** User id */
        id?: (string|null);

        /** User name */
        name?: (string|null);

        /** User imageURL */
        imageURL?: (string|null);

        /** User createdAt */
        createdAt?: (number|Long|null);
    }

    /** Represents a User. */
    class User implements IUser {

        /**
         * Constructs a new User.
         * @param [properties] Properties to set
         */
        constructor(properties?: dd.IUser);

        /** User id. */
        public id: string;

        /** User name. */
        public name: string;

        /** User imageURL. */
        public imageURL: string;

        /** User createdAt. */
        public createdAt: (number|Long);

        /**
         * Creates a new User instance using the specified properties.
         * @param [properties] Properties to set
         * @returns User instance
         */
        public static create(properties?: dd.IUser): dd.User;

        /**
         * Encodes the specified User message. Does not implicitly {@link dd.User.verify|verify} messages.
         * @param message User message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dd.IUser, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified User message, length delimited. Does not implicitly {@link dd.User.verify|verify} messages.
         * @param message User message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dd.IUser, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a User message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns User
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dd.User;

        /**
         * Decodes a User message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns User
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dd.User;

        /**
         * Verifies a User message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a User message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns User
         */
        public static fromObject(object: { [k: string]: any }): dd.User;

        /**
         * Creates a plain object from a User message. Also converts values to other types if specified.
         * @param message User
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: dd.User, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this User to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CampaignCore. */
    interface ICampaignCore {

        /** CampaignCore id */
        id?: (string|null);

        /** CampaignCore name */
        name?: (string|null);

        /** CampaignCore description */
        description?: (string|null);

        /** CampaignCore imageId */
        imageId?: (string|null);

        /** CampaignCore experienceTable */
        experienceTable?: ((number|Long)[]|null);
    }

    /** Represents a CampaignCore. */
    class CampaignCore implements ICampaignCore {

        /**
         * Constructs a new CampaignCore.
         * @param [properties] Properties to set
         */
        constructor(properties?: dd.ICampaignCore);

        /** CampaignCore id. */
        public id: string;

        /** CampaignCore name. */
        public name: string;

        /** CampaignCore description. */
        public description: string;

        /** CampaignCore imageId. */
        public imageId: string;

        /** CampaignCore experienceTable. */
        public experienceTable: (number|Long)[];

        /**
         * Creates a new CampaignCore instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CampaignCore instance
         */
        public static create(properties?: dd.ICampaignCore): dd.CampaignCore;

        /**
         * Encodes the specified CampaignCore message. Does not implicitly {@link dd.CampaignCore.verify|verify} messages.
         * @param message CampaignCore message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dd.ICampaignCore, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CampaignCore message, length delimited. Does not implicitly {@link dd.CampaignCore.verify|verify} messages.
         * @param message CampaignCore message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dd.ICampaignCore, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CampaignCore message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CampaignCore
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dd.CampaignCore;

        /**
         * Decodes a CampaignCore message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CampaignCore
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dd.CampaignCore;

        /**
         * Verifies a CampaignCore message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CampaignCore message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CampaignCore
         */
        public static fromObject(object: { [k: string]: any }): dd.CampaignCore;

        /**
         * Creates a plain object from a CampaignCore message. Also converts values to other types if specified.
         * @param message CampaignCore
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: dd.CampaignCore, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CampaignCore to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Campaign. */
    interface ICampaign {

        /** Campaign id */
        id?: (string|null);

        /** Campaign name */
        name?: (string|null);

        /** Campaign description */
        description?: (string|null);

        /** Campaign imageId */
        imageId?: (string|null);

        /** Campaign experienceTable */
        experienceTable?: ((number|Long)[]|null);
    }

    /** Represents a Campaign. */
    class Campaign implements ICampaign {

        /**
         * Constructs a new Campaign.
         * @param [properties] Properties to set
         */
        constructor(properties?: dd.ICampaign);

        /** Campaign id. */
        public id: string;

        /** Campaign name. */
        public name: string;

        /** Campaign description. */
        public description: string;

        /** Campaign imageId. */
        public imageId: string;

        /** Campaign experienceTable. */
        public experienceTable: (number|Long)[];

        /**
         * Creates a new Campaign instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Campaign instance
         */
        public static create(properties?: dd.ICampaign): dd.Campaign;

        /**
         * Encodes the specified Campaign message. Does not implicitly {@link dd.Campaign.verify|verify} messages.
         * @param message Campaign message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: dd.ICampaign, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Campaign message, length delimited. Does not implicitly {@link dd.Campaign.verify|verify} messages.
         * @param message Campaign message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: dd.ICampaign, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Campaign message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Campaign
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dd.Campaign;

        /**
         * Decodes a Campaign message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Campaign
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dd.Campaign;

        /**
         * Verifies a Campaign message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Campaign message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Campaign
         */
        public static fromObject(object: { [k: string]: any }): dd.Campaign;

        /**
         * Creates a plain object from a Campaign message. Also converts values to other types if specified.
         * @param message Campaign
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: dd.Campaign, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Campaign to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
