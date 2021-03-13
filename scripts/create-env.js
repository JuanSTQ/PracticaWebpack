const fs = require('fs') //esto es FILESISTEM, vamps a trabajar directamente con un modulo de node.

fs.writeFileSync('./.env',`API=${process.env.API}\n`)