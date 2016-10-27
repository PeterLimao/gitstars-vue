<template>
    <div id="waves">
        <canvas :style="canvasStyle"></canvas>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                canvasStyle: {
                    width: this.width + 'px',
                    height: this.height + 'px'
                },
                canvas: '',
                K: 2,
                F: 6,
                phase: 0,
                speed: 0.1,
                noise: (this.height / 2 - 4) / 2
            };
        },
        ready () {
            this.canvas = this.$el.querySelector('canvas').getContext('2d');
            this.draw();
        },
        methods: {
            draw () {
                this.phase = (this.phase + this.speed) % (Math.PI * 64);

                this.clear();

                this.drawLine(-2, 'rgba(255, 255, 255, 0.1)');
                this.drawLine(-6, 'rgba(255, 255, 255, 0.2)');
                this.drawLine(4, 'rgba(255, 255, 255, 0.4)');
                this.drawLine(2, 'rgba(255, 255, 255, 0.6)');
                this.drawLine(1, 'rgba(255, 255, 255, 1)', 1.5);

                window.requestAnimationFrame(this.draw.bind(this), 1000);
            },
            drawLine (attenuation, color, width) {
                this.canvas.moveTo(0, 0);
                this.canvas.beginPath();
                this.canvas.strokeStyle = color;
                this.canvas.lineWidth = width || 1;

                let x, y;
                for (let i = -this.K; i <= this.K; i += 0.01) {
                    x = this.width * ((i + this.K) / (this.K * 2));
                    y = this.height / 2 + this.noise * this.globalAttenuationFn(i) * (1 / attenuation) * Math.sin(this.F * i - this.phase);
                    this.canvas.lineTo(x, y);
                }
                this.canvas.stroke();
            },
            globalAttenuationFn (x) {
                return Math.pow(this.K * 4 / (this.K * 4 + Math.pow(x, 4)), this.K * 2);
            },
            clear () {
                this.canvas.globalCompositeOperation = 'destination-out';
                this.canvas.fillRect(0, 0, this.width, this.height);
                this.canvas.globalCompositeOperation = 'source-over';
            }
        },
        props: {
            width: {
                type: Number,
                required: true
            },
            height: {
                type: Number,
                required: true
            }
        }
    };
</script>