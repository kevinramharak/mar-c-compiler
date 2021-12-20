import pipeline from './pipeline';
import { defaultOptions } from './Options';

export function main(...args: string[]): number {
    if (!args.length || args.includes('-h') || args.includes('--help')) {
        console.log('node build/bin.js $FILENAME');
    }

    const options = defaultOptions;

    const optimizeFlagIndex = args.indexOf('-O');
    if (optimizeFlagIndex !== -1) {
        options.optimize = true;
        args.splice(optimizeFlagIndex, 1);
    }

    const result = pipeline(args[0], options, args[1]);

    if (result.error) {
        console.error(`${result.error}`);
        return 1;
    }

    console.log('-- content -- ')
    console.log(result.content);
    console.log('-------------');
    
    console.log(' -- tokens --');
    console.log(result.tokens);
    console.log('------------');

    console.log('-- ast --')
    console.log(result.ast);
    console.log('---------');

    console.log('-- asm --')
    console.log(result.asm);
    console.log('---------');

    return 0;
}
