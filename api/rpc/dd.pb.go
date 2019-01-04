// Code generated by protoc-gen-go. DO NOT EDIT.
// source: rpc/dd.proto

package dd

import proto "github.com/golang/protobuf/proto"
import fmt "fmt"
import math "math"

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.ProtoPackageIsVersion2 // please upgrade the proto package

type AuthRequest struct {
	Token                string   `protobuf:"bytes,1,opt,name=token,proto3" json:"token,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *AuthRequest) Reset()         { *m = AuthRequest{} }
func (m *AuthRequest) String() string { return proto.CompactTextString(m) }
func (*AuthRequest) ProtoMessage()    {}
func (*AuthRequest) Descriptor() ([]byte, []int) {
	return fileDescriptor_dd_97cee37aa78d96c1, []int{0}
}
func (m *AuthRequest) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_AuthRequest.Unmarshal(m, b)
}
func (m *AuthRequest) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_AuthRequest.Marshal(b, m, deterministic)
}
func (dst *AuthRequest) XXX_Merge(src proto.Message) {
	xxx_messageInfo_AuthRequest.Merge(dst, src)
}
func (m *AuthRequest) XXX_Size() int {
	return xxx_messageInfo_AuthRequest.Size(m)
}
func (m *AuthRequest) XXX_DiscardUnknown() {
	xxx_messageInfo_AuthRequest.DiscardUnknown(m)
}

var xxx_messageInfo_AuthRequest proto.InternalMessageInfo

func (m *AuthRequest) GetToken() string {
	if m != nil {
		return m.Token
	}
	return ""
}

type AuthResponse struct {
	Id                   string   `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty"`
	Name                 string   `protobuf:"bytes,2,opt,name=name,proto3" json:"name,omitempty"`
	ImageURL             string   `protobuf:"bytes,3,opt,name=imageURL,proto3" json:"imageURL,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *AuthResponse) Reset()         { *m = AuthResponse{} }
func (m *AuthResponse) String() string { return proto.CompactTextString(m) }
func (*AuthResponse) ProtoMessage()    {}
func (*AuthResponse) Descriptor() ([]byte, []int) {
	return fileDescriptor_dd_97cee37aa78d96c1, []int{1}
}
func (m *AuthResponse) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_AuthResponse.Unmarshal(m, b)
}
func (m *AuthResponse) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_AuthResponse.Marshal(b, m, deterministic)
}
func (dst *AuthResponse) XXX_Merge(src proto.Message) {
	xxx_messageInfo_AuthResponse.Merge(dst, src)
}
func (m *AuthResponse) XXX_Size() int {
	return xxx_messageInfo_AuthResponse.Size(m)
}
func (m *AuthResponse) XXX_DiscardUnknown() {
	xxx_messageInfo_AuthResponse.DiscardUnknown(m)
}

var xxx_messageInfo_AuthResponse proto.InternalMessageInfo

func (m *AuthResponse) GetId() string {
	if m != nil {
		return m.Id
	}
	return ""
}

func (m *AuthResponse) GetName() string {
	if m != nil {
		return m.Name
	}
	return ""
}

func (m *AuthResponse) GetImageURL() string {
	if m != nil {
		return m.ImageURL
	}
	return ""
}

type CreateQuestRequest struct {
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *CreateQuestRequest) Reset()         { *m = CreateQuestRequest{} }
func (m *CreateQuestRequest) String() string { return proto.CompactTextString(m) }
func (*CreateQuestRequest) ProtoMessage()    {}
func (*CreateQuestRequest) Descriptor() ([]byte, []int) {
	return fileDescriptor_dd_97cee37aa78d96c1, []int{2}
}
func (m *CreateQuestRequest) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_CreateQuestRequest.Unmarshal(m, b)
}
func (m *CreateQuestRequest) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_CreateQuestRequest.Marshal(b, m, deterministic)
}
func (dst *CreateQuestRequest) XXX_Merge(src proto.Message) {
	xxx_messageInfo_CreateQuestRequest.Merge(dst, src)
}
func (m *CreateQuestRequest) XXX_Size() int {
	return xxx_messageInfo_CreateQuestRequest.Size(m)
}
func (m *CreateQuestRequest) XXX_DiscardUnknown() {
	xxx_messageInfo_CreateQuestRequest.DiscardUnknown(m)
}

var xxx_messageInfo_CreateQuestRequest proto.InternalMessageInfo

type CreateQuestResponse struct {
	Id                   string   `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *CreateQuestResponse) Reset()         { *m = CreateQuestResponse{} }
