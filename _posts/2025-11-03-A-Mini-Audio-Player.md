# Building a Mini Audio Player in Rust

## Spotify, I'm Coming for You

My goal for this project is to create a fully functional audio player that can load playlists from various audio formats (MP3, WAV, OGG), with basic controls like shuffle, pause, play, and skip. Don't worry guys, I’m not actually trying to replace Spotify. Just trying to figure out why Rust people won't shut up about ownership.


## What I Actually Built

Here's what I managed to get working:

**The UI** — Built with `egui`, featuring light & dark themes (To Do: Make it Smiski Theme haha), a duration bar, play/pause controls, and song titles that don't look too terrible.

**Audio Processing** — A file scanner that validates audio files by extension and builds a proper playlist data structure.

**The Player** — Using `rodio` for actual playback. This was interesting because rodio is designed for game audio mixing, not music players, so I had to work around some of its design choices.

**Playlist Management** — Auto-queuing songs, tracking what's currently playing, and moving to the next track when one finishes.

Here's a snippet of how the player handles playback position tracking:

```rust
pub fn get_position(&self) -> Duration {
    match self.playback_start {
        Some(start) => {
            let elapsed = start.elapsed();
            if let Some(paused_at) = self.paused_at {
                let position = paused_at.duration_since(start);
                position.saturating_sub(self.pause_offset)
            } else {
                elapsed.saturating_sub(self.pause_offset)
            }
        }
        None => Duration::ZERO,
    }
}
```

## Challenges

**Finding the right crates is hard.** Rust's ecosystem isn't as massive as Python's, so when you need something specific, you have to dig. And I mean *really* dig. The documentation is there, but its not written in the most serach efficient way.

**Version compatibility matters. A lot.** I spent an embarrassing amount of time debugging what turned out to be a simple version mismatch between `eframe` 0.29 and `catppuccin-egui` expecting `egui` 0.32. Same crate, different versions, completely incompatible types.

**Cursor AI wasn't as helpful as I hoped.** It kept suggesting APIs that didn't exist in my version of rodio, or patterns that worked in theory but broke in practice. After arguing with it for a while, I relied on the docs to fix the bug.


## Next Steps

I'm heading out on vacation to hike and climb some cool rocks (priorities, right?), so I'm keeping my next-week goals realistic:

- Add previous/next track buttons (currently it only auto-advances)
- Make the UI less janky — right now it looks... functional. That's the nicest way I can put it.
- Maybe add a seek bar if I'm feeling ambitious

![Current state of the audio player](/images/2025-11-03.png)

---

This project has been exciting for me, I've always wanted to make a fully customizeb player with whatever features I like. I am purpusly implementing one function at a time to learn and gain a deeper understanding of Rust.

See you after the climbing trip. 🧗‍♀️