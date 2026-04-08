# NodeConnect Script

## Overview

NodeConnect is an After Effects script that connects two null objects with a smooth, expression-driven curved path. It is designed for animating node-based UI systems, data flow visualizations, diagrams, and other tech-style graphics where you need flexible, controllable connections between elements.

> This README describes the **latest version (v2.x)** of NodeConnect.
> 
> For older behavior and detailed release history, see [**CHANGELOG.md**](https://github.com/VictoriaShelest/NodeConnect-Script/blob/main/CHANGELOG.md).
>

Created by: Victoria Shelest

Year: 2025-2026

## What it does

NodeConnect takes selected Null layers in your composition and automatically builds a shape-based connection system between them. It focuses on:

- Fast creation of clean, curved connections between nulls.
- Centralised control over stroke style and overall curvature.
- Per-connection overrides for curvature and color, so you can fine-tune or animate individual links without breaking the global system.

---

## It creates

When you run NodeConnect with at least two Null layers selected, it creates:

- A **Connection CTRL** null at the top of the comp:
    
    - Central controller for global curve amount, stroke width and base stroke color.
    
- For every unique pair of selected Nulls, a **“Node Connection X”** shape layer that:
    - Has a **path** driven by expressions and linked to the two corresponding nulls.
    - Has a **stroke** whose width and base color are driven by the global Connection CTRL.
    - Locks its transform position/anchor so it follows the first null in the pair.
- On each “Node Connection” layer:
    - A per-connection **Curve Influence** slider (0–1) that acts as a local multiplier of the global Curve Amount:
        - `1` → the connection fully inherits the global curvature.
        - `0` → the connection becomes a straight line between the two nulls.
        This is useful when you animate the creation or dragging of nodes and need individual lines to temporarily snap to a straight connection.
    - A per-connection **Stroke Color Local** control:
        - New connections inherit the global stroke color as their initial value.
        - You can then animate **Stroke Color Local** per connection (for example, grey while dragging, then switching to the final brand color when the node is placed).

> Selection order matters:
> 
> 
> For each pair, select the “left” null first and the “right” second to get a predictable curve direction.
> 
> If the curve bends the wrong way, you can simply use a negative Curve Amount on the global controller.
> 

---
## Controls

### Global controls (Connection CTRL)

On the **Connection CTRL** null, NodeConnect expects a “NodeConnect” pseudo effect with:

- **Curve Amount**
    
    Controls the overall curvature of all connections. Higher values → stronger bend.
    
    Each connection multiplies this value by its own Curve Influence.
    
- **Stroke Width**
    
    Sets the base stroke width for all connections.
    
- **Stroke Color**
    
    Sets the base stroke color. New connections copy this as their initial local color.
    

These global controls define the default look & feel of your whole node graph.

### Per-connection controls (on each Node Connection layer)

Each “Node Connection X” shape layer gets:

- **Curve Influence** (Slider, 0–1)
    - `1` → fully follow the global Curve Amount.
    - `0` → force this specific connection to be straight.
    - Values in between smoothly interpolate between straight and curved.
    This lets you animate individual connections independently (for example, straight while a node is being dragged, then bending into place once it lands).
- **Stroke Color Local** (Color Control)
    - Initial value is set from the global Stroke Color.
    - You can animate this per connection to handle states like “inactive/grey while moving” and “active/colored when placed”.

The stroke on the path reads from **Stroke Color Local** (with global color used only as the initial value), while stroke width still follows the global Stroke Width by default.

---
## Installation

**Standard script version**
1. Download the desired version (v1.0 - v2.0).
2. Copy `NodeConnect[version].jsx` to your After Effects Scripts folder:
- **Windows:** `C:\Program Files\Adobe\Adobe After Effects [version]\Support Files\Scripts\`
- **macOS:** `/Applications/Adobe After Effects [version]/Scripts/`
2. Restart After Effects.
3. Access via **File > Scripts > NodeConnect**.

**Panel version**
1. Download `NodeConnect_Panel_[version].jsx`.
2. Copy it to your After Effects ScriptUI Panels folder:
   - **Windows:** `C:\Program Files\Adobe\Adobe After Effects [version]\Support Files\Scripts\ScriptUI Panels\`
   - **Mac:** `/Applications/Adobe After Effects [version]/Scripts/ScriptUI Panels/`
3. Restart After Effects.
4. Open it via **Window > NodeConnect_Panel_[version].jsx**. 

**Adding to KBar**
1. Download the `NodeConnect[version].jsx` script and the optional `NodeConnect_Icon.svg` icon.
2. Open KBar Settings in After Effects.
3. Add a new button to one of your toolbars.
4. Choose **Run JSX/JSXBIN File** and select the `NodeConnect[version].jsx` file.
5. Add a description, choose the downloaded icon if desired, and click **OK**.

**Before running**
1. Enable Script File Access: go to **Edit > Preferences > Scripting & Expressions** and check *Allow Scripts to Write Files and Access Network*.
2. Create or open a composition and select the two null layers you want to connect.
3. Save your project before running the script.

---

## Usage

1. Create or select at least **two Null layers** in your comp.
Only Null layers are used; other layer types in the selection are ignored.
2. (Optional) Name your nulls in a meaningful way — these names are used in the generated expressions.
3. Make sure both Nulls have different names.
4. Run **NodeConnect**.
5. The script will:
    - Create or reuse a **Connection CTRL** null with the global controls.
    - Scan your selection and create a **“Node Connection”** shape layer for each unique pair of selected nulls.
    - Add per-connection Curve Influence and Stroke Color Local controls.
6. Adjust global style on **Connection CTRL**:
    - `Curve Amount` for overall bend.
    - `Stroke Width` and `Stroke Color` for stroke styling.
7. Fine-tune or animate individual connections:
    - Use **Curve Influence** to control how much each link follows the global curve.
    - Use **Stroke Color Local** to animate color per connection.

---

## Typical animation workflow

- Use **Connection CTRL** to set the global look (curvature, stroke width, base color) for your node graph.
- For node creation / dragging animations:
    - Animate **Curve Influence** on specific connections: `0 → 1` when the node settles into place.
    - Animate **Stroke Color Local** if needed.

This keeps your node system consistent and centralized, while giving you flexible control on each individual link.

---

## Compatibility

- Adobe After Effects: CC 2023 and later.
- Script type: ExtendScript.
- Works with 2D nulls in standard comps.

---

## Changelog

For detailed version history, including v1.x behavior, see: [**CHANGELOG.md**](https://github.com/VictoriaShelest/NodeConnect-Script/blob/main/CHANGELOG.md).

---

## Troubleshooting
- **Both points appear on the same null.**  
    This can happen if the selected nulls have identical names.  
    ✔ Solution: make sure each null has a unique name before running the script.
- **No path appears after running the script.**  
    If nothing is created, it usually means fewer then two null layers were selected.  
    ✔ Solution: select exactly two nulls before running the script.  
- **Curve bends in the wrong direction.**  
    The curve may point the opposite way if you select the second null first (the order of selection matters).  
    ✔ Solution: delete the curve and create it again, selecting the nulls in the opposite order.