func (m *CreateQuestResponse) String() string { return proto.CompactTextString(m) }
func (*CreateQuestResponse) ProtoMessage()    {}
func (*CreateQuestResponse) Descriptor() ([]byte, []int) {
	return fileDescriptor_dd_97cee37aa78d96c1, []int{3}
}
func (m *CreateQuestResponse) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_CreateQuestResponse.Unmarshal(m, b)
}
func (m *CreateQuestResponse) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_CreateQuestResponse.Marshal(b, m, deterministic)
}
func (dst *CreateQuestResponse) XXX_Merge(src proto.Message) {
	xxx_messageInfo_CreateQuestResponse.Merge(dst, src)
}
func (m *CreateQuestResponse) XXX_Size() int {
	return xxx_messageInfo_CreateQuestResponse.Size(m)
}
func (m *CreateQuestResponse) XXX_DiscardUnknown() {
	xxx_messageInfo_CreateQuestResponse.DiscardUnknown(m)
}

var xxx_messageInfo_CreateQuestResponse proto.InternalMessageInfo

func (m *CreateQuestResponse) GetId() string {
	if m != nil {
		return m.Id
	}
	return ""
}

type EditQuestRequest struct {
	Id                   string   `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty"`
	Quest                *Quest   `protobuf:"bytes,2,opt,name=quest,proto3" json:"quest,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *EditQuestRequest) Reset()         { *m = EditQuestRequest{} }
func (m *EditQuestRequest) String() string { return proto.CompactTextString(m) }
func (*EditQuestRequest) ProtoMessage()    {}
func (*EditQuestRequest) Descriptor() ([]byte, []int) {
	return fileDescriptor_dd_97cee37aa78d96c1, []int{4}
}
func (m *EditQuestRequest) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_EditQuestRequest.Unmarshal(m, b)
}
func (m *EditQuestRequest) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_EditQuestRequest.Marshal(b, m, deterministic)
}
func (dst *EditQuestRequest) XXX_Merge(src proto.Message) {
	xxx_messageInfo_EditQuestRequest.Merge(dst, src)
}
func (m *EditQuestRequest) XXX_Size() int {
	return xxx_messageInfo_EditQuestRequest.Size(m)
}
func (m *EditQuestRequest) XXX_DiscardUnknown() {
	xxx_messageInfo_EditQuestRequest.DiscardUnknown(m)
}

var xxx_messageInfo_EditQuestRequest proto.InternalMessageInfo

func (m *EditQuestRequest) GetId() string {
	if m != nil {
		return m.Id
	}
	return ""
}

func (m *EditQuestRequest) GetQuest() *Quest {
	if m != nil {
		return m.Quest
	}
	return nil
}

type GetQuestsRequest struct {
	Search               *SearchParams `protobuf:"bytes,1,opt,name=search,proto3" json:"search,omitempty"`
	XXX_NoUnkeyedLiteral struct{}      `json:"-"`
	XXX_unrecognized     []byte        `json:"-"`
	XXX_sizecache        int32         `json:"-"`
}

func (m *GetQuestsRequest) Reset()         { *m = GetQuestsRequest{} }
func (m *GetQuestsRequest) String() string { return proto.CompactTextString(m) }
func (*GetQuestsRequest) ProtoMessage()    {}
func (*GetQuestsRequest) Descriptor() ([]byte, []int) {
	return fileDescriptor_dd_97cee37aa78d96c1, []int{5}
}
func (m *GetQuestsRequest) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_GetQuestsRequest.Unmarshal(m, b)
}
func (m *GetQuestsRequest) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_GetQuestsRequest.Marshal(b, m, deterministic)
}
func (dst *GetQuestsRequest) XXX_Merge(src proto.Message) {
	xxx_messageInfo_GetQuestsRequest.Merge(dst, src)
}
func (m *GetQuestsRequest) XXX_Size() int {
	return xxx_messageInfo_GetQuestsRequest.Size(m)
}
func (m *GetQuestsRequest) XXX_DiscardUnknown() {
	xxx_messageInfo_GetQuestsRequest.DiscardUnknown(m)
}

var xxx_messageInfo_GetQuestsRequest proto.InternalMessageInfo

func (m *GetQuestsRequest) GetSearch() *SearchParams {
	if m != nil {
		return m.Search
	}
	return nil
}

type GetQuestsResponse struct {
	Quests               []*Quest `protobuf:"bytes,1,rep,name=quests,proto3" json:"quests,omitempty"`
	Total                uint32   `protobuf:"varint,2,opt,name=total,proto3" json:"total,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *GetQuestsResponse) Reset()         { *m = GetQuestsResponse{} }
func (m *GetQuestsResponse) String() string { return proto.CompactTextString(m) }
func (*GetQuestsResponse) ProtoMessage()    {}
func (*GetQuestsResponse) Descriptor() ([]byte, []int) {
	return fileDescriptor_dd_97cee37aa78d96c1, []int{6}
}
func (m *GetQuestsResponse) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_GetQuestsResponse.Unmarshal(m, b)
}
func (m *GetQuestsResponse) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_GetQuestsResponse.Marshal(b, m, deterministic)
}
func (dst *GetQuestsResponse) XXX_Merge(src proto.Message) {
	xxx_messageInfo_GetQuestsResponse.Merge(dst, src)
}
func (m *GetQuestsResponse) XXX_Size() int {
	return xxx_messageInfo_GetQuestsResponse.Size(m)
}
func (m *GetQuestsResponse) XXX_DiscardUnknown() {
	xxx_messageInfo_GetQuestsResponse.DiscardUnknown(m)
}

