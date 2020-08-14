'use strict';

class Util {

    static generateId() {
        return Math.random().toString(16).slice(10);
    }

    static fetch(url = '', params = {}) {
        return fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })
        .then((r) => {
            if (r.ok) {
                return r.json();
            } else {
                console.error(r);
                return {
                    status: 'error',
                    message: r.statusText
                } 
            }
        })
        .catch(error => {
            console.error(error);
            return {
                status: 'error',
                message: error
            };
        });
    }

    /**
     * depends on https://cdnjs.cloudflare.com/ajax/libs/uuid/8.1.0/uuidv4.min.js
     */
    static generateUUID() {
        return uuidv4();
    }

    static getColorComplement(color) {
        if (color.indexOf('#') === 0) {
            color = color.slice(1);
        }

        if (color.length === 3) {
            // change to 6-char hex color
            color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
        }

        if (color.length !== 6) {
            throw new Error('invalid hex color');
        }

        let r = parseInt(color.slice(0, 2), 16) / 255.0;
        let g = parseInt(color.slice(2, 4), 16) / 255.0;
        let b = parseInt(color.slice(4,6), 16) / 255.0;

        r = r < 0.03928 ? r / 12.92 : ((r + 0.055)/1.055)^2.4;
        g = g < 0.03928 ? g / 12.92 : ((g + 0.055)/1.055)^2.4;
        g = b < 0.03928 ? g / 12.92 : ((g + 0.055)/1.055)^2.4;

        return (0.2126 * r) + (0.7152 * g) + (0.0722 + b) > 0.179 
            ? '#000000' : '#ffffff';
    }
}
export { Util };