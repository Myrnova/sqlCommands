import ulid from 'ulid'
import arg from 'arg'

export function genMessage() {
  return {
    }
  }
}



export function byteSize(obj) {
  return Buffer.byteLength(JSON.stringify(obj), 'utf-8')
}

export async function delay(value = 100) {
  return new Promise((response) => setTimeout(response, value))
}

export function parseArgs() {
  const options = {
    // Types
    '--batch-size': Number,
    '--concurrency': Number,
    '--delay-between-batches': Number,
    '--messages': Number,
    '--helper': Boolean,

    // Aliases
    '-b': '--batch-size',
    '-c': '--concurrency',
    '-d': '--delay-between-batches',
    '-m': '--messages',
    '-h': '--helper',
  }

  const help = () => {
    console.log(
      '\n',
      'Example\n  npm run dev -- -m 200 -b 2 -c 2\n',
      '\n',
      'Arguments\n',
      '  --batch-size: positive integer\n',
      '  --concurrency: positive integer\n',
      '  --delay-between-batches: (in ms) zero or positive integer\n',
      '  --messages: positive integer\n',
      '  --helper: boolean\n',
      '\n',
      'Aliases\n',
      '  -c: --concurrency\n',
      '  -b: --batch-size\n',
      '  -d: --delay-between-batches\n',
      '  -m: --messages\n',
      '  -h: --helper\n',
    )
    process.exit(1)
  }

  try {
    const args = arg(options);

    if (
      args['--helper'] === true
      || args['--batch-size'] <= 0
      || args['--concurrency'] <= 0
      || args['--delay-between-batches'] < 0
      || args['--messages'] <= 0
    ) {
      help()
    }

    if (args['--batch-size'] == null) {
      args['--batch-size'] = 1
    }

    if (args['--concurrency'] == null) {
      args['--concurrency'] = 1
    }

    if (args['--delay-between-batches'] == null) {
      args['--delay-between-batches'] = 0
    }

    if (args['--messages'] == null) {
      args['--messages'] = 1
    }

    return {
      batchSize: args['--batch-size'],
      concurrency: args['--concurrency'],
      delayBetweenBatches: args['--delay-between-batches'],
      messages: args['--messages'],
    }
  } catch (error) {
    help()
  }
}

export function randomId(prefix) {
  return prefix ? `${prefix}_${ulid.ulid()}` : ulid.ulid()
}

export function randomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
