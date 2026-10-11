import {Frame} from './frame';
import React from 'react';
import {AbsoluteFill,Audio,Sequence,staticFile,useCurrentFrame} from 'remotion';
import {SearchOpening} from './Opening';
import {CaseScene} from './ReportingScenes';
import scenes from './scenes.json';
import {Ending} from './Ending';
export function Visual(){const actual=useCurrentFrame(),f=actual<312?actual:actual<993?312+Math.floor((actual-312)*804/681):1116+actual-993,i=scenes.findIndex(s=>f>=s.start&&f<s.end),s=scenes[Math.max(0,i)],local=f-s.start,ci=Math.max(0,s.captionStarts.findLastIndex(x=>local>=x));return <AbsoluteFill style={{background:'#080b0e',color:'#f3f6f3',fontFamily:'Arial,Helvetica,sans-serif',overflow:'hidden'}}>
{f>=1116?<Frame.Provider value={f-1116}><Ending/></Frame.Provider>:f<312?<Frame.Provider value={f}><SearchOpening/></Frame.Provider>:<><AbsoluteFill style={{backgroundImage:'linear-gradient(#71857a0b 1px,transparent 1px),linear-gradient(90deg,#71857a0b 1px,transparent 1px)',backgroundSize:'60px 60px'}}/><AbsoluteFill style={{background:'radial-gradient(ellipse at 70% 26%,#b2ffd60b,transparent 60%)'}}/><div style={{position:'absolute',top:33,left:45,right:45,display:'flex',justifyContent:'space-between',borderBottom:'1px solid #29383c',paddingBottom:18}}><div style={{fontSize:16,fontWeight:700}}>▦ ExcelDashboard <span style={{color:'#b2ffd6'}}>AI</span></div><div style={{font:'12px monospace',letterSpacing:2,color:'#86999a'}}>CASE FILE 008 / {['OPEN','ASSIGNED','INVESTIGATING','REPORT BUILT','EDITABLE','CLOSED'][i]}</div></div><Frame.Provider value={local}><CaseScene index={i}/></Frame.Provider><div style={{position:'absolute',bottom:31,left:30,right:30,display:'flex',justifyContent:'center'}}><div style={{padding:'10px 22px',fontSize:23,fontWeight:600,border:'1px solid #29383c',borderRadius:9,background:'#080b0ef0'}}>{s.captions[ci]}</div></div></>}

<div style={{position:'absolute',left:0,bottom:0,height:3,background:'#b2ffd6',width:`${f/1499*100}%`,opacity:f<312||f>=1116?0:1}}/>
</AbsoluteFill>}
