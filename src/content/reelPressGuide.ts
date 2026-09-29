/**
 * "The Reel Press Workflow" — the guide linked from the "Editing is dead" reel.
 *
 * Inline text uses a tiny markup: **bold**, _italic_, `code` and [label](url).
 * The rich page renders these blocks; the blog entry derives plain-text sections
 * from the same data for pre-rendering and search, so the words live in one place.
 */

export type GuideBlock =
  | { type: 'p'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'code'; code: string; label?: string }
  | { type: 'note'; tone: 'teal' | 'sun'; title: string; text: string }
  | { type: 'table'; columns: string[]; rows: string[][] }
  | { type: 'steps'; items: { title: string; text: string }[] }
  | { type: 'scenes' }
  | { type: 'rounds'; items: { label: string; quote: string; text: string }[] }
  | { type: 'cues' }
  | { type: 'checklist'; items: string[] }
  | { type: 'faq'; items: { q: string; a: string }[] }
  | { type: 'pipeline'; text: string }
  | { type: 'kit'; items: { icon: 'agent' | 'node' | 'ffmpeg' | 'voice' | 'extras'; title: string; text: string }[] }
  | { type: 'prompts'; items: { label: string; code: string }[] }
  | { type: 'captionDemo' };

export interface GuideChapter { id: string; title: string; short: string; blocks: GuideBlock[] }

export const REEL_SPECS = [
  { label: 'Format', value: '1080×1920' },
  { label: 'Length', value: '33.5s' },
  { label: 'Scenes', value: '7' },
  { label: 'Sound cues', value: '52' },
];
export const REEL_TOOLS = ['Claude Code', 'HyperFrames', 'FFmpeg'];

export const REEL_INPUTS = [
  { title: 'The script', text: 'Five sentences, with the hook kept word for word.' },
  { title: 'My voice recording', text: 'One WAV file of that script.' },
  { title: 'My character', text: 'A vector avatar I already had as code, so the presenter looks the same in every reel.' },
  { title: 'A set of "skills"', text: 'Instruction packs that tell Claude how HyperFrames works and what my house style is.' },
];

export const REEL_SCENES = [
  { start: 0, end: 4, line: '“Video editing is basically dead, at least the way most people do it today.”', screen: 'Cold open on a razor tool. It drags a crack down the whole screen between the words VIDEO and EDITING, and the screen splits in two, revealing a stressed-out editing app. The heartbeat-shaped voice track speeds up, then flatlines. Full-screen **DEAD** punches up letter by letter, then flies down as a stamp onto the crashed editor ("MEDIA OFFLINE", "Not Responding").', out: 'The flat line swells into a conveyor belt' },
  { start: 4, end: 9.1, line: '“With the right AI workflow, ChatGPT and Claude can take your entire long-form video,”', screen: 'The Reel Press drops in. The CHATGPT and CLAUDE nameplates stamp on exactly as each name is spoken, and the character shoves a giant film spool into it.', out: 'The camera dives into the machine’s mouth' },
  { start: 9.1, end: 11.8, line: '“find the best moments, cut them into Shorts and Reels,”', screen: 'A magnifier scans a film strip and three frames get stamped BEST. Guillotine blades cut, and each best frame reframes into a vertical 9:16 card (SHORT / REEL / REEL).', out: 'The cards become three panels that fall away' },
  { start: 11.8, end: 15.6, line: '“add subtitles, animations, sound effects, and give you the finished video.”', screen: 'The card rides a conveyor under three stations (a caption press, an animation spring punch and a sound-effects horn), each hitting on its word. It pops out as a phone the character catches, and a FINISHED stamp lands.', out: 'The camera pushes into the phone’s screen' },
  { start: 15.6, end: 21.4, line: '“You’re not asking AI how to edit anymore. You’re literally giving it the footage and letting it do the editing.”', screen: 'A chat asking "how do I add captions?" gets a NOT stamp, is struck through, crumpled and flicked away. The character drags a RAW.MP4 file into an import drop zone, and the editor auto-builds the timeline to 100%.', out: 'Push into the timeline' },
  { start: 21.4, end: 28.2, line: '“And the crazy part is, this Reel you’re watching right now was scripted, animated, edited, and sound-designed using AI.”', screen: 'A pull-back reveals the timeline inside a phone playing _this reel_, with a YOU ARE HERE arrow. A clapperboard gets an "AI ✓" stamp on each of scripted, animated, edited and sound-designed.', out: 'The clapper claps; its stripes wipe across' },
  { start: 28.2, end: 33.5, line: '“Comment “VIDEO” and I’ll send you the full workflow.”', screen: 'V-I-D-E-O keys hammer into a comment box and the character hits SEND. "THE FULL WORKFLOW" unrolls as a checklist while the character waves.', out: 'End frame' },
];
export const REEL_SCENE_NAMES = ['Flatline', 'The Reel Press', 'Cut room', 'Finishing line', 'Hand it over', 'This reel', 'Call to action'];

