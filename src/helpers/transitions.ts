import { glsl } from './tags.ts';
import type { Transition } from './base.ts';

export const linear: Transition = glsl`
vec4 transition(vec2 uv) {
  return mix(
    getFromColor(uv),
    getToColor(uv),
    progress
  );
}
`;

export const glitchMemories: Transition = glsl`
vec4 transition(vec2 p) {
  vec2 block = floor(p.xy / vec2(16));
  vec2 uv_noise = block / vec2(64);
  uv_noise += floor(vec2(progress) * vec2(1200.0, 3500.0)) / vec2(64);
  vec2 dist = progress > 0.0 ? (fract(uv_noise) - 0.5) * 0.3 *(1.0 -progress) : vec2(0.0);
  vec2 red = p + dist * 0.2;
  vec2 green = p + dist * .3;
  vec2 blue = p + dist * .5;

  return vec4(mix(getFromColor(red), getToColor(red), progress).r,mix(getFromColor(green), getToColor(green), progress).g,mix(getFromColor(blue), getToColor(blue), progress).b,1.0);
}
`;

export const waterDrops: Transition = glsl`
const float amplitude = 30;
const float speed = 30;

vec4 transition(vec2 p) {
  vec2 dir = p - vec2(.5);
  float dist = length(dir);

  if (dist > progress) {
    return mix(getFromColor( p), getToColor( p), progress);
  } else {
    vec2 offset = dir * sin(dist * amplitude - progress * speed);
    return mix(getFromColor( p + offset), getToColor( p), progress);
  }
}
`;

export const cube: Transition = glsl`
// Author: gre
// License: MIT
const float persp = 0.7;
const float unzoom = 0.3;
const float reflection = 0.4;
const float floating = 3.0;

vec2 project (vec2 p) {
  return p * vec2(1.0, -1.2) + vec2(0.0, -floating/100.);
}

bool inBounds (vec2 p) {
  return all(lessThan(vec2(0.0), p)) && all(lessThan(p, vec2(1.0)));
}

vec4 bgColor (vec2 p, vec2 pfr, vec2 pto) {
  vec4 c = vec4(0.0, 0.0, 0.0, 1.0);
  pfr = project(pfr);
  // FIXME avoid branching might help perf!
  if (inBounds(pfr)) {
    c += mix(vec4(0.0), getFromColor(pfr), reflection * mix(1.0, 0.0, pfr.y));
  }
  pto = project(pto);
  if (inBounds(pto)) {
    c += mix(vec4(0.0), getToColor(pto), reflection * mix(1.0, 0.0, pto.y));
  }
  return c;
}

// p : the position
// persp : the perspective in [ 0, 1 ]
// center : the xcenter in [0, 1] \ 0.5 excluded
vec2 xskew (vec2 p, float persp, float center) {
  float x = mix(p.x, 1.0-p.x, center);
  return (
    (
      vec2( x, (p.y - 0.5*(1.0-persp) * x) / (1.0+(persp-1.0)*x) )
      - vec2(0.5-distance(center, 0.5), 0.0)
    )
    * vec2(0.5 / distance(center, 0.5) * (center<0.5 ? 1.0 : -1.0), 1.0)
    + vec2(center<0.5 ? 0.0 : 1.0, 0.0)
  );
}

vec4 transition(vec2 op) {
  float uz = unzoom * 2.0*(0.5-distance(0.5, progress));
  vec2 p = -uz*0.5+(1.0+uz) * op;
  vec2 fromP = xskew(
    (p - vec2(progress, 0.0)) / vec2(1.0-progress, 1.0),
    1.0-mix(progress, 0.0, persp),
    0.0
  );
  vec2 toP = xskew(
    p / vec2(progress, 1.0),
    mix(pow(progress, 2.0), 1.0, persp),
    1.0
  );
  // FIXME avoid branching might help perf!
  if (inBounds(fromP)) {
    return getFromColor(fromP);
  }
  else if (inBounds(toP)) {
    return getToColor(toP);
  }
  return bgColor(op, fromP, toP);
}

`;

export const swirl: Transition = glsl`
vec4 transition(vec2 UV) {
	float Radius = 1.0;

	float T = progress;

	UV -= vec2( 0.5, 0.5 );

	float Dist = length(UV);

	if ( Dist < Radius )
	{
		float Percent = (Radius - Dist) / Radius;
		float A = ( T <= 0.5 ) ? mix( 0.0, 1.0, T/0.5 ) : mix( 1.0, 0.0, (T-0.5)/0.5 );
		float Theta = Percent * Percent * A * 8.0 * 3.14159;
		float S = sin( Theta );
		float C = cos( Theta );
		UV = vec2( dot(UV, vec2(C, -S)), dot(UV, vec2(S, C)) );
	}
	UV += vec2( 0.5, 0.5 );

	vec4 C0 = getFromColor(UV);
	vec4 C1 = getToColor(UV);

	return mix( C0, C1, T );
}
`;

