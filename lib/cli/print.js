import chalk from 'chalk';
import colors from './../config/colors.js';

export default function print(message, type = 'info'){

    console.log(chalk.hex(colors[type]).bold(message));

}