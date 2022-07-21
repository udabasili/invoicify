import { format, transports, config, createLogger } from 'winston';
const { combine, timestamp, printf, label } = format;
const transportArray = [];

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} | ${label} | ${level.toUpperCase()}  | ${message} | `
});

if(process.env.NODE_ENV === 'development') {
  transportArray.push(
    new transports.Console()
  )
} 
else if(process.env.NODE_ENV === 'test') {
  transportArray.push(
    new transports.Console({
      silent: true
    })
  )
}else {
  transportArray.push(
    new transports.Console()
  )
}


const Logger = createLogger({
  level: 'silly',
  levels: config.npm.levels,
  defaultMeta: { service: 'user-service' },
  format: format.combine(
    label({
      label: 'Server Provider backend'
    }),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    myFormat
  ),
  transports: transportArray
});

export default Logger;
