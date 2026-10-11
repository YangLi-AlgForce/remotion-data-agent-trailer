import React from 'react';
import {Composition,registerRoot} from 'remotion';
import {Film} from './Film';
registerRoot(()=> <Composition id="ExcelDashboardCase" component={Film} width={1280} height={720} fps={30} durationInFrames={1377}/>);
