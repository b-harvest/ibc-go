"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8522],{24569:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>c,contentTitle:()=>s,default:()=>p,frontMatter:()=>r,metadata:()=>a,toc:()=>d});var t=o(85893),i=o(11151);const r={title:"Integration",sidebar_label:"Integration",sidebar_position:2,slug:"/ibc/integration"},s="Integration",a={id:"ibc/integration",title:"Integration",description:"Learn how to integrate IBC to your application and send data packets to other chains.",source:"@site/docs/01-ibc/02-integration.md",sourceDirName:"01-ibc",slug:"/ibc/integration",permalink:"/main/ibc/integration",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{title:"Integration",sidebar_label:"Integration",sidebar_position:2,slug:"/ibc/integration"},sidebar:"defaultSidebar",previous:{title:"Overview",permalink:"/main/ibc/overview"},next:{title:"IBC Applications",permalink:"/main/ibc/apps/apps"}},c={},d=[{value:"Integrating the IBC module",id:"integrating-the-ibc-module",level:2},{value:"Add application fields to <code>App</code>",id:"add-application-fields-to-app",level:3},{value:"Configure the <code>Keeper</code>s",id:"configure-the-keepers",level:3},{value:"Register module routes in the IBC <code>Router</code>",id:"register-module-routes-in-the-ibc-router",level:3},{value:"Module <code>Manager</code> and <code>SimulationManager</code>",id:"module-manager-and-simulationmanager",level:3},{value:"Module account permissions",id:"module-account-permissions",level:3},{value:"Integrating light clients",id:"integrating-light-clients",level:4},{value:"Application ABCI ordering",id:"application-abci-ordering",level:3}];function l(e){const n={a:"a",admonition:"admonition",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"integration",children:"Integration"}),"\n",(0,t.jsx)(n.admonition,{title:"Synopsis",type:"note",children:(0,t.jsx)(n.p,{children:"Learn how to integrate IBC to your application and send data packets to other chains."})}),"\n",(0,t.jsxs)(n.p,{children:["This document outlines the required steps to integrate and configure the ",(0,t.jsx)(n.a,{href:"https://github.com/cosmos/ibc-go/tree/main/modules/core",children:"IBC\nmodule"})," to your Cosmos SDK application and\nsend fungible token transfers to other chains."]}),"\n",(0,t.jsx)(n.h2,{id:"integrating-the-ibc-module",children:"Integrating the IBC module"}),"\n",(0,t.jsx)(n.p,{children:"Integrating the IBC module to your SDK-based application is straightforward. The general changes can be summarized in the following steps:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsxs)(n.a,{href:"#add-application-fields-to-app",children:["Define additional ",(0,t.jsx)(n.code,{children:"Keeper"})," fields for the new modules on the ",(0,t.jsx)(n.code,{children:"App"})," type"]}),"."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsxs)(n.a,{href:"#configure-the-keepers",children:["Add the module's ",(0,t.jsx)(n.code,{children:"StoreKey"}),"s and initialize their ",(0,t.jsx)(n.code,{children:"Keeper"}),"s"]}),"."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsxs)(n.a,{href:"#register-module-routes-in-the-ibc-router",children:["Set up IBC router and add route for the ",(0,t.jsx)(n.code,{children:"transfer"})," module"]}),"."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsxs)(n.a,{href:"#module-account-permissions",children:["Grant permissions to ",(0,t.jsx)(n.code,{children:"transfer"}),"'s ",(0,t.jsx)(n.code,{children:"ModuleAccount"})]}),"."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsxs)(n.a,{href:"#module-manager-and-simulationmanager",children:["Add the modules to the module ",(0,t.jsx)(n.code,{children:"Manager"})]}),"."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsxs)(n.a,{href:"#module-manager-and-simulationmanager",children:["Update the module ",(0,t.jsx)(n.code,{children:"SimulationManager"})," to enable simulations"]}),"."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsxs)(n.a,{href:"#integrating-light-clients",children:["Integrate light client modules (e.g. ",(0,t.jsx)(n.code,{children:"07-tendermint"}),")"]}),"."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsxs)(n.a,{href:"#application-abci-ordering",children:["Add modules to ",(0,t.jsx)(n.code,{children:"Begin/EndBlockers"})," and ",(0,t.jsx)(n.code,{children:"InitGenesis"})]}),"."]}),"\n"]}),"\n",(0,t.jsxs)(n.h3,{id:"add-application-fields-to-app",children:["Add application fields to ",(0,t.jsx)(n.code,{children:"App"})]}),"\n",(0,t.jsxs)(n.p,{children:["We need to register the core ",(0,t.jsx)(n.code,{children:"ibc"})," and ",(0,t.jsx)(n.code,{children:"transfer"})," ",(0,t.jsx)(n.code,{children:"Keeper"}),"s as follows:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-go",metastring:'title="app.go"',children:'import (\n  // other imports\n  // ...\n  ibckeeper "github.com/cosmos/ibc-go/v9/modules/core/keeper"\n  ibctransferkeeper "github.com/cosmos/ibc-go/v9/modules/apps/transfer/keeper"\n)\n\ntype App struct {\n  // baseapp, keys and subspaces definitions\n\n  // other keepers\n  // ...\n  IBCKeeper        *ibckeeper.Keeper // IBC Keeper must be a pointer in the app, so we can SetRouter on it correctly\n  TransferKeeper   ibctransferkeeper.Keeper // for cross-chain fungible token transfers\n\n  // ...\n  // module and simulation manager definitions\n}\n'})}),"\n",(0,t.jsxs)(n.h3,{id:"configure-the-keepers",children:["Configure the ",(0,t.jsx)(n.code,{children:"Keeper"}),"s"]}),"\n",(0,t.jsxs)(n.p,{children:["During initialization, besides initializing the IBC ",(0,t.jsx)(n.code,{children:"Keeper"}),"s (for core ",(0,t.jsx)(n.code,{children:"ibc"})," and ",(0,t.jsx)(n.code,{children:"transfer"})," modules), we need to grant specific capabilities through the capability module ",(0,t.jsx)(n.code,{children:"ScopedKeeper"}),"s so that we can authenticate the object-capability permissions for each of the IBC channels."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-go",children:'import (\n  // other imports\n  // ...\n  authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"\n\n  capabilitykeeper "github.com/cosmos/ibc-go/modules/capability/keeper"\n  capabilitytypes "github.com/cosmos/ibc-go/modules/capability/types"\n  ibcexported "github.com/cosmos/ibc-go/v9/modules/core/exported"\n  ibckeeper "github.com/cosmos/ibc-go/v9/modules/core/keeper"\n  "github.com/cosmos/ibc-go/v9/modules/apps/transfer"\n  ibctransfertypes "github.com/cosmos/ibc-go/v9/modules/apps/transfer/types"\n  ibctm "github.com/cosmos/ibc-go/v9/modules/light-clients/07-tendermint"\n)\n\nfunc NewApp(...args) *App {\n  // define codecs and baseapp\n\n  // add capability keeper and ScopeToModule for ibc module\n  app.CapabilityKeeper = capabilitykeeper.NewKeeper(\n    appCodec,\n    keys[capabilitytypes.StoreKey],\n    memKeys[capabilitytypes.MemStoreKey],\n  )\n\n  // grant capabilities for the ibc and transfer modules\n  scopedIBCKeeper := app.CapabilityKeeper.ScopeToModule(ibcexported.ModuleName)\n  scopedTransferKeeper := app.CapabilityKeeper.ScopeToModule(ibctransfertypes.ModuleName)\n\n  // ... other module keepers\n\n  // Create IBC Keeper\n  app.IBCKeeper = ibckeeper.NewKeeper(\n    appCodec,\n    keys[ibcexported.StoreKey],\n    app.GetSubspace(ibcexported.ModuleName),\n    app.UpgradeKeeper,\n    scopedIBCKeeper,\n    authtypes.NewModuleAddress(govtypes.ModuleName).String(),\n  )\n\n  // Create Transfer Keeper\n  app.TransferKeeper = ibctransferkeeper.NewKeeper(\n    appCodec,\n    keys[ibctransfertypes.StoreKey],\n    app.GetSubspace(ibctransfertypes.ModuleName),\n    app.IBCKeeper.ChannelKeeper,\n    app.IBCKeeper.ChannelKeeper,\n    app.IBCKeeper.PortKeeper,\n    app.AccountKeeper,\n    app.BankKeeper,\n    scopedTransferKeeper,\n    authtypes.NewModuleAddress(govtypes.ModuleName).String(),\n  )\n  transferModule := transfer.NewIBCModule(app.TransferKeeper)\n\n  // ... continues\n}\n'})}),"\n",(0,t.jsxs)(n.h3,{id:"register-module-routes-in-the-ibc-router",children:["Register module routes in the IBC ",(0,t.jsx)(n.code,{children:"Router"})]}),"\n",(0,t.jsxs)(n.p,{children:["IBC needs to know which module is bound to which port so that it can route packets to the\nappropriate module and call the appropriate callbacks. The port to module name mapping is handled by\nIBC's port ",(0,t.jsx)(n.code,{children:"Keeper"}),". However, the mapping from module name to the relevant callbacks is accomplished\nby the port\n",(0,t.jsx)(n.a,{href:"https://github.com/cosmos/ibc-go/blob/main/modules/core/05-port/types/router.go",children:(0,t.jsx)(n.code,{children:"Router"})})," on the\n",(0,t.jsx)(n.code,{children:"ibc"})," module."]}),"\n",(0,t.jsx)(n.p,{children:"Adding the module routes allows the IBC handler to call the appropriate callback when processing a\nchannel handshake or a packet."}),"\n",(0,t.jsxs)(n.p,{children:["Currently, a ",(0,t.jsx)(n.code,{children:"Router"})," is static so it must be initialized and set correctly on app initialization.\nOnce the ",(0,t.jsx)(n.code,{children:"Router"})," has been set, no new routes can be added."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-go",metastring:'title="app.go"',children:'import (\n  // other imports\n  // ...\n  porttypes "github.com/cosmos/ibc-go/v9/modules/core/05-port/types" \n  ibctransfertypes "github.com/cosmos/ibc-go/v9/modules/apps/transfer/types"\n)\n\nfunc NewApp(...args) *App {\n  // .. continuation from above\n\n  // Create static IBC router, add transfer module route, then set and seal it\n  ibcRouter := porttypes.NewRouter()\n  ibcRouter.AddRoute(ibctransfertypes.ModuleName, transferModule)\n  // Setting Router will finalize all routes by sealing router\n  // No more routes can be added\n  app.IBCKeeper.SetRouter(ibcRouter)\n\n  // ... continues\n'})}),"\n",(0,t.jsxs)(n.h3,{id:"module-manager-and-simulationmanager",children:["Module ",(0,t.jsx)(n.code,{children:"Manager"})," and ",(0,t.jsx)(n.code,{children:"SimulationManager"})]}),"\n",(0,t.jsxs)(n.p,{children:["In order to use IBC, we need to add the new modules to the module ",(0,t.jsx)(n.code,{children:"Manager"})," and to the ",(0,t.jsx)(n.code,{children:"SimulationManager"}),", in case your application supports ",(0,t.jsx)(n.a,{href:"https://github.com/cosmos/cosmos-sdk/blob/main/docs/build/building-modules/14-simulator.md",children:"simulations"}),"."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-go",metastring:'title="app.go"',children:'import (\n  // other imports\n  // ...\n  "github.com/cosmos/cosmos-sdk/types/module"\n\n  ibc "github.com/cosmos/ibc-go/v9/modules/core"\n  "github.com/cosmos/ibc-go/v9/modules/apps/transfer"\n)\n\nfunc NewApp(...args) *App {\n  // ... continuation from above\n\n  app.ModuleManager = module.NewManager(\n    // other modules\n    // ...\n    // highlight-start\n+   ibc.NewAppModule(app.IBCKeeper),\n+   transfer.NewAppModule(app.TransferKeeper),\n    // highlight-end\n  )\n\n  // ...\n\n  app.simulationManager = module.NewSimulationManagerFromAppModules(\n    // other modules\n    // ...\n    app.ModuleManager.Modules,\n    map[string]module.AppModuleSimulation{},\n  )\n\n  // ... continues\n'})}),"\n",(0,t.jsx)(n.h3,{id:"module-account-permissions",children:"Module account permissions"}),"\n",(0,t.jsxs)(n.p,{children:["After that, we need to grant ",(0,t.jsx)(n.code,{children:"Minter"})," and ",(0,t.jsx)(n.code,{children:"Burner"})," permissions to\nthe ",(0,t.jsx)(n.code,{children:"transfer"})," ",(0,t.jsx)(n.code,{children:"ModuleAccount"})," to mint and burn relayed tokens."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-go",metastring:'title="app.go"',children:'import (\n  // other imports\n  // ...\n  "github.com/cosmos/cosmos-sdk/types/module"\n  authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"\n\n  // highlight-next-line\n+ ibctransfertypes "github.com/cosmos/ibc-go/v9/modules/apps/transfer/types"\n)\n\n// app.go\nvar (\n  // module account permissions\n  maccPerms = map[string][]string{\n    // other module accounts permissions\n    // ...\n    ibctransfertypes.ModuleName: {authtypes.Minter, authtypes.Burner},\n  }\n)\n'})}),"\n",(0,t.jsx)(n.h4,{id:"integrating-light-clients",children:"Integrating light clients"}),"\n",(0,t.jsxs)(n.blockquote,{children:["\n",(0,t.jsxs)(n.p,{children:["Note that from v9 onwards, all light clients are expected to implement the ",(0,t.jsxs)(n.a,{href:"/main/ibc/light-clients/light-client-module#implementing-the-lightclientmodule-interface",children:[(0,t.jsx)(n.code,{children:"LightClientInterface"})," interface"]})," defined by core IBC, and have to be explicitly registered in a chain's app.go. This is in contrast to earlier versions of ibc-go when ",(0,t.jsx)(n.code,{children:"07-tendermint"})," and ",(0,t.jsx)(n.code,{children:"06-solomachine"})," were added out of the box. Follow the steps below to integrate the ",(0,t.jsx)(n.code,{children:"07-tendermint"})," light client."]}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["All light clients must be registered with ",(0,t.jsx)(n.code,{children:"module.Manager"})," in a chain's app.go file."]}),"\n",(0,t.jsxs)(n.p,{children:["The following code example shows how to instantiate ",(0,t.jsx)(n.code,{children:"07-tendermint"})," light client module and register its ",(0,t.jsx)(n.code,{children:"ibctm.AppModule"}),"."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-go",metastring:'title="app.go"',children:'import (\n  // other imports\n  // ...\n  "github.com/cosmos/cosmos-sdk/types/module"\n  // highlight-next-line\n+ ibctm "github.com/cosmos/ibc-go/v9/modules/light-clients/07-tendermint"\n)\n\n// app.go\n// after sealing the IBC router\n\nstoreProvider := app.IBCKeeper.ClientKeeper.GetStoreProvider()\n\ntmLightClientModule := ibctm.NewLightClientModule(appCodec, storeProvider)\napp.IBCKeeper.ClientKeeper.AddRoute(ibctm.ModuleName, &tmLightClientModule)\napp.ModuleManager = module.NewManager(\n  // ...\n  ibc.NewAppModule(app.IBCKeeper),\n  transfer.NewAppModule(app.TransferKeeper), // i.e ibc-transfer module\n\n  // register light clients on IBC\n  // highlight-next-line\n+ ibctm.NewAppModule(tmLightClientModule),\n)\n'})}),"\n",(0,t.jsx)(n.h3,{id:"application-abci-ordering",children:"Application ABCI ordering"}),"\n",(0,t.jsxs)(n.p,{children:["One addition from IBC is the concept of ",(0,t.jsx)(n.code,{children:"HistoricalInfo"})," which is stored in the Cosmos SDK ",(0,t.jsx)(n.code,{children:"x/staking"})," module. The number of records stored by ",(0,t.jsx)(n.code,{children:"x/staking"})," is controlled by the ",(0,t.jsx)(n.code,{children:"HistoricalEntries"})," parameter which stores ",(0,t.jsx)(n.code,{children:"HistoricalInfo"})," on a per height basis.\nEach entry contains the historical information for the ",(0,t.jsx)(n.code,{children:"Header"})," and ",(0,t.jsx)(n.code,{children:"ValidatorSet"})," of this chain which is stored\nat each height during the ",(0,t.jsx)(n.code,{children:"BeginBlock"})," call. The ",(0,t.jsx)(n.code,{children:"HistoricalInfo"})," is required to introspect a blockchain's prior state at a given height in order to verify the light client ",(0,t.jsx)(n.code,{children:"ConsensusState"})," during the\nconnection handshake."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-go",metastring:'title="app.go"',children:'import (\n  // other imports\n  // ...\n  stakingtypes "github.com/cosmos/cosmos-sdk/x/staking/types"\n  ibcexported "github.com/cosmos/ibc-go/v9/modules/core/exported"\n  ibckeeper "github.com/cosmos/ibc-go/v9/modules/core/keeper"\n  ibctransfertypes "github.com/cosmos/ibc-go/v9/modules/apps/transfer/types"\n)\n\nfunc NewApp(...args) *App {\n  // ... continuation from above\n\n  // add x/staking, ibc and transfer modules to BeginBlockers\n  app.ModuleManager.SetOrderBeginBlockers(\n    // other modules ...\n    stakingtypes.ModuleName,\n    ibcexported.ModuleName,\n    ibctransfertypes.ModuleName,\n  )\n  app.ModuleManager.SetOrderEndBlockers(\n    // other modules ...\n    stakingtypes.ModuleName,\n    ibcexported.ModuleName,\n    ibctransfertypes.ModuleName,\n  )\n\n  // ...\n\n  genesisModuleOrder := []string{\n    // other modules\n    // ...\n    ibcexported.ModuleName,\n    ibctransfertypes.ModuleName,\n  }\n  app.ModuleManager.SetOrderInitGenesis(genesisModuleOrder...)\n\n  // ... continues\n'})}),"\n",(0,t.jsxs)(n.p,{children:["That's it! You have now wired up the IBC module and the ",(0,t.jsx)(n.code,{children:"transfer"})," module, and are now able to send fungible tokens across\ndifferent chains. If you want to have a broader view of the changes take a look into the SDK's\n",(0,t.jsx)(n.a,{href:"https://github.com/cosmos/ibc-go/blob/main/testing/simapp/app.go",children:(0,t.jsx)(n.code,{children:"SimApp"})}),"."]})]})}function p(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(l,{...e})}):l(e)}},11151:(e,n,o)=>{o.d(n,{Z:()=>a,a:()=>s});var t=o(67294);const i={},r=t.createContext(i);function s(e){const n=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:s(e.components),t.createElement(r.Provider,{value:n},e.children)}}}]);