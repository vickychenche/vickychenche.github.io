# New Year, New Playlist

## Happy New Year

Right after my climbing trip, I had a lot of work to pick up and life got really busy. 2025 was a huge year, I graduated and started working full time. I wonder what 2026 has in store for me, and I'm excited to see where I can progress more.

## New Features

Here's what I managed to get working:

**Traverse through Playlist** — You can now go back and forth between songs, with the player correctly handling audio playback and showing the right title. The navigation loops: at the end of the playlist, clicking next automatically sets it to the beginning, and going backward at the start just restarts the first song.

**Create New Playlist** — I added a new sidebar navigation. Users can click "create playlist" and enter a new playlist name. Once created, clicking on a playlist loads its songs and you can play from that playlist.

## Learnings

**Some(idx) is safer than unwrap()**

`self.current_index` is an `Option<usize>`. When I first started, I was tempted to use `unwrap()` to extract the value, but that's dangerous—if the value is `None`, your program will panic and crash.

Using `if let Some(idx)` is Rust's idiomatic way to handle options. What it does is: if `self.current_index` is not `None`, extract the value and call it `idx`, then go into the block. If it's `None`, the code just skips the block. This is much safer than `unwrap()`.

Here's a snippet of how I implemented it:

```rust
pub fn previous(&mut self) -> Option<&AudioFile> {
    if let Some(idx) = self.current_index {
        if idx > 0 {
            let prev_idx = idx - 1;
            self.current_index = Some(prev_idx);
            return self.files.get(prev_idx);
        }
    }
    None
}
```

## Monolithic vs Modular Monolith vs Microservices

This was a cool topic to learn about. I've only explicitly learned about microservices before, so exploring the middle ground was interesting. I quite like the Modular Monolith approach—it can simplify deployments and releases while keeping components clean enough to scale one day.

## Next Steps

I'm going to clean up this project and make it look prettier, but my focus is going to shift for a bit. I need to focus on distributed systems and get a deeper understanding of overall architecture.

