// NodeConnect Script. Turn nulls into nodes connected by dynamic curves.
// Developed by Victoria Shelest.
// Version 1.1.
// 09.2025.


// Base64 decode function for After Effects (returns binary string)
function decodeBase64(input) {
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = [];
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    while (i < input.length) {
        enc1 = keyStr.indexOf(input.charAt(i++));
        enc2 = keyStr.indexOf(input.charAt(i++));
        enc3 = keyStr.indexOf(input.charAt(i++));
        enc4 = keyStr.indexOf(input.charAt(i++));
        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;
        output.push(String.fromCharCode(chr1));
        if (enc3 != 64) output.push(String.fromCharCode(chr2));
        if (enc4 != 64) output.push(String.fromCharCode(chr3));
    }
    return output.join("");
}

// Check that at least two layers are selected
if (app.project.activeItem && app.project.activeItem instanceof CompItem) {
    var comp = app.project.activeItem;
    var selectedLayers = comp.selectedLayers;
    // Only keep Null layers (allow duplicate names)
    var nullLayers = [];
    for (var i = 0; i < selectedLayers.length; i++) {
        var layer = selectedLayers[i];
        if (layer instanceof AVLayer && layer.nullLayer === true) {
            nullLayers.push(layer);
        }
    }
    if (nullLayers.length < 2) {
        // alert("Please select at least two Null layers."); // This version is silent! 
    } else {
        app.beginUndoGroup("Create Path Connecting Nulls");
        // 1) Check if 'Connection CTRL' exists, if not, create it at index 1
        var ctrlLayer = null;
        for (var i = 1; i <= comp.numLayers; i++) {
            var l = comp.layer(i);
            if (l instanceof AVLayer && l.nullLayer && l.name === "Connection CTRL") {
                ctrlLayer = l;
                break;
            }
        }
        if (!ctrlLayer) {
            ctrlLayer = comp.layers.addNull();
            ctrlLayer.moveToBeginning();
            ctrlLayer.name = "Connection CTRL";
            ctrlLayer.label = 2; // 
            ctrlLayer.enabled = false; // Make the layer invisible
            // Apply embedded pseudo effect preset
            var base64 = "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b250cm9sQXJyYXkiOlt7Im5hbWUiOiJDdXJ2ZSBBbW91bnQiLCJ0eXBlIjoic2xpZGVyIiwiY2FuSGF2ZUtleWZyYW1lcyI6dHJ1ZSwiY2FuQmVJbnZpc2libGUiOnRydWUsImludmlzaWJsZSI6ZmFsc2UsImtleWZyYW1lcyI6dHJ1ZSwiaWQiOjg0NTQwMDc5OTAsImhvbGQiOmZhbHNlLCJkZWZhdWx0IjozMCwic2xpZGVyTWF4IjoxLCJzbGlkZXJNaW4iOjAsInZhbGlkTWF4IjoxMDAsInZhbGlkTWluIjotMTAwLCJwcmVjaXNpb24iOjIsInBlcmNlbnQiOmZhbHNlLCJwaXhlbCI6ZmFsc2UsIm9wZW4iOnRydWUsImVycm9ycyI6WwoKXSwiZXJyb3IiOlsKCl19LHsibmFtZSI6IlN0cm9rZSBXaWR0aCIsInR5cGUiOiJzbGlkZXIiLCJjYW5IYXZlS2V5ZnJhbWVzIjp0cnVlLCJjYW5CZUludmlzaWJsZSI6dHJ1ZSwiaW52aXNpYmxlIjpmYWxzZSwia2V5ZnJhbWVzIjp0cnVlLCJpZCI6MjA2Mjc3MDMyMiwiaG9sZCI6ZmFsc2UsImRlZmF1bHQiOjQsInNsaWRlck1heCI6MTAsInNsaWRlck1pbiI6MCwidmFsaWRNYXgiOjEwMCwidmFsaWRNaW4iOi0xMDAsInByZWNpc2lvbiI6MiwicGVyY2VudCI6ZmFsc2UsInBpeGVsIjpmYWxzZSwib3BlbiI6dHJ1ZSwiZXJyb3JzIjpbCgpdLCJlcnJvciI6WwoKXX0seyJuYW1lIjoiU3Ryb2tlIENvbG9yIiwidHlwZSI6ImNvbG9yIiwiY2FuSGF2ZUtleWZyYW1lcyI6dHJ1ZSwiY2FuQmVJbnZpc2libGUiOnRydWUsImludmlzaWJsZSI6ZmFsc2UsInJlZCI6MjU1LCJncmVlbiI6MjU1LCJibHVlIjoyNTUsImtleWZyYW1lcyI6dHJ1ZSwiaWQiOjgwMjI0MDk0OTQsImhvbGQiOmZhbHNlLCJlcnJvciI6WwoKXX1dLCJ2ZXJzaW9uIjozfQ==";
            var tempFfxFile = new File(Folder.temp.fullName + "/temp_preset.ffx");
            tempFfxFile.encoding = "BINARY";
            tempFfxFile.open("w");
            tempFfxFile.write(decodeBase64(base64));
            tempFfxFile.close();
            ctrlLayer.applyPreset(tempFfxFile);
        }

        // 2) Create a new shape layer for every unique pair of selected nulls
        // Find the next available number for Node Connection layers
        var maxNum = 0;
        for (var i = 1; i <= comp.numLayers; i++) {
            var l = comp.layer(i);
            var m = l.name && l.name.match(/^Node Connection (\d+)$/);
            if (m && parseInt(m[1], 10) > maxNum) {
                maxNum = parseInt(m[1], 10);
            }
        }
        var nextNum = maxNum + 1;
        // Create a connection for every unique pair
        for (var i = 0; i < nullLayers.length - 1; i++) {
            for (var j = i + 1; j < nullLayers.length; j++) {
                var shapeLayer = comp.layers.addShape();
                shapeLayer.name = "Node Connection " + nextNum;
                nextNum++;
                // Lock the anchor point to the first null's position in the pair
                var firstNullName = nullLayers[i].name.replace(/"/g, '\"');
                var secondNullName = nullLayers[j].name.replace(/"/g, '\"');
                var nullPosExpr = 'thisComp.layer("' + firstNullName + '").transform.position';
                shapeLayer.transform.position.expression = nullPosExpr;
                shapeLayer.transform.anchorPoint.expression = 'fromComp(thisComp.layer("' + firstNullName + '").toComp(thisComp.layer("' + firstNullName + '").anchorPoint));';
                // Add a group for the path
                var shapeGroup = shapeLayer.content.addProperty("ADBE Vector Group");
                shapeGroup.name = "Path Group";
                // Add a path to the group
                var path = shapeGroup.content.addProperty("ADBE Vector Shape - Group");
                // Add a Curve Amount slider to the shape layer, linked to Connection CTRL
                var effects = shapeLayer.property("ADBE Effect Parade");
                if (!effects) {
                    effects = shapeLayer.addProperty("ADBE Effect Parade");
                }
                var slider = effects.addProperty("ADBE Slider Control");
                slider.name = "Curve Amount";
                // Link to NodeConnect pseudo effect on Connection CTRL
                slider.property("Slider").expression = 'try{thisComp.layer("Connection CTRL").effect("NodeConnect")("Curve Amount")}catch(err){100}';
                // Ensure the path property is valid before applying an expression
                if (path) {
                    var pathProp = path.property("Path"); // Correct property access
                    // Build the expression for the path using the two nulls by name, referencing the main controller
                    var expression = "var points = []\n";
                    expression += "var inTangents = []\n";
                    expression += "var outTangents = []\n";
                    expression += 'var curveCtrl = thisComp.layer("Connection CTRL").effect("NodeConnect")("Curve Amount");\n';
                    expression += 'var curve = linear(curveCtrl, 0, 100, 0, 500);\n';
                expression += 'points.push(thisLayer.fromComp(thisComp.layer("' + firstNullName + '").toComp(thisComp.layer("' + firstNullName + '").anchorPoint)));\n';
                expression += 'points.push(thisLayer.fromComp(thisComp.layer("' + secondNullName + '").toComp(thisComp.layer("' + secondNullName + '").anchorPoint)));\n';
                    expression += "for (var i = 0; i < points.length; i++) {\n";
                    expression += "  var tangent = [curve, 0];\n";
                    expression += "  inTangents.push(i == 0 ? [0,0] : [-curve, 0]);\n";
                    expression += "  outTangents.push(i == points.length-1 ? [0,0] : tangent);\n";
                    expression += "}\n";
                    expression += "createPath(points, inTangents, outTangents, false);";
                    pathProp.expression = expression;
                } else {
                    alert("Error: Unable to create path property. Ensure the shape layer was created correctly.");
                }
                // Add a stroke to the shape layer and link to Connection CTRL
                var stroke = shapeGroup.content.addProperty("ADBE Vector Graphic - Stroke");
                // Link to NodeConnect pseudo effect on Connection CTRL
                stroke.property("ADBE Vector Stroke Width").expression = 'try{thisComp.layer("Connection CTRL").effect("NodeConnect")("Stroke Width")}catch(err){4}';
                stroke.property("ADBE Vector Stroke Color").expression = 'try{thisComp.layer("Connection CTRL").effect("NodeConnect")("Stroke Color")}catch(err){[1,1,1]}';
            }
        }
        app.endUndoGroup();
    }
}