export const REEL_CHAPTERS: GuideChapter[] = [
  {
    id: 'what', title: 'What you’re looking at', short: 'What it is',
    blocks: [
      { type: 'p', text: 'There is no timeline editor in this workflow. The video is a small website: HTML for the layout, CSS for the look, and a JavaScript animation library (GSAP) for the motion. **HyperFrames** is the framework that turns that HTML into an MP4. It opens the page in a headless browser, steps through time frame by frame, and records every frame together with the audio.' },
      { type: 'p', text: 'Because the video is code, an AI coding agent can build it. I gave Claude Code four things:' },
      { type: 'list', items: REEL_INPUTS.map((input) => `**${input.title}**: ${input.text}`) },
      { type: 'p', text: 'Claude then planned the scenes, drew every asset as SVG and HTML, animated it, synced everything to the words in my voice, generated captions, placed sound effects, checked its own work with screenshots, and fixed what it found. My job was giving feedback, and there were four rounds of it (they’re further down, because that’s where most of the quality came from).' },
      { type: 'pipeline', text: 'Script + voice recording → Claude Code plans the scenes → HyperFrames builds them as HTML → Claude checks screenshots and fixes problems → you give feedback → render to MP4.' },
    ],
  },
  {
    id: 'kit', title: 'What you need', short: 'Your kit',
    blocks: [
      { type: 'kit', items: [
        { icon: 'agent', title: 'Claude Code', text: 'The desktop app, the terminal CLI, or the IDE extension all work. This is the agent that writes and edits the project.' },
        { icon: 'node', title: 'Node.js', text: 'A current LTS version. HyperFrames runs through `npx`, so there’s nothing else to install globally.' },
        { icon: 'ffmpeg', title: 'FFmpeg', text: 'Used for audio loudness checks and for pulling still frames out of the finished MP4.' },
        { icon: 'voice', title: 'A voice recording', text: 'Of your script. A phone voice memo is fine; export it as WAV or MP3.' },
        { icon: 'extras', title: 'Optional extras', text: 'Your own character, logo or screen recordings. Anything real (a product UI, a logo) should come from you rather than be imitated.' },
      ] },
      { type: 'p', text: 'You don’t need to know GSAP or HTML to follow along. It helps to be able to read an error message and to look at a screenshot and say what’s wrong with it.' },
    ],
  },
  {
    id: 'hyperframes', title: 'HyperFrames in 5 minutes', short: 'HyperFrames',
    blocks: [
      { type: 'p', text: 'A HyperFrames project is a folder with an `index.html` (the main composition) and usually one HTML file per scene in `compositions/`. Four ideas cover almost everything.' },
      { type: 'h3', text: '1. Timing lives in data attributes' },
      { type: 'p', text: 'Every element that appears for a stretch of time gets a start and a duration. Scenes are "sub-compositions" loaded from their own file.' },
      { type: 'code', label: 'index.html (simplified)', code: `<div id="root" data-composition-id="main" data-start="0"
     data-width="1080" data-height="1920" data-duration="33.5">

  <!-- scene 1 plays from 0s to 4s -->
  <div data-composition-id="s1-flatline"
       data-composition-src="compositions/s1-flatline.html"
       data-start="0" data-duration="4" data-track-index="1"
       data-width="1080" data-height="1920"></div>

  <!-- the voice track -->
  <audio src="assets/voice.wav" data-start="0" data-duration="30.64"></audio>
</div>` },
      { type: 'h3', text: '2. Each scene registers one paused GSAP timeline' },
      { type: 'p', text: 'HyperFrames doesn’t "play" your animation. It seeks the timeline to exact times, so each scene builds a paused timeline and hands it over by id.' },
      { type: 'code', label: 'compositions/s1-flatline.html (the pattern)', code: `<template id="s1-flatline-template">
  <div id="s1-root" data-composition-id="s1-flatline"
       data-width="1080" data-height="1920">
    <div id="s1-stamp">DEAD</div>
  </div>
  <script>
    const tl = gsap.timeline({ paused: true });
    // slam the stamp in at 1.64s (scene-local time)
    tl.fromTo('#s1-stamp',
      { opacity: 1, scale: 2.6, rotation: -20 },
      { opacity: 1, scale: 1,   rotation: -8, duration: 0.2, ease: 'power4.in' },
      1.64);
    window.__timelines['s1-flatline'] = tl;   // id must match data-composition-id
  </script>
</template>` },
      { type: 'h3', text: '3. Everything must be deterministic' },
      { type: 'p', text: 'The renderer can jump to any frame in any order, sometimes across parallel workers. So there’s no `Math.random()` (use a seeded random function), no `Date.now()`, no infinite `repeat: -1` loops, and no animation that depends on what happened in an earlier frame. Counters and moving waveforms are written as a pure function of time.' },
      { type: 'h3', text: '4. The CLI does the checking' },
      { type: 'table', columns: ['Command', 'What it’s for'], rows: [
        ['`npx hyperframes lint`', 'Fast structural check after every edit.'],
        ['`npx hyperframes snapshot --at 0.5,1.6,3.2`', 'Renders stills at those times plus a contact sheet. This is how the AI "sees" the video.'],
        ['`npx hyperframes check`', 'Full check: lint, runtime errors, overlapping text, motion, contrast.'],
        ['`npx hyperframes transcribe voice.wav --json`', 'Word-level transcript with timestamps, which drives all the timing.'],
        ['`npx hyperframes preview --background`', 'Opens the Studio preview in your browser, with live reload.'],
        ['`npx hyperframes render -q delivery -o renders/reel.mp4`', 'Final MP4.'],
      ] },
    ],
  },
  {
    id: 'setup', title: 'Set up a project', short: 'Setup',
    blocks: [
      { type: 'p', text: 'First install or refresh the HyperFrames skills, so Claude Code knows the framework’s rules:' },
      { type: 'code', code: 'npx hyperframes skills update\nnpx hyperframes skills check' },
      { type: 'p', text: 'Then create a project. This is the command Claude ran for this reel (the folder name is yours to pick):' },
      { type: 'code', code: 'npx hyperframes init my-reel --non-interactive --example=blank --skill=general-video' },
      { type: 'p', text: 'For this reel I also used my own skill, _gsv-reel_, that I built after my first reel. It sets up the extras I reuse every time:' },
      { type: 'list', items: [
        '**A character rig**: my avatar wrapped so it can change poses, facial expressions, blinks and hand shapes at exact times, without breaking when the renderer jumps around.',
        '**A "world" style kit**: my palette, fonts, paper textures and reusable objects (gears, film spools, phones, a video-editor window).',
        '**A timing table** (`timing.json`) and a script that regenerates scene timings and captions from it.',
        '**The house rules**: caption style, safe zones for Instagram, sound-effect loudness rules, and a quality bar.',
      ] },
      { type: 'note', tone: 'sun', title: 'Why a custom skill matters', text: 'Without it you re-explain your style every time. With it, a new reel starts from everything you approved last time. Whenever I approve an improvement, I ask Claude to fold it back into the skill.' },
    ],
  },
  {
    id: 'workflow', title: 'The 11-step workflow', short: '11 steps',
    blocks: [
      { type: 'p', text: 'This is the order the reel was actually built in.' },
      { type: 'steps', items: [
        { title: 'Write the brief', text: 'Format (1080×1920), target length (~30–35s), the message in one sentence, the comment word for the call to action, and the hook. The hook stays word for word. Never let the AI "improve" a curiosity hook.' },
        { title: 'Scaffold the project', text: 'HyperFrames init plus the reel kit, with one empty scene file per scene: flatline, workflow press, cut room, finishing line, hand it over, this reel, and the call to action.' },
        { title: 'Invent a world', text: 'Every reel gets its own visual metaphor. This one is **"The Reel Press"**: manual editing is an exhausted editor at a crashing edit desk, and the AI workflow is a riveted printing-press machine with two intake hoppers labelled CHATGPT and CLAUDE. It turns a giant film spool into finished vertical videos.' },
        { title: 'Write the animation map before any code', text: 'A storyboard with one block per scene covering the spoken line, the metaphor, what the character does, the main, secondary and background motion, the typography, and the transitions in and out. Then a self-review: no two transitions the same, the character changes position every scene, no stretch of more than about 0.75s without motion, and key words held long enough to read.' },
        { title: 'Record the voice and transcribe it', text: 'Word-level timestamps become the clock for the whole video (details in chapter 07).' },
        { title: 'Build scene by scene', text: 'Every beat is anchored to a spoken word, e.g. `const DEAD = REEL.word(\'s1-flatline\', 0, 4)` ("dead" is word 4 of phrase 0). If the voice changes, the animation moves with it.' },
        { title: 'Lint and snapshot after every 1–2 scenes', text: 'Claude renders a contact sheet at the key moments, looks at it, and fixes what’s wrong: overflowing text, a clipped stamp, a hand hidden behind a desk, a character’s chin under the captions.' },
        { title: 'Add captions', text: 'Captions are generated from the transcript, with the karaoke highlight, keyword colours and hidden stretches described in chapter 08.' },
        { title: 'Place the sound effects', text: 'A cue sheet puts one sound on each visible event, all kept quieter than the voice.' },
        { title: 'Verify', text: '`npx hyperframes check` must pass with 0 errors. An animation map confirms there are no "dead zones" (stretches with nothing moving), and a contact sheet covers every scene cut.' },
        { title: 'Preview, give feedback, then render', text: 'Nothing gets rendered until I’ve watched the preview and approved it. That’s where the four revision rounds below happened.' },
      ] },
    ],
  },
  {
    id: 'scenes', title: 'Scene by scene', short: 'Scenes',
    blocks: [
      { type: 'p', text: 'Seven scenes, each with its own transition. Times are from the final cut, synced to the voice.' },
      { type: 'scenes' },
      { type: 'p', text: 'Everything on screen was drawn in code: SVG shapes, HTML boxes and web fonts. No stock footage, no generated images, no templates.' },
    ],
  },
  {
    id: 'timing', title: 'Voice-driven timing', short: 'Timing',
    blocks: [
      { type: 'p', text: 'This step makes the video feel "edited": every stamp, cut and pop lands on the exact word.' },
      { type: 'steps', items: [
        { title: 'Record', text: 'Record the script in one take and drop the file into `assets/`.' },
        { title: 'Transcribe', text: 'Transcribe it locally. The output lists every word with a start and end time (the command is below).' },
        { title: 'Map phrases to words', text: 'The script is split into phrases, and each phrase is matched to its range of transcribed words. The matching tolerates speech-recognition slips; in my take "Video editing" came out as one word and "long-form" as two.' },
        { title: 'Cut scenes on phrase edges', text: 'A scene ends exactly when its last phrase ends, so every cut lands between sentences.' },
        { title: 'Anchor animation to words, not seconds', text: 'Scenes ask the timing table where a word is, e.g. `REEL.word(scene, phrase, word)`. Re-record the voice, re-run the timing script, and everything moves with it.' },
      ] },
      { type: 'code', label: 'Transcribe', code: 'npx hyperframes transcribe assets/voice.wav -l en --json' },
      { type: 'note', tone: 'teal', title: 'Tip', text: 'Check the transcript against your script. If a number or a brand name was misheard, fix it in the captions. The captions should show what you actually said.' },
    ],
  },
  {
    id: 'sound', title: 'Captions & sound', short: 'Captions & sound',
    blocks: [
      { type: 'h3', text: 'Captions' },
      { type: 'list', items: [
        '**Style:** Montserrat Black in capitals, cream letters with a thick dark outline and a hard drop shadow. There’s no box, so they read on light and dark scenes alike.',
        '**Karaoke highlight:** the spoken word turns orange and pops slightly bigger. It’s driven by one function of time, which is what keeps it stable in the final render.',
        '**Keywords** (DEAD, CHATGPT, CLAUDE, SHORTS, REELS, FINISHED, FOOTAGE, AI) rest in teal.',
        '**Size:** short chunks of about 18 characters, sitting just below faces and above Instagram’s caption area.',
        '**Hidden stretches:** captions hide while a scene shows giant words of its own (the full-screen DEAD, the CTA), so the same word never appears twice.',
      ] },
      { type: 'captionDemo' },
      { type: 'h3', text: 'Sound effects' },
      { type: 'p', text: 'Sounds came from HyperFrames’ bundled library through its media tool, e.g.:' },
      { type: 'code', code: 'npx hyperframes media-use resolve --type sfx --intent "whoosh" --project .' },
      { type: 'p', text: 'Each cue is a line in a cue sheet: which scene, the time within that scene, which sound, the volume, and the maximum length. The rules I ended up with:' },
      { type: 'cues' },
      { type: 'list', items: [
        '**One sound per real story beat.** My first pass had 124 cues and felt like constant clicking. The final has 52: whooshes on transitions, pops on things appearing, beeps before "dead", a flatline tone, single hits on stamps.',
        '**Never louder than the voice.** A script measures every cue’s effective loudness and flags anything within 3 dB of the voice.',
        '**No deep bass "impact" sounds.** On phone speakers they come out as a painful boom.',
        '**Silence is fine.** Your voice and the visuals can carry a moment on their own.',
      ] },
    ],
  },
  {
    id: 'revisions', title: 'The revision rounds', short: 'Revisions',
    blocks: [
      { type: 'p', text: 'The first version was technically clean but not good enough. These four rounds of plain-language feedback are what made it work, and they’re the part most people skip.' },
      { type: 'rounds', items: [
        { label: 'Round 1', quote: 'That doesn’t represent video editing at all.', text: 'The first opening used a heart-monitor screen and an abstract dark panel. Claude replaced both with one reusable **editing-app window** (program monitor with a playing clip, timecode and play controls, media bin, timeline with tools, video clips with thumbnails, audio waveforms and a playhead). The "dead" joke moved inside it: the monitor goes red MEDIA OFFLINE, the title bar says "(Not Responding)", a spinner appears.' },
        { label: 'Round 2', quote: 'The first few seconds won’t hold attention.', text: 'Claude looked at the opening frame by frame and found the problems: the frames at 0.0s and 1.6s were almost identical, all the motion was tiny, nothing was the obvious thing to look at, and the character was passive. The fix was a cold open in extreme close-up, a zoom-out reveal, a build-up (faster heartbeat, growing camera shake, chaos on the timeline, the character working frantically), then a hard hit on "dead".' },
        { label: 'Round 3', quote: 'DEAD is too small.', text: 'DEAD became the hero moment: snap zoom into the flat line, black screen, and four giant letters punching up one at a time, with a flash and a jolt. It holds, then flies down into a stamp on the crashed editor.' },
        { label: 'Round 4', quote: 'Way too many clicking sounds — and make the razor splice the whole screen.', text: 'Sound effects went from 124 cues to 52, one per real story beat. The opening slice became a full-screen crack: the razor drags top to bottom, the frame cracks open along a jagged line, holds with the editor peeking through, and the two halves fly apart.' },
      ] },
      { type: 'note', tone: 'sun', title: 'What I learned about retention', text: 'Something must visibly move in the first frame. Give the eye one obvious thing to look at. Build tension before the payoff, and make the payoff take over the whole screen. Hold key words long enough to read (about 1.2s or more). Sound should be sparse and hit on visible moments.' },
    ],
  },
  {
    id: 'prompts', title: 'Prompts to copy', short: 'Prompts',
    blocks: [
      { type: 'p', text: 'These are close to what I actually typed. Plain language works; the skills supply the technical detail.' },
      { type: 'prompts', items: [
        { label: 'Start the reel', code: `Make a 9:16 Instagram reel with HyperFrames from this script.
Check the project folder, its skills and the HyperFrames skills first.
Every animation should be polished, nothing should sit static,
and the major moments should be driven by animated assets.
Keep my hook word for word. The comment word is VIDEO.

[paste your script]` },
        { label: 'When the voice is ready', code: `Here's my voice recording: [attach file]. Transcribe it, retime every
scene and caption to it, and tell me where the transcript differs
from the script.` },
        { label: 'Fix an asset that doesn’t read', code: `This part doesn't represent [video editing] at all. Replace it with an
asset people instantly recognise: [program monitor, timeline, clips,
playhead]. Keep the same timing.` },
        { label: 'Improve the hook', code: `The first few seconds won't hold attention. Check the opening frame
by frame, tell me what's wrong, and plan a stronger hook before
changing anything.` },
        { label: 'Tame the sound', code: `There are too many repeated clicking sounds. Make the sound design
sparse: one sound per real story beat, nothing louder than my voice.` },
        { label: 'Render when you’re happy', code: `Looks good. Render the final MP4 and check the hook, the key moments
and the end frame from the rendered file.` },
      ] },
    ],
  },
  {
    id: 'longform', title: 'Long-form → Shorts with the same tools', short: 'Long-form → Shorts',
    blocks: [
      { type: 'p', text: 'This reel is an animated explainer made from a script. If you have a long video (a podcast, a talk, a YouTube video) and want Shorts or Reels from it, the same approach applies. HyperFrames has workflows for it:' },
      { type: 'list', items: [
        '**`/embedded-captions`** adds styled captions to a talking-head video without changing the footage.',
        '**`/talking-head-recut`** keeps the clip as it is and layers designed graphics synced to the transcript: titles, lower-thirds, callouts, quotes.',
        '**`npx hyperframes transcribe`** gives you word-level timestamps for the whole long video.',
      ] },
      { type: 'p', text: 'The outline I’d follow:' },
      { type: 'list', ordered: true, items: [
        'Transcribe the long video.',
        'Give the transcript to Claude or ChatGPT and ask for the 3–5 strongest self-contained moments of 20–45 seconds, each with start and end timestamps and a one-line hook.',
        'Have Claude Code cut those ranges and reframe them to 9:16, keeping the speaker’s face centred.',
        'Add captions, a few graphics on the key words, and sparse sound effects, following the same rules as above.',
        'Preview each one, give feedback, render.',
      ] },
      { type: 'note', tone: 'teal', title: 'Honest note', text: 'This reel didn’t go through the long-form path, so I’ve written this part as an outline rather than a tested recipe. I’ll share a full walkthrough once I’ve run it on my own footage.' },
    ],
  },
  {
    id: 'checklist', title: 'Quality checklist', short: 'Checklist',
    blocks: [
      { type: 'checklist', items: [
        'The hook is word for word, and something moves in the very first frame.',
        'Every sentence has a visual event; watched on mute, the story still makes sense.',
        'Nothing stays still for more than about 0.75 seconds unless the stillness is the point.',
        'No two scene transitions work the same way.',
        'The character changes position and size between scenes, and at least one scene has no character.',
        'Key words and numbers stay on screen for 1.2 seconds or more.',
        'Faces stay above the caption band (about y 1390–1560 on a 1920-tall frame). Nothing important sits under Instagram’s bottom UI or right-side buttons.',
        'Captions match what you actually said.',
        'Sound effects sit on visible moments and stay under the voice.',
        '`npx hyperframes check` passes with 0 errors, and there are no dead zones in the animation map.',
        'You watched the preview yourself before rendering.',
      ] },
      { type: 'h3', text: 'Technical gotchas we hit (for the curious)' },
      { type: 'list', items: [
        'In GSAP `fromTo` tweens, set `opacity` in both the start and end values, or elements can vanish in playback.',
        'Don’t change text with `tl.set`. Write it from a function of time instead, or it breaks when the renderer jumps around.',
        'Two tweens fighting over the same property (like opacity) will override each other. Give each property one owner at a time.',
        'Animate position with transforms (`x`, `y`, `scale`), not `left`/`top`, which stutter frame to frame.',
        'When you copy an element to animate the copy separately, styles tied to its id don’t come along. Style by class instead.',
      ] },
    ],
  },
  {
    id: 'faq', title: 'FAQ', short: 'FAQ',
    blocks: [
      { type: 'faq', items: [
        { q: 'Do I need to know how to code?', a: 'No. Claude writes all the code. What helps is looking at screenshots critically and describing what’s wrong in plain words, the way you’d brief a human editor.' },
        { q: 'Is it really no editing?', a: 'There’s no dragging clips on a timeline. You still direct: the script, the voice, the feedback. Your taste is still the most important input; the manual labour is what’s gone.' },
        { q: 'How long did this reel take?', a: 'One working session, including four rounds of feedback. The second reel onwards is faster, because the character rig, the style kit and the rules are already in a reusable skill.' },
        { q: 'Can I use my own face instead of an avatar?', a: 'Yes. HyperFrames works with real footage too: see the embedded-captions and talking-head-recut workflows in chapter 11.' },
        { q: 'Where do I learn more about HyperFrames?', a: 'The official docs are at [hyperframes.heygen.com](https://hyperframes.heygen.com). The CLI also has built-in docs: `npx hyperframes docs gsap`, `npx hyperframes docs compositions`, `npx hyperframes docs rendering`.' },
      ] },
    ],
  },
];

