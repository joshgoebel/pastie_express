#!/usr/bin/env node
'use strict';

// very poor man's console, could probably be much improved

require("../config/boot")

const repl = require('repl');
const cli = repl.start({ replMode: repl.REPL_MODE_STRICT });
cli.context.Paste = require('../app/models/paste')