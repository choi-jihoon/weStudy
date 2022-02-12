import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const BoardContainer = ({ size, color }) => {

    // const canvas = document.querySelector('#board');
    // const ctx = canvas.getContext('2d');
    // const [isDrawing, setIsDrawing] = useState(false);
    // const [timeoutnum, setTimeoutnum] = useState(null)
    // const [ctx, setCtx] = useState();

    let timeout;
    let ctx;
    let isDrawing = false;

    let lineWidth;
    let strokeStyle;

    let socket = io.connect();

    socket.on('drawing', function (data) {
        const interval = setInterval(function () {
            if (isDrawing) return;
            isDrawing = true;
            clearInterval(interval);

            const image = new Image();
            const canvas = document.querySelector('#board');
            ctx = canvas.getContext('2d');

            image.onload = function () {
                ctx.drawImage(image, 0, 0);
                isDrawing = false;
            };
            image.src = data;
        }, 200)
    })


    const drawOnCanvas = () => {
        const canvas = document.querySelector('#board');
        ctx = canvas.getContext('2d');

        const sketch = document.querySelector('#sketch');
        const sketch_style = getComputedStyle(sketch);
        canvas.width = parseInt(sketch_style.getPropertyValue('width'));
        canvas.height = parseInt(sketch_style.getPropertyValue('height'));

        const mouse = { x: 0, y: 0 };
        const last_mouse = { x: 0, y: 0 };

        canvas.addEventListener('mousemove', function (e) {
            last_mouse.x = mouse.x;
            last_mouse.y = mouse.y;

            mouse.x = e.pageX - this.offsetLeft;
            mouse.y = e.pageY - this.offsetTop;
        }, false);

        ctx.lineWidth = size;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = color;

        canvas.addEventListener('mousedown', function (e) {
            canvas.addEventListener('mousemove', onPaint, false);
        }, false);

        canvas.addEventListener('mouseup', function () {
            canvas.removeEventListener('mousemove', onPaint, false);
        }, false);

        const onPaint = () => {
            ctx.beginPath();
            ctx.moveTo(last_mouse.x, last_mouse.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.closePath();
            ctx.stroke();

            if (timeout) clearTimeout(timeout);
            timeout = setTimeout(function () {
                const base64ImageData = canvas.toDataURL('image/png');
                socket.emit('drawing', base64ImageData);
            }, 1000)
        }
    }

    useEffect(() => {
        drawOnCanvas();
        return (() => console.log('cleanup'))
    }, [drawOnCanvas]);

    useEffect(() => {
        ctx.strokeStyle = color;
        ctx.lineWidth = size;
    }, [color, size, ctx, strokeStyle, lineWidth])

    return (
        <div className="sketch" id="sketch">
            <canvas className="board" id="board"></canvas>
        </div>
    )
}

export default BoardContainer;
