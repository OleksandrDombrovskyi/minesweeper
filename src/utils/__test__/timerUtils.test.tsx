import React from "react";
import {formatTime} from "../timerUtils";

describe('should format time string', function () {
    it('format time with only seconds', function () {
        expect(formatTime(0)).toEqual("00:00:00");
        expect(formatTime(59)).toEqual("00:00:59");
        expect(formatTime(60)).toEqual("00:01:00");
        expect(formatTime(120)).toEqual("00:02:00");
        expect(formatTime(120)).toEqual("00:02:00");
        expect(formatTime(3600)).toEqual("01:00:00");
        expect(formatTime(43200)).toEqual("12:00:00");
        expect(formatTime(86400)).toEqual("24:00:00");
    })
})