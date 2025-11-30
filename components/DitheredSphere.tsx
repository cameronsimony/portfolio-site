"use client";

import { useEffect, useRef } from "react";

interface DitheredSphereProps {
  size?: number;
  className?: string;
  colorFront?: [number, number, number, number];
  colorBack?: [number, number, number, number];
}

const vertexShaderSource = `#version 300 es
precision mediump float;
layout(location = 0) in vec4 a_position;
void main() { gl_Position = a_position; }
`;

const fragmentShaderSource = `#version 300 es
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform vec4 u_colorBack;
uniform vec4 u_colorFront;

out vec4 fragColor;

#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846

const int bayer8x8[64] = int[64](
   0, 32,  8, 40,  2, 34, 10, 42,
  48, 16, 56, 24, 50, 18, 58, 26,
  12, 44,  4, 36, 14, 46,  6, 38,
  60, 28, 52, 20, 62, 30, 54, 22,
   3, 35, 11, 43,  1, 33,  9, 41,
  51, 19, 59, 27, 49, 17, 57, 25,
  15, 47,  7, 39, 13, 45,  5, 37,
  63, 31, 55, 23, 61, 29, 53, 21
);

float getBayerValue(vec2 uv) {
  ivec2 pos = ivec2(mod(uv, 8.0));
  int index = pos.y * 8 + pos.x;
  return float(bayer8x8[index]) / 64.0;
}

void main() {
  float t = .5 * u_time;
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  
  // Pixelization
  float pxSize = 1.5 * u_pixelRatio;
  vec2 pxSizeUv = gl_FragCoord.xy;
  pxSizeUv -= .5 * u_resolution;
  pxSizeUv /= pxSize;
  uv = floor(pxSizeUv) * pxSize / u_resolution.xy + .5 - .5;
  
  // Pattern UV
  float r = 0.00 * PI / 180.;
  mat2 rot = mat2(cos(r), sin(r), -sin(r), cos(r));
  vec2 shape_uv = uv + vec2(0.00, 0.00);
  shape_uv *= u_resolution.xy / u_pixelRatio / 0.25;
  shape_uv = rot * shape_uv + .5;
  vec2 ditheringNoise_uv = uv * u_resolution;
  
  // Sphere
  shape_uv *= 0.0018;
  float d = 1.0 - pow(length(shape_uv), 2.0);
  vec3 pos = vec3(shape_uv, sqrt(max(d, 0.0)));
  vec3 lightPos = normalize(vec3(cos(1.5 * t), 0.8, sin(1.25 * t)));
  float shape = 0.5 + 0.5 * dot(lightPos, pos);
  shape *= step(0.0, d);
  
  float dithering = getBayerValue(pxSizeUv) - 0.5;
  float res = step(.5, shape + dithering);
  
  vec3 fgColor = u_colorFront.rgb * u_colorFront.a;
  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  vec3 color = fgColor * res + bgColor * (1. - u_colorFront.a * res);
  float opacity = u_colorFront.a * res + u_colorBack.a * (1. - u_colorFront.a * res);
  
  fragColor = vec4(color, opacity);
}
`;

export default function DitheredSphere({
  size = 44,
  className = "",
  colorFront = [1.0, 1.0, 1.0, 1.0],
  colorBack = [0.0, 0.0, 0.0, 0.0],
}: DitheredSphereProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      premultipliedAlpha: false,
    });
    if (!gl) {
      console.error("WebGL 2 not supported");
      return;
    }

    // Compile shader
    function createShader(
      gl: WebGL2RenderingContext,
      type: number,
      source: string
    ): WebGLShader | null {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    // Create program
    function createProgram(
      gl: WebGL2RenderingContext,
      vertexShader: WebGLShader,
      fragmentShader: WebGLShader
    ): WebGLProgram | null {
      const program = gl.createProgram();
      if (!program) return null;
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("Program link error:", gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
      }
      return program;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(
      gl,
      gl.FRAGMENT_SHADER,
      fragmentShaderSource
    );
    if (!vertexShader || !fragmentShader) return;

    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) return;

    // Set up geometry (full-screen quad)
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Get uniform locations
    const timeLocation = gl.getUniformLocation(program, "u_time");
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const pixelRatioLocation = gl.getUniformLocation(program, "u_pixelRatio");
    const colorBackLocation = gl.getUniformLocation(program, "u_colorBack");
    const colorFrontLocation = gl.getUniformLocation(program, "u_colorFront");

    gl.useProgram(program);

    // Set up canvas size
    const pixelRatio = window.devicePixelRatio || 1;
    canvas.width = size * pixelRatio;
    canvas.height = size * pixelRatio;
    gl.viewport(0, 0, canvas.width, canvas.height);

    // Enable blending for transparency
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const startTime = performance.now();

    function render() {
      if (!gl) return;
      const currentTime = (performance.now() - startTime) / 1000;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform1f(timeLocation, currentTime);
      gl.uniform2f(resolutionLocation, canvas!.width, canvas!.height);
      gl.uniform1f(pixelRatioLocation, pixelRatio);
      gl.uniform4fv(colorBackLocation, colorBack);
      gl.uniform4fv(colorFrontLocation, colorFront);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationRef.current = requestAnimationFrame(render);
    }

    render();

    return () => {
      if (!gl) return;
      cancelAnimationFrame(animationRef.current);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, [size, colorFront, colorBack]);

  return (
    <canvas
      ref={canvasRef}
      className={`rounded-full flex-shrink-0 ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
