/**
 * @description Generate a button which can visually change for three states including mouse over, mouse out, click and mouse up, with set label property and event handler.
 * @param {any} window canvas
 * @returns {object} functions
 */
function Button(window) {
    var draw = window;
    var group = draw.group();

    var rect = draw.rect(100, 40)
    rect.attr({
        fill: '#f09',
        'fill-opacity': 0.5
    })
    group.add(rect);

    var text = draw.text('').attr({ x: rect.width() / 2, y: rect.height() / 12 });
    text.font({ anchor: 'middle', size: 20, family: 'Helvetica', fill: '#fff' });
    group.add(text);
    group.move(100, 100);
    var clickEvent = null
    var stateChangeEvent = null;
    rect.mouseover(function() {
        this.fill({ color: 'blue' })
        if (stateChangeEvent) {
            stateChangeEvent('mouseover')
        }
    })
    rect.mouseout(function() {
        this.fill({ color: 'red' })
        if (stateChangeEvent) {
            stateChangeEvent('mouseout')
        }
    })
    rect.click(function(event) {
        this.attr({
            fill: 'green',
            'fill-opacity': 0.5
        })
        if (clickEvent != null)
            clickEvent(event)
        if (stateChangeEvent) {
            stateChangeEvent('click')
        }
    })
    rect.mouseup(function() {
        this.fill({ color: 'red' })
        if (stateChangeEvent) {
            stateChangeEvent('mouseup')
        }
    })
    return {
        /**
         * @description Move the button position
         * @param {number} x horizontal position
         * @param {number} y vertical position
         */
        move: function(x, y) {
            rect.move(x, y);
        },
        /**
         * @description get and set the click event
         * @param {event} eventHandler click/mouse over/mouse out event
         */
        onclick: function(eventHandler) {
            clickEvent = eventHandler
        },
        /**
         * @description get and set the new changed state
         * @param {event} eventHandler new current event
         */
        onStateChange: function(eventHandler) {
            stateChangeEvent = eventHandler
        },
        /**
         * @description get and set the text label 
         * @param {String} txt label
         */
        setLabel: function(txt) {
            text.text(txt)
        }

    }
}
/**
 * @description Generate a CheckBox which can visually change between checked and unchecked states, with set label property and event handler.
 * @param {any} window canvas
 * @returns {Object} functions
 */
function CheckBox(window) {
    var draw = window;
    var group = draw.group();
    var rect = draw.rect(25, 25)
    var checked = false;
    group.add(rect);
    rect.attr({
        fill: 'white',
        'fill-opacity': 0.5,
        stroke: 'blue',
        'stroke-width': 4
    })
    var text = draw.text('').attr({ x: rect.width() * 2, y: -5 });
    text.font({ anchor: 'left', size: 20, family: 'Helvetica', fill: 'blue' });
    group.add(text);
    group.move(100, 100);
    var onChangeEvent = null
    group.click(function(event) {

        checked = !checked;
        event.checked = checked

        if (checked) {
            rect.attr({
                fill: '#f06'
            })
        } else {
            rect.attr({
                fill: 'white'
            })
        }
        // rect.fill({ color: 'white' })
        if (onChangeEvent != null)
            onChangeEvent(event)
        if (stateChangeEvent) {
            stateChangeEvent('click');
        }
    })
    var stateChangeEvent = null;
    return {
        /**
         * @description Move the checkbox position
         * @param {number} x horizonal position
         * @param {number} y vertical position
         */
        move: function(x, y) {
            group.move(x, y);
        },
        /**
         * @description get and set the onchange click event
         * @param {event} eventHandler click event 
         */
        onChange: function(eventHandler) {
            onChangeEvent = eventHandler
        },
        /**
         * @description get and set the text label
         * @param {String} txt label
         */
        setLabel: function(txt) {
            text.text(txt)
        }
    }
}

/**
 * @description Generate RadioBoxs which can visually change between checked and unchecked states, supports display of 2 to n radio buttons, only one button can be check at a time, with set label property and event handler.
 * @param {any} window canvas
 * @param {Array} args radio box info array
 * @returns {Object} functions
 */
