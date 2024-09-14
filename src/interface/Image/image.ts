import { Color, FitEnum, GravityEnum } from "@quanhuzeyu/sharp-for-koishi"

export interface ComposeJoin{
    img:Buffer,
    frameData:FrameData
}

export interface FrameData {
    x?: number
    y?: number
    width?: number
    height?: number
    rotate?: number
    blendOption?:createFrameOption
    opacity?: number
    resizeBackground?:Color
    resizeFit?: keyof FitEnum
    gravity?: keyof GravityEnum
}

export type createFrameOption =
        | "clear"
        | "source"
        | "over"
        | "in"
        | "out"
        | "atop"
        | "dest"
        | "dest-over"
        | "dest-in"
        | "dest-out"
        | "dest-atop"
        | "xor"
        | "add"
        | "saturate"
        | "multiply"
        | "screen"
        | "overlay"
        | "darken"
        | "lighten"
        | "color-dodge"
        | "colour-dodge"
        | "color-burn"
        | "colour-burn"
        | "hard-light"
        | "soft-light"
        | "difference"
        | "exclusion";