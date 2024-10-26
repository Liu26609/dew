const removeAnsiCodes = (str: string): string => {
    return str.replace(/\x1b\[[0-9;]*m/g, '');
};

export let logger = {
    log: function (...args: any[]): void {
        const cleanArgs = args.map(arg => 
            typeof arg === 'string' ? removeAnsiCodes(arg) : arg
        );
        console.log(...cleanArgs);
    },
    warn: function (...args: any[]): void {
        const cleanArgs = args.map(arg => 
            typeof arg === 'string' ? removeAnsiCodes(arg) : arg
        );
        console.warn(...cleanArgs);
    },
    error: function (...args: any[]): void {
        const cleanArgs = args.map(arg => 
            typeof arg === 'string' ? removeAnsiCodes(arg) : arg
        );
        console.error(...cleanArgs);
    },
    debug: function (...args: any[]): void {
        const cleanArgs = args.map(arg => 
            typeof arg === 'string' ? removeAnsiCodes(arg) : arg
        );
        console.debug(...cleanArgs);
    }
};