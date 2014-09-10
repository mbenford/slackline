#!/usr/bin/env node

var slack, argv, util, payload, callback;

argv = require('yargs')
    .usage('Usage: slackline')
    .options({
        c: {
            alias: 'channel',
            required: true,
            string: true,
            describe: 'Channel or user to send the message to. Use # for channels and @ for users.'
        },
        t: {
            alias: 'text',
            required: true,
            string: true,
            describe: 'Message text to be sent.'
        },
        u: {
            alias: 'username',
            string: true,
            describe: 'Name to be displayed as the message sender.'
        },
        i: {
            alias: 'icon-url',
            string: true,
            describe: 'Url to the image to be used as the message icon.'
        },
        e: {
            alias: 'icon-emoji',
            string: true,
            describe: 'Emoji in the "colon" format to be used as the message icon.'
        },
        l: {
            alias: 'unfurl-links',
            describe: 'Flag to indicate whether links will be unfurled.'
        },
        attachments: {
            describe: 'Attachments object. Use the syntax --attachments.INDEX.PROPERTY VALUE as many times as required.'
        }
    })
    .example('slackline -c "#general" -t "Hello from Slackline"', '')
    .example('slackline -c "@john.doe" -t "Hello from Slackline"', '')
    .example('slackline -c "#general" -t "Hello from Slackline" -e :ghost:', '')
    .example('slackline -c "#general" -t "Stats from last hour" \\\n' +
             '    --attachments.1.fallback "CPU: 90%, Memory: 70%" \\\n' +
             '    --attachments.1.color "warning" \\\n' +
             '    --attachments.1.fields.1 "CPU;90%;true \\\n' +
             '    --attachments.1.fields.2 "Memory;70%;true', '')
    .strict()
    .version('1.0.0', 'version')
    .help('help')
    .showHelpOnFail(false, 'Use --help for all available options')
    .argv;

slack = require('slack-notify')(process.env.SLACK_WEBHOOK_URL);
util = require('./util');

payload = {
    channel: argv.channel,
    username: argv.username,
    icon_emoji: argv['icon-emoji'],
    icon_url: argv['icon-url'],
    text: argv.text,
    unfurl_links: argv['unfurl-links'],
    attachments: util.prepareAttachments(argv.attachments)
};

console.log(JSON.stringify(payload, null, 2));

callback = function(err) {
    if (err) {
        console.error.log('Slack API error:', err);
        process.exit(1);
    }
    else {
        console.log('Message sent');
    }
};

slack.send(payload, callback);