function RadioBox(window, args) {
    // const radios = []
    var draw = window;
    var groups = []
    var circles = []
    var groupRadios = draw.group();
    for (let i = 0; i < args.length; i++) {
        let group = draw.group();
        let circle = draw.circle(25)
        group.add(circle);
        circle.attr({
            fill: !args[i][1] ? 'white' : '#f06',
            'fill-opacity': 0.5,
            stroke: 'blue',
            'stroke-width': 4
        })
        circles.push(circle);
        let text = draw.text(args[i][0]).attr({ x: circle.width() + 10, y: -5 });
        text.font({ anchor: 'left', size: 20, family: 'Helvetica', fill: 'blue' });
        group.add(text);
        group.move(100, 50 * i);
        group.click((event) => {
            circles.forEach(c => {
                c.attr({
                    fill: '#fff'
                })
            })
            circle.attr({
                fill: '#f06'
            })
            event.checked = i;
            if (onChangeEvent != null)
                onChangeEvent(event)
            if (stateChangeEvent) {
                stateChangeEvent('click ' + i + 'th button');
            }
        })
        groups.push(group);
        groupRadios.add(group);
    }

    var onChangeEvent = null;
    var stateChangeEvent = null;
    return {
        /**
         * @description Move the button position
         * @param {number} x horizonal position
         * @param {number} y vertical position
         */
        move: function(x, y) {
            groupRadios.move(x, y)
        },
        /**
         * @description get and set the onchange click event
         * @param {event} eventHandler click event
         */
        onChange: function(eventHandler) {
            onChangeEvent = eventHandler
        },
        /**
         * @description get and set the new changed state
         * @param {event} eventHandler new changed event 
         */
        onStateChange: function(eventHandler) {
            stateChangeEvent = eventHandler
        },
        /**
         * @description get and set the text label
         * @param {String} txt label
         */
        setLabel: function(txt) {
            text.text(txt)
        }
    }
}

/**
 * @description Generate ScrollBar which can visually shows the current scroll bar states triggered by click event, contains set height property, get scroll thumb property, and event handler.
 * @param {any} window canvas
 * @returns {Object} functions
 */
function ScrollBar(window) {
    var draw = window;
    var group = draw.group();
    var HEIGHT = 20;
    var main = group.rect(20, 200).stroke('blue').fill('white');
    let up = group.rect(20, HEIGHT).stroke('black').fill('blue');
    let down = group.rect(20, HEIGHT).stroke('black').fill('blue');
    let middle = group.rect(20, main.height() - HEIGHT).stroke('blue').fill('white');
    let wheel = group.rect(20, HEIGHT).stroke('#f09').fill('#f09');
    down.attr({ x: 0, y: 200 })
    wheel.attr({ 'fill-opacity': 0.5, })
    wheel.attr({ x: 0, y: HEIGHT })
    middle.move(0, HEIGHT)

    up.click(() => {
        if (up.y() < wheel.y() - HEIGHT)
            wheel.move(wheel.x(), wheel.y() - HEIGHT)
        else
            wheel.move(wheel.x(), up.y() + HEIGHT)
        if (stateChangeEvent)
            stateChangeEvent('scroll up ' + wheel.y())
    })
    down.click(() => {
        if (down.y() > wheel.y() + HEIGHT)
            wheel.move(wheel.x(), wheel.y() + HEIGHT)
        else
            wheel.move(wheel.x(), down.y() - HEIGHT)

        if (stateChangeEvent)
            stateChangeEvent('scroll down ' + wheel.y())
    })
    middle.on('click', (event) => {
        let y = Math.min(event.layerY, down.y() - HEIGHT)
        wheel.move(wheel.x(), y)
        if (stateChangeEvent)
            stateChangeEvent('drag to ' + y)

    })
    var stateChangeEvent = null;
    return {
        /**
         * @description Move the scrollbar position
         * @param {number} x horizonal position
         * @param {number} y vertical position
         */
        move: function(x, y) {
            group.move(x, y)
        },
        /**
         * @description set the scrollbar height
         * @param {number} value scrollbar height
         */
        setHeight: function(value) {
            group.height(value)
            main.height(value)
                // HEIGHT = value / 10;
            console.log(down.y())
            up.height(HEIGHT);
            wheel.height(HEIGHT)
            down.height(HEIGHT);
            middle.height(value - 2 * HEIGHT)
            console.log(group.y())
            down.y(group.y() + value - HEIGHT)

        },
        /**
         * @description get the wheel's position.
         * @returns {Object} wheel position x, y
         */
        getPosition: function() {
            return { x: wheel.x(), y: wheel.y() };
        },
        /**
         * @description get and set the new changed state
         * @param {event} eventHandler new changed event
         */
        onStateChange: function(eventHandler) {
            stateChangeEvent = eventHandler
        },
    }
}
/**
 * @description Generate a textbox which can visually show a caret triggered by hover event, contains a get text entered property and event handler. 
 * @param {any} window canvas
 * @returns {Object} functions
 */
