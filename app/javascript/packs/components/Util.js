import _ from 'lodash';

function toCamelCase(object) {
    let camelCaseObject = _.cloneDeep(object);

    if (_.isArray(camelCaseObject)) {
        return _.map(camelCaseObject, toCamelCase);
    } else {
        camelCaseObject = _.mapKeys(camelCaseObject, (value, key) => {
            return _.camelCase(key);
        });

        // Recursively apply throughout object
        return _.mapValues(camelCaseObject, (value) => {
            if (_.isPlainObject(value)) {
                return toCamelCase(value);
            } else if (_.isArray(value)) {
                return _.map(value, toCamelCase);
            } else {
                return value;
            }
        });
    }
};

function toSnakeCase(object) {
    let snakeCaseObject = _.cloneDeep(object);

    if (_.isArray(snakeCaseObject)) {
        return _.map(snakeCaseObject, toSnakeCase);
    } else {
        snakeCaseObject = _.mapKeys(snakeCaseObject, (value, key) => {
            return _.snakeCase(key);
        });

        // Recursively apply throughout object
        return _.mapValues(snakeCaseObject, (value) => {
            if (_.isPlainObject(value)) {
                return toSnakeCase(value);
            } else if (_.isArray(value)) {
                return _.map(value, toSnakeCase);
            } else {
                return value;
            }
        });
    }
};

export {toCamelCase, toSnakeCase};