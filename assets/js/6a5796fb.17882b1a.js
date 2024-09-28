"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8134],{47835:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>r,default:()=>h,frontMatter:()=>c,metadata:()=>s,toc:()=>d});var a=n(85893),i=n(11151);const c={title:"Interfaces",sidebar_label:"Interfaces",sidebar_position:3,slug:"/middleware/callbacks/interfaces"},r="Interfaces",s={id:"middleware/callbacks/interfaces",title:"Interfaces",description:"The callbacks middleware requires certain interfaces to be implemented by the underlying IBC applications and the secondary application. If you're simply wiring up the callbacks middleware to an existing IBC application stack and a secondary application such as icacontroller and x/wasm, you can skip this section.",source:"@site/docs/04-middleware/02-callbacks/03-interfaces.md",sourceDirName:"04-middleware/02-callbacks",slug:"/middleware/callbacks/interfaces",permalink:"/main/middleware/callbacks/interfaces",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:3,frontMatter:{title:"Interfaces",sidebar_label:"Interfaces",sidebar_position:3,slug:"/middleware/callbacks/interfaces"},sidebar:"defaultSidebar",previous:{title:"Integration",permalink:"/main/middleware/callbacks/integration"},next:{title:"Events",permalink:"/main/middleware/callbacks/events"}},o={},d=[{value:"Interfaces for developing the Underlying IBC Application",id:"interfaces-for-developing-the-underlying-ibc-application",level:2},{value:"<code>PacketDataUnmarshaler</code>",id:"packetdataunmarshaler",level:3},{value:"<code>PacketDataProvider</code>",id:"packetdataprovider",level:3},{value:"<code>PacketData</code>",id:"packetdata",level:3},{value:"Interfaces for developing the Secondary Application",id:"interfaces-for-developing-the-secondary-application",level:2},{value:"<code>ContractKeeper</code>",id:"contractkeeper",level:3}];function l(e){const t={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",strong:"strong",...(0,i.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h1,{id:"interfaces",children:"Interfaces"}),"\n",(0,a.jsxs)(t.p,{children:["The callbacks middleware requires certain interfaces to be implemented by the underlying IBC applications and the secondary application. If you're simply wiring up the callbacks middleware to an existing IBC application stack and a secondary application such as ",(0,a.jsx)(t.code,{children:"icacontroller"})," and ",(0,a.jsx)(t.code,{children:"x/wasm"}),", you can skip this section."]}),"\n",(0,a.jsx)(t.h2,{id:"interfaces-for-developing-the-underlying-ibc-application",children:"Interfaces for developing the Underlying IBC Application"}),"\n",(0,a.jsx)(t.h3,{id:"packetdataunmarshaler",children:(0,a.jsx)(t.code,{children:"PacketDataUnmarshaler"})}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-go",children:"// PacketDataUnmarshaler defines an optional interface which allows a middleware to\n// request the packet data to be unmarshaled by the base application.\ntype PacketDataUnmarshaler interface {\n  // UnmarshalPacketData unmarshals the packet data into a concrete type\n  // ctx, portID, channelID are provided as arguments, so that (if needed)\n  // the packet data can be unmarshaled based on the channel version.\n  // The version of the underlying app is also returned.\n  UnmarshalPacketData(ctx sdk.Context, portID, channelID string, bz []byte) (interface{}, string, error)\n}\n"})}),"\n",(0,a.jsxs)(t.p,{children:["The callbacks middleware ",(0,a.jsx)(t.strong,{children:"requires"})," the underlying ibc application to implement the ",(0,a.jsx)(t.a,{href:"https://github.com/cosmos/ibc-go/blob/v7.3.0/modules/core/05-port/types/module.go#L142-L147",children:(0,a.jsx)(t.code,{children:"PacketDataUnmarshaler"})})," interface so that it can unmarshal the packet data bytes into the appropriate packet data type. This allows usage of interface functions implemented by the packet data type. The packet data type is expected to implement the ",(0,a.jsx)(t.code,{children:"PacketDataProvider"})," interface (see section below), which is used to parse the callback data that is currently stored in the packet memo field for ",(0,a.jsx)(t.code,{children:"transfer"})," and ",(0,a.jsx)(t.code,{children:"ica"})," packets as a JSON string. See its implementation in the ",(0,a.jsx)(t.a,{href:"https://github.com/cosmos/ibc-go/blob/v7.3.0/modules/apps/transfer/ibc_module.go#L303-L313",children:(0,a.jsx)(t.code,{children:"transfer"})})," and ",(0,a.jsx)(t.a,{href:"https://github.com/cosmos/ibc-go/blob/v7.3.0/modules/apps/27-interchain-accounts/controller/ibc_middleware.go#L258-L268",children:(0,a.jsx)(t.code,{children:"icacontroller"})})," modules for reference."]}),"\n",(0,a.jsxs)(t.p,{children:["If the underlying application is a middleware itself, then it can implement this interface by simply passing the function call to its underlying application. See its implementation in the ",(0,a.jsx)(t.a,{href:"https://github.com/cosmos/ibc-go/blob/v7.3.0/modules/apps/29-fee/ibc_middleware.go#L368-L378",children:(0,a.jsx)(t.code,{children:"fee middleware"})})," for reference."]}),"\n",(0,a.jsx)(t.h3,{id:"packetdataprovider",children:(0,a.jsx)(t.code,{children:"PacketDataProvider"})}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-go",children:"// PacketDataProvider defines an optional interfaces for retrieving custom packet data stored on behalf of another application.\n// An existing problem in the IBC middleware design is the inability for a middleware to define its own packet data type and insert packet sender provided information.\n// A short term solution was introduced into several application's packet data to utilize a memo field to carry this information on behalf of another application.\n// This interfaces standardizes that behaviour. Upon realization of the ability for middleware's to define their own packet data types, this interface will be deprecated and removed with time.\ntype PacketDataProvider interface {\n  // GetCustomPacketData returns the packet data held on behalf of another application.\n  // The name the information is stored under should be provided as the key.\n  // If no custom packet data exists for the key, nil should be returned.\n  GetCustomPacketData(key string) interface{}\n}\n"})}),"\n",(0,a.jsxs)(t.p,{children:["The callbacks middleware also ",(0,a.jsx)(t.strong,{children:"requires"})," the underlying ibc application's packet data type to implement the ",(0,a.jsx)(t.a,{href:"https://github.com/cosmos/ibc-go/blob/v7.3.0/modules/core/exported/packet.go#L43-L52",children:(0,a.jsx)(t.code,{children:"PacketDataProvider"})})," interface. This interface is used to retrieve the callback data from the packet data (using the memo field in the case of ",(0,a.jsx)(t.code,{children:"transfer"})," and ",(0,a.jsx)(t.code,{children:"ica"}),"). For example, see its implementation in the ",(0,a.jsx)(t.a,{href:"https://github.com/cosmos/ibc-go/blob/v7.3.0/modules/apps/transfer/types/packet.go#L85-L105",children:(0,a.jsx)(t.code,{children:"transfer"})})," module."]}),"\n",(0,a.jsx)(t.p,{children:"Since middlewares do not have packet types, they do not need to implement this interface."}),"\n",(0,a.jsx)(t.h3,{id:"packetdata",children:(0,a.jsx)(t.code,{children:"PacketData"})}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-go",children:"// PacketData defines an optional interface which an application's packet data structure may implement.\ntype PacketData interface {\n  // GetPacketSender returns the sender address of the packet data.\n  // If the packet sender is unknown or undefined, an empty string should be returned.\n  GetPacketSender(sourcePortID string) string\n}\n"})}),"\n",(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.a,{href:"https://github.com/cosmos/ibc-go/blob/v7.3.0/modules/core/exported/packet.go#L36-L41",children:(0,a.jsx)(t.code,{children:"PacketData"})})," is an optional interface that can be implemented by the underlying ibc application's packet data type. It is used to retrieve the packet sender address from the packet data. The callbacks middleware uses this interface to retrieve the packet sender address and pass it to the callback function during a source callback. If this interface is not implemented, then the callbacks middleware passes and empty string as the sender address. For example, see its implementation in the ",(0,a.jsx)(t.a,{href:"https://github.com/cosmos/ibc-go/blob/v7.3.0/modules/apps/transfer/types/packet.go#L74-L83",children:(0,a.jsx)(t.code,{children:"transfer"})})," and ",(0,a.jsx)(t.a,{href:"https://github.com/cosmos/ibc-go/blob/v7.3.0/modules/apps/27-interchain-accounts/types/packet.go#L78-L92",children:(0,a.jsx)(t.code,{children:"ica"})})," module."]}),"\n",(0,a.jsx)(t.p,{children:"This interface was added so that secondary applications can retrieve the packet sender address to perform custom authorization logic if needed."}),"\n",(0,a.jsx)(t.p,{children:"Since middlewares do not have packet types, they do not need to implement this interface."}),"\n",(0,a.jsx)(t.h2,{id:"interfaces-for-developing-the-secondary-application",children:"Interfaces for developing the Secondary Application"}),"\n",(0,a.jsx)(t.h3,{id:"contractkeeper",children:(0,a.jsx)(t.code,{children:"ContractKeeper"})}),"\n",(0,a.jsxs)(t.p,{children:["The callbacks middleware requires the secondary application to implement the ",(0,a.jsx)(t.a,{href:"https://github.com/cosmos/ibc-go/blob/v7.3.0/modules/apps/callbacks/types/expected_keepers.go#L11-L83",children:(0,a.jsx)(t.code,{children:"ContractKeeper"})})," interface. The contract keeper will be invoked at each step of the packet lifecycle. When a packet is sent, if callback information is provided, the contract keeper will be invoked via the ",(0,a.jsx)(t.code,{children:"IBCSendPacketCallback"}),". This allows the contract keeper to prevent packet sends when callback information is provided, for example if the sender is unauthorized to perform callbacks on the given information. If the packet send is successful, the contract keeper on the destination (if present) will be invoked when a packet has been received and the acknowledgement is written, this will occur via ",(0,a.jsx)(t.code,{children:"IBCReceivePacketCallback"}),". At the end of the packet lifecycle, when processing acknowledgements or timeouts, the source contract keeper will be invoked either via ",(0,a.jsx)(t.code,{children:"IBCOnAcknowledgementPacket"})," or ",(0,a.jsx)(t.code,{children:"IBCOnTimeoutPacket"}),". Once a packet has been sent, each step of the packet lifecycle can be processed given that a relayer sets the gas limit to be more than or equal to the required ",(0,a.jsx)(t.code,{children:"CommitGasLimit"}),". State changes performed in the callback will only be committed upon successful execution."]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-go",children:"// ContractKeeper defines the entry points exposed to the VM module which invokes a smart contract\ntype ContractKeeper interface {\n\t// IBCSendPacketCallback is called in the source chain when a PacketSend is executed. The\n\t// packetSenderAddress is determined by the underlying module, and may be empty if the sender is\n\t// unknown or undefined. The contract is expected to handle the callback within the user defined\n\t// gas limit, and handle any errors, or panics gracefully.\n\t// This entry point is called with a cached context. If an error is returned, then the changes in\n\t// this context will not be persisted, and the error will be propagated to the underlying IBC\n\t// application, resulting in a packet send failure.\n\t//\n\t// Implementations are provided with the packetSenderAddress and MAY choose to use this to perform\n\t// validation on the origin of a given packet. It is recommended to perform the same validation\n\t// on all source chain callbacks (SendPacket, AcknowledgementPacket, TimeoutPacket). This\n\t// defensively guards against exploits due to incorrectly wired SendPacket ordering in IBC stacks.\n\t//\n\t// The version provided is the base application version for the given packet send. This allows\n\t// contracts to determine how to unmarshal the packetData.\n\tIBCSendPacketCallback(\n\t\tcachedCtx sdk.Context,\n\t\tsourcePort string,\n\t\tsourceChannel string,\n\t\ttimeoutHeight clienttypes.Height,\n\t\ttimeoutTimestamp uint64,\n\t\tpacketData []byte,\n\t\tcontractAddress,\n\t\tpacketSenderAddress string,\n\t\tversion string,\n\t) error\n\t// IBCOnAcknowledgementPacketCallback is called in the source chain when a packet acknowledgement\n\t// is received. The packetSenderAddress is determined by the underlying module, and may be empty if\n\t// the sender is unknown or undefined. The contract is expected to handle the callback within the\n\t// user defined gas limit, and handle any errors, or panics gracefully.\n\t// This entry point is called with a cached context. If an error is returned, then the changes in\n\t// this context will not be persisted, but the packet lifecycle will not be blocked.\n\t//\n\t// Implementations are provided with the packetSenderAddress and MAY choose to use this to perform\n\t// validation on the origin of a given packet. It is recommended to perform the same validation\n\t// on all source chain callbacks (SendPacket, AcknowledgementPacket, TimeoutPacket). This\n\t// defensively guards against exploits due to incorrectly wired SendPacket ordering in IBC stacks.\n\t//\n\t// The version provided is the base application version for the given packet send. This allows\n\t// contracts to determine how to unmarshal the packetData.\n\tIBCOnAcknowledgementPacketCallback(\n\t\tcachedCtx sdk.Context,\n\t\tpacket channeltypes.Packet,\n\t\tacknowledgement []byte,\n\t\trelayer sdk.AccAddress,\n\t\tcontractAddress,\n\t\tpacketSenderAddress string,\n\t\tversion string,\n\t) error\n\t// IBCOnTimeoutPacketCallback is called in the source chain when a packet is not received before\n\t// the timeout height. The packetSenderAddress is determined by the underlying module, and may be\n\t// empty if the sender is unknown or undefined. The contract is expected to handle the callback\n\t// within the user defined gas limit, and handle any error, out of gas, or panics gracefully.\n\t// This entry point is called with a cached context. If an error is returned, then the changes in\n\t// this context will not be persisted, but the packet lifecycle will not be blocked.\n\t//\n\t// Implementations are provided with the packetSenderAddress and MAY choose to use this to perform\n\t// validation on the origin of a given packet. It is recommended to perform the same validation\n\t// on all source chain callbacks (SendPacket, AcknowledgementPacket, TimeoutPacket). This\n\t// defensively guards against exploits due to incorrectly wired SendPacket ordering in IBC stacks.\n\t//\n\t// The version provided is the base application version for the given packet send. This allows\n\t// contracts to determine how to unmarshal the packetData.\n\tIBCOnTimeoutPacketCallback(\n\t\tcachedCtx sdk.Context,\n\t\tpacket channeltypes.Packet,\n\t\trelayer sdk.AccAddress,\n\t\tcontractAddress,\n\t\tpacketSenderAddress string,\n\t\tversion string,\n\t) error\n\t// IBCReceivePacketCallback is called in the destination chain when a packet acknowledgement is written.\n\t// The contract is expected to handle the callback within the user defined gas limit, and handle any errors,\n\t// out of gas, or panics gracefully.\n\t// This entry point is called with a cached context. If an error is returned, then the changes in\n\t// this context will not be persisted, but the packet lifecycle will not be blocked.\n\t//\n\t// The version provided is the base application version for the given packet send. This allows\n\t// contracts to determine how to unmarshal the packetData.\n\tIBCReceivePacketCallback(\n\t\tcachedCtx sdk.Context,\n\t\tpacket ibcexported.PacketI,\n\t\tack ibcexported.Acknowledgement,\n\t\tcontractAddress string,\n\t\tversion string,\n\t) error\n}\n"})}),"\n",(0,a.jsx)(t.p,{children:"These are the callback entry points exposed to the secondary application. The secondary application is expected to execute its custom logic within these entry points. The callbacks middleware will handle the execution of these callbacks and revert the state if needed."}),"\n",(0,a.jsx)(t.admonition,{type:"tip",children:(0,a.jsxs)(t.p,{children:["Note that the source callback entry points are provided with the ",(0,a.jsx)(t.code,{children:"packetSenderAddress"})," and MAY choose to use this to perform validation on the origin of a given packet. It is recommended to perform the same validation on all source chain callbacks (SendPacket, AcknowledgePacket, TimeoutPacket). This defensively guards against exploits due to incorrectly wired SendPacket ordering in IBC stacks."]})})]})}function h(e={}){const{wrapper:t}={...(0,i.a)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(l,{...e})}):l(e)}},11151:(e,t,n)=>{n.d(t,{Z:()=>s,a:()=>r});var a=n(67294);const i={},c=a.createContext(i);function r(e){const t=a.useContext(c);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function s(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),a.createElement(c.Provider,{value:t},e.children)}}}]);