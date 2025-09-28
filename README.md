# NodeConnect Script

NodeConnect. Turn nulls into nodes connected by dynamic curves.

**Overview**

NodeConnect is an After Effects script that connects two null objects with a smooth curved path. It’s designed for animating node-based UI systems, data flow visualizations, and other tech-style graphics.

Created by: Victoria Shelest

Year: 2025

**What it does**

The NodeConnect script automatically generates a shape layer path between two selected nulls. The curve dynamically updates whenever either null is moved, making it ideal for node graphs, futuristic HUDs, and animated diagrams.

Now two versions of the script are available. Each version included files:
- `node_connect_[version].jsx` — a script that creates node connections.
- `node_connect_panel_[version].jsx` — a ScriptUI panel with a button to create node connections.
- `node-connect_icon.svg` — an icon for KBar.

**It creates**
- A shape layer with an expression-driven path linked to both nulls.
- A stroke path that can be styled and customized (you can adjust stroke width and color after creation).
- A curve controller (slider) for adjusting the curve amount.
- The order of selection matters: select the left null first, then the right. If the curve bends the wrong way, simply set the Curve Amount slider to a negative value.

**Installation**
1. Download the desired version (v1.0 or v1.1).
2. Copy `node_connect_[version].jsx` and/or `node_connect_panel_[version].jsx` to your After Effects Scripts folder:
- **Windows:** `C:\Program Files\Adobe\Adobe After Effects [version]\Support Files\Scripts\`
- **Mac:** `/Applications/Adobe After Effects [version]/Scripts/`
2. Restart After Effects.
3. Access via **File > Scripts > NodeConnect**.

**Adding to KBar**
1. Download the `node_connect_[version].jsx` script and the optional `node_connect.svg` icon.
2. Open KBar Settings in After Effects.
3. Add a new button to one of your toolbars.
4. Choose **Run JSX/JSXBIN File** and select the `node_connect_[version].jsx` file.
5. Add a description, choose the downloaded icon if desired, and click **OK**.

**Before running**
1. Enable Script File Access: go to **Edit > Preferences > Scripting & Expressions** and check *Allow Scripts to Write Files and Access Network*.
2. Create or open a composition and select the two null layers you want to connect.
3. Save your project before running the script.

**Troubleshooting**
- **Both points appear on the same null.**  
    This can happen if the selected nulls have identical names.  
    ✔ Solution: make sure each null has a unique name before running the script.
- **Curve bends in the wrong direction.**  
    The curve may point the opposite way if you select the second null first (the order of selection matters).  
    ✔ Solution: delete the curve and create it again, selecting the nulls in the opposite order.
