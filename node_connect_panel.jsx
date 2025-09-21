
// NodeConnect Script. Turn nulls into nodes, connected by dynamic curves.
// Developed by Victoria Shelest.
// 09.2025.


(function() {
function buildUI(thisObj) {
    var panel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "NodeConnect", undefined, {resizeable: true});
    // panel.orientation = "column";
    var btn = panel.add("button", undefined, "NodeConnect");
    btn.preferredSize.width = 100;
    btn.preferredSize.height = 30;

    btn.onClick = function() {
        nodeConnect();
    };

    panel.layout.layout(true);
    return panel;
}
function nodeConnect() {
    if (app.project.activeItem && app.project.activeItem instanceof CompItem) {
    var comp = app.project.activeItem;
    var selectedLayers = comp.selectedLayers;
    // Only keep Null layers
    var nullLayers = [];
    for (var i = 0; i < selectedLayers.length; i++) {
        if (selectedLayers[i] instanceof AVLayer && selectedLayers[i].nullLayer === true) {
            nullLayers.push(selectedLayers[i]);
        }
    }
    if (nullLayers.length < 2) {
        alert("Please select at least two Null layers.");
    } else {
        app.beginUndoGroup("Create Path Connecting Nulls");
        // Create a new shape layer
    var shapeLayer = comp.layers.addShape();
    shapeLayer.name = "NodeConnect";
    shapeLayer.transform.position.setValue([0, 0]); // Set the position of the shape layer to [0, 0]
    shapeLayer.transform.position.expression = "[0,0]"; // Lock position with expression
        // Add a group for the path
        var shapeGroup = shapeLayer.content.addProperty("ADBE Vector Group");
        shapeGroup.name = "Path Group";
        // Add a path to the group
        var path = shapeGroup.content.addProperty("ADBE Vector Shape - Group");
        // Ensure the path property is valid before applying an expression
        if (path) {
            var pathProp = path.property("Path"); // Correct property access
            // Create a slider control for curve amount
            var effects = shapeLayer.property("ADBE Effect Parade");
            if (!effects) {
                effects = shapeLayer.addProperty("ADBE Effect Parade");
            }
            var slider = effects.addProperty("ADBE Slider Control");
            slider.name = "Curve Amount";
            slider.property("Slider").setValue(200); // Default value
            // Build the expression for the path
            var expression = "var points = [];\n";
            expression += "var inTangents = [];\n";
            expression += "var outTangents = [];\n";
            expression += "var curve = effect(\"Curve Amount\")(\"Slider\");\n";
            "";
            for (var i = 0; i < nullLayers.length; i++) {
                var layerName = nullLayers[i].name.replace(/"/g, "\"");
                expression += "points.push(thisComp.layer(\"" + layerName + "\").toComp(thisComp.layer(\"" + layerName + "\").anchorPoint));\n";
            }
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
        // Add a stroke to the shape layer
        var stroke = shapeGroup.content.addProperty("ADBE Vector Graphic - Stroke");
        stroke.property("ADBE Vector Stroke Width").setValue(4);
        app.endUndoGroup();
        
    }
}
}

var panel = buildUI(this);
if (panel instanceof Window) {
    panel.center();
    panel.show();
} else {
    panel.layout.layout(true);
}
})();