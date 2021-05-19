/**
 * This is a function
 * @param {any} window 
 * @returns {Object} 
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
         * 
         * @param {*} x 
         * @param {*} y 
         */
        move: function(x, y) {
            rect.move(x, y);
        },
        /**
         * 
         * @param {*} eventHandler 
         */
        onclick: function(eventHandler) {
            clickEvent = eventHandler
        },
        /**
         * 
         * @param {*} eventHandler 
         */
        onStateChange: function(eventHandler) {
            stateChangeEvent = eventHandler
        },
        /**
         * 
         * @param {*} txt 
         */
        setLabel: function(txt) {
            text.text(txt)
        }

    }
}
/**
 * 
 * @param {*} window 
 * @returns {Object}
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
         * 
         * @param {*} x 
         * @param {*} y 
         */
        move: function(x, y) {
            group.move(x, y);
        },
        /**
         * 
         * @param {*} eventHandler 
         */
        onChange: function(eventHandler) {
            onChangeEvent = eventHandler
        },
        /**
         * 
         */
        onStateChange: function() {
            stateChangeEvent = eventHandler
        },
        /**
         * 
         * @param {*} txt 
         */
        setLabel: function(txt) {
            text.text(txt)
        }
    }
}

/**
 * 
 * @param {*} window 
 * @param {*} args 
 * @returns {Object}
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
         * 
         * @param {*} x 
         * @param {*} y 
         */
        move: function(x, y) {
            groupRadios.move(x, y)
        },
        /**
         * 
         * @param {*} eventHandler 
         */
        onChange: function(eventHandler) {
            onChangeEvent = eventHandler
        },
        /**
         * 
         * @param {*} eventHandler 
         */
        onStateChange: function(eventHandler) {
            stateChangeEvent = eventHandler
        },
        /**
         * 
         * @param {*} txt 
         */
        setLabel: function(txt) {
            text.text(txt)
        }
    }
}

/**
 * 
 * @param {*} window 
 * @returns {Object}
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
         * 
         * @param {*} x 
         * @param {*} y 
         */
        move: function(x, y) {
            group.move(x, y)
        },
        /**
         * 
         * @param {*} value 
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
         * 
         * @returns {*}
         */
        getPosition: function() {
            return { x: wheel.x(), y: wheel.y() };
        },
        /**
         * 
         * @param {*} eventHandler 
         */
        onStateChange: function(eventHandler) {
            stateChangeEvent = eventHandler
        },
    }
}
/**
 * 
 * @param {*} window
 * @returns {Object}
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
         * 
         * @param {*} x 
         * @param {*} y 
         */
        move: function(x, y) {
            group.move(x, y)
        },
        /**
         * 
         * @param {*} onChangeEventHandler 
         */
        onChange: function(onChangeEventHandler) {
            onChangeEvent = onChangeEventHandler
        },
        /**
         * 
         * @returns {*}
         */
        text: function() {
            return text.text();
        },
        /**
         * 
         * @param {*} eventHandler 
         */
        onStateChange: function(eventHandler) {
            stateChangeEvent = eventHandler
        },
    }
}

/**
 * 
 * @param {*} window 
 * @returns {Object}
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
         * 
         * @param {*} x 
         * @param {*} y 
         */
        move: function(x, y) {
            group.move(x, y);
        },
        /**
         * 
         * @param {*} speed 
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
         * 
         * @param {*} width 
         * @param {*} height 
         */
        size: function(width, height) {
            rect.attr({ width, height })
            innerRect.attr({ height })
        },
        /**
         * 
         * @param {*} inc 
         */
        setIncrement: function(inc) {
            increment = inc;
        },
        /**
         * 
         * @returns {*}
         */
        getIncrement: function() {
            return increment;
        },
        /**
         * 
         * @param {*} eventHandler 
         */
        onStateChange: function(eventHandler) {
            stateChangeEvent = eventHandler
        },
    }

}
/**
 * 
 * @param {*} window 
 * @returns {Object}
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
         * 
         * @param {*} x 
         * @param {*} y 
         */
        move: function(x, y) {
            group.move(x, y);
        },
        /**
         * 
         * @param {*} eventHandler 
         */
        onStateChange: function(eventHandler) {
            stateChangeEvent = eventHandler
        },
    }

}



export { Button, CheckBox, RadioBox, TextBox, ScrollBar, ProgressBar, ToggleButton }