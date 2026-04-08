# Changelog

All notable changes to NodeConnect will be documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and versions follow semantic versioning where possible.

---

## [2.0] – 2026-04

### Added

- Updated script panel layout and a new icon design.
- Per-connection **Curve Influence** control on every new Node Connection layer.
    - Curve Influence is a local 0–1 multiplier of the global Curve Amount:
        - `1` = fully inherits the parent curvature.
        - `0` = becomes a straight line.
    - This makes it possible to animate individual connections during drag/build animations without affecting the global curvature of the whole system.
- Per-connection **Stroke Color Local** control on every new Node Connection layer.
    - New connections still inherit the central styling logic from **Connection CTRL** by copying the global Stroke Color as their initial local value.
    - Stroke Color Local can then be animated per connection (for example, one color while dragging and then transitioning to a second color when the node is placed).

### Changed

- The path expression for each connection now uses the product of:
    - the global Curve Amount (from **Connection CTRL**) and
    - the local Curve Influence
    
    to compute tangents and resulting curvature.
    
- Stroke color on each connection now reads from Stroke Color Local, with the global Stroke Color used as the initial default when the connection is created.
- Newly created Node Connection layers are now placed above the second selected Null in each pair, making the layer stack more predictable and easier to manage in the timeline.

---

## [1.1] – 2025-09

### Added

- Automatic numbering for node connections.
- Creation of a **Connection CTRL** null with global Curve Amount, Stroke Width, and Stroke Color controls.
    - You can adjust these settings at any time after this layer is created, and every new node connection you create will automatically adopt them.
    - The Curve Amount control has been switched from absolute values to percentages to match the pseudo effect settings.

### Changed

- Improved validation of the selection:
    - The script now only considers Null layers and silently ignores other layer types.
    - ⚠︎ Reminder: select two Nulls before running the script.
- Internal expression logic was cleaned up for more stable behavior in complex comps.

---

## [1.0] – 2025-09

### Added

- Initial release of NodeConnect:
    - A script that connects two selected Null layers with a smooth, expression-driven curved path.
    - Automatic generation of “Node Connection” shape layers for each pair of selected Nulls.
    - Path expressions that follow the positions of the linked Nulls and respond to changes over time.