/** Strip the inline markup for plain-text uses (pre-rendered HTML, meta, llms.txt). */
export const plainText = (text: string) =>
  text.replace(/\*\*(.+?)\*\*/g, '$1').replace(/_(.+?)_/g, '$1').replace(/`([^`]+)`/g, '$1').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

/** The same guide as the plain sections the blog system, pre-renderer and search use. */
export function guideSections() {
  return REEL_CHAPTERS.map((chapter, index) => {
    const paragraphs: string[] = [];
    const bullets: string[] = [];
    for (const block of chapter.blocks) {
      if (block.type === 'p' || block.type === 'h3') paragraphs.push(plainText(block.text));
      else if (block.type === 'note') paragraphs.push(`${block.title}: ${plainText(block.text)}`);
      else if (block.type === 'list' || block.type === 'checklist') bullets.push(...block.items.map(plainText));
      else if (block.type === 'steps') bullets.push(...block.items.map((step) => `${step.title}: ${plainText(step.text)}`));
      else if (block.type === 'table') bullets.push(...block.rows.map((row) => row.map(plainText).join(' — ')));
      else if (block.type === 'rounds') bullets.push(...block.items.map((round) => `${round.label}, “${round.quote}”: ${plainText(round.text)}`));
      else if (block.type === 'faq') bullets.push(...block.items.map((item) => `${item.q} ${plainText(item.a)}`));
      else if (block.type === 'code') paragraphs.push(`${block.label ? `${block.label}: ` : ''}${block.code}`);
      else if (block.type === 'pipeline') paragraphs.push(`The short version: ${block.text}`);
      else if (block.type === 'kit') bullets.push(...block.items.map((item) => `${item.title}: ${plainText(item.text)}`));
      else if (block.type === 'prompts') paragraphs.push(...block.items.map((item) => `${item.label}: ${item.code}`));
      else if (block.type === 'scenes') bullets.push(...REEL_SCENES.map((scene) => `${scene.start}–${scene.end}s, ${scene.line} ${plainText(scene.screen)} Transition out: ${scene.out}.`));
    }
    return { heading: `${String(index + 1).padStart(2, '0')} · ${chapter.title}`, paragraphs, bullets: bullets.length ? bullets : undefined };
  });
}

/** The signature word each scene lands on, from the scene descriptions above. */
export const REEL_STAMPS = ['DEAD', 'THE REEL PRESS', 'BEST', 'FINISHED', 'FOOTAGE', 'YOU ARE HERE', 'VIDEO'];
/** Caption keywords that rest in teal, as listed in the captions chapter. */
export const REEL_KEYWORDS = ['DEAD', 'CHATGPT', 'CLAUDE', 'SHORTS', 'REELS', 'FINISHED', 'FOOTAGE', 'AI'];
