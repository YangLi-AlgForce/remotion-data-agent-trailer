import React from 'react';
import {AbsoluteFill,Audio,staticFile} from 'remotion';
import {Visual} from './Visual';
import {audioConfig} from './config';
export function Film(){return <AbsoluteFill><Visual/><Audio src={staticFile(audioConfig.audioFile)} volume={audioConfig.volume}/></AbsoluteFill>;}