var xxx_messageInfo_GetQuestsResponse proto.InternalMessageInfo

func (m *GetQuestsResponse) GetQuests() []*Quest {
	if m != nil {
		return m.Quests
	}
	return nil
}

func (m *GetQuestsResponse) GetTotal() uint32 {
	if m != nil {
		return m.Total
	}
	return 0
}

type GetQuestRequest struct {
	Id                   string   `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *GetQuestRequest) Reset()         { *m = GetQuestRequest{} }
func (m *GetQuestRequest) String() string { return proto.CompactTextString(m) }
func (*GetQuestRequest) ProtoMessage()    {}
func (*GetQuestRequest) Descriptor() ([]byte, []int) {
	return fileDescriptor_dd_97cee37aa78d96c1, []int{7}
}
func (m *GetQuestRequest) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_GetQuestRequest.Unmarshal(m, b)
}
func (m *GetQuestRequest) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_GetQuestRequest.Marshal(b, m, deterministic)
}
func (dst *GetQuestRequest) XXX_Merge(src proto.Message) {
	xxx_messageInfo_GetQuestRequest.Merge(dst, src)
}
func (m *GetQuestRequest) XXX_Size() int {
	return xxx_messageInfo_GetQuestRequest.Size(m)
}
func (m *GetQuestRequest) XXX_DiscardUnknown() {
	xxx_messageInfo_GetQuestRequest.DiscardUnknown(m)
}

var xxx_messageInfo_GetQuestRequest proto.InternalMessageInfo

func (m *GetQuestRequest) GetId() string {
	if m != nil {
		return m.Id
	}
	return ""
}

type Quest struct {
	Id                   string   `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty"`
	Name                 string   `protobuf:"bytes,2,opt,name=name,proto3" json:"name,omitempty"`
	Description          string   `protobuf:"bytes,3,opt,name=description,proto3" json:"description,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *Quest) Reset()         { *m = Quest{} }
func (m *Quest) String() string { return proto.CompactTextString(m) }
func (*Quest) ProtoMessage()    {}
func (*Quest) Descriptor() ([]byte, []int) {
	return fileDescriptor_dd_97cee37aa78d96c1, []int{8}
}
func (m *Quest) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_Quest.Unmarshal(m, b)
}
func (m *Quest) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_Quest.Marshal(b, m, deterministic)
}
func (dst *Quest) XXX_Merge(src proto.Message) {
	xxx_messageInfo_Quest.Merge(dst, src)
}
func (m *Quest) XXX_Size() int {
	return xxx_messageInfo_Quest.Size(m)
}
func (m *Quest) XXX_DiscardUnknown() {
	xxx_messageInfo_Quest.DiscardUnknown(m)
}

var xxx_messageInfo_Quest proto.InternalMessageInfo

func (m *Quest) GetId() string {
	if m != nil {
		return m.Id
	}
	return ""
}

func (m *Quest) GetName() string {
	if m != nil {
		return m.Name
	}
	return ""
}

func (m *Quest) GetDescription() string {
	if m != nil {
		return m.Description
	}
	return ""
}

type SearchParams struct {
	Ids                  []string `protobuf:"bytes,1,rep,name=ids,proto3" json:"ids,omitempty"`
	Limit                uint32   `protobuf:"varint,2,opt,name=limit,proto3" json:"limit,omitempty"`
	Offset               uint32   `protobuf:"varint,3,opt,name=offset,proto3" json:"offset,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *SearchParams) Reset()         { *m = SearchParams{} }
func (m *SearchParams) String() string { return proto.CompactTextString(m) }
func (*SearchParams) ProtoMessage()    {}
func (*SearchParams) Descriptor() ([]byte, []int) {
	return fileDescriptor_dd_97cee37aa78d96c1, []int{9}
}
func (m *SearchParams) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_SearchParams.Unmarshal(m, b)
}
func (m *SearchParams) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_SearchParams.Marshal(b, m, deterministic)
}
func (dst *SearchParams) XXX_Merge(src proto.Message) {
	xxx_messageInfo_SearchParams.Merge(dst, src)
}
func (m *SearchParams) XXX_Size() int {
	return xxx_messageInfo_SearchParams.Size(m)
}
func (m *SearchParams) XXX_DiscardUnknown() {
	xxx_messageInfo_SearchParams.DiscardUnknown(m)
}

