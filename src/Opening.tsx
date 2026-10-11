import {useFrame} from './frame';
import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
const ease = (t:number) => t*t*(3-2*t);
const clamp = (t:number) => Math.max(0,Math.min(1,t));
const path = [[0,24,24],[24,75,49],[47,31,77],[72,66,28],[100,43,51],[130,78,72],[159,26,37],[188,70,46],[215,42,62],[246,57,43],[281,59,45],[312,62,47]];
export function SearchOpening(){
 const f=useFrame();
 const k=Math.max(0,path.findLastIndex(p=>p[0]<=f)),a=path[k],b=path[Math.min(k+1,path.length-1)];
 const t=ease(clamp((f-a[0])/Math.max(1,b[0]-a[0]))),x=a[1]+(b[1]-a[1])*t,y=a[2]+(b[2]-a[2])*t;
 const exit=ease(clamp((f-286)/26)),zoom=interpolate(f,[0,312],[1,1.065]);
 const beam=`radial-gradient(ellipse 270px 205px at ${x}% ${y}%, #fff 0%, #fff 18%, #ffffffdb 40%, #ffffff63 66%, transparent 100%)`;
 const caption=f<105?'Where is the insight?':f<213?'I need a full analysis report.':'Send in the data reporting agent!';
 const start=f<105?24:f<213?105:213;
 const enter=ease(clamp((f-start)/10));
 return <AbsoluteFill style={{background:'#030507',opacity:1-exit,overflow:'hidden'}}>
   <AbsoluteFill style={{transform:`scale(${zoom})`}}>
     <Img src={staticFile('search-desk-v8.png')} style={{width:'100%',height:'100%',objectFit:'cover',filter:'brightness(.065) saturate(.25)'}}/>
     <AbsoluteFill style={{maskImage:beam,WebkitMaskImage:beam,opacity:interpolate(f,[0,18],[.32,1],{extrapolateRight:'clamp'})}}>
       <Img src={staticFile('search-desk-v8.png')} style={{width:'100%',height:'100%',objectFit:'cover',filter:'brightness(1.65) contrast(1.12) saturate(.38)'}}/>
     </AbsoluteFill>
     <AbsoluteFill style={{background:'radial-gradient(ellipse at 50% 47%,transparent 30%,#0009 95%)'}}/>
   </AbsoluteFill>
   <AbsoluteFill style={{background:'linear-gradient(transparent 53%,#020507a8 83%,#020507eb)'}}/>
   <div style={{position:'absolute',top:34,left:44,font:'11px monospace',letterSpacing:3,color:'#a8b5bd',opacity:.65}}>EVIDENCE 008 / RAW DATA</div>
   <div style={{position:'absolute',top:34,right:44,font:'11px monospace',letterSpacing:3,color:'#7d8b96',opacity:.65}}>ANALYSIS: MISSING</div>
   <div style={{position:'absolute',left:54,bottom:74,right:54,opacity:f<24?0:enter,transform:`translateY(${12*(1-enter)}px)`}}>
     <div style={{fontSize:13,letterSpacing:3,color:'#8b9da9',marginBottom:15,fontFamily:'monospace'}}>SUBJECT / RAW DATA</div>
     <div style={{fontSize:f<213?49:42,fontWeight:700,letterSpacing:-1.5,color:'#e5eaf0',textShadow:'0 3px 22px #000',maxWidth:1080}}>{caption}</div>
     <div style={{width:46,height:2,background:'#b2ffd6',marginTop:20,opacity:.7}}/>
   </div>
   <svg width="1280" height="720" style={{position:'absolute',inset:0,opacity:.05,mixBlendMode:'screen',pointerEvents:'none'}}><filter id="filmGrain8"><feTurbulence baseFrequency=".76" numOctaves="3" seed="8"/><feColorMatrix type="saturate" values="0"/></filter><rect width="100%" height="100%" filter="url(#filmGrain8)"/></svg>
 </AbsoluteFill>;
}
