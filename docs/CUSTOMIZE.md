# Make this video your own

This guide applies to the v16 project. The default example retains the ExcelDashboard.ai brand, video, and founder credits. The template currently stores content in several React components; it does not yet have a single configuration file that updates everything automatically.

## 1. Run the original first

Install Node.js 22 or newer. In the extracted project directory, run:

```sh
npm ci
npm run studio
```

Open the preview URL printed in the terminal and select `ExcelDashboardCase`. No API key is required. Keep the initial dimensions and duration: 1280 × 720, 30 fps, 45.9 seconds. Make a backup before editing.

## 2. Replace the brand and copy

Search for `ExcelDashboard` inside `src/` and review each occurrence. Avoid replacing audio filenames indiscriminately.

| File | Content to replace |
| --- | --- |
| `src/Visual.tsx` | Brand in the top navigation |
| `src/ReportingScenes.tsx` | Product name, headings, description, chart labels, report filenames, PPT footer |
| `src/Ending.tsx` | Folder brand / URL, slogan, stamp, names, portraits, icons |
| `src/scenes.json` | Middle-section captions and narration records |
| `src/Opening.tsx` | The three actual opening captions and labels |

Follow the replacement pattern `ExcelDashboard.ai → Your Brand Name`. Replace the displayed domain with your own domain and update the product description when making your own version. Leave the original branding unchanged if you are running the included demo.

Update the large headings, product card, case objective, summary, recommendations, and closing slogan together so they describe the same product.

The JSON fields `voice`, `voiceSelection`, and `phrases` are descriptive records. They do not generate speech. The `captions` field supplies middle-section subtitles. Opening captions are hardcoded in `Opening.tsx`; the ending uses `Ending.tsx` rather than JSON subtitles.

The `index===0` and final fallback branches of `ReportingScenes.tsx` are not the active opening or ending. Edit the dedicated components instead.

## 3. Replace portraits, names, and icons

Add your portraits to `public/`, for example `person-one.png` and `person-two.png`. In the two existing `Credit` components in `Ending.tsx`, replace only the `name`, `photo`, and `icons` values. Preserve their surrounding containers and `f={f-228}` / `f={f-306}` values to retain the credit sequence and CRT shutdown.

Available icons: `grid`, `chart`, `report`, `idea`, `angry`, `tired`, `heart`, `brain`, `code`. Keep three icons per person for the existing layout.

The credit heading is `DIRECTED BY`. Change it inside the `Credit` component. Reduce the name's `fontSize:59` for longer names. Adjust the portrait's `objectPosition` to reposition the face. The current crop has a filename-specific rule for `quinn`; new filenames use the default `50% 48%` crop unless you change that rule.

## 4. Replace data and conclusions

The current charts are illustrative components, not a live Excel import. Update all of the following in `ReportingScenes.tsx`:

- `RawTable`: months, revenue, orders, and input filename.
- `Bars`: values, edited final value, and maximum scale.
- `Trend`: handwritten SVG path and final marker.
- `DeckPage`: its separate SVG chart, total, analysis, and recommendations.
- `index===2`: KPI labels, percentages, summary, and recommended actions.
- `index===4`: animated bar values, the chart scale, the editable table, and the typing animation's replacement number.

For an example series `[10,13,16,12,21,28]` in thousands, total revenue is `$100,000`, June is `$28k`, January-to-June growth is `+180%`, and April's monthly change is `−25%`. If the edited June value becomes 36, use a maximum scale of 40 and update both the table and animated bar. The Chinese guide includes exact array and SVG replacements.

Spreadsheet printouts and small charts baked into the background images will not update with your data. Replace those images if they need to match precisely.

## 5. Replace backgrounds and the ending slogan

Place new assets in `public/`; reference them with `staticFile('filename.png')`, without the `public/` prefix.

`Opening.tsx` uses `search-desk-v8.png` twice: one dark layer and one searchlight layer. Change both references. The searchlight `path` array uses frame numbers and percentage coordinates.

`Ending.tsx` uses `dossier-v10-white-hand.png`. Text, icons, and the stamp are separate components. The robot hand, paper, and smaller printed desk details are pixels in the background.

If the paper in your new background moves, update the four corners in `plane()`, ordered top-left, top-right, bottom-right, bottom-left:

```tsx
const pts=[[348,35],[865,83],[801,717],[156,630]];
```

The slogan uses two lines. Longer wording requires font-size and spacing adjustments, followed by a review of the `camera()` tracking coordinates. Camera targets are not calculated automatically from your new words.

The v16 stamp uses `top:560` and `rotate(-6deg)`. Verify that it remains below the slogan during the animation.

## 6. Replace audio

The public edition includes `public/demo-audio.wav`, an original synthesized suspense score with siren, stamp, reel ticks and CRT shutdown. **It contains no narration.** Third-party production voices, music and recordings are excluded. No API key is required.

Prepare a complete 45.9-second mix, aligned to time zero, and save it as `public/my-master.wav` (44.1 or 48 kHz, 16-bit PCM WAV recommended). Include voice, music and all effects you want to keep. In `src/config.ts`, set:

```ts
export const audioConfig = {
  audioFile: 'my-master.wav',
  volume: 1,
};
```

This replaces the entire soundtrack. A speech-only file also replaces the existing music and effects. Narration records in `scenes.json` do not synthesize speech; use those records and the opening/ending text to prepare your own recording.

The default audio is already checked in. To modify and regenerate it, edit `scripts/generate-demo-audio.py` and run `npm run audio:demo` with Python 3 installed. It writes only `demo-audio.wav`. Do not commit API keys or audio you cannot redistribute.

## 7. Align captions and effects

| Actual time | Section |
| --- | --- |
| 0–10.4 s | Searchlight opening |
| 10.4–14.804 s | Product introduction |
| 14.804–21.242 s | Data, story, next move |
| 21.242–26.663 s | Report presentation |
| 26.663–33.1 s | Chart editing demonstration |
| 33.1–40.7 s | Slogan and stamp |
| 40.7–43.3 s | First credit |
| 43.3–45.9 s | Second credit and shutdown |

The middle retains a mapping from the original timeline. `captionStarts` contains relative frame numbers, not seconds. For middle captions, calculate the actual time as:

```text
10.4 + (scene start + captionStarts - 312) / 30 / (804 / 681)
```

Keep `captions` and `captionStarts` arrays the same length. The opening has its own caption switches at frames 24, 105, and 213. The ending has its own animation timing.

The stamp animation starts at approximately 38.7 s and settles at 38.9 s, aligned to the heavy impact. CRT shutdown starts at 45.3 s. Use these positions when editing your complete soundtrack.

Changing total duration requires coordinated edits to `index.tsx`, `Visual.tsx`, captions, camera motion, and audio. Changing composition width or height alone does not make the fixed-position layout responsive.

## 8. Preview and export

Review the intro, line chart at about 17.5 s, summary at 19.3 s, chart editing, stamp at 39 s, both credits, and the last frame. Check old branding, data consistency, readable text, narration alignment, voice-to-music balance, and asset permissions.

```sh
npm run render
```

Output: `out/demo.mp4`. You can rename the output path in `package.json`; keep the composition name unless you also update its `id` in `index.tsx`.

## Distribution note

Source code is MIT. See [ASSET_LICENSES.md](../ASSET_LICENSES.md) for images, portraits, branding and audio. The public edition excludes third-party production audio. Replace the founders’ portraits and credits before presenting this as your own project. Remotion and other dependencies retain their own licenses.