var xxx_messageInfo_SearchParams proto.InternalMessageInfo

func (m *SearchParams) GetIds() []string {
	if m != nil {
		return m.Ids
	}
	return nil
}

func (m *SearchParams) GetLimit() uint32 {
	if m != nil {
		return m.Limit
	}
	return 0
}

func (m *SearchParams) GetOffset() uint32 {
	if m != nil {
		return m.Offset
	}
	return 0
}

func init() {
	proto.RegisterType((*AuthRequest)(nil), "dd.AuthRequest")
	proto.RegisterType((*AuthResponse)(nil), "dd.AuthResponse")
	proto.RegisterType((*CreateQuestRequest)(nil), "dd.CreateQuestRequest")
	proto.RegisterType((*CreateQuestResponse)(nil), "dd.CreateQuestResponse")
	proto.RegisterType((*EditQuestRequest)(nil), "dd.EditQuestRequest")
	proto.RegisterType((*GetQuestsRequest)(nil), "dd.GetQuestsRequest")
	proto.RegisterType((*GetQuestsResponse)(nil), "dd.GetQuestsResponse")
	proto.RegisterType((*GetQuestRequest)(nil), "dd.GetQuestRequest")
	proto.RegisterType((*Quest)(nil), "dd.Quest")
	proto.RegisterType((*SearchParams)(nil), "dd.SearchParams")
}

func init() { proto.RegisterFile("rpc/dd.proto", fileDescriptor_dd_97cee37aa78d96c1) }

