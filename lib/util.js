module.exports = {
    prepareAttachments: function(attachments) {
        if (!attachments || attachments.length === 0) {
            return;
        }

        var result = [], convertFieldsToArray;

        convertFieldsToArray = function(fields) {
            if (!fields || fields.length === 0) {
                return;
            }

            var result = [];
            Object.keys(fields).forEach(function(name) {
                var data = fields[name].split(';');
                result.push({
                    title: data[0],
                    value: data[1],
                    short: data[2]
                });
            });

            return result;
        };

        Object.keys(attachments).forEach(function(index) {
            var attachment = attachments[index];
            attachment.fields = convertFieldsToArray(attachment.fields);
            result.push(attachment);
        });

        return result;
    }
}