function TextBox(w) {
    var draw = w;
    var group = draw.group();
    var foused = false
    var onChangeEvent = null;
    group.rect(200, 30).stroke('blue').fill('white');
    group.click(function(event) {
        console.log(event);
    })

    var text = group.text('').attr({ x: 8, y: 0 });
    text.font({ anchor: 'left', size: 18, family: 'Helvetica', fill: '#f09' });
    var caret = group.rect(0, 15).attr({ x: 10, y: 10 });
    let runner = null

    SVG.on(window, 'keyup', (event) => {
        if (!foused)
            return
        console.log(event.key)
        text.text(text.text() + event.key)
        caret.x(text.length() + 110);
        if (stateChangeEvent) {
            stateChangeEvent(text.text() + event.key)
        }
    })

    group.mouseover(() => {
        runner = caret.animate().width(1);
        runner.loop(1000, 1, 0);
        foused = true
        if (stateChangeEvent) {
            stateChangeEvent('mouseover')
        }
    })

    group.mouseout(() => {
        runner.finish()
        caret.width(0)
        foused = false
        if (stateChangeEvent) {
            stateChangeEvent('mouseout')
        }
    })

    group.move(100, 10)

    var stateChangeEvent = null;
    return {
        /**
         * @description Move the textbox position
         * @param {number} x horizonal position
         * @param {number} y vertical position
         */
        move: function(x, y) {
            group.move(x, y)
        },
        /**
         * @description get and set the onchange hover event
         * @param {event} onChangeEventHandler mouse hover event
         */
        onChange: function(onChangeEventHandler) {
            onChangeEvent = onChangeEventHandler
        },
        /**
         * @description get text entered
         * @returns {String} text entered
         */
        text: function() {
            return text.text();
        },
        /**
         * @description get and set the new changed state
         * @param {event} eventHandler new changed state
         */
        onStateChange: function(eventHandler) {
            stateChangeEvent = eventHandler
        },
    }
}

/**
 * @description Generate a ProgressBar which visually shows the ongoing progress, contains a set bar width property, set increment value property, increment progress value property, and event handler.
 * @param {any} window canvas
 * @returns {Object} functions
 */
function ProgressBar(window) {
    var draw = window;
    var group = draw.group();
    var rect = draw.rect(200, 10)
    var checked = false;
    var increment = 1;
    group.add(rect);
    rect.attr({
        fill: 'white',
        stroke: 'blue',
        'stroke-width': 1
    })
    var innerRect = draw.rect(0, 10)
    innerRect.attr({
        fill: '#f09',
        'fill-opacity': 0.5,
        x: 0,
        y: 0
    })
    group.add(innerRect);
    group.move(100, 100);

    var stateChangeEvent = null;

    return {
        /**
         * @description move the progress bar postion
         * @param {*} x horizontal-position
         * @param {*} y vertical-position
         */
        move: function(x, y) {
            group.move(x, y);
        },
        /**
         * @description set the progress speed
         * @param {number} speed custom speed value
         */
        progress: function(speed) {
            let progress
            if (speed) {
                progress = rect.width() / 100 * speed
                innerRect.attr({ width: rect.width() / 100 * speed })
                if (stateChangeEvent) {
                    stateChangeEvent('progress: ' + speed)
                }
            } else {
                progress = innerRect.width() + (rect.width() / 100 * increment)

                if (progress > rect.width()) {
                    progress = 0
                }

                innerRect.attr({ width: progress })
                if (stateChangeEvent) {
                    stateChangeEvent('progress: ' + speed)
                }
            }

        },
        /**
         * @description Adjust the progress bar size
         * @param {number} width progress bar width
         * @param {number} height progress bar height
         */
        size: function(width, height) {
            rect.attr({ width, height })
            innerRect.attr({ height })
        },
        /**
         * @description set the progress increment value
         * @param {number} inc custom increment value
         */
        setIncrement: function(inc) {
            increment = inc;
        },
        /**
         * @description get the progress increment value
         * @returns {number} increment value
         */
        getIncrement: function() {
            return increment;
        },
        /**
         * @description get and set the new changed state
         * @param {event} eventHandler new changed state
         */
        onStateChange: function(eventHandler) {
            stateChangeEvent = eventHandler
        },
    }

}
/**
 * @description Generate a Toggle Button which visually shows the switch on or switch of status, with a set position property and a event handler.
 * @param {any} window canvas
 * @returns {Object} functions
 */
function ToggleButton(window) {
    var draw = window;
    var group = draw.group();
    var inner = draw.rect(25, 25)

    var border = draw.rect(50, 25)

    var on = false;
    inner.attr({
        fill: 'white',
        'fill-opacity': 1,
        stroke: 'gray',
        'stroke-width': 1
    })
    border.attr({
        fill: 'gray',
        'fill-opacity': 1,
        stroke: 'gray',
        'stroke-width': 1
    })

    group.add(border);
    group.add(inner);
    border.click((event) => {
        on = !on;
        if (!on) {
            inner.x(border.x() + 0);
            border.attr({
                fill: 'gray'
            })
        } else {
            inner.x(border.x() + 25);
            border.attr({
                fill: '#f09',
                'fill-opacity': 0.5
            })
        }
        if (stateChangeEvent) {
            stateChangeEvent("switch " + (on ? "on" : "off"))
        }
    })


    var stateChangeEvent = null;

    return {
        /**
         * @description Move the toggle button position
         * @param {number} x horizonal position
         * @param {number} y vertical position
         */
        move: function(x, y) {
            group.move(x, y);
        },
        /**
         * @description get and set the new changed state
         * @param {event} eventHandler new click event
         */
        onStateChange: function(eventHandler) {
            stateChangeEvent = eventHandler
        },
    }

}



export { Button, CheckBox, RadioBox, TextBox, ScrollBar, ProgressBar, ToggleButton }