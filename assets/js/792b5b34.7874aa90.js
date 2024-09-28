"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7210],{84669:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>l,contentTitle:()=>r,default:()=>h,frontMatter:()=>s,metadata:()=>o,toc:()=>c});var t=a(85893),i=a(11151);const s={title:"Channel Upgrades",sidebar_label:"Channel Upgrades",sidebar_position:6,slug:"/ibc/channel-upgrades"},r="Channel Upgrades",o={id:"ibc/channel-upgrades",title:"Channel Upgrades",description:"Learn how to upgrade existing IBC channels.",source:"@site/versioned_docs/version-v8.5.x/01-ibc/06-channel-upgrades.md",sourceDirName:"01-ibc",slug:"/ibc/channel-upgrades",permalink:"/v8/ibc/channel-upgrades",draft:!1,unlisted:!1,tags:[],version:"v8.5.x",sidebarPosition:6,frontMatter:{title:"Channel Upgrades",sidebar_label:"Channel Upgrades",sidebar_position:6,slug:"/ibc/channel-upgrades"},sidebar:"defaultSidebar",previous:{title:"Genesis Restart Upgrades",permalink:"/v8/ibc/upgrades/genesis-restart"},next:{title:"Governance Proposals",permalink:"/v8/ibc/proposals"}},l={},c=[{value:"Channel Upgrade Handshake",id:"channel-upgrade-handshake",level:2},{value:"Initializing a Channel Upgrade",id:"initializing-a-channel-upgrade",level:2},{value:"Governance gating on <code>ChanUpgradeInit</code>",id:"governance-gating-on-chanupgradeinit",level:3},{value:"Channel State and Packet Flushing",id:"channel-state-and-packet-flushing",level:2},{value:"Cancelling a Channel Upgrade",id:"cancelling-a-channel-upgrade",level:2},{value:"Timing Out a Channel Upgrade",id:"timing-out-a-channel-upgrade",level:2},{value:"Pruning Acknowledgements",id:"pruning-acknowledgements",level:2},{value:"CLI Usage",id:"cli-usage",level:3},{value:"IBC App Recommendations",id:"ibc-app-recommendations",level:2},{value:"Upgrade an existing transfer application stack to use 29-fee middleware",id:"upgrade-an-existing-transfer-application-stack-to-use-29-fee-middleware",level:2},{value:"Wire up the transfer stack and middleware in app.go",id:"wire-up-the-transfer-stack-and-middleware-in-appgo",level:3},{value:"Submit a governance proposal to execute a MsgChannelUpgradeInit message",id:"submit-a-governance-proposal-to-execute-a-msgchannelupgradeinit-message",level:3},{value:"Submit the proposal",id:"submit-the-proposal",level:3},{value:"Upgrading channels with the CLI",id:"upgrading-channels-with-the-cli",level:2}];function d(e){const n={a:"a",admonition:"admonition",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"channel-upgrades",children:"Channel Upgrades"}),"\n",(0,t.jsx)(n.admonition,{title:"Synopsis",type:"note",children:(0,t.jsx)(n.p,{children:"Learn how to upgrade existing IBC channels."})}),"\n",(0,t.jsx)(n.p,{children:"Channel upgradability is an IBC-level protocol that allows chains to leverage new application and channel features without having to create new channels or perform a network-wide upgrade."}),"\n",(0,t.jsx)(n.p,{children:"Prior to this feature, developers who wanted to update an application module or add a middleware to their application flow would need to create a new channel in order to use the updated application feature/middleware, resulting in a loss of the accumulated state/liquidity, token fungibility (as the channel ID is encoded in the IBC denom), and any other larger network effects of losing usage of the existing channel from relayers monitoring, etc."}),"\n",(0,t.jsxs)(n.p,{children:["With channel upgradability, applications will be able to implement features such as but not limited to: potentially adding ",(0,t.jsx)(n.a,{href:"https://github.com/cosmos/ibc/discussions/719",children:"denom metadata to tokens"}),", or utilizing the ",(0,t.jsx)(n.a,{href:"https://github.com/cosmos/ibc/tree/main/spec/app/ics-029-fee-payment",children:"fee middleware"}),", all while maintaining the channels on which they currently operate."]}),"\n",(0,t.jsx)(n.p,{children:"This document outlines the channel upgrade feature, and the multiple steps used in the upgrade process."}),"\n",(0,t.jsx)(n.h2,{id:"channel-upgrade-handshake",children:"Channel Upgrade Handshake"}),"\n",(0,t.jsx)(n.p,{children:"Channel upgrades will be achieved using a handshake process that is designed to be similar to the standard connection/channel opening handshake."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-go",children:'type Channel struct {\n  // current state of the channel end\n  State State `protobuf:"varint,1,opt,name=state,proto3,enum=ibc.core.channel.v1.State" json:"state,omitempty"`\n  // whether the channel is ordered or unordered\n  Ordering Order `protobuf:"varint,2,opt,name=ordering,proto3,enum=ibc.core.channel.v1.Order" json:"ordering,omitempty"`\n  // counterparty channel end\n  Counterparty Counterparty `protobuf:"bytes,3,opt,name=counterparty,proto3" json:"counterparty"`\n  // list of connection identifiers, in order, along which packets sent on\n  // this channel will travel\n  ConnectionHops []string `protobuf:"bytes,4,rep,name=connection_hops,json=connectionHops,proto3" json:"connection_hops,omitempty"`\n  // opaque channel version, which is agreed upon during the handshake\n  Version string `protobuf:"bytes,5,opt,name=version,proto3" json:"version,omitempty"`\n  // upgrade sequence indicates the latest upgrade attempt performed by this channel\n  // the value of 0 indicates the channel has never been upgraded\n  UpgradeSequence uint64 `protobuf:"varint,6,opt,name=upgrade_sequence,json=upgradeSequence,proto3" json:"upgrade_sequence,omitempty"`\n}\n'})}),"\n",(0,t.jsxs)(n.p,{children:["The version, connection hops, and channel ordering are fields in this channel struct which can be changed. For example, the fee middleware can be added to an application module by updating the version string ",(0,t.jsx)(n.a,{href:"https://github.com/cosmos/ibc-go/blob/v8.1.0/modules/apps/29-fee/types/metadata.pb.go#L29",children:"shown here"}),". However, although connection hops can change in a channel upgrade, both sides must still be each other's counterparty. This is enforced by the upgrade protocol and upgrade attempts which try to alter an expected counterparty will fail."]}),"\n",(0,t.jsx)(n.p,{children:"On a high level, successful handshake process for channel upgrades works as follows:"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsx)(n.li,{children:"The chain initiating the upgrade process will propose an upgrade."}),"\n",(0,t.jsx)(n.li,{children:"If the counterparty agrees with the proposal, it will block sends and begin flushing any in-flight packets on its channel end. This flushing process will be covered in more detail below."}),"\n",(0,t.jsx)(n.li,{children:"Upon successful completion of the previous step, the initiating chain will also block packet sends and begin flushing any in-flight packets on its channel end."}),"\n",(0,t.jsx)(n.li,{children:"Once both channel ends have completed flushing packets within the upgrade timeout window, both channel ends can be opened and upgraded to the new channel fields."}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"Each handshake step will be documented below in greater detail."}),"\n",(0,t.jsx)(n.h2,{id:"initializing-a-channel-upgrade",children:"Initializing a Channel Upgrade"}),"\n",(0,t.jsxs)(n.p,{children:["A channel upgrade is initialised by submitting the ",(0,t.jsx)(n.code,{children:"MsgChannelUpgradeInit"})," message, which can be submitted only by the chain itself upon governance authorization. It is possible to upgrade the channel ordering, the channel connection hops, and the channel version, which can be found in the ",(0,t.jsx)(n.code,{children:"UpgradeFields"}),"."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-go",children:"type MsgChannelUpgradeInit struct {\n  PortId    string\n  ChannelId string\n  Fields    UpgradeFields\n  Signer    string\n}\n"})}),"\n",(0,t.jsxs)(n.p,{children:["As part of the handling of the ",(0,t.jsx)(n.code,{children:"MsgChannelUpgradeInit"})," message, the application's ",(0,t.jsx)(n.code,{children:"OnChanUpgradeInit"})," callback will be triggered as well."]}),"\n",(0,t.jsx)(n.p,{children:"After this message is handled successfully, the channel's upgrade sequence will be incremented. This upgrade sequence will serve as a nonce for the upgrade process to provide replay protection."}),"\n",(0,t.jsx)(n.admonition,{type:"warning",children:(0,t.jsx)(n.p,{children:"Initiating an upgrade in the same block as opening a channel may potentially prevent the counterparty channel from also opening."})}),"\n",(0,t.jsxs)(n.h3,{id:"governance-gating-on-chanupgradeinit",children:["Governance gating on ",(0,t.jsx)(n.code,{children:"ChanUpgradeInit"})]}),"\n",(0,t.jsxs)(n.p,{children:["The message signer for ",(0,t.jsx)(n.code,{children:"MsgChannelUpgradeInit"})," must be the address which has been designated as the ",(0,t.jsx)(n.code,{children:"authority"})," of the ",(0,t.jsx)(n.code,{children:"IBCKeeper"}),". If this proposal passes, the counterparty's channel will upgrade by default."]}),"\n",(0,t.jsxs)(n.p,{children:["If chains want to initiate the upgrade of many channels, they will need to submit a governance proposal with multiple ",(0,t.jsx)(n.code,{children:"MsgChannelUpgradeInit"}),"  messages, one for each channel they would like to upgrade, again with message signer as the designated ",(0,t.jsx)(n.code,{children:"authority"})," of the ",(0,t.jsx)(n.code,{children:"IBCKeeper"}),". The ",(0,t.jsx)(n.code,{children:"upgrade-channels"})," CLI command can be used to submit a proposal that initiates the upgrade of multiple channels; see section ",(0,t.jsx)(n.a,{href:"#upgrading-channels-with-the-cli",children:"Upgrading channels with the CLI"})," below for more information."]}),"\n",(0,t.jsx)(n.h2,{id:"channel-state-and-packet-flushing",children:"Channel State and Packet Flushing"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"FLUSHING"})," and ",(0,t.jsx)(n.code,{children:"FLUSHCOMPLETE"})," are additional channel states which have been added to enable the upgrade feature."]}),"\n",(0,t.jsx)(n.p,{children:"These states may consist of:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-go",children:"const (\n  // Default State\n  UNINITIALIZED State = 0\n  // A channel has just started the opening handshake.\n  INIT State = 1\n  // A channel has acknowledged the handshake step on the counterparty chain.\n  TRYOPEN State = 2\n  // A channel has completed the handshake. Open channels are\n  // ready to send and receive packets.\n  OPEN State = 3\n  // A channel has been closed and can no longer be used to send or receive\n  // packets.\n  CLOSED State = 4\n  // A channel has just accepted the upgrade handshake attempt and is flushing in-flight packets.\n  FLUSHING State = 5\n  // A channel has just completed flushing any in-flight packets.\n  FLUSHCOMPLETE State = 6\n)\n"})}),"\n",(0,t.jsxs)(n.p,{children:["These are found in ",(0,t.jsx)(n.code,{children:"State"})," on the ",(0,t.jsx)(n.code,{children:"Channel"})," struct:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-go",children:'type Channel struct {\n  // current state of the channel end\n  State State `protobuf:"varint,1,opt,name=state,proto3,enum=ibc.core.channel.v1.State" json:"state,omitempty"`\n  // whether the channel is ordered or unordered\n  Ordering Order `protobuf:"varint,2,opt,name=ordering,proto3,enum=ibc.core.channel.v1.Order" json:"ordering,omitempty"`\n  // counterparty channel end\n  Counterparty Counterparty `protobuf:"bytes,3,opt,name=counterparty,proto3" json:"counterparty"`\n  // list of connection identifiers, in order, along which packets sent on\n  // this channel will travel\n  ConnectionHops []string `protobuf:"bytes,4,rep,name=connection_hops,json=connectionHops,proto3" json:"connection_hops,omitempty"`\n  // opaque channel version, which is agreed upon during the handshake\n  Version string `protobuf:"bytes,5,opt,name=version,proto3" json:"version,omitempty"`\n  // upgrade sequence indicates the latest upgrade attempt performed by this channel\n  // the value of 0 indicates the channel has never been upgraded\n  UpgradeSequence uint64 `protobuf:"varint,6,opt,name=upgrade_sequence,json=upgradeSequence,proto3" json:"upgrade_sequence,omitempty"`\n}\n'})}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"startFlushing"})," is the specific method which is called in ",(0,t.jsx)(n.code,{children:"ChanUpgradeTry"})," and ",(0,t.jsx)(n.code,{children:"ChanUpgradeAck"})," to update the state on the channel end. This will set the timeout on the upgrade and update the channel state to ",(0,t.jsx)(n.code,{children:"FLUSHING"})," which will block the upgrade from continuing until all in-flight packets have been flushed."]}),"\n",(0,t.jsxs)(n.p,{children:["This will also set the upgrade timeout for the counterparty (i.e. the timeout before which the counterparty chain must move from ",(0,t.jsx)(n.code,{children:"FLUSHING"})," to ",(0,t.jsx)(n.code,{children:"FLUSHCOMPLETE"}),"; if it doesn't then the chain will cancel the upgrade and write an error receipt). The timeout is a relative time duration in nanoseconds that can be changed with ",(0,t.jsx)(n.code,{children:"MsgUpdateParams"})," and by default is 10 minutes."]}),"\n",(0,t.jsxs)(n.p,{children:["The state will change to ",(0,t.jsx)(n.code,{children:"FLUSHCOMPLETE"})," once there are no in-flight packets left and the channel end is ready to move to ",(0,t.jsx)(n.code,{children:"OPEN"}),". This flush state will also have an impact on how a channel ugrade can be cancelled, as detailed below."]}),"\n",(0,t.jsxs)(n.p,{children:["All other parameters will remain the same during the upgrade handshake until the upgrade handshake completes. When the channel is reset to ",(0,t.jsx)(n.code,{children:"OPEN"})," on a successful upgrade handshake, the relevant fields on the channel end will be switched over to the ",(0,t.jsx)(n.code,{children:"UpgradeFields"})," specified in the upgrade."]}),"\n",(0,t.jsx)(n.admonition,{type:"note",children:(0,t.jsx)(n.p,{children:"When transitioning a channel from UNORDERED to ORDERED, new packet sends from the channel end which upgrades first will be incapable of being timed out until the counterparty has finished upgrading."})}),"\n",(0,t.jsx)(n.admonition,{type:"warning",children:(0,t.jsxs)(n.p,{children:["Due to the addition of new channel states, packets can still be received and processed in both ",(0,t.jsx)(n.code,{children:"FLUSHING"})," and ",(0,t.jsx)(n.code,{children:"FLUSHCOMPLETE"})," states.\nPackets can also be acknowledged in the ",(0,t.jsx)(n.code,{children:"FLUSHING"})," state. Acknowledging will ",(0,t.jsx)(n.strong,{children:"not"})," be possible when the channel is in the ",(0,t.jsx)(n.code,{children:"FLUSHCOMPLETE"})," state, since all packets sent from that channel end have been flushed.\nApplication developers should consider these new states when implementing application logic that relies on the channel state.\nIt is still only possible to send packets when the channel is in the ",(0,t.jsx)(n.code,{children:"OPEN"})," state, but sending is disallowed when the channel enters ",(0,t.jsx)(n.code,{children:"FLUSHING"})," and ",(0,t.jsx)(n.code,{children:"FLUSHCOMPLETE"}),". When the channel reopens, sending will be possible again."]})}),"\n",(0,t.jsx)(n.h2,{id:"cancelling-a-channel-upgrade",children:"Cancelling a Channel Upgrade"}),"\n",(0,t.jsxs)(n.p,{children:["Channel upgrade cancellation is performed by submitting a ",(0,t.jsx)(n.code,{children:"MsgChannelUpgradeCancel"})," message."]}),"\n",(0,t.jsx)(n.p,{children:"It is possible for the authority to cancel an in-progress channel upgrade if the following are true:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"The signer is the authority"}),"\n",(0,t.jsx)(n.li,{children:"The channel state has not reached FLUSHCOMPLETE"}),"\n",(0,t.jsxs)(n.li,{children:["If the channel state has reached FLUSHCOMPLETE, an existence proof of an ",(0,t.jsx)(n.code,{children:"ErrorReceipt"})," on the counterparty chain is provided at our upgrade sequence or greater"]}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"It is possible for a relayer to cancel an in-progress channel upgrade if the following are true:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["An existence proof of an ",(0,t.jsx)(n.code,{children:"ErrorReceipt"})," on the counterparty chain is provided at our upgrade sequence or greater"]}),"\n"]}),"\n",(0,t.jsxs)(n.blockquote,{children:["\n",(0,t.jsxs)(n.p,{children:["Note: if the signer is the authority, e.g. the ",(0,t.jsx)(n.code,{children:"gov"})," address, no ",(0,t.jsx)(n.code,{children:"ErrorReceipt"})," or proof is required if the current channel state is not in FLUSHCOMPLETE.\nThese can be left empty in the ",(0,t.jsx)(n.code,{children:"MsgChannelUpgradeCancel"})," message in that case."]}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["Upon cancelling a channel upgrade, an ",(0,t.jsx)(n.code,{children:"ErrorReceipt"})," will be written with the channel's current upgrade sequence, and\nthe channel will move back to ",(0,t.jsx)(n.code,{children:"OPEN"})," state keeping its original parameters."]}),"\n",(0,t.jsxs)(n.p,{children:["It will then be possible to re-initiate an upgrade by sending a ",(0,t.jsx)(n.code,{children:"MsgChannelOpenInit"})," message."]}),"\n",(0,t.jsx)(n.admonition,{type:"warning",children:(0,t.jsxs)(n.p,{children:["Performing sequentially an upgrade cancellation, upgrade initialization, and another upgrade cancellation in a single block while the counterparty is in ",(0,t.jsx)(n.code,{children:"FLUSHCOMPLETE"})," will lead to corrupted state.\nThe counterparty will be unable to cancel its upgrade attempt and will require a manual migration.\nWhen the counterparty is in ",(0,t.jsx)(n.code,{children:"FLUSHCOMPLETE"}),", it requires a proof that the counterparty cancelled its current upgrade attempt.\nWhen this cancellation is succeeded by an initialization and cancellation in the same block, it results in the proof of cancellation existing only for the next upgrade attempt, not the current."]})}),"\n",(0,t.jsx)(n.h2,{id:"timing-out-a-channel-upgrade",children:"Timing Out a Channel Upgrade"}),"\n",(0,t.jsxs)(n.p,{children:["Timing out an outstanding channel upgrade may be necessary during the flushing packet stage of the channel upgrade process. As stated above, with ",(0,t.jsx)(n.code,{children:"ChanUpgradeTry"})," or ",(0,t.jsx)(n.code,{children:"ChanUpgradeAck"}),", the channel state has been changed from ",(0,t.jsx)(n.code,{children:"OPEN"})," to ",(0,t.jsx)(n.code,{children:"FLUSHING"}),", so no new packets will be allowed to be sent over this channel while flushing. If upgrades cannot be performed in a timely manner (due to unforeseen flushing issues), upgrade timeouts allow the channel to avoid blocking packet sends indefinitely. If flushing exceeds the time limit set in the ",(0,t.jsx)(n.code,{children:"UpgradeTimeout"})," channel ",(0,t.jsx)(n.code,{children:"Params"}),", the upgrade process will need to be timed out to abort the upgrade attempt and resume normal channel processing."]}),"\n",(0,t.jsxs)(n.p,{children:["Channel upgrades require setting a valid timeout value in the channel ",(0,t.jsx)(n.code,{children:"Params"})," before submitting a ",(0,t.jsx)(n.code,{children:"MsgChannelUpgradeTry"})," or ",(0,t.jsx)(n.code,{children:"MsgChannelUpgradeAck"})," message (by default, 10 minutes):"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-go",children:"type Params struct {\n  UpgradeTimeout Timeout \n}\n"})}),"\n",(0,t.jsx)(n.p,{children:"A valid Timeout contains either one or both of a timestamp and block height (sequence)."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-go",children:"type Timeout struct {\n  // block height after which the packet or upgrade times out\n  Height types.Height\n  // block timestamp (in nanoseconds) after which the packet or upgrade times out\n  Timestamp uint64\n}\n"})}),"\n",(0,t.jsxs)(n.p,{children:["This timeout will then be set as a field on the ",(0,t.jsx)(n.code,{children:"Upgrade"})," struct itself when flushing is started."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-go",children:"type Upgrade struct {\n  Fields           UpgradeFields \n  Timeout          Timeout       \n  NextSequenceSend uint64        \n}\n"})}),"\n",(0,t.jsxs)(n.p,{children:["If the timeout has been exceeded during flushing, a chain can then submit the ",(0,t.jsx)(n.code,{children:"MsgChannelUpgradeTimeout"})," to timeout the channel upgrade process:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-go",children:"type MsgChannelUpgradeTimeout struct {\n  PortId              string    \n  ChannelId           string\n  CounterpartyChannel Channel \n  ProofChannel        []byte\n  ProofHeight         types.Height\n  Signer              string \n}\n"})}),"\n",(0,t.jsxs)(n.p,{children:["An ",(0,t.jsx)(n.code,{children:"ErrorReceipt"})," will be written with the channel's current upgrade sequence, and the channel will move back to ",(0,t.jsx)(n.code,{children:"OPEN"})," state keeping its original parameters."]}),"\n",(0,t.jsxs)(n.p,{children:["Note that timing out a channel upgrade will end the upgrade process, and a new ",(0,t.jsx)(n.code,{children:"MsgChannelUpgradeInit"})," will have to be submitted via governance in order to restart the upgrade process."]}),"\n",(0,t.jsx)(n.h2,{id:"pruning-acknowledgements",children:"Pruning Acknowledgements"}),"\n",(0,t.jsxs)(n.p,{children:["Acknowledgements can be pruned by broadcasting the ",(0,t.jsx)(n.code,{children:"MsgPruneAcknowledgements"})," message."]}),"\n",(0,t.jsxs)(n.blockquote,{children:["\n",(0,t.jsx)(n.p,{children:"Note: It is only possible to prune acknowledgements after a channel has been upgraded, so pruning will fail\nif the channel has not yet been upgraded."}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-protobuf",children:'// MsgPruneAcknowledgements defines the request type for the PruneAcknowledgements rpc.\nmessage MsgPruneAcknowledgements {\n  option (cosmos.msg.v1.signer)      = "signer";\n  option (gogoproto.goproto_getters) = false;\n\n  string port_id    = 1;\n  string channel_id = 2;\n  uint64 limit      = 3;\n  string signer     = 4;\n}\n'})}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.code,{children:"port_id"})," and ",(0,t.jsx)(n.code,{children:"channel_id"})," specify the port and channel to act on, and the ",(0,t.jsx)(n.code,{children:"limit"})," specifies the upper bound for the number\nof acknowledgements and packet receipts to prune."]}),"\n",(0,t.jsx)(n.h3,{id:"cli-usage",children:"CLI Usage"}),"\n",(0,t.jsxs)(n.p,{children:["Acknowledgements can be pruned via the cli with the ",(0,t.jsx)(n.code,{children:"prune-acknowledgements"})," command."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"simd tx ibc channel prune-acknowledgements [port] [channel] [limit]\n"})}),"\n",(0,t.jsx)(n.h2,{id:"ibc-app-recommendations",children:"IBC App Recommendations"}),"\n",(0,t.jsx)(n.p,{children:"IBC application callbacks should be primarily used to validate data fields and do compatibility checks. Application developers\nshould be aware that callbacks will be invoked before any core ibc state changes are written."}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"OnChanUpgradeInit"})," should validate the proposed version, order, and connection hops, and should return the application version to upgrade to."]}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"OnChanUpgradeTry"})," should validate the proposed version (provided by the counterparty), order, and connection hops. The desired upgrade version should be returned."]}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"OnChanUpgradeAck"})," should validate the version proposed by the counterparty."]}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"OnChanUpgradeOpen"})," should perform any logic associated with changing of the channel fields."]}),"\n",(0,t.jsxs)(n.blockquote,{children:["\n",(0,t.jsxs)(n.p,{children:["IBC applications should not attempt to process any packet data under the new conditions until after ",(0,t.jsx)(n.code,{children:"OnChanUpgradeOpen"}),"\nhas been executed, as up until this point it is still possible for the upgrade handshake to fail and for the channel\nto remain in the pre-upgraded state."]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"upgrade-an-existing-transfer-application-stack-to-use-29-fee-middleware",children:"Upgrade an existing transfer application stack to use 29-fee middleware"}),"\n",(0,t.jsx)(n.h3,{id:"wire-up-the-transfer-stack-and-middleware-in-appgo",children:"Wire up the transfer stack and middleware in app.go"}),"\n",(0,t.jsx)(n.p,{children:"In app.go, the existing transfer stack must be wrapped with the fee middleware."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-golang",children:'\nimport (\n  // ... \n  ibcfee "github.com/cosmos/ibc-go/v8/modules/apps/29-fee"\n  ibctransferkeeper "github.com/cosmos/ibc-go/v8/modules/apps/transfer/keeper"\n  transfer "github.com/cosmos/ibc-go/v8/modules/apps/transfer"\n  porttypes "github.com/cosmos/ibc-go/v8/modules/core/05-port/types"\n  // ...\n)\n\ntype App struct {\n  // ...\n  TransferKeeper        ibctransferkeeper.Keeper\n  IBCFeeKeeper          ibcfeekeeper.Keeper\n  // ..\n}\n\n// ...\n\napp.IBCFeeKeeper = ibcfeekeeper.NewKeeper(\n  appCodec, keys[ibcfeetypes.StoreKey],\n  app.IBCKeeper.ChannelKeeper, // may be replaced with IBC middleware\n  app.IBCKeeper.ChannelKeeper,\n  app.IBCKeeper.PortKeeper, app.AccountKeeper, app.BankKeeper,\n)\n\n// Create Transfer Keeper and pass IBCFeeKeeper as expected Channel and PortKeeper\n// since fee middleware will wrap the IBCKeeper for underlying application.\napp.TransferKeeper = ibctransferkeeper.NewKeeper(\n  appCodec, keys[ibctransfertypes.StoreKey], app.GetSubspace(ibctransfertypes.ModuleName),\n  app.IBCFeeKeeper, // ISC4 Wrapper: fee IBC middleware\n  app.IBCKeeper.ChannelKeeper, app.IBCKeeper.PortKeeper,\n  app.AccountKeeper, app.BankKeeper, scopedTransferKeeper,\n  authtypes.NewModuleAddress(govtypes.ModuleName).String(),\n)\n\n\nibcRouter := porttypes.NewRouter()\n\n// create IBC module from bottom to top of stack\nvar transferStack porttypes.IBCModule\ntransferStack = transfer.NewIBCModule(app.TransferKeeper)\ntransferStack = ibcfee.NewIBCMiddleware(transferStack, app.IBCFeeKeeper)\n\n// Add transfer stack to IBC Router\nibcRouter.AddRoute(ibctransfertypes.ModuleName, transferStack)\n'})}),"\n",(0,t.jsx)(n.h3,{id:"submit-a-governance-proposal-to-execute-a-msgchannelupgradeinit-message",children:"Submit a governance proposal to execute a MsgChannelUpgradeInit message"}),"\n",(0,t.jsxs)(n.blockquote,{children:["\n",(0,t.jsxs)(n.p,{children:["This process can be performed with the new CLI that has been added\noutlined ",(0,t.jsx)(n.a,{href:"#upgrading-channels-with-the-cli",children:"here"}),"."]}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["Only the configured authority for the ibc module is able to initiate a channel upgrade by submitting a ",(0,t.jsx)(n.code,{children:"MsgChannelUpgradeInit"})," message."]}),"\n",(0,t.jsx)(n.p,{children:"Execute a governance proposal specifying the relevant fields to perform a channel upgrade."}),"\n",(0,t.jsxs)(n.p,{children:["Update the following json sample, and copy the contents into ",(0,t.jsx)(n.code,{children:"proposal.json"}),"."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-json",children:'{\n  "title": "Channel upgrade init",\n  "summary": "Channel upgrade init",\n  "messages": [\n    {\n      "@type": "/ibc.core.channel.v1.MsgChannelUpgradeInit",\n      "signer": "<gov-address>",\n      "port_id": "transfer",\n      "channel_id": "channel-...",\n      "fields": {\n        "ordering": "ORDER_UNORDERED",\n        "connection_hops": ["connection-0"],\n        "version": "{\\"fee_version\\":\\"ics29-1\\",\\"app_version\\":\\"ics20-1\\"}"\n      }\n    }\n  ],\n  "metadata": "<metadata>",\n  "deposit": "10stake"\n}\n'})}),"\n",(0,t.jsxs)(n.blockquote,{children:["\n",(0,t.jsx)(n.p,{children:"Note: ensure the correct fields.version is specified. This is the new version that the channels will be upgraded to."}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"submit-the-proposal",children:"Submit the proposal"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"simd tx submit-proposal proposal.json --from <key_or_address>\n"})}),"\n",(0,t.jsx)(n.h2,{id:"upgrading-channels-with-the-cli",children:"Upgrading channels with the CLI"}),"\n",(0,t.jsx)(n.p,{children:"A new cli has been added which enables either"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["submitting a governance proposal which contains a ",(0,t.jsx)(n.code,{children:"MsgChannelUpgradeInit"})," for every channel to be upgraded."]}),"\n",(0,t.jsxs)(n.li,{children:["generating a ",(0,t.jsx)(n.code,{children:"proposal.json"})," file which contains the proposal contents to be edited/submitted at a later date."]}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["The following example, would submit a governance proposal with the specified deposit, title and summary which would\ncontain a ",(0,t.jsx)(n.code,{children:"MsgChannelUpgradeInit"})," for all ",(0,t.jsx)(n.code,{children:"OPEN"})," channels whose port matches the regular expression ",(0,t.jsx)(n.code,{children:"transfer"}),"."]}),"\n",(0,t.jsxs)(n.blockquote,{children:["\n",(0,t.jsxs)(n.p,{children:["Note: by adding the ",(0,t.jsx)(n.code,{children:"--json"})," flag, the command would instead output the contents of the proposal which could be\nstored in a ",(0,t.jsx)(n.code,{children:"proposal.json"})," file to be edited and submitted at a later date."]}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:'simd tx ibc channel upgrade-channels "{\\"fee_version\\":\\"ics29-1\\",\\"app_version\\":\\"ics20-1\\"}" \\\n  --deposit "10stake" \\\n  --title "Channel Upgrades Governance Proposal" \\\n  --summary "Upgrade all transfer channels to be fee enabled" \\\n  --port-pattern "transfer"\n'})}),"\n",(0,t.jsxs)(n.p,{children:["It is also possible to explicitly list a comma separated string of channel IDs. It is important to note that the\nregular expression matching specified by ",(0,t.jsx)(n.code,{children:"--port-pattern"})," (which defaults to ",(0,t.jsx)(n.code,{children:"transfer"}),") still applies."]}),"\n",(0,t.jsxs)(n.p,{children:["For example the following command would generate the contents of a ",(0,t.jsx)(n.code,{children:"proposal.json"})," file which would attempt to upgrade\nchannels with a port ID of ",(0,t.jsx)(n.code,{children:"transfer"})," and a channelID of ",(0,t.jsx)(n.code,{children:"channel-0"}),", ",(0,t.jsx)(n.code,{children:"channel-1"})," or ",(0,t.jsx)(n.code,{children:"channel-2"}),"."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:'simd tx ibc channel upgrade-channels "{\\"fee_version\\":\\"ics29-1\\",\\"app_version\\":\\"ics20-1\\"}" \\\n  --deposit "10stake" \\\n  --title "Channel Upgrades Governance Proposal" \\\n  --summary "Upgrade all transfer channels to be fee enabled" \\\n  --port-pattern "transfer" \\\n  --channel-ids "channel-0,channel-1,channel-2" \\\n  --json\n'})})]})}function h(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},11151:(e,n,a)=>{a.d(n,{Z:()=>o,a:()=>r});var t=a(67294);const i={},s=t.createContext(i);function r(e){const n=t.useContext(s);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),t.createElement(s.Provider,{value:n},e.children)}}}]);