export const swap: Transition = glsl`
const float reflection1 = 0.4;
const float perspective = 0.2;
const float depth = 3.0;
  
const vec4 black = vec4(0.0, 0.0, 0.0, 1.0);
const vec2 boundMin = vec2(0.0, 0.0);
const vec2 boundMax = vec2(1.0, 1.0);
  
bool inBounds1 (vec2 p) {
  return all(lessThan(boundMin, p)) && all(lessThan(p, boundMax));
}
  
vec2 project1(vec2 p) {
  return p * vec2(1.0, -1.2) + vec2(0.0, -0.02);
}

vec4 bgColor(vec2 p, vec2 pfr, vec2 pto) {
  vec4 c = black;
  pfr = project1(pfr);
  if (inBounds1(pfr)) {
    c += mix(black, getFromColor(pfr), reflection1 * mix(1.0, 0.0, pfr.y));
  }
  pto = project1(pto);
  if (inBounds1(pto)) {
    c += mix(black, getToColor(pto), reflection1 * mix(1.0, 0.0, pto.y));
  }
  return c;
}

vec4 transition(vec2 p) {
  vec2 pfr, pto = vec2(-1.);
 
  float size = mix(1.0, depth, progress);
  float persp = perspective * progress;
  pfr = (p + vec2(-0.0, -0.5)) * vec2(size/(1.0-perspective*progress), size/(1.0-size*persp*p.x)) + vec2(0.0, 0.5);
 
  size = mix(1.0, depth, 1.-progress);
  persp = perspective * (1.-progress);
  pto = (p + vec2(-1.0, -0.5)) * vec2(size/(1.0-perspective*(1.0-progress)), size/(1.0-size*persp*(0.5-p.x))) + vec2(1.0, 0.5);

  if (progress < 0.5) {
    if (inBounds1(pfr)) {
      return getFromColor(pfr);
    }
    if (inBounds1(pto)) {
      return getToColor(pto);
    }  
  }
  if (inBounds1(pto)) {
    return getToColor(pto);
  }
  if (inBounds1(pfr)) {
    return getFromColor(pfr);
  }
  return bgColor(p, pfr, pto);
}
`;