var fileDescriptor_dd_97cee37aa78d96c1 = []byte{
	// 412 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0x74, 0x53, 0xcb, 0x6e, 0xda, 0x40,
	0x14, 0x15, 0x06, 0x2c, 0x7c, 0x0d, 0xc5, 0x1d, 0x28, 0xb5, 0xbc, 0x29, 0x4c, 0x55, 0x89, 0x56,
	0x15, 0x95, 0xe8, 0xa6, 0x8b, 0xaa, 0x52, 0x0b, 0x55, 0x37, 0x34, 0x0a, 0x8e, 0xb2, 0xc9, 0xce,
	0x61, 0x86, 0x30, 0x0a, 0x7e, 0xc4, 0x33, 0x7c, 0x41, 0x7e, 0x3c, 0x9a, 0x87, 0x61, 0x78, 0x64,
	0xe7, 0x7b, 0xee, 0xeb, 0xdc, 0x33, 0xc7, 0xd0, 0x2e, 0x8b, 0xd5, 0x37, 0x42, 0x26, 0x45, 0x99,
	0x8b, 0x1c, 0x39, 0x84, 0xe0, 0x8f, 0xe0, 0xff, 0xde, 0x89, 0x4d, 0x4c, 0x9f, 0x76, 0x94, 0x0b,
	0xd4, 0x87, 0xa6, 0xc8, 0x1f, 0x69, 0x16, 0xd6, 0x86, 0xb5, 0xb1, 0x17, 0xeb, 0x00, 0x5f, 0x41,
	0x5b, 0x17, 0xf1, 0x22, 0xcf, 0x38, 0x45, 0x6f, 0xc0, 0x61, 0xc4, 0x94, 0x38, 0x8c, 0x20, 0x04,
	0x8d, 0x2c, 0x49, 0x69, 0xe8, 0x28, 0x44, 0x7d, 0xa3, 0x08, 0x5a, 0x2c, 0x4d, 0x1e, 0xe8, 0x6d,
	0xbc, 0x08, 0xeb, 0x0a, 0xdf, 0xc7, 0xb8, 0x0f, 0x68, 0x56, 0xd2, 0x44, 0xd0, 0xa5, 0x5c, 0x6a,
	0x76, 0xe3, 0x4f, 0xd0, 0x3b, 0x42, 0x2f, 0x2f, 0xc3, 0x33, 0x08, 0xfe, 0x12, 0x26, 0xec, 0xd6,
	0x33, 0x42, 0x1f, 0xa0, 0xa9, 0x12, 0x8a, 0x91, 0x3f, 0xf5, 0x26, 0x84, 0x4c, 0x74, 0x83, 0xc6,
	0xf1, 0x4f, 0x08, 0xfe, 0x51, 0x3d, 0x83, 0x57, 0x43, 0xc6, 0xe0, 0x72, 0x9a, 0x94, 0xab, 0x8d,
	0x1a, 0xe4, 0x4f, 0x03, 0xd9, 0x75, 0xa3, 0x90, 0xeb, 0xa4, 0x4c, 0x52, 0x1e, 0x9b, 0x3c, 0x5e,
	0xc0, 0x5b, 0xab, 0xdb, 0xf0, 0x1c, 0x81, 0xab, 0xe6, 0xf0, 0xb0, 0x36, 0xac, 0x1f, 0x2f, 0x35,
	0x09, 0xad, 0xae, 0x48, 0xb6, 0x8a, 0x56, 0x27, 0xd6, 0x01, 0x1e, 0x41, 0xb7, 0x9a, 0xf6, 0xca,
	0x3d, 0xf8, 0x3f, 0x34, 0x97, 0x17, 0x0f, 0xbd, 0xa4, 0xfc, 0x10, 0x7c, 0x42, 0xf9, 0xaa, 0x64,
	0x85, 0x60, 0x79, 0x66, 0xc4, 0xb7, 0x21, 0xf9, 0x9e, 0xf6, 0x5d, 0x28, 0x80, 0x3a, 0x23, 0x9a,
	0xb7, 0x17, 0xcb, 0x4f, 0xc9, 0x74, 0xcb, 0x52, 0x26, 0x2a, 0xa6, 0x2a, 0x40, 0x03, 0x70, 0xf3,
	0xf5, 0x9a, 0x53, 0xa1, 0x86, 0x76, 0x62, 0x13, 0x4d, 0x9f, 0x1d, 0x70, 0xe6, 0x73, 0xf4, 0x19,
	0x1a, 0xd2, 0x26, 0xa8, 0x2b, 0x2f, 0xb7, 0x5c, 0x15, 0x05, 0x07, 0xc0, 0x88, 0xf5, 0x05, 0x5a,
	0xd5, 0xcd, 0xa8, 0x27, 0xb3, 0x27, 0x0a, 0x44, 0x07, 0xf5, 0xd0, 0x0f, 0xf0, 0xf6, 0x6a, 0xa3,
	0xbe, 0x5d, 0x5c, 0x3d, 0x5d, 0xf4, 0xee, 0x04, 0x35, 0x5b, 0x7e, 0x81, 0x6f, 0x39, 0x0a, 0x0d,
	0x64, 0xd5, 0xb9, 0xf1, 0xa2, 0xf7, 0x67, 0xb8, 0xe9, 0xff, 0x0a, 0xde, 0xde, 0x6a, 0x7a, 0xf3,
	0xa9, 0xf3, 0x2c, 0x9e, 0x7f, 0x1a, 0x77, 0x0e, 0x21, 0xf7, 0xae, 0xfa, 0xb7, 0xbe, 0xbf, 0x04,
	0x00, 0x00, 0xff, 0xff, 0x18, 0xb0, 0x60, 0xa9, 0x6b, 0x03, 0x00, 0x00,
}