export const pageCurl: Transition = glsl`
// author: Hewlett-Packard
// license: BSD 3 Clause
// Adapted by Sergey Kosarevsky from:
// http://rectalogic.github.io/webvfx/examples_2transition-shader-pagecurl_8html-example.html

/*
Copyright (c) 2010 Hewlett-Packard Development Company, L.P. All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are
met:

   * Redistributions of source code must retain the above copyright
     notice, this list of conditions and the following disclaimer.
   * Redistributions in binary form must reproduce the above
     copyright notice, this list of conditions and the following disclaimer
     in the documentation and/or other materials provided with the
     distribution.
   * Neither the name of Hewlett-Packard nor the names of its
     contributors may be used to endorse or promote products derived from
     this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
in vec2 texCoord;
*/

const float MIN_AMOUNT = -0.16;
const float MAX_AMOUNT = 1.5;

const float PI = 3.141592653589793;

const float scale = 512.0;
const float sharpness = 3.0;

const float cylinderRadius = 1.0 / PI / 2.0;

vec3 hitPoint(float hitAngle, float yc, vec3 point, mat3 rrotation)
{
        float hitPoint = hitAngle / (2.0 * PI);
        point.y = hitPoint;
        return rrotation * point;
}

vec4 antiAlias(vec4 color1, vec4 color2, float distanc)
{
        distanc *= scale;
        if (distanc < 0.0) return color2;
        if (distanc > 2.0) return color1;
        float dd = pow(1.0 - distanc / 2.0, sharpness);
        return ((color2 - color1) * dd) + color1;
}

float distanceToEdge(vec3 point)
{
        float dx = abs(point.x > 0.5 ? 1.0 - point.x : point.x);
        float dy = abs(point.y > 0.5 ? 1.0 - point.y : point.y);
        if (point.x < 0.0) dx = -point.x;
        if (point.x > 1.0) dx = point.x - 1.0;
        if (point.y < 0.0) dy = -point.y;
        if (point.y > 1.0) dy = point.y - 1.0;
        if ((point.x < 0.0 || point.x > 1.0) && (point.y < 0.0 || point.y > 1.0)) return sqrt(dx * dx + dy * dy);
        return min(dx, dy);
}

vec4 seeThrough(float yc, vec2 p, mat3 rotation, mat3 rrotation)
{
        float amount = progress * (MAX_AMOUNT - MIN_AMOUNT) + MIN_AMOUNT;
        float cylinderAngle = 2.0 * PI * amount;
        float hitAngle = PI - (acos(yc / cylinderRadius) - cylinderAngle);
        vec3 point = hitPoint(hitAngle, yc, rotation * vec3(p, 1.0), rrotation);
        if (yc <= 0.0 && (point.x < 0.0 || point.y < 0.0 || point.x > 1.0 || point.y > 1.0))
        {
            return getToColor(p);
        }

        if (yc > 0.0) return getFromColor(p);

        vec4 color = getFromColor(point.xy);
        vec4 tcolor = vec4(0.0);

        return antiAlias(color, tcolor, distanceToEdge(point));
}

vec4 seeThroughWithShadow(float yc, vec2 p, vec3 point, mat3 rotation, mat3 rrotation)
{
        float amount = progress * (MAX_AMOUNT - MIN_AMOUNT) + MIN_AMOUNT;
        float shadow = distanceToEdge(point) * 30.0;
        shadow = (1.0 - shadow) / 3.0;

        if (shadow < 0.0) shadow = 0.0; else shadow *= amount;

        vec4 shadowColor = seeThrough(yc, p, rotation, rrotation);
        shadowColor.r -= shadow;
        shadowColor.g -= shadow;
        shadowColor.b -= shadow;

        return shadowColor;
}

vec4 backside(float yc, vec3 point)
{
        vec4 color = getFromColor(point.xy);
        float gray = (color.r + color.b + color.g) / 15.0;
        gray += (8.0 / 10.0) * (pow(1.0 - abs(yc / cylinderRadius), 2.0 / 10.0) / 2.0 + (5.0 / 10.0));
        color.rgb = vec3(gray);
        return color;
}

vec4 behindSurface(vec2 p, float yc, vec3 point, mat3 rrotation)
{
        float amount = progress * (MAX_AMOUNT - MIN_AMOUNT) + MIN_AMOUNT;
        float cylinderAngle = 2.0 * PI * amount;

        float shado = (1.0 - ((-cylinderRadius - yc) / amount * 7.0)) / 6.0;
        shado *= 1.0 - abs(point.x - 0.5);

        yc = (-cylinderRadius - cylinderRadius - yc);

        float hitAngle = (acos(yc / cylinderRadius) + cylinderAngle) - PI;
        point = hitPoint(hitAngle, yc, point, rrotation);

        if (yc < 0.0 && point.x >= 0.0 && point.y >= 0.0 && point.x <= 1.0 && point.y <= 1.0 && (hitAngle < PI || amount > 0.5))
        {
                shado = 1.0 - (sqrt(pow(point.x - 0.5, 2.0) + pow(point.y - 0.5, 2.0)) / (71.0 / 100.0));
                shado *= pow(-yc / cylinderRadius, 3.0);
                shado *= 0.5;
        }
        else
        {
                shado = 0.0;
        }
        return vec4(getToColor(p).rgb - shado, 1.0);
}

vec4 transition(vec2 p) {
        float amount = progress * (MAX_AMOUNT - MIN_AMOUNT) + MIN_AMOUNT;
        const float angle = 100.0 * PI / 180.0;
        float c = cos(-angle);
        float s = sin(-angle);

        mat3 rotation = mat3( c, s, 0,
                              -s, c, 0,
                              -0.801, 0.8900, 1
                             );
        c = cos(angle);
        s = sin(angle);

        mat3 rrotation = mat3(	c, s, 0,
                               -s, c, 0,
                                0.98500, 0.985, 1
                              );

        vec3 point = rotation * vec3(p, 1.0);
        float cylinderCenter = amount;
        float yc = point.y - cylinderCenter;

        if (yc < -cylinderRadius)
        {
                // Behind surface
                return behindSurface(p,yc, point, rrotation);
        }

        if (yc > cylinderRadius)
        {
                // Flat surface
                return getFromColor(p);
        }
        float cylinderAngle = 2.0 * PI * amount;
        float hitAngle = (acos(yc / cylinderRadius) + cylinderAngle) - PI;

        float hitAngleMod = mod(hitAngle, 2.0 * PI);
        if ((hitAngleMod > PI && amount < 0.5) || (hitAngleMod > PI/2.0 && amount < 0.0))
        {
                return seeThrough(yc, p, rotation, rrotation);
        }

        point = hitPoint(hitAngle, yc, point, rrotation);

        if (point.x < 0.0 || point.y < 0.0 || point.x > 1.0 || point.y > 1.0)
        {
                return seeThroughWithShadow(yc, p, point, rotation, rrotation);
        }

        vec4 color = backside(yc, point);

        vec4 otherColor;
        if (yc < 0.0)
        {
                float shado = 1.0 - (sqrt(pow(point.x - 0.5, 2.0) + pow(point.y - 0.5, 2.0)) / 0.71);
                shado *= pow(-yc / cylinderRadius, 3.0);
                shado *= 0.5;
                otherColor = vec4(0.0, 0.0, 0.0, shado);
        }
        else
        {
                otherColor = getFromColor(p);
        }

        color = antiAlias(color, otherColor, cylinderRadius - abs(yc));

        vec4 cl = seeThroughWithShadow(yc, p, point, rotation, rrotation);
        float dist = distanceToEdge(point);

        return antiAlias(color, cl, dist);
}

`;
